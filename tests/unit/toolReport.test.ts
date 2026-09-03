import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../../src/app/api/tool-report/route";

const sendMock = vi.fn();

// The seam is the resend package itself. The route builds its client per send,
// so stubbing the module here reaches the real delivery path -- which no test
// exercised while the client was constructed at module scope.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

interface ToolReportBody {
  email?: unknown;
  tool?: unknown;
  summary?: unknown;
  recommendations?: unknown;
}

// Each test uses its own client IP so the shared in-memory rate limiter
// buckets never leak between cases.
const postToolReport = (body: ToolReportBody, ip: string) =>
  POST(
    new NextRequest("http://localhost/api/tool-report", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    })
  );

const validBody = {
  email: "Visitor@Example.com",
  tool: "roi-calculator",
  summary: {
    "3-year ROI": "412%",
    "Payback period": "7 months",
  },
  recommendations: ["Start with a scoped pilot."],
};

describe("POST /api/tool-report", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "sent" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("EMAIL_DRY_RUN", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends the visitor report and the lead notification", async () => {
    const response = await postToolReport(validBody, "203.0.113.10");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(response.headers.get("X-RateLimit-Limit")).toBe("5");
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("normalizes the email before sending", async () => {
    await postToolReport(validBody, "203.0.113.11");

    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: "visitor@example.com" })
    );
  });

  it("fails the request when the visitor's own report cannot be sent", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "rejected" } });

    const response = await postToolReport(validBody, "203.0.113.20");

    expect(response.status).toBe(502);
    // The visitor's copy is critical: nothing else is attempted.
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when the lead notification fails, but logs it recoverably", async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: "sent" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "rejected" } });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await postToolReport(validBody, "203.0.113.21");

    expect(response.status).toBe(200);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("COURTESY SEND FAILED"),
      expect.objectContaining({ to: expect.any(String), subject: expect.any(String) })
    );
  });

  it("refuses to report success when email is unconfigured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await postToolReport(validBody, "203.0.113.22");

    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("reports success without sending under EMAIL_DRY_RUN", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_DRY_RUN", "1");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const response = await postToolReport(validBody, "203.0.113.23");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("visitor@example.com")
    );
  });

  it("rejects an invalid email address", async () => {
    const response = await postToolReport(
      { ...validBody, email: "not-an-email" },
      "203.0.113.12"
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("Invalid request"),
    });
  });

  it("rejects an unknown tool", async () => {
    const response = await postToolReport(
      { ...validBody, tool: "some-other-tool" },
      "203.0.113.13"
    );

    expect(response.status).toBe(400);
  });

  it("rejects an empty summary", async () => {
    const response = await postToolReport({ ...validBody, summary: {} }, "203.0.113.14");

    expect(response.status).toBe(400);
  });

  it("rejects malformed JSON with a 500 rather than throwing", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/tool-report", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "203.0.113.15",
        },
        body: "{not json",
      })
    );

    expect(response.status).toBe(500);
  });

  it("rate limits after five requests from the same client", async () => {
    const ip = "203.0.113.16";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const allowed = await postToolReport(validBody, ip);
      expect(allowed.status).toBe(200);
    }

    const blocked = await postToolReport(validBody, ip);
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });
});

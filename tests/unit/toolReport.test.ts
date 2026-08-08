import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../../src/app/api/tool-report/route";

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
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid submission and reports success without Resend configured", async () => {
    const response = await postToolReport(validBody, "203.0.113.10");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(response.headers.get("X-RateLimit-Limit")).toBe("5");
  });

  it("normalizes the email before logging the submission", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await postToolReport(validBody, "203.0.113.11");

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Tool report request"),
      expect.objectContaining({ email: "visitor@example.com" })
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

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../../src/app/api/contact/route";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

// Each test uses its own client IP so the shared in-memory rate limiter
// buckets never leak between cases.
const postContact = (body: Record<string, unknown>, ip: string) =>
  POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    })
  );

const validBody = {
  firstName: "Dana",
  lastName: "O'Brien",
  email: "Dana@Example.COM",
  company: "Northside Mechanical",
  serviceInterest: "consulting",
  message: "We re-key submittals by hand and would like to stop.",
};

describe("POST /api/contact", () => {
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

  it("sends the enquiry and the confirmation", async () => {
    const response = await postContact(validBody, "198.51.100.10");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("normalizes the address it replies to", async () => {
    await postContact(validBody, "198.51.100.11");

    expect(sendMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ replyTo: "dana@example.com" })
    );
  });

  it("leaves the subject line unescaped", async () => {
    await postContact(validBody, "198.51.100.12");

    // The apostrophe used to arrive as O&#039;Brien: the names were escaped
    // for HTML and then interpolated into a plain-text header.
    expect(sendMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ subject: expect.stringContaining("O'Brien") })
    );
  });

  it("reports a missing field without naming it", async () => {
    const response = await postContact({ ...validBody, message: "" }, "198.51.100.13");

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Missing required fields" });
  });

  it("reports an invalid address", async () => {
    const response = await postContact(
      { ...validBody, email: "not-an-email" },
      "198.51.100.14"
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid email address" });
  });

  it("prefers the missing-field message when both are wrong", async () => {
    const response = await postContact(
      { ...validBody, message: "", email: "not-an-email" },
      "198.51.100.15"
    );

    // Preserves the precedence of the two sequential checks this replaced.
    await expect(response.json()).resolves.toEqual({ error: "Missing required fields" });
  });

  it("fails the request when the enquiry itself cannot be sent", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "rejected" } });

    const response = await postContact(validBody, "198.51.100.16");

    expect(response.status).toBe(502);
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when only the confirmation fails", async () => {
    sendMock
      .mockResolvedValueOnce({ data: { id: "sent" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "rejected" } });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await postContact(validBody, "198.51.100.17");

    expect(response.status).toBe(200);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("COURTESY SEND FAILED"),
      expect.objectContaining({ to: "dana@example.com" })
    );
  });

  it("hands over a direct address rather than lying when unconfigured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await postContact(validBody, "198.51.100.18");

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      success: false,
      error: expect.stringContaining("info@vivancedata.com"),
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("reports success without sending under EMAIL_DRY_RUN", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_DRY_RUN", "1");

    const response = await postContact(validBody, "198.51.100.19");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with a 500 rather than throwing", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-forwarded-for": "198.51.100.20",
        },
        body: "{not json",
      })
    );

    expect(response.status).toBe(500);
  });

  it("rate limits after five requests from the same client", async () => {
    const ip = "198.51.100.21";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const allowed = await postContact(validBody, ip);
      expect(allowed.status).toBe(200);
    }

    const blocked = await postContact(validBody, ip);
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });
});

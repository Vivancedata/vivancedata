import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../../src/app/api/newsletter/route";

// Each test uses its own client IP so the shared in-memory rate limiter
// buckets never leak between cases.
const postNewsletter = (body: Record<string, unknown>, ip: string) =>
  POST(
    new NextRequest("http://localhost/api/newsletter", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    })
  );

const validBody = { email: "Reader@Example.COM", firstName: "Reader" };

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.stubEnv("CONVERTKIT_API_KEY", "");
    vi.stubEnv("CONVERTKIT_FORM_ID", "");
    vi.stubEnv("MAILCHIMP_API_KEY", "");
    vi.stubEnv("MAILCHIMP_AUDIENCE_ID", "");
    vi.stubEnv("EMAIL_DRY_RUN", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("subscribes through ConvertKit when it is configured", async () => {
    vi.stubEnv("CONVERTKIT_API_KEY", "ck-key");
    vi.stubEnv("CONVERTKIT_FORM_ID", "12345");
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ subscription: { id: 1 } }), { status: 200 })
      );

    const response = await postNewsletter(validBody, "192.0.2.10");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ provider: "convertkit" });
    // The shared field normalizes before the provider ever sees the address.
    expect(fetchMock.mock.calls[0]?.[1]?.body).toContain("reader@example.com");
  });

  it("refuses to report a subscription that did not happen", async () => {
    const response = await postNewsletter(validBody, "192.0.2.11");

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("not configured"),
    });
  });

  it("reports success without subscribing under EMAIL_DRY_RUN", async () => {
    vi.stubEnv("EMAIL_DRY_RUN", "1");
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const response = await postNewsletter(validBody, "192.0.2.12");

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      provider: "dry-run",
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("reader@example.com"));
  });

  it("rejects an invalid email address", async () => {
    const response = await postNewsletter({ email: "not-an-email" }, "192.0.2.13");

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid email address" });
  });

  it("rejects a missing email address", async () => {
    const response = await postNewsletter({}, "192.0.2.14");

    expect(response.status).toBe(400);
  });

  it("rate limits after five requests from the same client", async () => {
    vi.stubEnv("EMAIL_DRY_RUN", "1");
    const ip = "192.0.2.15";

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const allowed = await postNewsletter(validBody, ip);
      expect(allowed.status).toBe(200);
    }

    const blocked = await postNewsletter(validBody, ip);
    expect(blocked.status).toBe(429);
  });
});

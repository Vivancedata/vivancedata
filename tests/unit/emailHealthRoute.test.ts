import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../src/app/api/health/email/route";

describe("GET /api/health/email", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is 200 and deliverable when a provider key is set", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("EMAIL_DRY_RUN", "");

    const response = GET();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ deliverable: true, status: "ready" });
  });

  it("is 503 when no provider is configured, which is how production ran", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("EMAIL_DRY_RUN", "");

    const response = GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ deliverable: false, status: "unconfigured" });
  });

  it("does not call a dry run deliverable: it tells the visitor success and sends nothing", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("EMAIL_DRY_RUN", "1");

    const response = GET();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ deliverable: false, status: "dry-run" });
  });

  it("never echoes the key", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_secret_value");
    vi.stubEnv("EMAIL_DRY_RUN", "");

    const body = await GET().text();

    expect(body).not.toContain("re_secret_value");
  });

  it("is not cached", () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");

    expect(GET().headers.get("cache-control")).toBe("no-store");
  });
});

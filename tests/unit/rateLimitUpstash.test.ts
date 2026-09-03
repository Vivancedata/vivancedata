import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

/**
 * The Upstash path, which the memory-store tests cannot reach: the module
 * decides once, at evaluation time, whether credentials exist. Resetting the
 * module registry and importing again re-runs that decision under stubbed
 * env, so this covers the real limiter branch -- including the seconds-vs-
 * milliseconds reset normalization, which is invisible from anywhere else.
 */

const limitMock = vi.fn();

vi.mock("@upstash/redis", () => ({
  Redis: { fromEnv: () => ({}) },
}));

vi.mock("@upstash/ratelimit", () => {
  class Ratelimit {
    static slidingWindow = () => ({});
    limit = limitMock;
  }
  return { Ratelimit, default: Ratelimit };
});

const options = {
  keyPrefix: "test:upstash",
  maxRequests: 5,
  window: "1 m" as const,
  windowMs: 60 * 1000,
};

const request = () =>
  new NextRequest("http://localhost/api/thing", {
    method: "POST",
    headers: { "x-forwarded-for": "203.0.113.77" },
  });

async function loadWithUpstash() {
  vi.resetModules();
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
  return import("../../src/lib/rateLimit");
}

describe("enforceRateLimit via Upstash", () => {
  beforeEach(() => limitMock.mockReset());
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("reports the limiter's verdict and marks the source", async () => {
    limitMock.mockResolvedValue({
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 60_000,
    });
    const { enforceRateLimit } = await loadWithUpstash();

    const result = await enforceRateLimit(request(), options);

    expect(result.source).toBe("upstash");
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.retryAfterSeconds).toBe(0);
  });

  it("treats a small reset as seconds and scales it to milliseconds", async () => {
    // Upstash returns reset in seconds on some versions. Passing it through
    // unscaled would put X-RateLimit-Reset in 1970 and make Retry-After
    // negative, so the threshold is the whole point of the branch.
    const resetInSeconds = Math.floor(Date.now() / 1000) + 30;
    limitMock.mockResolvedValue({
      success: false,
      limit: 5,
      remaining: 0,
      reset: resetInSeconds,
    });
    const { enforceRateLimit } = await loadWithUpstash();

    const result = await enforceRateLimit(request(), options);

    expect(result.resetAt).toBe(resetInSeconds * 1000);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
    expect(result.retryAfterSeconds).toBeLessThanOrEqual(31);
  });

  it("leaves a millisecond reset alone", async () => {
    const resetInMillis = Date.now() + 45_000;
    limitMock.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: resetInMillis });
    const { enforceRateLimit } = await loadWithUpstash();

    expect((await enforceRateLimit(request(), options)).resetAt).toBe(resetInMillis);
  });

  it("never advertises a Retry-After below one second", async () => {
    limitMock.mockResolvedValue({ success: false, limit: 5, remaining: 0, reset: Date.now() - 5_000 });
    const { enforceRateLimit } = await loadWithUpstash();

    // An already-elapsed reset would compute a negative wait.
    expect((await enforceRateLimit(request(), options)).retryAfterSeconds).toBe(1);
  });

  it("builds one limiter per prefix-and-budget and reuses it", async () => {
    limitMock.mockResolvedValue({ success: true, limit: 5, remaining: 4, reset: Date.now() + 60_000 });
    const { enforceRateLimit } = await loadWithUpstash();

    await enforceRateLimit(request(), options);
    await enforceRateLimit(request(), options);
    await enforceRateLimit(request(), { ...options, keyPrefix: "test:other" });

    expect(limitMock).toHaveBeenCalledTimes(3);
  });
});

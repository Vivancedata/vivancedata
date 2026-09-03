import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { buildRateLimitHeaders, enforceRateLimit } from "../../src/lib/rateLimit";

/**
 * 206 lines guarding every write endpoint on the site, in neither coverage
 * include list and with no test of its own -- exercised only incidentally,
 * through a route test that happened to drive the memory store.
 *
 * Tested through the interface rather than by exporting internals: the
 * Upstash client is built at module scope from env, so the memory store is
 * what a test can reach, and it is what production falls back to whenever
 * Upstash is unconfigured.
 */

const request = (headers: Record<string, string>) =>
  new NextRequest("http://localhost/api/thing", { method: "POST", headers });

const options = (keyPrefix: string) => ({
  keyPrefix,
  maxRequests: 3,
  window: "1 m" as const,
  windowMs: 60 * 1000,
});

describe("enforceRateLimit", () => {
  it("allows up to the limit, then blocks", async () => {
    const opts = options("test:basic");
    const req = request({ "x-forwarded-for": "203.0.113.1" });

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const result = await enforceRateLimit(req, opts);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(3 - attempt);
    }

    const blocked = await enforceRateLimit(req, opts);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("buckets clients separately", async () => {
    const opts = options("test:separate");
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await enforceRateLimit(request({ "x-forwarded-for": "203.0.113.2" }), opts);
    }

    const other = await enforceRateLimit(request({ "x-forwarded-for": "203.0.113.3" }), opts);
    expect(other.success).toBe(true);
  });

  it("buckets endpoints separately by keyPrefix", async () => {
    const req = request({ "x-forwarded-for": "203.0.113.4" });
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await enforceRateLimit(req, options("test:prefix-a"));
    }

    const elsewhere = await enforceRateLimit(req, options("test:prefix-b"));
    expect(elsewhere.success).toBe(true);
  });

  it.each([
    ["x-forwarded-for", "203.0.113.10"],
    ["x-real-ip", "203.0.113.11"],
    ["cf-connecting-ip", "203.0.113.12"],
    ["x-vercel-forwarded-for", "203.0.113.13"],
  ])("reads the client address from %s", async (header, ip) => {
    const opts = options(`test:header:${header}`);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await enforceRateLimit(request({ [header]: ip }), opts);
    }

    // Same address through the same header shares a bucket...
    expect((await enforceRateLimit(request({ [header]: ip }), opts)).success).toBe(false);
    // ...while a different one does not.
    expect((await enforceRateLimit(request({ [header]: "203.0.113.99" }), opts)).success).toBe(true);
  });

  it("takes the first address from a proxy chain", async () => {
    const opts = options("test:chain");
    const chained = request({ "x-forwarded-for": " 203.0.113.20 , 10.0.0.1, 10.0.0.2" });
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await enforceRateLimit(chained, opts);
    }

    // The trimmed leading address is the identity, so a bare one collides.
    const bare = request({ "x-forwarded-for": "203.0.113.20" });
    expect((await enforceRateLimit(bare, opts)).success).toBe(false);
  });

  it("ignores a literal 'unknown' address and falls through to the next header", async () => {
    const opts = options("test:unknown");
    const req = request({ "x-forwarded-for": "unknown", "x-real-ip": "203.0.113.30" });
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await enforceRateLimit(req, opts);
    }

    expect((await enforceRateLimit(request({ "x-real-ip": "203.0.113.30" }), opts)).success).toBe(false);
  });

  it("still limits a request carrying no address at all", async () => {
    const opts = options("test:anonymous");
    for (let attempt = 0; attempt < 3; attempt += 1) {
      expect((await enforceRateLimit(request({}), opts)).success).toBe(true);
    }

    expect((await enforceRateLimit(request({}), opts)).success).toBe(false);
  });

  it("reports a reset in the future, in milliseconds", async () => {
    const before = Date.now();
    const result = await enforceRateLimit(
      request({ "x-forwarded-for": "203.0.113.40" }),
      options("test:reset")
    );

    expect(result.resetAt).toBeGreaterThan(before);
    expect(result.resetAt).toBeLessThanOrEqual(before + 60_000 + 1_000);
    expect(result.source).toBe("memory");
  });

  it("evicts expired entries once the store grows past its threshold", async () => {
    const opts = { ...options("test:evict"), windowMs: 1 };

    // The eviction sweep only runs above 5,000 entries; below it the store is
    // left alone. Crossing the threshold with already-expired records is the
    // only way to reach that branch through the interface.
    for (let i = 0; i < 5_200; i += 1) {
      await enforceRateLimit(request({ "x-forwarded-for": `10.1.${(i / 256) | 0}.${i % 256}` }), opts);
    }

    const fresh = await enforceRateLimit(request({ "x-forwarded-for": "203.0.113.50" }), opts);
    expect(fresh.success).toBe(true);
  });
});

describe("buildRateLimitHeaders", () => {
  it("advertises the budget without a Retry-After while requests remain", () => {
    const headers = buildRateLimitHeaders({
      success: true,
      limit: 5,
      remaining: 2,
      resetAt: 1_700_000_000_000,
      retryAfterSeconds: 0,
      source: "memory",
    }) as Record<string, string>;

    expect(headers).toEqual({
      "X-RateLimit-Limit": "5",
      "X-RateLimit-Remaining": "2",
      "X-RateLimit-Reset": "1700000000000",
      "X-RateLimit-Provider": "memory",
    });
  });

  it("adds Retry-After once blocked, and never a negative remaining", () => {
    const headers = buildRateLimitHeaders({
      success: false,
      limit: 5,
      remaining: -3,
      resetAt: 1_700_000_000_000,
      retryAfterSeconds: 42,
      source: "upstash",
    }) as Record<string, string>;

    expect(headers["Retry-After"]).toBe("42");
    expect(headers["X-RateLimit-Remaining"]).toBe("0");
    expect(headers["X-RateLimit-Provider"]).toBe("upstash");
  });
});

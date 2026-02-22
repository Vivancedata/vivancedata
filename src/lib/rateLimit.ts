import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

const IP_HEADER_CANDIDATES = [
  "x-forwarded-for",
  "x-real-ip",
  "x-vercel-forwarded-for",
  "cf-connecting-ip",
];

type RateLimitSource = "upstash" | "memory";

interface MemoryRateLimitRecord {
  count: number;
  resetAt: number;
}

declare global {
  // Shared in-memory fallback store across hot reloads.
  var __vivanceRateLimitMemoryStore: Map<string, MemoryRateLimitRecord> | undefined;
}

const memoryStore =
  globalThis.__vivanceRateLimitMemoryStore ??
  new Map<string, MemoryRateLimitRecord>();
globalThis.__vivanceRateLimitMemoryStore = memoryStore;

const hasUpstashCredentials = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const redis = hasUpstashCredentials ? Redis.fromEnv() : null;
const upstashLimiterCache = new Map<string, Ratelimit>();

export interface RateLimitOptions {
  keyPrefix: string;
  maxRequests: number;
  window: `${number} ${"s" | "m" | "h" | "d"}`;
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
  source: RateLimitSource;
}

function getClientIp(request: NextRequest): string {
  for (const headerName of IP_HEADER_CANDIDATES) {
    const headerValue = request.headers.get(headerName);
    if (!headerValue) {
      continue;
    }

    const ip = headerValue.split(",")[0]?.trim();
    if (ip && ip.toLowerCase() !== "unknown") {
      return ip;
    }
  }

  return "unknown";
}

function getRateLimitIdentifier(request: NextRequest): string {
  const ip = getClientIp(request);
  if (ip !== "unknown") {
    return ip;
  }

  // Fallback keeps unknown IP traffic from collapsing into one global bucket.
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `unknown:${userAgent.slice(0, 120)}`;
}

function getUpstashLimiter(options: RateLimitOptions): Ratelimit | null {
  if (!redis) {
    return null;
  }

  const cacheKey = `${options.keyPrefix}:${options.maxRequests}:${options.window}`;
  const cached = upstashLimiterCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(options.maxRequests, options.window),
    prefix: options.keyPrefix,
    analytics: false,
  });

  upstashLimiterCache.set(cacheKey, limiter);
  return limiter;
}

function normalizeResetTimestamp(rawReset: number): number {
  // Upstash reset can be returned in seconds depending on version/config.
  return rawReset > 1_000_000_000_000 ? rawReset : rawReset * 1000;
}

function collectExpiredMemoryEntries(now: number): void {
  if (memoryStore.size < 5_000) {
    return;
  }

  for (const [key, record] of memoryStore.entries()) {
    if (record.resetAt <= now) {
      memoryStore.delete(key);
    }
  }
}

function applyMemoryRateLimit(
  bucketKey: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  collectExpiredMemoryEntries(now);

  const existing = memoryStore.get(bucketKey);
  if (!existing || now > existing.resetAt) {
    const resetAt = now + options.windowMs;
    memoryStore.set(bucketKey, { count: 1, resetAt });
    return {
      success: true,
      limit: options.maxRequests,
      remaining: Math.max(0, options.maxRequests - 1),
      resetAt,
      retryAfterSeconds: 0,
      source: "memory",
    };
  }

  if (existing.count >= options.maxRequests) {
    return {
      success: false,
      limit: options.maxRequests,
      remaining: 0,
      resetAt: existing.resetAt,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000)
      ),
      source: "memory",
    };
  }

  existing.count += 1;
  memoryStore.set(bucketKey, existing);

  return {
    success: true,
    limit: options.maxRequests,
    remaining: Math.max(0, options.maxRequests - existing.count),
    resetAt: existing.resetAt,
    retryAfterSeconds: 0,
    source: "memory",
  };
}

export async function enforceRateLimit(
  request: NextRequest,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const identifier = getRateLimitIdentifier(request);
  const bucketKey = `${options.keyPrefix}:${identifier}`;
  const limiter = getUpstashLimiter(options);

  if (!limiter) {
    return applyMemoryRateLimit(bucketKey, options);
  }

  const result = await limiter.limit(bucketKey);
  const resetAt = normalizeResetTimestamp(result.reset);
  const now = Date.now();

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    resetAt,
    retryAfterSeconds: result.success
      ? 0
      : Math.max(1, Math.ceil((resetAt - now) / 1000)),
    source: "upstash",
  };
}

export function buildRateLimitHeaders(rateLimit: RateLimitResult): HeadersInit {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(Math.max(0, rateLimit.remaining)),
    "X-RateLimit-Reset": String(rateLimit.resetAt),
    "X-RateLimit-Provider": rateLimit.source,
  };

  if (!rateLimit.success) {
    headers["Retry-After"] = String(rateLimit.retryAfterSeconds);
  }

  return headers;
}

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  hasAnalyticsConsent,
  parseCookiePreferences,
  readCookiePreferences,
} from "../../src/lib/cookieConsent";

describe("cookie consent parsing", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
        clear: () => {
          store.clear();
        },
      },
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns null for missing values", () => {
    expect(parseCookiePreferences(null)).toBeNull();
  });

  it("returns null for malformed json", () => {
    expect(parseCookiePreferences("not-json")).toBeNull();
  });

  it("parses valid consent payloads", () => {
    const parsed = parseCookiePreferences(
      JSON.stringify(DEFAULT_COOKIE_PREFERENCES)
    );

    expect(parsed).toEqual(DEFAULT_COOKIE_PREFERENCES);
  });

  it("rejects partial consent payloads", () => {
    const parsed = parseCookiePreferences(
      JSON.stringify({ essential: true, analytics: true })
    );

    expect(parsed).toBeNull();
  });

  it("reads and validates consent from localStorage", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(DEFAULT_COOKIE_PREFERENCES)
    );

    expect(readCookiePreferences()).toEqual(DEFAULT_COOKIE_PREFERENCES);
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("returns false when analytics consent is missing or invalid", () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    expect(hasAnalyticsConsent()).toBe(false);

    localStorage.setItem(CONSENT_STORAGE_KEY, "{bad-json");
    expect(readCookiePreferences()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("returns null when browser globals are unavailable", () => {
    const currentWindow = globalThis.window;
    vi.stubGlobal("window", undefined);

    expect(readCookiePreferences()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);

    vi.stubGlobal("window", currentWindow);
  });
});

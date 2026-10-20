import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ALL_ACCEPTED_COOKIE_PREFERENCES,
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  DEFAULT_COOKIE_PREFERENCES,
  clearCookiePreferences,
  hasAnalyticsConsent,
  parseCookiePreferences,
  readCookiePreferences,
  writeCookiePreferences,
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

  it("moves a choice stored under the unversioned key to the versioned one", () => {
    localStorage.setItem(
      "vivancedata-cookie-consent",
      JSON.stringify(DEFAULT_COOKIE_PREFERENCES)
    );

    expect(readCookiePreferences()).toEqual(DEFAULT_COOKIE_PREFERENCES);
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe(
      JSON.stringify(DEFAULT_COOKIE_PREFERENCES)
    );
    expect(localStorage.getItem("vivancedata-cookie-consent")).toBeNull();
  });

  it("treats storage that throws as no choice made, and never throws", () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error("SecurityError");
        },
        setItem: () => {
          throw new Error("QuotaExceededError");
        },
        removeItem: () => {},
        clear: () => {},
      },
    });

    expect(readCookiePreferences()).toBeNull();
    expect(() => writeCookiePreferences(DEFAULT_COOKIE_PREFERENCES)).not.toThrow();
  });

  it("returns null when browser globals are unavailable", () => {
    const currentWindow = globalThis.window;
    vi.stubGlobal("window", undefined);

    expect(readCookiePreferences()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);

    vi.stubGlobal("window", currentWindow);
  });

  it("clears the stored choice and notifies listeners so consent is withdrawn", () => {
    writeCookiePreferences(ALL_ACCEPTED_COOKIE_PREFERENCES);
    localStorage.setItem("vivancedata-cookie-consent", JSON.stringify(ALL_ACCEPTED_COOKIE_PREFERENCES));
    expect(hasAnalyticsConsent()).toBe(true);

    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);
    clearCookiePreferences();
    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    expect(readCookiePreferences()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("still notifies listeners when storage throws on clear", () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {
          throw new Error("blocked");
        },
        clear: () => {},
      },
    });
    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);

    expect(() => clearCookiePreferences()).not.toThrow();
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);
  });
});

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

/**
 * Versioned, so a future change to the stored shape can migrate instead of
 * misreading an old value. The unversioned key it replaced is read once and
 * moved across, so nobody who already chose is asked again.
 */
export const CONSENT_STORAGE_KEY = "vivancedata-cookie-consent:v1";
const LEGACY_CONSENT_STORAGE_KEY = "vivancedata-cookie-consent";
export const CONSENT_UPDATED_EVENT = "vivancedata:cookie-consent-updated";

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const ALL_ACCEPTED_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export function parseCookiePreferences(
  rawValue: string | null
): CookiePreferences | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<CookiePreferences>;
    if (
      typeof parsed.essential === "boolean" &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean" &&
      typeof parsed.functional === "boolean"
    ) {
      return parsed as CookiePreferences;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * localStorage throws in some private-browsing modes, when storage is disabled
 * and when the quota is full, so every access here is guarded. A failed read is
 * "no choice made yet"; a failed write keeps the choice for this page view only.
 */
function readStoredConsent(): string | null {
  try {
    const current = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (current !== null) {
      return current;
    }

    const legacy = localStorage.getItem(LEGACY_CONSENT_STORAGE_KEY);
    if (legacy !== null && parseCookiePreferences(legacy)) {
      localStorage.setItem(CONSENT_STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_CONSENT_STORAGE_KEY);
    }
    return legacy;
  } catch {
    return null;
  }
}

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseCookiePreferences(readStoredConsent());
}

export function writeCookiePreferences(preferences: CookiePreferences): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
}

export function hasAnalyticsConsent(): boolean {
  const preferences = readCookiePreferences();
  return preferences?.analytics ?? false;
}

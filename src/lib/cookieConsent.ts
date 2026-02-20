export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const CONSENT_STORAGE_KEY = "vivancedata-cookie-consent";
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

export function readCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  return parseCookiePreferences(localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function hasAnalyticsConsent(): boolean {
  const preferences = readCookiePreferences();
  return preferences?.analytics ?? false;
}

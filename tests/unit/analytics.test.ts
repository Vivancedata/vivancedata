import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ALL_ACCEPTED_COOKIE_PREFERENCES,
  CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_PREFERENCES,
} from "../../src/lib/cookieConsent";
import { ANALYTICS, trackEvent, trackPageView } from "../../src/lib/analytics";

/**
 * Consent is set through real localStorage rather than by mocking
 * hasAnalyticsConsent, so these also prove the two modules agree on the
 * stored shape. A mock would pass even if that contract drifted.
 */
const grantConsent = () =>
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(ALL_ACCEPTED_COOKIE_PREFERENCES));
const denyConsent = () =>
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(DEFAULT_COOKIE_PREFERENCES));

const gtagMock = vi.fn();
const attachGtag = () => {
  (window as unknown as { gtag: unknown }).gtag = gtagMock;
};
const detachGtag = () => {
  delete (window as unknown as { gtag?: unknown }).gtag;
};

describe("analytics", () => {
  beforeEach(() => {
    // jsdom does not supply localStorage in this setup; the cookie-consent
    // suite installs the same stub.
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
    gtagMock.mockReset();
    detachGtag();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    detachGtag();
  });

  describe("trackEvent", () => {
    it("sends the event when consent is granted and gtag is present", () => {
      grantConsent();
      attachGtag();

      trackEvent("demo_opened", "proof", "Triage a sample voicemail", 1);

      expect(gtagMock).toHaveBeenCalledWith("event", "demo_opened", {
        event_category: "proof",
        event_label: "Triage a sample voicemail",
        value: 1,
      });
    });

    it("stays silent without analytics consent", () => {
      denyConsent();
      attachGtag();

      trackEvent("demo_opened", "proof");

      // gtag can linger after a visitor withdraws consent mid-session, so the
      // consent check has to hold independently of gtag being present.
      expect(gtagMock).not.toHaveBeenCalled();
    });

    it("stays silent when no consent has been recorded at all", () => {
      attachGtag();

      trackEvent("demo_opened", "proof");

      expect(gtagMock).not.toHaveBeenCalled();
    });

    it("stays silent when gtag never loaded", () => {
      grantConsent();

      expect(() => trackEvent("demo_opened", "proof")).not.toThrow();
      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  describe("trackPageView", () => {
    it("configures the page path when a measurement id is set", () => {
      vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST");
      grantConsent();
      attachGtag();

      trackPageView("/pricing");

      expect(gtagMock).toHaveBeenCalledWith("config", "G-TEST", { page_path: "/pricing" });
    });

    it("does nothing without a measurement id", () => {
      vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
      grantConsent();
      attachGtag();

      trackPageView("/pricing");

      expect(gtagMock).not.toHaveBeenCalled();
    });
  });

  describe("the three named actions", () => {
    beforeEach(() => {
      grantConsent();
      attachGtag();
    });

    it("records a demo open against the proof category", () => {
      ANALYTICS.demoOpened("Extract a sample delivery slip");

      expect(gtagMock).toHaveBeenCalledWith("event", "demo_opened", {
        event_category: "proof",
        event_label: "Extract a sample delivery slip",
        value: undefined,
      });
    });

    it("records a contact submission with its service interest", () => {
      ANALYTICS.contactSubmitted("consulting");

      expect(gtagMock).toHaveBeenCalledWith(
        "event",
        "contact_submitted",
        expect.objectContaining({ event_category: "conversion", event_label: "consulting" })
      );
    });

    it("labels a contact submission with no service interest rather than dropping it", () => {
      ANALYTICS.contactSubmitted(undefined);

      expect(gtagMock).toHaveBeenCalledWith(
        "event",
        "contact_submitted",
        expect.objectContaining({ event_label: "unspecified" })
      );
    });

    it("records which tool a report was requested from", () => {
      ANALYTICS.toolReportRequested("roi-calculator");

      expect(gtagMock).toHaveBeenCalledWith(
        "event",
        "tool_report_requested",
        expect.objectContaining({ event_category: "conversion", event_label: "roi-calculator" })
      );
    });
  });
});

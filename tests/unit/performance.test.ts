// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getOptimalAnimationSettings,
  preloadCriticalResources,
  prefersReducedMotion,
} from "../../src/lib/performance";

const originalUserAgent = navigator.userAgent;
const originalHardwareConcurrency = navigator.hardwareConcurrency;
const originalDeviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

function setMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  });
}

function setNavigatorSnapshot({
  userAgent,
  hardwareConcurrency,
  deviceMemory,
}: {
  userAgent: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
}) {
  Object.defineProperty(navigator, "userAgent", {
    configurable: true,
    value: userAgent,
  });
  Object.defineProperty(navigator, "hardwareConcurrency", {
    configurable: true,
    value: hardwareConcurrency,
  });
  Object.defineProperty(navigator, "deviceMemory", {
    configurable: true,
    value: deviceMemory,
  });
}

afterEach(() => {
  document.head.innerHTML = "";
  Object.defineProperty(navigator, "userAgent", {
    configurable: true,
    value: originalUserAgent,
  });
  Object.defineProperty(navigator, "hardwareConcurrency", {
    configurable: true,
    value: originalHardwareConcurrency,
  });
  Object.defineProperty(navigator, "deviceMemory", {
    configurable: true,
    value: originalDeviceMemory,
  });
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("performance helpers", () => {
  it("detects reduced motion preference", () => {
    setMatchMedia(true);

    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns simplified settings for low-end mobile devices", () => {
    setMatchMedia(false);
    setNavigatorSnapshot({
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      hardwareConcurrency: 2,
      deviceMemory: 2,
    });

    expect(getOptimalAnimationSettings()).toEqual({
      enableAnimations: true,
      simplifyAnimations: true,
      duration: 0.3,
      staggerDelay: 0.05,
    });
  });

  it("disables animations when reduced motion is enabled", () => {
    setMatchMedia(true);
    setNavigatorSnapshot({
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      hardwareConcurrency: 8,
      deviceMemory: 8,
    });

    expect(getOptimalAnimationSettings()).toEqual({
      enableAnimations: false,
      simplifyAnimations: false,
      duration: 0.6,
      staggerDelay: 0.1,
    });
  });

  it("preloads critical resources with the correct link attributes", () => {
    setMatchMedia(false);

    preloadCriticalResources([
      "/app.js",
      "/styles.css",
      "/hero.webp",
      "/fonts/inter.woff2",
      "/data.json",
    ]);

    const links = Array.from(
      document.head.querySelectorAll<HTMLLinkElement>("link[rel='preload']")
    );
    expect(links).toHaveLength(5);

    expect(links[0]?.as).toBe("script");
    expect(links[1]?.as).toBe("style");
    expect(links[2]?.as).toBe("image");
    expect(links[3]?.as).toBe("font");
    expect(links[3]?.crossOrigin).toBe("anonymous");
    expect(links[4]?.getAttribute("as")).toBeNull();
  });

  it("returns safe defaults when browser globals are unavailable", () => {
    const currentWindow = globalThis.window;
    const currentDocument = globalThis.document;

    vi.stubGlobal("window", undefined);
    vi.stubGlobal("document", undefined);

    expect(prefersReducedMotion()).toBe(false);
    expect(() => preloadCriticalResources(["/app.js"])).not.toThrow();

    vi.stubGlobal("window", currentWindow);
    vi.stubGlobal("document", currentDocument);
  });
});

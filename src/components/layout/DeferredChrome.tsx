"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ScrollToTop = dynamic(
  () => import("@/components/common/ScrollToTop").then((module) => module.ScrollToTop),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("@/components/common/CookieConsent").then((module) => module.CookieConsent),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("sonner").then((module) => module.Toaster),
  { ssr: false }
);

export function DeferredChrome() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const scheduleEnable = () => setEnabled(true);
    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (typeof window === "undefined") {
      return;
    }

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(scheduleEnable, { timeout: 1500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(scheduleEnable, 400);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <CookieConsent />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

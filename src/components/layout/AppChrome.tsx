"use client";

import { type ComponentType, useEffect, useState } from "react";

export function AppChrome() {
  const [DeferredChromeComponent, setDeferredChromeComponent] = useState<null | ComponentType>(null);
  const [GoogleAnalyticsComponent, setGoogleAnalyticsComponent] = useState<null | ComponentType>(null);

  useEffect(() => {
    let cancelled = false;

    void import("@/components/layout/DeferredChrome").then((module) => {
      if (!cancelled) {
        setDeferredChromeComponent(() => module.DeferredChrome);
      }
    });

    void import("@/components/analytics/GoogleAnalytics").then((module) => {
      if (!cancelled) {
        setGoogleAnalyticsComponent(() => module.GoogleAnalytics);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {GoogleAnalyticsComponent ? <GoogleAnalyticsComponent /> : null}
      {DeferredChromeComponent ? <DeferredChromeComponent /> : null}
    </>
  );
}

"use client";

import { type ComponentType, useEffect, useState } from "react";

export function AppChrome() {
  const [DeferredChromeComponent, setDeferredChromeComponent] = useState<null | ComponentType>(null);

  useEffect(() => {
    let cancelled = false;

    void import("@/components/layout/DeferredChrome").then((module) => {
      if (!cancelled) {
        setDeferredChromeComponent(() => module.DeferredChrome);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return DeferredChromeComponent ? <DeferredChromeComponent /> : null;
}

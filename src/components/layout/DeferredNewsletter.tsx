"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Newsletter = dynamic(
  () => import("@/components/layout/Newsletter").then((module) => module.Newsletter),
  { ssr: false }
);

function NewsletterPlaceholder() {
  return (
    <div className="border-t border-rule pt-xl" aria-hidden="true">
      <div className="min-h-[104px]" />
    </div>
  );
}

export function DeferredNewsletter() {
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

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(scheduleEnable, { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(scheduleEnable, 800);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!enabled) {
    return <NewsletterPlaceholder />;
  }

  return <Newsletter />;
}

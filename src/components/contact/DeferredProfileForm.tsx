"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ProfileForm = dynamic(
  () => import("@/components/contact/Form").then((module) => module.ProfileForm),
  { ssr: false }
);

function ProfileFormPlaceholder() {
  return (
    <div
      className="min-h-[720px] rounded-3xl border border-border/60 bg-card/70 shadow-lg"
      aria-hidden="true"
    />
  );
}

export function DeferredProfileForm() {
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
      const idleId = idleWindow.requestIdleCallback(scheduleEnable, { timeout: 2200 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = globalThis.setTimeout(scheduleEnable, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  if (!enabled) {
    return <ProfileFormPlaceholder />;
  }

  return <ProfileForm />;
}

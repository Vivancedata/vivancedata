"use client";

import dynamic from "next/dynamic";

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
  return (
    <>
      <ScrollToTop />
      <CookieConsent />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

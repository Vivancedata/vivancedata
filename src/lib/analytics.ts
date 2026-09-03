import { hasAnalyticsConsent } from '@/lib/cookieConsent';

/**
 * Analytics events, separated from the Google Analytics component on purpose.
 *
 * That component is lazily imported by AppChrome so `next/script` and the gtag
 * loader stay out of the initial bundle. Importing a tracking helper from it
 * would pull all of that back into every page that measures anything, which is
 * why these live here instead.
 *
 * Every function is a no-op without analytics consent AND without gtag on the
 * window. The consent check is not redundant: gtag can linger after a visitor
 * withdraws consent within the same page view.
 */

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | null {
  if (typeof window === 'undefined' || !hasAnalyticsConsent() || !('gtag' in window)) {
    return null;
  }
  return (window as typeof window & { gtag: Gtag }).gtag;
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  gtag()?.('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
}

export function trackPageView(url: string): void {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }
  gtag()?.('config', measurementId, { page_path: url });
}

/**
 * The three actions worth measuring on this site.
 *
 * The demos are the only proof a visitor can check without talking to anyone,
 * and the two form completions are the only signals that someone got far
 * enough to hand over an address. Page views alone cannot tell you which of
 * those happened, which is what makes them worth naming here rather than
 * scattering string literals across call sites.
 */
export const ANALYTICS = {
  demoOpened: (label: string) => trackEvent('demo_opened', 'proof', label),
  contactSubmitted: (serviceInterest?: string) =>
    trackEvent('contact_submitted', 'conversion', serviceInterest || 'unspecified'),
  toolReportRequested: (tool: string) => trackEvent('tool_report_requested', 'conversion', tool),
} as const;

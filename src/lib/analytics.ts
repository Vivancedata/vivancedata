import { track } from '@vercel/analytics';

/**
 * The three actions worth measuring on this site, sent to Vercel Web Analytics.
 *
 * The demos are the only proof a visitor can check without talking to anyone,
 * and the two form completions are the only signals that someone got far
 * enough to hand over an address. Page views alone cannot tell you which of
 * those happened, which is what makes them worth naming here rather than
 * scattering string literals across call sites.
 *
 * Two properties per event, because that is the most the Pro plan records.
 */
function trackEvent(name: string, category: string, label: string): void {
  track(name, { category, label });
}

export const ANALYTICS = {
  demoOpened: (label: string) => trackEvent('demo_opened', 'proof', label),
  contactSubmitted: (serviceInterest?: string) =>
    trackEvent('contact_submitted', 'conversion', serviceInterest || 'unspecified'),
  toolReportRequested: (tool: string) => trackEvent('tool_report_requested', 'conversion', tool),
} as const;

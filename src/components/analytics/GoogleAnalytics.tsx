'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_UPDATED_EVENT, hasAnalyticsConsent } from '@/lib/cookieConsent';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [isAnalyticsAllowed, setIsAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setIsAnalyticsAllowed(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener(CONSENT_UPDATED_EVENT, syncConsent);

    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, syncConsent);
    };
  }, []);

  if (!gaId || !isAnalyticsAllowed) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper function for tracking events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (
    typeof window !== 'undefined' &&
    hasAnalyticsConsent() &&
    'gtag' in window
  ) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Helper function for tracking page views
export function trackPageView(url: string) {
  if (
    typeof window !== 'undefined' &&
    hasAnalyticsConsent() &&
    'gtag' in window
  ) {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('config', gaId, {
        page_path: url,
      });
    }
  }
}

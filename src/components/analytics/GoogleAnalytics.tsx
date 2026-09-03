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

// trackEvent and trackPageView moved to @/lib/analytics so call sites can
// measure without pulling next/script and the gtag loader into their bundle.
// Re-exported here for anything still importing from this path.
export { trackEvent, trackPageView } from '@/lib/analytics';

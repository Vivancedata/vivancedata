'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { keepEventWithConsent } from '@/lib/analytics';
import { CONSENT_UPDATED_EVENT, hasAnalyticsConsent } from '@/lib/cookieConsent';

/**
 * Vercel Web Analytics, behind the same consent as GoogleAnalytics: the script
 * is not injected until the visitor allows analytics cookies. Once injected it
 * cannot be unloaded, so beforeSend re-checks consent to cover a visitor who
 * withdraws it mid-session.
 */
export function VercelAnalytics() {
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

  if (!isAnalyticsAllowed) {
    return null;
  }

  return <Analytics beforeSend={keepEventWithConsent} />;
}

"use client";

import { Button } from "@/components/ui/button";
import { clearCookiePreferences } from "@/lib/cookieConsent";

/**
 * Forgets the stored cookie choice and reloads, so the consent banner asks
 * again. Withdrawing consent stops Google Analytics and Session Replay.
 */
export function CookieSettingsButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="not-prose"
      onClick={() => {
        clearCookiePreferences();
        window.location.reload();
      }}
    >
      Change cookie settings
    </Button>
  );
}

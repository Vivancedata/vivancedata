"use client";

import { useEffect } from "react";

/**
 * Asks the browser to confirm before the tab is closed or reloaded while a form
 * holds something the visitor typed and has not sent. Browsers show their own
 * generic prompt; the listener exists only while there is something to lose.
 */
export function useUnsavedChangesWarning(hasUnsavedChanges: boolean) {
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Chrome < 119 and Safari still need returnValue set.
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasUnsavedChanges]);
}

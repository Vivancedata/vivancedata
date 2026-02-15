"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/performance";

// Cookie consent preferences interface
interface CookiePreferences {
  essential: boolean; // Always true, required for site functionality
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

// localStorage key for storing consent
const CONSENT_STORAGE_KEY = "vivancedata-cookie-consent";

// Default preferences (only essential cookies enabled)
const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
};

// All cookies accepted preferences
const ALL_ACCEPTED_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    setReducedMotion(prefersReducedMotion());

    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!storedConsent) {
      // Show banner if no consent stored
      setIsVisible(true);
    } else {
      // Load stored preferences
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences(parsed);
      } catch {
        // Invalid stored data, show banner
        setIsVisible(true);
      }
    }
  }, []);

  // Save consent to localStorage
  const saveConsent = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setIsCustomizing(false);
  }, []);

  // Handle Accept All
  const handleAcceptAll = useCallback(() => {
    saveConsent(ALL_ACCEPTED_PREFERENCES);
  }, [saveConsent]);

  // Handle Reject Non-Essential
  const handleRejectNonEssential = useCallback(() => {
    saveConsent(DEFAULT_PREFERENCES);
  }, [saveConsent]);

  // Handle Save Custom Preferences
  const handleSaveCustom = useCallback(() => {
    saveConsent(preferences);
  }, [saveConsent, preferences]);

  // Toggle a specific cookie category
  const toggleCategory = useCallback((category: keyof CookiePreferences) => {
    if (category === "essential") return; // Cannot disable essential cookies
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  // Animation variants
  const bannerVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 300,
            damping: 30,
          },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: "easeInOut" as const,
          },
    },
  };

  const customizeVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            height: { duration: 0.3 },
            opacity: { duration: 0.2, delay: 0.1 },
          },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            height: { duration: 0.2, delay: 0.1 },
            opacity: { duration: 0.1 },
          },
    },
  };

  // Cookie category descriptions
  const cookieCategories = [
    {
      key: "essential" as const,
      label: "Essential Cookies",
      description: "Required for the website to function. Cannot be disabled.",
      disabled: true,
    },
    {
      key: "analytics" as const,
      label: "Analytics Cookies",
      description: "Help us understand how visitors interact with our website.",
      disabled: false,
    },
    {
      key: "functional" as const,
      label: "Functional Cookies",
      description: "Enable enhanced functionality and personalization.",
      disabled: false,
    },
    {
      key: "marketing" as const,
      label: "Marketing Cookies",
      description: "Used to deliver relevant advertisements and track campaigns.",
      disabled: false,
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="mx-auto max-w-4xl rounded-lg border border-border bg-background/95 backdrop-blur-sm shadow-lg dark:bg-background/90">
            {/* Main Banner Content */}
            <div className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                  <Cookie className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2
                      id="cookie-consent-title"
                      className="text-lg font-semibold text-foreground"
                    >
                      Cookie Preferences
                    </h2>
                    <button
                      onClick={() => setIsVisible(false)}
                      className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label="Close cookie consent banner"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p
                    id="cookie-consent-description"
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    We use cookies to enhance your browsing experience, analyze site traffic,
                    and personalize content. By clicking &quot;Accept All&quot;, you consent to our use
                    of cookies. You can manage your preferences or reject non-essential cookies.
                    Read our{" "}
                    <a
                      href="/privacy"
                      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      Privacy Policy
                    </a>{" "}
                    for more information.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      onClick={handleAcceptAll}
                      className="w-full sm:w-auto"
                      size="sm"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={handleRejectNonEssential}
                      variant="outline"
                      className="w-full sm:w-auto"
                      size="sm"
                    >
                      Reject Non-Essential
                    </Button>
                    <Button
                      onClick={() => setIsCustomizing(!isCustomizing)}
                      variant="ghost"
                      className="w-full sm:w-auto gap-1"
                      size="sm"
                    >
                      <Settings className="h-4 w-4" />
                      Customize
                      {isCustomizing ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <AnimatePresence>
              {isCustomizing && (
                <motion.div
                  variants={customizeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-4 py-4 md:px-6">
                    <div className="space-y-3">
                      {cookieCategories.map((category) => (
                        <div
                          key={category.key}
                          className={cn(
                            "flex items-center justify-between gap-4 rounded-md p-3",
                            "bg-muted/50 dark:bg-muted/30"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {category.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {category.description}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[category.key]}
                              onChange={() => toggleCategory(category.key)}
                              disabled={category.disabled}
                              className="sr-only peer"
                              aria-label={`Toggle ${category.label}`}
                            />
                            <div
                              className={cn(
                                "w-11 h-6 rounded-full peer",
                                "bg-muted-foreground/30 dark:bg-muted-foreground/20",
                                "peer-checked:bg-primary",
                                "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
                                "after:content-[''] after:absolute after:top-[2px] after:start-[2px]",
                                "after:bg-background after:rounded-full after:h-5 after:w-5",
                                "after:transition-all after:duration-200",
                                "peer-checked:after:translate-x-5",
                                category.disabled && "opacity-60 cursor-not-allowed"
                              )}
                            />
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Save Custom Preferences Button */}
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleSaveCustom}
                        size="sm"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Export a utility hook to check cookie consent status
export function useCookieConsent(): CookiePreferences | null {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  return consent;
}

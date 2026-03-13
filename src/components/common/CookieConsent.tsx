"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Cookie, X, Settings, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/performance";
import {
  ALL_ACCEPTED_COOKIE_PREFERENCES,
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  DEFAULT_COOKIE_PREFERENCES,
  parseCookiePreferences,
  readCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookieConsent";

const COOKIE_CATEGORIES = [
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

function createBannerVariants(reducedMotion: boolean) {
  return {
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
}

function createCustomizeVariants(reducedMotion: boolean) {
  return {
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
}

interface CookieCustomizationPanelProps {
  isCustomizing: boolean;
  preferences: CookiePreferences;
  toggleCategory: (category: keyof CookiePreferences) => void;
  onSaveCustom: () => void;
  reducedMotion: boolean;
}

function CookieCustomizationPanel({
  isCustomizing,
  preferences,
  toggleCategory,
  onSaveCustom,
  reducedMotion,
}: CookieCustomizationPanelProps) {
  const customizeVariants = createCustomizeVariants(reducedMotion);

  return (
    <AnimatePresence>
      {isCustomizing && (
        <m.div
          variants={customizeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="overflow-hidden"
        >
          <div className="border-t border-border px-3 py-3 sm:px-4">
            <div className="space-y-3">
              {COOKIE_CATEGORIES.map((category) => (
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

            <div className="mt-4 flex justify-end">
              <Button onClick={onSaveCustom} size="sm">
                Save Preferences
              </Button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

interface CookieConsentBannerProps {
  isCustomizing: boolean;
  preferences: CookiePreferences;
  reducedMotion: boolean;
  animateOnMount: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onToggleCustomize: () => void;
  onToggleCategory: (category: keyof CookiePreferences) => void;
  onSaveCustom: () => void;
}

function CookieConsentBanner({
  isCustomizing,
  preferences,
  reducedMotion,
  animateOnMount,
  onClose,
  onAcceptAll,
  onRejectNonEssential,
  onToggleCustomize,
  onToggleCategory,
  onSaveCustom,
}: CookieConsentBannerProps) {
  const bannerVariants = createBannerVariants(reducedMotion);

  return (
    <m.div
      variants={animateOnMount ? bannerVariants : undefined}
      initial={animateOnMount ? "hidden" : false}
      animate={animateOnMount ? "visible" : undefined}
      exit={animateOnMount ? "exit" : undefined}
      className="fixed inset-x-3 bottom-3 z-50 sm:left-6 sm:right-6 md:left-auto md:right-6 md:w-full md:max-w-xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="mx-auto rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-sm dark:bg-background/90 max-h-[80vh] overflow-y-auto overscroll-contain">
        <div className="p-3 sm:p-4">
          <div className="flex items-start gap-4">
            <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <Cookie className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2
                  id="cookie-consent-title"
                  className="text-base font-semibold text-foreground"
                >
                  Cookie Preferences
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Close cookie consent banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p
                id="cookie-consent-description"
                className="text-sm text-muted-foreground leading-relaxed"
              >
                We use cookies for site functionality, analytics, and personalization.
                You can accept all, reject non-essential cookies, or customize settings.
                Read our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                for more information.
              </p>

              <div className="pt-1 space-y-2">
                <Button onClick={onAcceptAll} className="w-full" size="sm">
                  Accept All
                </Button>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  <Button
                    onClick={onRejectNonEssential}
                    variant="ghost"
                    className="h-8 px-2 text-muted-foreground hover:text-foreground sm:h-9"
                    size="sm"
                  >
                    Reject Non-Essential
                  </Button>
                  <Button
                    onClick={onToggleCustomize}
                    variant="ghost"
                    className="h-8 px-2 gap-1 text-muted-foreground hover:text-foreground sm:h-9"
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
        </div>

        <CookieCustomizationPanel
          isCustomizing={isCustomizing}
          preferences={preferences}
          toggleCategory={onToggleCategory}
          onSaveCustom={onSaveCustom}
          reducedMotion={reducedMotion}
        />
      </div>
    </m.div>
  );
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFERENCES
  );
  const [reducedMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const storedConsent = parseCookiePreferences(
      localStorage.getItem(CONSENT_STORAGE_KEY)
    );
    if (!storedConsent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time initialization from persisted storage
      setIsVisible(true);
    } else {
      setPreferences(storedConsent);
    }
  }, []);

  const saveConsent = useCallback((prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(
      new CustomEvent(CONSENT_UPDATED_EVENT, {
        detail: prefs,
      })
    );
    setPreferences(prefs);
    setIsVisible(false);
    setIsCustomizing(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    saveConsent(ALL_ACCEPTED_COOKIE_PREFERENCES);
  }, [saveConsent]);

  const handleRejectNonEssential = useCallback(() => {
    saveConsent(DEFAULT_COOKIE_PREFERENCES);
  }, [saveConsent]);

  const handleSaveCustom = useCallback(() => {
    saveConsent(preferences);
  }, [saveConsent, preferences]);

  const toggleCategory = useCallback((category: keyof CookiePreferences) => {
    if (category === "essential") {
      return;
    }

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isVisible && (
          <CookieConsentBanner
            isCustomizing={isCustomizing}
            preferences={preferences}
            reducedMotion={reducedMotion}
            animateOnMount={false}
            onClose={() => setIsVisible(false)}
            onAcceptAll={handleAcceptAll}
            onRejectNonEssential={handleRejectNonEssential}
            onToggleCustomize={() => setIsCustomizing((prev) => !prev)}
            onToggleCategory={toggleCategory}
            onSaveCustom={handleSaveCustom}
          />
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

export function useCookieConsent(): CookiePreferences | null {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const syncFromStorage = () => {
      setConsent(readCookiePreferences());
    };

    syncFromStorage();
    window.addEventListener(CONSENT_UPDATED_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, syncFromStorage);
    };
  }, []);

  return consent;
}

// Named `instrumentation-client.ts` because that is the entry point Next loads
// natively for browser instrumentation.
//
// Only `import type` from "@sentry/nextjs" at the top level: a value import
// here puts the whole browser SDK (~80 KB gz, plus ~40 KB gz of Replay once
// anything touches `getReplay`) in the initial script graph of every route,
// where it was the largest block of main-thread work on Lighthouse mobile. The
// SDK is loaded once the page is idle instead. Errors thrown before then are
// not reported; pageload timing and web vitals still are, because the SDK reads
// them from buffered performance entries.
import type * as SentryNamespace from "@sentry/nextjs";
import { dataCollection } from "./sentry.data-collection";
import { CONSENT_UPDATED_EVENT, hasAnalyticsConsent } from "./src/lib/cookieConsent";

type ReplayIntegration = ReturnType<typeof SentryNamespace.replayIntegration>;

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const enabled = process.env.NODE_ENV === "production" && Boolean(dsn);

let sdk: Pick<typeof SentryNamespace, "captureRouterTransitionStart" | "getClient"> | null = null;

// Lets the SDK instrument App Router navigations as transactions.
export function onRouterTransitionStart(
  ...args: Parameters<typeof SentryNamespace.captureRouterTransitionStart>
) {
  sdk?.captureRouterTransitionStart(...args);
}

function loadSentry() {
  // `webpackExports` narrows the import to what is used, which keeps Replay
  // (rrweb) out of this chunk; it is fetched separately, and only with consent.
  import(
    /* webpackExports: ["init", "captureRouterTransitionStart", "getClient"] */ "@sentry/nextjs"
  )
    .then((Sentry) => {
      Sentry.init({
        dsn,

        dataCollection,

        // Adjust this value in production, or use tracesSampler for greater control
        tracesSampleRate: 1.0,

        debug: false,

        enabled,

        replaysOnErrorSampleRate: 1.0,

        // This sets the sample rate to be 10%. You may want this to be 100% while
        // in development and sample at a lower rate in production
        replaysSessionSampleRate: 0.1,

        // Session Replay is added by `syncReplayWithConsent`, only once the
        // visitor has allowed analytics cookies. /privacy-policy describes this.
      });
      sdk = Sentry;
      syncReplayWithConsent();
      window.addEventListener(CONSENT_UPDATED_EVENT, syncReplayWithConsent);
    })
    .catch(() => {
      // A failed chunk load (offline, blocked) must never break the page.
    });
}

/**
 * `addIntegration` after `init` is the SDK's supported path for late
 * integrations; the sample rates above still govern what gets recorded.
 * Deliberately a same-origin chunk rather than `Sentry.lazyLoadIntegration`,
 * which injects a script from browser.sentry-cdn.com: that origin is on
 * ad-blocker lists and would be a new third party on every page.
 */
let replayRequested = false;

function loadReplay() {
  if (replayRequested) return;
  replayRequested = true;
  import(/* webpackExports: ["replayIntegration"] */ "@sentry/nextjs")
    .then(({ replayIntegration }) => {
      // Consent can be withdrawn while the chunk is loading.
      if (!hasAnalyticsConsent()) return;
      sdk?.getClient()?.addIntegration(
        replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        })
      );
    })
    .catch(() => {
      // Losing replay must never break the page; errors still report without it.
    });
}

/**
 * Replay records only with analytics consent (the cookie banner). Consent
 * given later in the visit loads it then; consent withdrawn stops it, and it
 * stays stopped for the rest of that page view. Errors are still reported
 * without replay either way.
 */
function syncReplayWithConsent() {
  if (hasAnalyticsConsent()) {
    loadReplay();
  } else {
    void sdk?.getClient()?.getIntegrationByName<ReplayIntegration>("Replay")?.stop();
  }
}

if (enabled && typeof window !== "undefined") {
  if (typeof window.requestIdleCallback === "function") {
    // The timeout keeps monitoring from being postponed indefinitely on a page
    // that never goes idle.
    window.requestIdleCallback(loadSentry, { timeout: 3000 });
  } else {
    window.setTimeout(loadSentry, 1000);
  }
}

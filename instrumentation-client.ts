// Named `instrumentation-client.ts` because that is the entry point Next loads
// natively for browser instrumentation; the old `sentry.client.config.ts` was
// never reaching the bundle, so production shipped no browser SDK. Options are
// unchanged.
import type * as SentryNamespace from "@sentry/nextjs";
import { dataCollection } from "./sentry.data-collection";
import { CONSENT_UPDATED_EVENT, hasAnalyticsConsent } from "./src/lib/cookieConsent";

type SentryModule = typeof SentryNamespace;

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const enabled = process.env.NODE_ENV === "production" && Boolean(dsn);

/**
 * The browser SDK is ~157 KB (error instrumentation plus tracing) and none of
 * it is needed to paint the page. Imported statically here it sat in the
 * initial script graph of every route, and its evaluation alone cost ~490 ms
 * of main-thread time on the Lighthouse mobile lane, ahead of the hero
 * paragraph's paint. So the SDK is fetched as its own async chunk once the
 * main thread is idle (2 s at the latest) and initialised then.
 *
 * Errors thrown before it is ready are not lost: plain listeners buffer them
 * and hand them to `captureException` the moment the SDK is up. What starts
 * late is only the SDK's own page-load tracing and any navigation that begins
 * before it has loaded, which is acceptable for a marketing site.
 *
 * It is a same-origin chunk, not `Sentry.lazyLoadIntegration`, for the reason
 * given at `loadReplay` below: reporting goes through `tunnelRoute:
 * "/monitoring"` so ad-blockers cannot cut it off.
 */
const bufferedErrors: unknown[] = [];
const onEarlyError = (event: ErrorEvent) => {
  bufferedErrors.push(event.error ?? event.message);
};
const onEarlyRejection = (event: PromiseRejectionEvent) => {
  bufferedErrors.push(event.reason);
};

let sentryReady: Promise<SentryModule> | null = null;

function initSentry(): Promise<SentryModule> {
  return import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn,

      dataCollection,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1.0,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      // Only enable in production
      enabled,

      replaysOnErrorSampleRate: 1.0,

      // This sets the sample rate to be 10%. You may want this to be 100% while
      // in development and sample at a lower rate in production
      replaysSessionSampleRate: 0.1,

      // Session Replay is registered below, after the page has painted and only
      // once the visitor has allowed analytics cookies. Listing it here would put
      // its ~40 KB gz / ~125 KB parsed (rrweb) chunk in the initial script graph of
      // every route, which Lighthouse mobile counted as the last remaining
      // deduction after the hero work in #132. /privacy-policy describes this.
    });

    window.removeEventListener("error", onEarlyError);
    window.removeEventListener("unhandledrejection", onEarlyRejection);
    for (const error of bufferedErrors.splice(0)) Sentry.captureException(error);
    return Sentry;
  });
}

function scheduleSentry() {
  const start = () => {
    sentryReady ??= initSentry();
    sentryReady.then(syncReplayWithConsent).catch(() => {
      // Losing monitoring must never break the page.
    });
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(start, { timeout: 2000 });
  } else {
    window.setTimeout(start, 1000);
  }
}

// Lets the SDK instrument App Router navigations as transactions.
export const onRouterTransitionStart: SentryModule["captureRouterTransitionStart"] = (...args) => {
  void sentryReady?.then((Sentry) => Sentry.captureRouterTransitionStart(...args));
};

/**
 * Replay recording is not needed to paint the page, so it is added once the
 * SDK itself is up. `webpackExports` narrows the dynamic import to the one
 * export we use, which lets webpack emit the replay module as its own async
 * chunk instead of pulling the whole SDK namespace into it.
 *
 * Deliberately a same-origin chunk rather than `Sentry.lazyLoadIntegration`,
 * which injects `https://browser.sentry-cdn.com/...` at runtime: the site
 * routes Sentry through `tunnelRoute: "/monitoring"` precisely so ad-blockers
 * cannot cut monitoring off, and a script from sentry-cdn.com is on the same
 * blocklists. It would also be a new third-party origin on every page.
 *
 * `addIntegration` after `init` is the SDK's supported path for late
 * integrations; the sample rates above still govern what gets recorded.
 */
function loadReplay() {
  import(/* webpackExports: ["replayIntegration"] */ "@sentry/nextjs")
    .then(({ replayIntegration }) => {
      // Consent can be withdrawn while the chunk is loading.
      if (!hasAnalyticsConsent()) return;
      sentryReady?.then((Sentry) =>
        Sentry.getClient()?.addIntegration(
          replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
          })
        )
      );
    })
    .catch(() => {
      // Losing replay must never break the page; errors still report without it.
    });
}

let replayRequested = false;

/**
 * Replay records only with analytics consent (the cookie banner). Consent
 * given later in the visit loads it then; consent withdrawn stops it, and it
 * stays stopped for the rest of that page view. Errors are still reported
 * without replay either way. Nothing happens until the SDK is up.
 */
function syncReplayWithConsent() {
  if (!sentryReady) return;
  void sentryReady.then((Sentry) => {
    if (hasAnalyticsConsent()) {
      if (replayRequested) return;
      replayRequested = true;
      loadReplay();
    } else {
      void Sentry.getReplay()?.stop();
    }
  });
}

if (enabled && typeof window !== "undefined") {
  window.addEventListener("error", onEarlyError);
  window.addEventListener("unhandledrejection", onEarlyRejection);
  window.addEventListener(CONSENT_UPDATED_EVENT, syncReplayWithConsent);
  scheduleSentry();
}

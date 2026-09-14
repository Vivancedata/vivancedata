// Named `instrumentation-client.ts` because that is the entry point Next loads
// natively for browser instrumentation; the old `sentry.client.config.ts` was
// never reaching the bundle, so production shipped no browser SDK. Options are
// unchanged.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const enabled = process.env.NODE_ENV === "production" && Boolean(dsn);

Sentry.init({
  dsn,

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

  // Session Replay is registered below, after the page has painted. Listing it
  // here would put its ~40 KB gz / ~125 KB parsed (rrweb) chunk in the initial
  // script graph of every route, which Lighthouse mobile counted as the last
  // remaining deduction after the hero work in #132.
});

// Lets the SDK instrument App Router navigations as transactions.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

/**
 * Replay recording is not needed to paint the page, so it is fetched once the
 * main thread is idle. `webpackExports` narrows the dynamic import to the one
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
      Sentry.getClient()?.addIntegration(
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

if (enabled && typeof window !== "undefined") {
  if (typeof window.requestIdleCallback === "function") {
    // The timeout keeps replay from being postponed indefinitely on a page
    // that never goes idle; 2 s is well past LCP on the throttled mobile lane.
    window.requestIdleCallback(loadReplay, { timeout: 2000 });
  } else {
    window.setTimeout(loadReplay, 1000);
  }
}

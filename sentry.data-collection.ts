import type * as Sentry from "@sentry/nextjs";

/**
 * SDK v11 collects user info, cookies, request/response bodies, DB query data
 * and more by default. v10 sent none of that unless `sendDefaultPii` was set,
 * and this project never set it -- keep the v10 behaviour until that is a
 * deliberate decision. Headers and query params are still collected with
 * sensitive values filtered, as before.
 */
export const dataCollection: NonNullable<Parameters<typeof Sentry.init>[0]>["dataCollection"] = {
  userInfo: false,
  cookies: false,
  httpBodies: [],
  databaseQueryData: false,
  queues: false,
  genAI: { inputs: false, outputs: false },
  stackFrameVariables: false,
};

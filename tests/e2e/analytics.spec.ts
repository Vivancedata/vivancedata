import { test, expect } from "@playwright/test";

/**
 * The three measured actions are the site's only way to learn who engages, so
 * they are worth an end-to-end check: unit tests prove the helper fires, but
 * not that a real click on a real page reaches it through consent gating and
 * the lazy analytics boundary.
 *
 * The demos point at external subdomains. Aborting that request is not enough
 * -- a navigation still commits, the init script re-runs and the recorder is
 * reset, which makes the negative case pass for the wrong reason. The click's
 * default is cancelled instead, so the page never moves.
 */

const CONSENT_KEY = "vivancedata-cookie-consent";

async function recordEvents(page: import("@playwright/test").Page, analytics: boolean) {
  await page.addInitScript(
    ({ key, analyticsAllowed }) => {
      // Install the recorder before touching storage: on the initial
      // about:blank origin localStorage can throw, which would abort the
      // whole init script and leave nothing to assert on.
      (window as unknown as { __events: unknown[] }).__events = [];
      (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = (...args: unknown[]) => {
        (window as unknown as { __events: unknown[] }).__events.push(args);
      };
      window.addEventListener(
        "click",
        (event) => {
          const anchor = (event.target as HTMLElement | null)?.closest?.("a");
          if (anchor && anchor.getAttribute("href")?.startsWith("http")) {
            event.preventDefault();
          }
        },
        true
      );
      try {
        window.localStorage.setItem(
          key,
          JSON.stringify({
            essential: true,
            analytics: analyticsAllowed,
            marketing: analyticsAllowed,
            functional: analyticsAllowed,
          })
        );
      } catch {
        /* unavailable on about:blank; the real origin re-runs this */
      }
    },
    { key: CONSENT_KEY, analyticsAllowed: analytics }
  );
}

const eventsOn = (page: import("@playwright/test").Page) =>
  page.evaluate(() => (window as unknown as { __events: unknown[][] }).__events);

test("opening a demo records the event", async ({ page }) => {
  await recordEvents(page, true);
  await page.goto("/");

  const demo = page.getByRole("link", { name: /sample/i }).first();
  await expect(demo).toBeVisible();
  await demo.click();

  const opened = (await eventsOn(page)).filter((e) => e[1] === "demo_opened");
  expect(opened).toHaveLength(1);
  expect(opened[0][2]).toMatchObject({ event_category: "proof" });
});

test("a demo open records nothing when analytics consent is refused", async ({ page }) => {
  await recordEvents(page, false);
  await page.goto("/");

  const demo = page.getByRole("link", { name: /sample/i }).first();
  await expect(demo).toBeVisible();
  await demo.click();

  // The page must not have moved, or this would pass without proving anything.
  await expect(demo).toBeVisible();
  expect(await eventsOn(page)).toHaveLength(0);
});

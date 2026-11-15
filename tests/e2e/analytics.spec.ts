import { test, expect } from "@playwright/test";

/**
 * The three measured actions are the site's only way to learn who engages, so
 * they are worth an end-to-end check: unit tests prove the helper fires, but
 * not that a real click on a real page reaches Vercel Web Analytics.
 *
 * `window.va` is replaced with a recorder before the page loads. The
 * <Analytics /> component keeps an existing `window.va`, and outside Vercel its
 * script is never served, so the recorder sees every call.
 *
 * The demos point at external subdomains. Aborting that request is not enough
 * -- a navigation still commits, the init script re-runs and the recorder is
 * reset. The click's default is cancelled instead, so the page never moves.
 */

async function recordEvents(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    (window as unknown as { __events: unknown[] }).__events = [];
    (window as unknown as { va: (...a: unknown[]) => void }).va = (...args: unknown[]) => {
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
  });
}

type VaCall = [string, { name?: string; data?: Record<string, unknown> }];

const eventsOn = (page: import("@playwright/test").Page) =>
  page.evaluate(() => (window as unknown as { __events: unknown[][] }).__events) as Promise<VaCall[]>;

test("opening a demo records the event", async ({ page }) => {
  await recordEvents(page);
  await page.goto("/");

  const demo = page.getByRole("link", { name: /sample/i }).first();
  await expect(demo).toBeVisible();
  await demo.click();

  const opened = (await eventsOn(page)).filter((e) => e[0] === "event" && e[1].name === "demo_opened");
  expect(opened).toHaveLength(1);
  expect(opened[0][1].data).toMatchObject({ category: "proof" });
});

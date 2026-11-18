import { expect, test } from "@playwright/test";

/**
 * The scroll motion in `SheetMotion`: a heading below the fold waits 12px low
 * and rises into place when it arrives.
 *
 * The first assertion that matters is the opacity one. The reveals this
 * replaced waited at opacity 0, which is how every industry page once shipped
 * blank; this one must never hide what it is about to move.
 */

const WAITING = "matrix(1, 0, 0, 1, 0, 12)";
const transformOf = (el: Element): string => getComputedStyle(el).transform;

test("a heading below the fold waits in view of nobody, then registers", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const heading = page.locator("main h2").last();

  await expect.poll(() => heading.evaluate(transformOf)).toBe(WAITING);
  expect(await heading.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");

  await heading.scrollIntoViewIfNeeded();
  await expect.poll(() => heading.evaluate(transformOf)).toBe("none");
});

test("with reduced motion nothing is moved", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  const moved = await page
    .locator("main h2")
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).transform !== "none").length);
  expect(moved).toBe(0);
});

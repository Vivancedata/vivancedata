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

test("rows of a ruled list wait low at full opacity, then register", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const row = page.locator("main ol[data-rows] > li").last();

  await expect.poll(() => row.evaluate(transformOf)).toBe(WAITING);
  expect(await row.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");

  await row.scrollIntoViewIfNeeded();
  await expect.poll(() => row.evaluate(transformOf)).toBe("none");
});

test("the dot matrix is scanned on screen and lit under a mouse", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "load" });
  const field = page.locator(".dot-field").first();

  await expect(field).toHaveAttribute("data-live", "");
  expect(
    await field.locator(".dot-scan").evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("dot-scan");

  await page.mouse.move(900, 300);
  await expect(field).toHaveAttribute("data-lit", "");
  expect(await field.evaluate((el) => el.style.getPropertyValue("--mx"))).toMatch(/px$/);
});

test("a phone gets a scanned band of the matrix, and no sideways scroll from it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "load" });
  const band = page.locator(".dot-field:visible");

  await expect(band).toHaveCount(1);
  await band.scrollIntoViewIfNeeded();
  await expect(band).toHaveAttribute("data-live", "");
  expect(
    await band.locator(".dot-scan").evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("dot-scan");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  ).toBe(0);
});

test("with reduced motion the matrix is still and a record is not swept", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/", { waitUntil: "load" });

  expect(
    await page.locator(".dot-scan").first().evaluate((el) => getComputedStyle(el).animationName)
  ).toBe("none");
  expect(
    await page.locator(".read").first().evaluate((el) => getComputedStyle(el, "::after").content)
  ).toBe("none");
});

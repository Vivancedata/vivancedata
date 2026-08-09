import { expect, test } from "@playwright/test";

/**
 * Guards the failure mode that shipped every industry page with invisible body
 * content for months.
 *
 * framer-motion's `m.*` components only animate once LazyMotion has supplied
 * the feature bundle. MotionProvider existed but was never rendered, so every
 * AnimateOnScroll element stayed pinned at its `hidden` variant -- opacity 0.
 *
 * Every existing test passed throughout, because the DOM and the text content
 * were always correct. Only a human or a screenshot could see the blank page.
 * Asserting on text is therefore not enough: these tests assert that the text
 * is actually *rendered*, by checking computed opacity up the ancestor chain.
 */

const ROUTES = [
  "/",
  "/industries/manufacturing",
  "/industries/construction",
  "/industries/hvac-trades",
  "/industries/logistics",
  "/services",
  "/about",
  // Routes converted in the token migration -- the surfaces most at risk of
  // an invisible-text regression (light text left on a now-light panel).
  "/methodology",
  "/innovation-hub",
  "/case-studies",
  "/resources",
  "/tools/use-cases",
  "/responsible-ai",
];

test.describe("pages render visible content", () => {
  for (const route of ROUTES) {
    test(`${route} has visible body content`, async ({ page }) => {
      await page.goto(route, { waitUntil: "load" });
      // Reveal animations are driven by an intersection observer; give them a
      // beat to run before judging visibility.
      await page.waitForTimeout(1500);

      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();

      // toBeVisible() does not catch an ancestor at opacity 0 -- the element is
      // laid out and non-hidden, it simply cannot be seen. Walk the chain.
      const hiddenByOpacity = await heading.evaluate((el) => {
        let node: HTMLElement | null = el as HTMLElement;
        while (node && node !== document.body) {
          if (Number(getComputedStyle(node).opacity) === 0) {
            return {
              tag: node.tagName,
              className: String(node.className).slice(0, 80),
            };
          }
          node = node.parentElement;
        }
        return null;
      });

      expect(
        hiddenByOpacity,
        `Heading on ${route} is inside an ancestor with opacity 0 -- the page ` +
          `renders blank even though its text is present. This is what the ` +
          `missing LazyMotion provider caused.`
      ).toBeNull();

      // A page whose reveal animations never fire still has text in the DOM,
      // so also assert a meaningful amount of it is present.
      const textLength = await page.evaluate(
        () => document.body.innerText.trim().length
      );
      expect(textLength).toBeGreaterThan(500);
    });
  }
});

import { test, expect } from "@playwright/test";
import { CONSENT_STORAGE_KEY, DEFAULT_COOKIE_PREFERENCES } from "@/lib/cookieConsent";

// The buyer is an operator on a phone between jobs. This is the one case that
// submits the contact form at a phone viewport and follows it through the real
// /api/contact route to the "it is in my inbox" state. The validation specs
// only prove the form refuses bad input; nothing proved a good one gets through.
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("an operator on a 390px phone can send the contact form", async ({ page }) => {
  // A visitor who has already answered the consent banner. Unanswered, it opens
  // on the first pointerdown and covers the lower half of a 390px screen, and
  // when that happens is not something an emulated tap reproduces reliably.
  await page.addInitScript(
    ([key, value]) => localStorage.setItem(key, value),
    [CONSENT_STORAGE_KEY, JSON.stringify(DEFAULT_COOKIE_PREFERENCES)] as const
  );
  await page.goto("/contact");

  const form = page.getByRole("form", { name: "Contact form" });
  await expect(form).toBeVisible();

  await form.locator('input[name="firstName"]').fill("Dana");
  await form.locator('input[name="lastName"]').fill("Ruiz");
  await form.locator('input[name="email"]').fill("dana@ruizheating.com");
  await form.locator('input[name="phone"]').fill("555-0142");
  await form.locator('input[name="company"]').fill("Ruiz Heating");
  await form.locator('textarea[name="message"]').fill(
    "We miss calls while the crew is on a roof. Can you look at how leads reach us?"
  );

  // Nothing on the page may push the layout wider than the phone.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);

  const submitted = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/contact") && response.request().method() === "POST"
  );
  await form.getByRole("button", { name: /send|submit|book/i }).first().tap();

  const response = await submitted;
  expect(response.status()).toBe(200);
  expect(response.request().postDataJSON()).toMatchObject({
    firstName: "Dana",
    lastName: "Ruiz",
    email: "dana@ruizheating.com",
    phone: "555-0142",
    company: "Ruiz Heating",
  });

  await expect(page.getByRole("heading", { name: "Message received." })).toBeVisible();
});

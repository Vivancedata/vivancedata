import { test, expect } from "@playwright/test";

// The ROI figures and the readiness score are the site's most consequential
// arithmetic, and both models now live in src/lib. These cases prove the tool
// modules are still wired to them -- unit tests on the models cannot.

test("the ROI calculator produces figures from the model", async ({ page }) => {
  await page.goto("/tools/roi-calculator");

  await page.getByRole("button", { name: /calculate/i }).click();

  // Any rendered currency figure means inputs reached calculateROI and the
  // results panel rendered what came back.
  await expect(page.getByText(/\$[\d,]{4,}/).first()).toBeVisible();
});

test("the readiness quiz scores an answered assessment", async ({ page }) => {
  await page.goto("/tools/ai-readiness");

  for (let step = 0; step < 16; step += 1) {
    // Click the label, as a visitor does -- the radio itself is a Radix item.
    await page.locator("label").last().click();
    const advance = page.getByRole("button", {
      name: step === 15 ? "View your results" : "Go to next question",
    });
    await expect(advance).toBeEnabled();
    await advance.click();
  }

  await expect(page.getByText(/100% - Excellent/)).toBeVisible();
});

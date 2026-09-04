import { test, expect } from "@playwright/test";

/**
 * zod 4 replaced `required_error` with a unified `error`, and the resolver
 * crossed a major at the same time. Whether a validation message still reaches
 * the visitor is an integration of zod, @hookform/resolvers and react-hook-form
 * that no unit test in this repo covers.
 */
test("the contact form still surfaces validation messages", async ({ page }) => {
  await page.goto("/contact");

  const form = page.locator("form").first();
  await expect(form).toBeVisible();

  // Submitting empty must be refused in the browser, with reasons shown.
  await form.getByRole("button", { name: /send|submit|book/i }).first().click();

  await expect(page.getByText(/must be at least 2 characters/i).first()).toBeVisible();
  await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible();
});

test("the contact form rejects a malformed address with its own message", async ({ page }) => {
  await page.goto("/contact");

  const form = page.locator("form").first();
  await form.locator('input[name="email"]').fill("not-an-email");
  await form.getByRole("button", { name: /send|submit|book/i }).first().click();

  await expect(page.getByText(/invalid email address/i).first()).toBeVisible();
});

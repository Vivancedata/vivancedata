import { expect, test, type Page } from "@playwright/test";

const CRITICAL_ROUTES = ["/", "/blog"] as const;
const COVERAGE_THRESHOLD = 85;
const visitedRoutes = new Set<string>();

test.describe.configure({ mode: "serial" });

async function visitCriticalRoute(
  page: Page,
  route: (typeof CRITICAL_ROUTES)[number]
) {
  visitedRoutes.add(route);
  await page.goto(route);
}

test("homepage renders", async ({ page }) => {
  await visitCriticalRoute(page, "/");
  await expect(page).toHaveTitle(/VivanceData/i);
});

test("blog index renders", async ({ page }) => {
  await visitCriticalRoute(page, "/blog");
  await expect(page.getByRole("heading", { name: /AI Insights Blog/i })).toBeVisible();
});

test.afterAll(() => {
  const coverage = (visitedRoutes.size / CRITICAL_ROUTES.length) * 100;
  expect(
    coverage,
    `Critical route coverage is ${coverage.toFixed(2)}%, expected at least ${COVERAGE_THRESHOLD}%`
  ).toBeGreaterThanOrEqual(COVERAGE_THRESHOLD);
});

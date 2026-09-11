import { expect, test, type Page } from "@playwright/test";

const CRITICAL_ROUTES = [
  { path: "/", name: "homepage" },
  { path: "/contact", name: "contact page" },
  { path: "/blog", name: "blog index" },
  { path: "/tools/missed-calls", name: "missed-call cost tool" },
  { path: "/tools/roi-calculator", name: "ROI calculator tool" },
  { path: "/tools/ai-readiness", name: "AI readiness tool" },
  { path: "/tools/use-cases", name: "use cases tool" },
  { path: "/partners", name: "partners page" },
  { path: "/privacy-policy", name: "privacy policy page" },
  { path: "/terms-of-service", name: "terms of service page" },
] as const;
const COVERAGE_THRESHOLD = 85;
const visitedRoutes = new Set<string>();

test.describe.configure({ mode: "serial" });

async function visitCriticalRoute(
  page: Page,
  route: (typeof CRITICAL_ROUTES)[number]["path"]
) {
  visitedRoutes.add(route);
  const response = await page.goto(route);
  expect(response?.ok(), `Expected ${route} to return HTTP 2xx/3xx`).toBeTruthy();
}

test("homepage renders", async ({ page }) => {
  await visitCriticalRoute(page, "/");
  await expect(page).toHaveTitle(/VivanceData/i);
});

test("blog index renders", async ({ page }) => {
  await visitCriticalRoute(page, "/blog");
  // The page is titled "Notes from the work". It was "AI Insights Blog", with
  // "Notes from the work" sitting above it as a kicker -- the kicker was the
  // better line, so removing the kicker promoted it rather than losing it.
  await expect(page).toHaveTitle(/Notes from the work/i);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Notes from the work/i);
});

test("critical routes are reachable", async ({ page }) => {
  for (const route of CRITICAL_ROUTES) {
    if (route.path === "/" || route.path === "/blog") {
      continue;
    }
    await visitCriticalRoute(page, route.path);
  }
});

test.afterAll(() => {
  const coverage = (visitedRoutes.size / CRITICAL_ROUTES.length) * 100;
  expect(
    coverage,
    `Critical route coverage is ${coverage.toFixed(2)}%, expected at least ${COVERAGE_THRESHOLD}%`
  ).toBeGreaterThanOrEqual(COVERAGE_THRESHOLD);
});

import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4317";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // `npx next` resolves through node_modules/.bin, which works both
        // standalone (next in this project) and inside the npm workspace
        // (next hoisted to the root). The previous hardcoded
        // ./node_modules/next/... path broke under hoisting.
        command:
          "npm run build && npx next start --hostname 127.0.0.1 --port 4317",
        url: baseURL,
        reuseExistingServer: false,
        timeout: 240000,
      },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

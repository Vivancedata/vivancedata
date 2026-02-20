import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: "coverage/unit",
      include: [
        "src/lib/api.ts",
        "src/lib/cookieConsent.ts",
        "src/lib/formatDate.ts",
        "src/lib/performance.ts",
        "src/lib/utils.ts",
        "src/lib/validation.ts",
      ],
      exclude: ["**/*.d.ts"],
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
    },
  },
});

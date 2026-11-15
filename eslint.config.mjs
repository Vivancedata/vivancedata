import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/",
      "coverage/",
      "playwright-report/",
      ".remember/",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
    ],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "@next/next": nextPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Downgrade errors to warnings for CI compatibility
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-require-imports": "off",
      // Disable overly strict rules for existing codebase
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/error-boundaries": "warn",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportNamedDeclaration[source.value='@vivancedata/ui'], ExportAllDeclaration[source.value='@vivancedata/ui']",
          message:
            "Do not re-export from the @vivancedata/ui barrel: optimizePackageImports only rewrites `import` declarations, so a re-export in a server module makes Next register every client component in the package for that route (~100 KB gz). Write `import { X } from \"@vivancedata/ui\"` and then `export { X }`.",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // The vivance-ui-boundary check requires these files to be bare re-exports,
    // so the client boundary is what keeps the barrel walk out of server routes.
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Program:not(:has(> ExpressionStatement[directive='use client']))",
          message:
            "Start this file with \"use client\". It re-exports from the @vivancedata/ui barrel, and imported from a server component without the directive it makes Next register every client component in the package for that route (~100 KB gz).",
        },
      ],
    },
  },
];

import type { Config } from "tailwindcss";
import vivanceTailwindPreset from "@vivancedata/ui/tailwind";

// Loaded by Tailwind v4 through `@config` in src/app/globals.css.
//
// Excluded from `tsc` (tsconfig.json): the shared preset ships as TypeScript
// source typed against Tailwind v3's `Config`, and importing it here would
// type-check it against v4's, which rejects its `darkMode: ["class"]` tuple.
// v4 still accepts that value at runtime.

const config: Config = {
  presets: [vivanceTailwindPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../ui/src/**/*.{ts,tsx}",
    "./node_modules/@vivancedata/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;

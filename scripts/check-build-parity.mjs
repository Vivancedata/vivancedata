#!/usr/bin/env node
/**
 * Fails if CI and Vercel could build this repo differently.
 *
 * Three files can each claim to define the build, and they outrank each other
 * in a way that is invisible from any single one of them: `vercel.json` beats
 * the Vercel dashboard, and both bypass `package.json` unless `vercel.json`
 * delegates back to it.
 *
 * That is how production shipped Turbopack builds for months while CI proved
 * webpack ones. `vercel.json` carried `NEXT_DISABLE_TURBOPACK=1 next build` --
 * an env var Next no longer honours -- instead of the `--webpack` flag that
 * lives in the package.json script. Both commands exit 0. Nothing compared them.
 *
 * The rule this enforces is simply that vercel.json must delegate rather than
 * restate: one build command, defined once, exercised by CI.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) =>
  JSON.parse(readFileSync(join(repoRoot, name), "utf8"));

// Vercel must run the same npm scripts CI runs, not its own spelling of them.
const REQUIRED = {
  buildCommand: "npm run build",
  installCommand: "npm ci",
};

const failures = [];
const vercelConfig = read("vercel.json");

for (const [key, expected] of Object.entries(REQUIRED)) {
  const actual = vercelConfig[key];
  if (actual !== expected) {
    failures.push(
      `vercel.json ${key} is ${JSON.stringify(actual)}, expected ` +
        `${JSON.stringify(expected)}. Vercel would not run what CI proves.`
    );
  }
}

// The bundler opt-out has to live in the package.json script, because that is
// the one command both CI and Vercel reach. A build that silently falls back to
// Turbopack is the original defect.
const buildScript = read("package.json").scripts?.build ?? "";
if (!buildScript.includes("--webpack")) {
  failures.push(
    `package.json build script lost its --webpack flag (${JSON.stringify(buildScript)}). ` +
      `Next would build with Turbopack, which no test covers. Note that ` +
      `NEXT_DISABLE_TURBOPACK is not an accepted substitute -- Next ignores it.`
  );
}

// A second lockfile lets Vercel's package-manager detection disagree with CI.
for (const stray of ["bun.lockb", "bun.lock", "yarn.lock", "pnpm-lock.yaml"]) {
  try {
    readFileSync(join(repoRoot, stray));
    failures.push(
      `${stray} exists alongside package-lock.json. Vercel picks its package ` +
        `manager by lockfile, so this can silently diverge from CI's npm ci.`
    );
  } catch {
    // Absent is the expected case.
  }
}

if (failures.length > 0) {
  console.error("Build parity check failed:\n");
  for (const failure of failures) console.error(`  - ${failure}\n`);
  process.exit(1);
}

console.log("Build parity OK: Vercel and CI run the same install and build.");

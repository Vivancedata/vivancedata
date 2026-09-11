#!/usr/bin/env node
/**
 * JSX string attributes do not process JavaScript escape sequences.
 *
 * `description="a — b"` renders the literal seven characters `—`,
 * where `description={"a — b"}` and `description: "a — b"` both
 * render an em-dash. The three look nearly identical in review and the
 * failure is invisible until someone loads the page.
 *
 * This shipped: `/blog` served `real crews — including the parts that do
 * not work.` in its subtitle, at 18px, on a site whose argument is that it
 * flags what it cannot read instead of guessing.
 *
 * The check therefore looks for an escape inside a *double-quoted attribute
 * value* (`name="..."`) and deliberately ignores object properties
 * (`name: "..."`, `"name": "..."`), where the escape is processed and correct.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const EXTENSIONS = [".tsx", ".ts", ".mdx"];

/** An escape sequence inside a JSX attribute value, not an object property. */
const OFFENDING = /[a-zA-Z]="[^"]*\\u[0-9a-fA-F]{4}/;

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return walk(path);
    return EXTENSIONS.some((ext) => path.endsWith(ext)) ? [path] : [];
  });
}

const findings = [];
for (const path of walk(SRC)) {
  readFileSync(path, "utf8")
    .split("\n")
    .forEach((line, index) => {
      if (OFFENDING.test(line)) {
        findings.push({ file: relative(ROOT, path), line: index + 1, text: line.trim() });
      }
    });
}

if (findings.length > 0) {
  console.error(
    `Found ${findings.length} JavaScript escape sequence(s) inside JSX attributes.\n` +
      `These render literally. Use the character itself, or move the string into braces.\n`,
  );
  for (const { file, line, text } of findings) {
    console.error(`  ${file}:${line}\n    ${text.slice(0, 120)}`);
  }
  process.exit(1);
}

console.log("No JavaScript escape sequences in JSX attributes.");

import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Metadata is inherited down the route tree, so a `canonical` in the root
 * layout is a canonical on every page that does not set its own. The root once
 * declared `canonical: "/"`, which told search engines that every page on the
 * site was a duplicate of the homepage.
 *
 * The same inheritance applied the root's `"%s | Vivancedata"` title template
 * to page titles that already ended in "- Vivancedata".
 *
 * This reads the page sources rather than importing them: the pages pull in
 * client components and CSS that the node test environment cannot load.
 */

const APP_DIR = path.join(process.cwd(), "src", "app");

function staticPages(): { route: string; file: string }[] {
  const pages: { route: string; file: string }[] = [];
  (function walk(dir: string, urlPath: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Dynamic segments set their canonical in generateMetadata; blog post
        // sources under posts/ are rendered through /blog/[slug]; api has no pages.
        if (/^[[_]/.test(entry.name) || entry.name === "api") continue;
        if (entry.name === "posts" && urlPath === "/blog") continue;
        walk(full, `${urlPath}/${entry.name}`);
      } else if (entry.name === "page.tsx") {
        pages.push({ route: urlPath || "/", file: full });
      }
    }
  })(APP_DIR, "");
  return pages;
}

describe("page metadata", () => {
  it("does not set a canonical or title template in the root layout", () => {
    const layout = fs.readFileSync(path.join(APP_DIR, "layout.tsx"), "utf8");
    expect(layout).not.toMatch(/canonical\s*:/);
    expect(layout).not.toMatch(/template\s*:/);
  });

  it.each(staticPages())("$route declares its own canonical", ({ route, file }) => {
    const source = fs.readFileSync(file, "utf8");
    expect(source).toMatch(new RegExp(`canonical:\\s*["']${route.replace(/\//g, "\\/")}["']`));
  });

  it("gives each blog post its own canonical", () => {
    const source = fs.readFileSync(path.join(APP_DIR, "blog", "[slug]", "page.tsx"), "utf8");
    expect(source).toContain("canonical: `/blog/${slug}`");
  });
});

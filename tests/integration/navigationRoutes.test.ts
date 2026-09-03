import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import nextConfig from "../../next.config.mjs";
import { footerLinks, mainNavItems, navItems } from "../../src/constants/navigation";

/**
 * Every href in the navigation is hand-written against a route that lives on
 * disk. Nothing enforced the correspondence: the two e2e suites carry their
 * own hardcoded route arrays, derived from neither this file nor the app
 * directory, so a typo or a removed page 404s until a visitor clicks it.
 *
 * This walks the real navigation data against the real app directory, so the
 * check widens on its own as pages and links are added.
 */

const APP_DIR = path.join(process.cwd(), "src", "app");

function routesOnDisk(): Set<string> {
  const routes = new Set<string>();
  (function walk(dir: string, urlPath: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        if (/^page\.(tsx|mdx|ts)$/.test(entry.name)) routes.add(urlPath || "/");
        continue;
      }
      // Route groups (parentheses) do not appear in the URL; private folders
      // (underscore) and dynamic segments are handled by their own pages.
      if (entry.name.startsWith("_")) continue;
      const segment = entry.name.startsWith("(") ? "" : `/${entry.name}`;
      walk(path.join(dir, entry.name), urlPath + segment);
    }
  })(APP_DIR, "");
  return routes;
}

async function redirectSources(): Promise<Set<string>> {
  const redirects = await nextConfig.redirects?.();
  return new Set((redirects ?? []).map((redirect: { source: string }) => redirect.source));
}

function internalHrefs(): { href: string; label: string }[] {
  const found: { href: string; label: string }[] = [];
  for (const item of [...navItems, ...mainNavItems]) {
    found.push({ href: item.href, label: `navItems: ${item.name}` });
    for (const child of item.dropdownItems ?? []) {
      found.push({ href: child.href, label: `dropdown: ${item.name} > ${child.name}` });
    }
  }
  for (const section of footerLinks) {
    for (const link of section.links) {
      found.push({ href: link.href, label: `footer: ${section.title} > ${link.label}` });
    }
  }
  return found.filter(({ href }) => href.startsWith("/"));
}

describe("navigation hrefs", () => {
  it("resolves every internal link to a page or a redirect", async () => {
    const onDisk = routesOnDisk();
    const redirects = await redirectSources();

    const broken = internalHrefs()
      .filter(({ href }) => {
        const clean = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
        return !onDisk.has(clean) && !redirects.has(clean);
      })
      .map(({ href, label }) => `${href}  (${label})`);

    expect(broken).toEqual([]);
  });

  it("finds routes and links at all, so a passing run means something", () => {
    // Guards the check itself: if the walk or the extraction silently returned
    // nothing, the assertion above would pass while testing nothing.
    expect(routesOnDisk().size).toBeGreaterThan(20);
    expect(internalHrefs().length).toBeGreaterThan(20);
  });

  it("keeps the removed verticals redirecting rather than 404ing", async () => {
    const redirects = await redirectSources();

    // These were removed deliberately; CLAUDE.md records the positioning
    // decision. They must 308, not disappear.
    for (const slug of ["financial-services", "healthcare", "retail", "energy", "public-sector"]) {
      expect(redirects.has(`/industries/${slug}`)).toBe(true);
      expect(routesOnDisk().has(`/industries/${slug}`)).toBe(false);
    }
  });
});

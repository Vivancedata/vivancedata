import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  findBlogPostPath,
  getAllBlogPosts,
  getBlogPostFrontmatter,
  getBlogSlugs,
} from "../../src/lib/blogPosts";

describe("blog post discovery", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("includes directory-based page.mdx posts", () => {
    const slugs = getBlogSlugs();

    expect(slugs).toContain("ai-implementation-guide");
    expect(slugs).toContain("ai-roi-business-case");
    expect(slugs).toContain("data-preparation-for-ai");
  });

  it("resolves page.mdx path for directory-based posts", () => {
    const postPath = findBlogPostPath("ai-implementation-guide");

    expect(postPath).not.toBeNull();
    expect(postPath).toMatch(
      new RegExp(
        path
          .join("ai-implementation-guide", "page.mdx")
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      )
    );
  });

  it("returns unique slugs when both file and directory variants exist", () => {
    const slugs = getBlogSlugs();
    const unique = new Set(slugs);

    expect(slugs.length).toBe(unique.size);
  });

  it("returns posts sorted by date descending", () => {
    const posts = getAllBlogPosts();
    const dates = posts.map((post) => new Date(post.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);

    expect(dates).toEqual(sorted);
  });

  it("ignores non-mdx files in the posts directory", () => {
    const nonPostFile = path.join(
      process.cwd(),
      "src",
      "app",
      "blog",
      "posts",
      "ignore-me.txt"
    );
    fs.writeFileSync(nonPostFile, "not a post");

    try {
      expect(getBlogSlugs()).not.toContain("ignore-me");
    } finally {
      fs.rmSync(nonPostFile, { force: true });
    }
  });

  it("returns null frontmatter for unknown slugs", () => {
    expect(getBlogPostFrontmatter("definitely-missing-slug")).toBeNull();
  });

  it("returns null frontmatter when a post cannot be read", () => {
    const targetPath = findBlogPostPath("ai-implementation-guide");
    expect(targetPath).not.toBeNull();

    const originalReadFileSync = fs.readFileSync;
    vi.spyOn(fs, "readFileSync").mockImplementation((filePath, options) => {
      if (String(filePath) === targetPath) {
        throw new Error("read failure");
      }
      return originalReadFileSync(filePath as Parameters<typeof fs.readFileSync>[0], options as Parameters<typeof fs.readFileSync>[1]);
    });

    expect(getBlogPostFrontmatter("ai-implementation-guide")).toBeNull();
  });

  it("continues loading posts when one file read fails", () => {
    const originalReadFileSync = fs.readFileSync;
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    vi.spyOn(fs, "readFileSync").mockImplementation((filePath, options) => {
      if (String(filePath).includes("ai-customer-service")) {
        throw new Error("read failure");
      }
      return originalReadFileSync(filePath as Parameters<typeof fs.readFileSync>[0], options as Parameters<typeof fs.readFileSync>[1]);
    });

    const posts = getAllBlogPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.some((post) => post.slug === "ai-customer-service")).toBe(false);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("skips directories that do not contain post files", () => {
    const emptyDirectory = path.join(
      process.cwd(),
      "src",
      "app",
      "blog",
      "posts",
      "empty-directory"
    );
    fs.mkdirSync(emptyDirectory, { recursive: true });

    try {
      expect(getBlogSlugs()).not.toContain("empty-directory");
    } finally {
      fs.rmSync(emptyDirectory, { recursive: true, force: true });
    }
  });

  it("returns empty results when the blog posts directory is missing", () => {
    const originalExistsSync = fs.existsSync;
    vi.spyOn(fs, "existsSync").mockImplementation((targetPath) => {
      if (String(targetPath).endsWith(path.join("src", "app", "blog", "posts"))) {
        return false;
      }
      return originalExistsSync(targetPath);
    });

    expect(getBlogSlugs()).toEqual([]);
    expect(getAllBlogPosts()).toEqual([]);
  });

  it("applies frontmatter fallbacks when fields are missing", () => {
    const fallbackPost = path.join(
      process.cwd(),
      "src",
      "app",
      "blog",
      "posts",
      "fallback-post.mdx"
    );
    fs.writeFileSync(fallbackPost, "## Body without frontmatter");

    try {
      const frontmatter = getBlogPostFrontmatter("fallback-post");
      expect(frontmatter).not.toBeNull();
      expect(frontmatter?.title).toBe("fallback-post");
      expect(frontmatter?.description).toBe("Read our article on fallback-post");
      expect(frontmatter?.image).toBe("/images/ai-solutions.png");
      expect(frontmatter?.tags).toEqual(["AI", "Technology"]);

      const expectedDate = new Date().toISOString().split("T")[0];
      expect(frontmatter?.date).toBe(expectedDate);
    } finally {
      fs.rmSync(fallbackPost, { force: true });
    }
  });
});

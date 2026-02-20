import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/types/blog";

const BLOG_POSTS_DIRECTORY = path.join(
  process.cwd(),
  "src",
  "app",
  "blog",
  "posts"
);
const DEFAULT_IMAGE = "/images/ai-solutions.png";
const DEFAULT_TAGS = ["AI", "Technology"];

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
}

interface BlogFileEntry {
  filePath: string;
  fromDirectory: boolean;
}

function extractFrontmatter(content: string, slug: string): BlogFrontmatter {
  const titleMatch = content.match(/title:\s*"([^"]*)"/);
  const descriptionMatch = content.match(/description:\s*"([^"]*)"/);
  const excerptMatch = content.match(/excerpt:\s*"([^"]*)"/);
  const dateMatch = content.match(/date:\s*"([^"]*)"/);
  const imageMatch = content.match(/image:\s*"([^"]*)"/);
  const tagsMatch = content.match(/tags:\s*\[([\s\S]*?)\]/);

  const title = titleMatch?.[1] || slug;
  const description =
    descriptionMatch?.[1] || excerptMatch?.[1] || `Read our article on ${title}`;
  const date = dateMatch?.[1] || new Date().toISOString().split("T")[0];
  const image = imageMatch?.[1] || DEFAULT_IMAGE;

  const tags = tagsMatch
    ? tagsMatch[1]
        .split(",")
        .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean)
    : DEFAULT_TAGS;

  return { title, description, date, image, tags };
}

function resolveDirectoryPostPath(directoryPath: string, slug: string): string | null {
  const slugMdxPath = path.join(directoryPath, `${slug}.mdx`);
  if (fs.existsSync(slugMdxPath)) {
    return slugMdxPath;
  }

  const pageMdxPath = path.join(directoryPath, "page.mdx");
  if (fs.existsSync(pageMdxPath)) {
    return pageMdxPath;
  }

  return null;
}

function getBlogFileEntries(): Map<string, BlogFileEntry> {
  const slugsToFiles = new Map<string, BlogFileEntry>();

  if (!fs.existsSync(BLOG_POSTS_DIRECTORY)) {
    return slugsToFiles;
  }

  const directoryEntries = fs.readdirSync(BLOG_POSTS_DIRECTORY, {
    withFileTypes: true,
  });

  for (const entry of directoryEntries) {
    const entryPath = path.join(BLOG_POSTS_DIRECTORY, entry.name);

    if (entry.isDirectory()) {
      const resolvedPath = resolveDirectoryPostPath(entryPath, entry.name);
      if (resolvedPath) {
        slugsToFiles.set(entry.name, {
          filePath: resolvedPath,
          fromDirectory: true,
        });
      }
      continue;
    }

    if (!entry.name.endsWith(".mdx")) {
      continue;
    }

    const slug = entry.name.replace(/\.mdx$/, "");
    const existing = slugsToFiles.get(slug);
    if (existing?.fromDirectory) {
      continue;
    }

    slugsToFiles.set(slug, { filePath: entryPath, fromDirectory: false });
  }

  return slugsToFiles;
}

export function findBlogPostPath(slug: string): string | null {
  return getBlogFileEntries().get(slug)?.filePath ?? null;
}

export function getBlogSlugs(): string[] {
  return Array.from(getBlogFileEntries().keys()).sort();
}

export function getBlogPostFrontmatter(slug: string): BlogFrontmatter | null {
  const filePath = findBlogPostPath(slug);
  if (!filePath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return extractFrontmatter(fileContents, slug);
  } catch {
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [slug, entry] of getBlogFileEntries()) {
    try {
      const fileContents = fs.readFileSync(entry.filePath, "utf8");
      const frontmatter = extractFrontmatter(fileContents, slug);

      posts.push({
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        image: frontmatter.image,
        tags: frontmatter.tags,
        content: fileContents,
      });
    } catch (error) {
      console.error(`Error reading blog post "${slug}":`, error);
    }
  }

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

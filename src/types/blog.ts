import { StaticImageData } from "next/image";

/**
 * Unified blog post interface supporting both MDX files and static blog posts
 */
export interface BlogPost {
  /** Unique identifier (optional, for static posts) */
  id?: string;
  /** URL slug for the blog post */
  slug: string;
  /** Title of the blog post */
  title: string;
  /** Short description or summary - used as 'excerpt' in some contexts */
  description: string;
  /** Optional longer excerpt */
  excerpt?: string;
  /** Publication date in ISO format (YYYY-MM-DD) or formatted string */
  date: string;
  /** Featured image - can be path string or Next.js StaticImageData */
  image: string | StaticImageData;
  /** Array of tags/categories */
  tags?: string[];
  /** Single category (alternative to tags) */
  category?: string;
  /** Optional estimated read time */
  readTime?: string;
  /** Optional author information */
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  /** Optional raw MDX/markdown content */
  content?: string;
}

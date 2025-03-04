/**
 * Represents a blog post with metadata and content
 */
export interface BlogPost {
  /** Unique identifier and URL slug for the blog post */
  slug: string;
  /** Title of the blog post */
  title: string;
  /** Short description or summary of the blog post */
  description: string;
  /** Publication date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Path to the featured image */
  image: string;
  /** Array of tags/categories for the blog post */
  tags: string[];
  /** Optional raw content of the blog post */
  content?: string;
}

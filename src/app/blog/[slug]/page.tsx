import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

interface BlogFrontmatter {
  title: string;
  description?: string;
  excerpt?: string;
  date: string;
  image?: string;
  tags?: string[] | string;
}

/**
 * Finds the file path for a blog post by slug
 */
function findBlogPostPath(slug: string): string | null {
  try {
    // Check if it's a direct MDX file
    const directPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', `${slug}.mdx`);
    if (fs.existsSync(directPath)) {
      return directPath;
    }
    
    // Check if it's in a subdirectory
    const dirPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', slug);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      const mdxPath = path.join(dirPath, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        return mdxPath;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding blog post path for slug ${slug}:`, error);
    return null;
  }
}

/**
 * Extracts frontmatter data from MDX content
 */
function extractFrontmatter(content: string, slug: string): Partial<BlogFrontmatter> {
  const titleMatch = content.match(/title:\s*"([^"]*)"/);
  const descriptionMatch = content.match(/description:\s*"([^"]*)"/);
  const excerptMatch = content.match(/excerpt:\s*"([^"]*)"/);
  const dateMatch = content.match(/date:\s*"([^"]*)"/);
  const imageMatch = content.match(/image:\s*"([^"]*)"/);
  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);

  const title = titleMatch?.[1] || slug;
  const description = descriptionMatch?.[1] ||
                      excerptMatch?.[1] ||
                      `Read our article on ${title}`;
  const date = dateMatch?.[1] || new Date().toISOString().split('T')[0];
  const image = imageMatch?.[1] || "/images/ai-solutions.png";
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, ''))
    : ['AI', 'artificial intelligence', 'technology'];

  return { title, description, date, image, tags };
}

/**
 * Gets all blog posts with error handling
 */
async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });

    const posts: BlogPost[] = [];

    for (const entry of entries) {
      try {
        let slug: string;
        let filePath: string;

        if (entry.isDirectory()) {
          const dirPath = path.join(postsDirectory, entry.name);
          const mdxFile = `${entry.name}.mdx`;
          const mdxFilePath = path.join(dirPath, mdxFile);

          if (fs.existsSync(mdxFilePath)) {
            slug = entry.name;
            filePath = mdxFilePath;
          } else {
            continue;
          }
        } else if (entry.name.endsWith('.mdx')) {
          slug = entry.name.replace(/\.mdx$/, '');
          filePath = path.join(postsDirectory, entry.name);
        } else {
          continue;
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const frontmatter = extractFrontmatter(fileContents, slug);

        posts.push({
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || '',
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          image: frontmatter.image || "/images/ai-solutions.png",
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : ["AI", "Technology"],
          content: fileContents
        });
      } catch (entryError) {
        console.error(`Error processing entry ${entry.name}:`, entryError);
      }
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

/**
 * Finds related posts based on shared tags
 */
function getRelatedPosts(currentSlug: string, currentTags: string[], allPosts: BlogPost[]): BlogPost[] {
  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const matchingTags = post.tags?.filter(tag =>
        currentTags.some(currentTag =>
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      ).length || 0;

      return { post, matchingTags };
    })
    .filter(({ matchingTags }) => matchingTags > 0)
    .sort((a, b) => b.matchingTags - a.matchingTags)
    .slice(0, 3)
    .map(({ post }) => post);
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const filePath = findBlogPostPath(slug);
    
    if (!filePath) {
      return {
        title: 'Blog Post Not Found',
      };
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const frontmatter = extractFrontmatter(fileContents, slug);
    
    const keywords = Array.isArray(frontmatter.tags) 
      ? frontmatter.tags 
      : typeof frontmatter.tags === 'string' 
        ? [frontmatter.tags] 
        : ['AI', 'artificial intelligence', 'technology'];
    
    return {
      title: `${frontmatter.title} - VivanceData AI Blog`,
      description: frontmatter.description,
      keywords: keywords.join(', '),
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: 'article',
        publishedTime: frontmatter.date,
        url: `https://vivancedata.com/blog/${slug}`,
        tags: keywords,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description: frontmatter.description,
      }
    };
  } catch (error) {
    console.error(`Error generating metadata for slug ${slug}:`, error);
    return {
      title: 'Blog Post - VivanceData',
    };
  }
}

export async function generateStaticParams() {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
    
    // Handle both direct MDX files and MDX files in subdirectories
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    
    const params = [];
    
    for (const entry of entries) {
      try {
        if (entry.isDirectory()) {
          // Check if there's an MDX file with the same name as the directory
          const dirPath = path.join(postsDirectory, entry.name);
          const mdxFile = `${entry.name}.mdx`;
          const mdxFilePath = path.join(dirPath, mdxFile);
          
          if (fs.existsSync(mdxFilePath)) {
            params.push({ slug: entry.name });
          }
        } else if (entry.name.endsWith('.mdx')) {
          params.push({ slug: entry.name.replace(/\.mdx$/, '') });
        }
      } catch (entryError) {
        console.error(`Error processing entry ${entry.name}:`, entryError);
        // Continue with other entries
      }
    }
    
    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;

  const filePath = findBlogPostPath(slug);

  if (!filePath) {
    return notFound();
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
      source: fileContents,
      options: { parseFrontmatter: true }
    });

    // Extract or provide default values
    const description = frontmatter.description || frontmatter.excerpt || `Read our article on ${frontmatter.title}`;
    const image = frontmatter.image || "/images/ai-solutions.png";
    const tags = frontmatter.tags || ["AI", "Technology"];

    const meta = {
      title: frontmatter.title,
      description,
      date: frontmatter.date,
      image,
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? [tags] : ["AI", "Technology"]
    };

    // Get all blog posts and find related ones
    const allPosts = await getAllBlogPosts();
    const relatedPosts = getRelatedPosts(slug, meta.tags, allPosts);

    // Create JSON-LD schema for the blog post
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": meta.title,
      "description": meta.description,
      "image": `https://vivancedata.com${meta.image}`,
      "datePublished": meta.date,
      "dateModified": meta.date,
      "author": {
        "@type": "Organization",
        "name": "VivanceData",
        "url": "https://vivancedata.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "VivanceData",
        "logo": {
          "@type": "ImageObject",
          "url": "https://vivancedata.com/icons/Logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://vivancedata.com/blog/${slug}`
      },
      "keywords": meta.tags.join(", ")
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogLayout meta={meta} previousPathname="/blog" relatedPosts={relatedPosts} currentSlug={slug}>
          {content}
        </BlogLayout>
      </>
    );
  } catch (error) {
    console.error(`Error loading blog post for slug ${slug}:`, error);
    return notFound();
  }
}

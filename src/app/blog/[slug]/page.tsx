import fs from 'node:fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';
import {
  findBlogPostPath,
  getAllBlogPosts,
  getBlogPostFrontmatter,
  getBlogSlugs,
} from '@/lib/blogPosts';

interface BlogPostParams {
  params: Promise<{
    slug: string;
  }>;
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
  const { slug } = await params;
  
  try {
    const frontmatter = getBlogPostFrontmatter(slug);

    if (!frontmatter) {
      return {
        title: 'Blog Post Not Found',
      };
    }

    const keywords =
      frontmatter.tags.length > 0
        ? frontmatter.tags
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
  return getBlogSlugs().map((slug) => ({ slug }));
}

async function getBlogPostData(slug: string, filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source: fileContents,
    options: { parseFrontmatter: true }
  });

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

  const allPosts = getAllBlogPosts();
  const relatedPosts = getRelatedPosts(slug, meta.tags, allPosts);

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

  return { content, meta, relatedPosts, jsonLd };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = await params;
  const filePath = findBlogPostPath(slug);

  if (!filePath) {
    return notFound();
  }

  let blogData;
  try {
    blogData = await getBlogPostData(slug, filePath);
  } catch (error) {
    console.error(`Error loading blog post for slug ${slug}:`, error);
    return notFound();
  }

  const { content, meta, relatedPosts, jsonLd } = blogData;

  return (
    <>
      <Script id={`blog-jsonld-${slug}`} type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <BlogLayout meta={meta} previousPathname="/blog" relatedPosts={relatedPosts} currentSlug={slug}>
        {content}
      </BlogLayout>
    </>
  );
}

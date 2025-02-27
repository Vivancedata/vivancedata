import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { BlogLayout } from '@/components/blog/BlogLayout';
import { Metadata } from 'next';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = params;
  
  try {
    // Try to find the blog post file
    let filePath: string | null = null;
    
    // Check if it's a direct MDX file
    const directPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', `${slug}.mdx`);
    if (fs.existsSync(directPath)) {
      filePath = directPath;
    } else {
      // Check if it's in a subdirectory
      const dirPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', slug);
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        const mdxPath = path.join(dirPath, `${slug}.mdx`);
        if (fs.existsSync(mdxPath)) {
          filePath = mdxPath;
        }
      }
    }
    
    if (!filePath) {
      return {
        title: 'Blog Post Not Found',
      };
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Extract metadata from frontmatter
    const titleMatch = fileContents.match(/title:\s*"([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : slug;
    
    const descriptionMatch = fileContents.match(/description:\s*"([^"]*)"/);
    const excerptMatch = fileContents.match(/excerpt:\s*"([^"]*)"/);
    const description = descriptionMatch ? descriptionMatch[1] : 
                        excerptMatch ? excerptMatch[1] : 
                        `Read our article on ${title}`;
    
    const tagsMatch = fileContents.match(/tags:\s*\[(.*?)\]/);
    const keywords = tagsMatch 
      ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, ''))
      : ['AI', 'artificial intelligence', 'technology'];
    
    return {
      title: `${title} - VivaceFlow AI Blog`,
      description,
      keywords: keywords.join(', '),
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: fileContents.match(/date:\s*"([^"]*)"/)?.at(1),
        url: `https://vivaceflow.com/blog/${slug}`,
        tags: keywords,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      }
    };
  } catch (error) {
    return {
      title: 'Blog Post - VivaceFlow',
    };
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  
  // Handle both direct MDX files and MDX files in subdirectories
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  
  const params = [];
  
  for (const entry of entries) {
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
  }
  
  return params;
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;
  
  // Try to find the blog post file
  let filePath: string | null = null;
  
  // Check if it's a direct MDX file
  const directPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', `${slug}.mdx`);
  if (fs.existsSync(directPath)) {
    filePath = directPath;
  } else {
    // Check if it's in a subdirectory
    const dirPath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', slug);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      const mdxPath = path.join(dirPath, `${slug}.mdx`);
      if (fs.existsSync(mdxPath)) {
        filePath = mdxPath;
      }
    }
  }
  
  if (!filePath) {
    return notFound();
  }
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<{ 
      title: string;
      description?: string;
      excerpt?: string;
      date: string;
      image?: string;
      tags?: string[];
    }>({
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

    return (
      <BlogLayout meta={meta} previousPathname="/blog">
        {content}
      </BlogLayout>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return notFound();
  }
}

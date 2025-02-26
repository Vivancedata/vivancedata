import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Calendar, Clock } from "lucide-react";
import Link from 'next/link';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

export default async function BlogPost({ params }: BlogPostParams) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src', 'app', 'blog', 'posts', `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<{ 
      title: string;
      date?: string;
      excerpt?: string;
    }>({
      source: fileContents,
      options: { parseFrontmatter: true }
    });

    return (
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to all posts
          </Link>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{frontmatter.title}</h1>
          
          <div className="flex items-center text-gray-500 space-x-4 mb-8">
            {frontmatter.date && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                <span>{frontmatter.date}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-blue-500" />
              <span>5 min read</span>
            </div>
          </div>
          
          <div className="mt-8">
            {content}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return notFound();
  }
}

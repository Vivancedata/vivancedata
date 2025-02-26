import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { compileMDX } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

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
    const { content, frontmatter } = await compileMDX<{ title: string }>({
      source: fileContents,
      options: { parseFrontmatter: true }
    });

    return (
      <div className="container mx-auto py-10 px-4">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{frontmatter.title}</h1>
          <div className="mt-8">
            {content}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}

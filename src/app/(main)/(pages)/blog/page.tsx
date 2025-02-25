import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const titleMatch = fileContents.match(/title:\s*(.*)/);
    const title = titleMatch ? titleMatch[1] : slug;

    return { slug, title };
  });
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
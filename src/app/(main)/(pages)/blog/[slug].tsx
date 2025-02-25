import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect, useState } from 'react';

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
}

export default function BlogPost({ source }: BlogPostProps) {
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    setContent(source);
  }, [source]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MDXRemote {...content} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'src', 'pages', 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    return { params: { slug } };
  });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const filePath = path.join(process.cwd(), 'src', 'pages', 'blog', `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const source = await serialize(fileContents);

  return { props: { source } };
};
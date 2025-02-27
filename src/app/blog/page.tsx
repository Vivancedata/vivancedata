import fs from 'fs';
import path from 'path';
import { Blogs } from '@/components/blog/Blogs';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - VivaceFlow AI Solutions',
  description: 'Explore our latest articles on AI trends, implementation strategies, and industry insights to stay ahead in the rapidly evolving world of artificial intelligence.',
  keywords: 'AI blog, artificial intelligence trends, machine learning insights, AI implementation, business AI',
  openGraph: {
    title: 'AI Insights Blog - VivaceFlow',
    description: 'Expert articles on artificial intelligence trends, implementation strategies, and industry insights.',
    type: 'website',
    url: 'https://vivaceflow.com/blog',
  },
};

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  content?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  
  // Handle both direct MDX files and MDX files in subdirectories
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  
  const posts: BlogPost[] = [];
  
  for (const entry of entries) {
    let slug: string;
    let filePath: string;
    
    if (entry.isDirectory()) {
      // Check if there's an MDX file with the same name as the directory
      const dirPath = path.join(postsDirectory, entry.name);
      const mdxFile = `${entry.name}.mdx`;
      const mdxFilePath = path.join(dirPath, mdxFile);
      
      if (fs.existsSync(mdxFilePath)) {
        slug = entry.name;
        filePath = mdxFilePath;
      } else {
        // Skip directories without matching MDX files
        continue;
      }
    } else if (entry.name.endsWith('.mdx')) {
      slug = entry.name.replace(/\.mdx$/, '');
      filePath = path.join(postsDirectory, entry.name);
    } else {
      // Skip non-MDX files
      continue;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const titleMatch = fileContents.match(/title:\s*"([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : slug;
    
    const descriptionMatch = fileContents.match(/description:\s*"([^"]*)"/);
    const excerpt = fileContents.match(/excerpt:\s*"([^"]*)"/);
    const description = descriptionMatch ? descriptionMatch[1] : 
                        excerpt ? excerpt[1] : 
                        "Read this insightful article on artificial intelligence and its applications.";
    
    const dateMatch = fileContents.match(/date:\s*"([^"]*)"/);
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
    
    const imageMatch = fileContents.match(/image:\s*"([^"]*)"/);
    const image = imageMatch ? imageMatch[1] : "/images/ai-solutions.png";
    
    const tagsMatch = fileContents.match(/tags:\s*\[(.*?)\]/);
    const tags = tagsMatch 
      ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, '')) 
      : ["AI", "Technology"];
    
    posts.push({ 
      slug, 
      title, 
      description, 
      date, 
      image,
      tags,
      content: fileContents
    });
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <Heading className="text-4xl md:text-5xl mb-4">Our AI Insights Blog</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Stay updated with the latest insights, research, and practical applications in artificial intelligence.
        </Paragraph>
      </div>

      <Blogs blogs={posts} />
    </Container>
  );
}

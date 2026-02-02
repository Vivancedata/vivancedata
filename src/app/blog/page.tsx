import fs from 'fs';
import path from 'path';
import { Blogs } from '@/components/blog/Blogs';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';

export const metadata: Metadata = {
  title: 'Blog - VivanceData AI Solutions',
  description: 'Explore our latest articles on AI trends, implementation strategies, and industry insights to stay ahead in the rapidly evolving world of artificial intelligence.',
  keywords: 'AI blog, artificial intelligence trends, machine learning insights, AI implementation, business AI',
  openGraph: {
    title: 'AI Insights Blog - VivanceData',
    description: 'Expert articles on artificial intelligence trends, implementation strategies, and industry insights.',
    type: 'website',
    url: 'https://vivancedata.com/blog',
    images: [
      {
        url: 'https://vivancedata.com/images/ai-solutions.png',
        width: 1200,
        height: 630,
        alt: 'VivanceData AI Insights Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Insights Blog - VivanceData',
    description: 'Expert articles on AI trends, implementation strategies, and industry insights.',
    images: ['https://vivancedata.com/images/ai-solutions.png'],
  },
};


/**
 * Extracts frontmatter data from MDX content
 */
function extractFrontmatter(content: string): Partial<BlogPost> {
  const titleMatch = content.match(/title:\s*"([^"]*)"/);
  const descriptionMatch = content.match(/description:\s*"([^"]*)"/);
  const excerptMatch = content.match(/excerpt:\s*"([^"]*)"/);
  const dateMatch = content.match(/date:\s*"([^"]*)"/);
  const imageMatch = content.match(/image:\s*"([^"]*)"/);
  const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
  
  const title = titleMatch?.[1] || '';
  const description = descriptionMatch?.[1] || 
                      excerptMatch?.[1] || 
                      "Read this insightful article on artificial intelligence and its applications.";
  const date = dateMatch?.[1] || new Date().toISOString().split('T')[0];
  const image = imageMatch?.[1] || "/images/ai-solutions.png";
  const tags = tagsMatch 
    ? tagsMatch[1].split(',').map(tag => tag.trim().replace(/"/g, '')) 
    : ["AI", "Technology"];
    
  return { title, description, date, image, tags };
}

/**
 * Gets all blog posts with error handling
 */
async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
    
    // Handle both direct MDX files and MDX files in subdirectories
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    
    const posts: BlogPost[] = [];
    
    for (const entry of entries) {
      try {
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
        const frontmatter = extractFrontmatter(fileContents);
        
        posts.push({ 
          slug, 
          title: frontmatter.title || slug, 
          description: frontmatter.description || '', 
          date: frontmatter.date || new Date().toISOString().split('T')[0], 
          image: frontmatter.image || "/images/ai-solutions.png",
          tags: frontmatter.tags || ["AI", "Technology"],
          content: fileContents
        });
      } catch (entryError) {
        console.error(`Error processing entry ${entry.name}:`, entryError);
        // Continue with other entries even if one fails
      }
    }
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return []; // Return empty array in case of error
  }
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

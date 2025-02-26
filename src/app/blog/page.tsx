import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const titleMatch = fileContents.match(/title:\s*"([^"]*)"/);
    const title = titleMatch ? titleMatch[1] : slug;
    
    const excerptMatch = fileContents.match(/excerpt:\s*"([^"]*)"/);
    const excerpt = excerptMatch ? excerptMatch[1] : "Click to read this blog post.";
    
    const dateMatch = fileContents.match(/date:\s*"([^"]*)"/);
    const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return { slug, title, excerpt, date };
  });
}

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest insights, articles, and updates on AI trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500 space-x-4 mt-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-500" />
                  <span>5 min read</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group">
                <span>Read More</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

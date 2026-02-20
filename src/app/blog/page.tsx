import { Blogs } from '@/components/blog/Blogs';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogPosts';

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

export default async function Blog() {
  const posts = getAllBlogPosts();

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

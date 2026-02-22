import { Blogs } from '@/components/blog/Blogs';
import { Container } from '@/components/common/Container';
import { ServicesHero } from '@/components/services/ServicesHero';
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
    <>
      <ServicesHero
        title="AI Insights Blog"
        description="Practical perspectives on AI implementation, strategy, and the decisions that matter most when building production systems."
      />
      <Container className="py-16">
        <Blogs blogs={posts} />
      </Container>
    </>
  );
}

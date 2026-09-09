import { Blogs } from '@/components/blog/Blogs';
import { Container } from '@/components/common/Container';
import { PageHero } from '@/components/common/PageHero';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogPosts';

export const metadata: Metadata = {
  title: 'Notes from the work - Vivancedata',
  description: 'Notes on putting AI into trade and industrial operations: what works on real paperwork and real calls, what breaks, and what is not worth the trouble.',
  keywords: 'AI blog, artificial intelligence trends, machine learning insights, AI implementation, business AI',
  openGraph: {
    title: 'Notes from the work - Vivancedata',
    description: 'Notes on putting AI into trade and industrial operations: what works, what breaks, what is not worth the trouble.',
    type: 'website',
    url: 'https://vivancedata.com/blog',
    images: [
      {
        url: 'https://vivancedata.com/images/ai-solutions.png',
        width: 1200,
        height: 630,
        alt: 'Vivancedata AI Insights Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes from the work - Vivancedata',
    description: 'Notes on putting AI into trade and industrial operations.',
    images: ['https://vivancedata.com/images/ai-solutions.png'],
  },
};

export default async function Blog() {
  const posts = getAllBlogPosts();

  return (
    <>
      {/* The removed eyebrow was the better of the two lines and is the
        * owner's own phrase, so it is promoted to the title rather than lost.
        * "AI Insights Blog" was the generic half. */}
      <PageHero
        title="Notes from the work"
        description="What happens when a model meets real paperwork, real calls and real crews \u2014 including the parts that do not work."
      />
      <Container className="py-16">
        <Blogs blogs={posts} />
      </Container>
    </>
  );
}

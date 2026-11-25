import { Blogs } from '@/components/blog/Blogs';
import { PageHero } from '@/components/common/PageHero';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blogPosts';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Notes from the work - VivanceData',
  description: "Notes on putting AI into trade and industrial operations: what works on real paperwork and real calls, what breaks, and what isn't worth the trouble.",
  keywords: 'AI blog, artificial intelligence trends, machine learning insights, AI implementation, business AI',
  openGraph: {
    title: 'Notes from the work - VivanceData',
    description: "Notes on putting AI into trade and industrial operations: what works, what breaks, what isn't worth the trouble.",
    type: 'website',
    url: 'https://www.vivancedata.com/blog',
    images: [
      {
        url: 'https://www.vivancedata.com/images/banner.png',
        width: 2560,
        height: 1280,
        alt: 'VivanceData AI Insights Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes from the work - VivanceData',
    description: 'Notes on putting AI into trade and industrial operations.',
    images: ['https://www.vivancedata.com/images/banner.png'],
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
        description="What happens when a model meets real paperwork, real calls and real crews, including the parts that don't work."
      />
      <section className="bleed">
        <div className="container mx-auto px-4">
          <Blogs blogs={posts} />
        </div>
      </section>
    </>
  );
}

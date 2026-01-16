import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAPID AI Framework - Our Methodology | VivanceData',
  description:
    'The RAPID AI Framework is VivanceData\'s proven 6-phase methodology for AI transformation. Realize AI Potential In Days with our structured approach from discovery to scale.',
  keywords: [
    'AI methodology',
    'AI transformation framework',
    'RAPID AI Framework',
    'AI implementation',
    'AI strategy',
    'digital transformation',
    'enterprise AI',
    'AI consulting methodology',
  ],
  openGraph: {
    title: 'RAPID AI Framework - Realize AI Potential In Days | VivanceData',
    description:
      'Transform your business with VivanceData\'s proven 6-phase RAPID AI Framework. From discovery to enterprise-scale deployment in days, not months.',
    type: 'website',
    url: 'https://vivancedata.com/methodology',
    images: [
      {
        url: 'https://vivancedata.com/images/ai-solutions.png',
        width: 1200,
        height: 630,
        alt: 'VivanceData RAPID AI Framework',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAPID AI Framework - VivanceData',
    description:
      'Transform your business with our proven 6-phase AI methodology. Realize AI Potential In Days.',
    images: ['https://vivancedata.com/images/ai-solutions.png'],
  },
};

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

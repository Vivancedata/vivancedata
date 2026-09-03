import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How an Engagement Runs | Vivancedata',
  description:
    'The six phases a Vivancedata engagement runs through, from working out whether a workflow is worth automating to running it beside your existing process and keeping it working.',
  keywords: [
    'AI methodology',
    'AI transformation framework',
    'AI engagement process',
    'AI implementation',
    'AI strategy',
    'digital transformation',
    'enterprise AI',
    'AI consulting methodology',
  ],
  openGraph: {
    title: 'How an Engagement Runs | Vivancedata',
    description:
      'The six-phase way a Vivancedata engagement runs: discover, architect, prototype on your own documents, implement, deploy beside the existing process, and keep it working.',
    type: 'website',
    url: 'https://vivancedata.com/methodology',
    images: [
      {
        url: 'https://vivancedata.com/images/ai-solutions.png',
        width: 1200,
        height: 630,
        alt: 'How a Vivancedata engagement runs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How an Engagement Runs - Vivancedata',
    description:
      'The six-phase way an engagement runs, one workflow at a time, proved on your own documents.',
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

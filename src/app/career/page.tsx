import React from 'react';
import FAQ from '@/components/common/Question';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Careers at VivanceData | Join Our AI Team",
  description: "Explore career opportunities at VivanceData. Join our team of AI consultants, data scientists, and engineers shaping the future of enterprise AI.",
  keywords: ["AI careers", "AI consultant jobs", "data science careers", "machine learning jobs", "AI engineering"],
  openGraph: {
    title: "Careers at VivanceData | AI Consulting Team",
    description: "Join our team of AI experts. Explore opportunities in AI consulting, implementation, and innovation.",
    type: "website",
    url: "https://vivancedata.com/career",
    siteName: "VivanceData",
  },
  twitter: {
    card: "summary",
    title: "Careers at VivanceData",
    description: "Join our AI consulting team. Explore open positions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const CareerPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Career Opportunities</h1>
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Opening 1</h2>
          <p className="text-gray-700 leading-tight">
            Description of Job Opening 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Opening 2</h2>
          <p className="text-gray-700 leading-tight">
            Description of Job Opening 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Job Opening 3</h2>
          <p className="text-gray-700 leading-tight">
            Description of Job Opening 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
      <FAQ />
    </main>
  );
};

export default CareerPage;

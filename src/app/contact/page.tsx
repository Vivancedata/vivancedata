import React from 'react';
import { ProfileForm } from '@/components/contact/Form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - VivanceData",
  description: "Get in touch with VivanceData to discuss your AI and data needs. Schedule a free consultation with our experts to transform your business with intelligent automation.",
  keywords: ["contact VivanceData", "AI consultation", "get in touch", "AI services inquiry", "business consultation"],
  openGraph: {
    title: "Contact Us - VivanceData",
    description: "Schedule a free consultation with our AI experts. Transform your business with intelligent automation.",
    type: "website",
    url: "https://vivancedata.com/contact",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Contact VivanceData",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - VivanceData",
    description: "Schedule a free consultation with our AI experts.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
};

const CareerPage = () => {
  return (
    <div>
      <h1>Career Page</h1>
      <p>Welcome to the Career Page!</p>
      <ProfileForm />
    </div>
  );
};

export default CareerPage;

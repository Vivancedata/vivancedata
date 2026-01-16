import React from 'react';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, Rocket, Heart, Mail, ArrowRight } from 'lucide-react';

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

const benefits = [
  {
    icon: Briefcase,
    title: "Challenging Projects",
    description: "Work on cutting-edge AI implementations for Fortune 500 companies and innovative startups.",
  },
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Join a diverse team of AI experts, data scientists, and engineers who love to share knowledge.",
  },
  {
    icon: Rocket,
    title: "Growth Opportunities",
    description: "Continuous learning with conference attendance, certifications, and training budgets.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible remote work options, unlimited PTO, and a culture that respects your time.",
  },
];

const CareerPage = () => {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading className="text-4xl md:text-5xl mb-4">Join Our Team</Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            At VivanceData, we&apos;re building the future of AI-powered business solutions.
            We&apos;re always looking for talented individuals who share our passion for innovation.
          </Paragraph>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg h-fit">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Open Positions</h2>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
            <div className="bg-blue-100 dark:bg-blue-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No Open Positions Right Now</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              We don&apos;t have any open positions at the moment, but we&apos;re always interested in
              hearing from talented individuals. Send us your resume and we&apos;ll keep you in mind
              for future opportunities.
            </p>
            <a
              href="mailto:careers@vivancedata.com?subject=Career Interest at VivanceData"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Mail className="h-4 w-4" />
              careers@vivancedata.com
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Have a Project in Mind?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            While we may not be hiring right now, we&apos;re always ready to help businesses
            transform with AI. Let&apos;s discuss your project.
          </p>
          <Link href="/contact">
            <Button size="lg" className="gap-2">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CareerPage;

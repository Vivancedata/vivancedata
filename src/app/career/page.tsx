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
  description: "How VivanceData works with specialists. A founder-led practice that brings in senior people per project rather than hiring a bench.",
  keywords: ["AI careers", "AI consultant jobs", "data science careers", "machine learning jobs", "AI engineering"],
  openGraph: {
    title: "Careers at VivanceData | AI Consulting Team",
    description: "A founder-led practice that works with senior specialists on a per-project basis.",
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

// VivanceData is a founder-led practice with a network of project-based
// specialists -- not an employer with a benefits package. These describe how
// collaboration actually works here. Do not add employment perks (PTO, training
// budgets, team culture) until there is an actual payroll behind them.
const collaborationTerms = [
  {
    icon: Briefcase,
    title: "Scoped project work",
    description: "Engagements are fixed scopes with defined deliverables and end dates, contracted per project rather than as employment.",
  },
  {
    icon: Users,
    title: "Direct client contact",
    description: "You work with the people whose problem you are solving. No account-management layer in between and no hand-off to a junior team.",
  },
  {
    icon: Rocket,
    title: "Senior-only delivery",
    description: "Specialists are brought in for depth we do not already have in house, which means you own your part of the build outright.",
  },
  {
    icon: Heart,
    title: "Remote and asynchronous",
    description: "Work is coordinated around delivery dates rather than hours logged or timezone overlap.",
  },
];

const CareerPage = () => {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading className="text-4xl md:text-5xl mb-4">Work With Us</Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            VivanceData is a founder-led practice backed by a small network of specialists we bring
            in per project. We are not hiring employees, but we do add people to that network when
            the work calls for depth we do not already have.
          </Paragraph>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">How collaboration works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {collaborationTerms.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-muted rounded-xl p-6 flex gap-4"
              >
                <div className="bg-muted p-3 rounded-lg h-fit">
                  <benefit.icon className="h-6 w-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Open Roles</h2>

          <div className="bg-muted rounded-xl p-8 text-center">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No open roles right now</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              There are no positions open at the moment. If you are a senior engineer, ML
              practitioner or domain specialist open to project work, send a note and something you
              have built -- that is more useful to us than a resume.
            </p>
            <a
              href="mailto:careers@vivancedata.com?subject=Career Interest at VivanceData"
              className="inline-flex items-center gap-2 text-brand hover:underline font-medium"
            >
              <Mail className="h-4 w-4" />
              careers@vivancedata.com
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Have a Project in Mind?</h2>
          <p className="text-muted-foreground mb-6">
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

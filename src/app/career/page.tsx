import React from 'react';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, Rocket, Heart, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: "Careers at Vivancedata | Working with me",
  description: "How Vivancedata works with specialists. A founder-led practice that brings in senior people per project rather than hiring a bench.",
  keywords: ["AI careers", "AI consultant jobs", "data science careers", "machine learning jobs", "AI engineering"],
  openGraph: {
    title: "Careers at Vivancedata | Project-based collaboration",
    description: "A founder-led practice that works with senior specialists on a per-project basis.",
    type: "website",
    url: "https://vivancedata.com/career",
    siteName: "Vivancedata",
  },
  twitter: {
    card: "summary",
    title: "Careers at Vivancedata",
    description: "A founder-led practice that brings in senior specialists per project. No open roles right now.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Vivancedata is a founder-led practice with a network of project-based
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
    description: "I bring specialists in for depth I do not have myself, which means you own your part of the build outright.",
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
          <Heading className="mb-4 font-display text-serif-xl">Work with me</Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            Vivancedata is one person plus a short list of specialists I bring in per project.
            I am not hiring employees. I do add people to that list when a job calls for depth
            I do not have.
          </Paragraph>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="mb-8 font-display text-serif-lg">How collaboration works</h2>
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
                  <h3 className="text-heading-4 mb-2">{benefit.title}</h3>
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
          <h2 className="mb-8 font-display text-serif-lg">Open roles</h2>

          <div className="bg-muted rounded-xl p-8 text-center">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-brand" />
            </div>
            <h3 className="text-heading-3 mb-3">No open roles right now</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              None at the moment. If you are a senior engineer, ML practitioner or domain
              specialist open to project work, send a note and something you have built. That
              tells me more than a resume does.
            </p>
            <a
              href="mailto:careers@vivancedata.com?subject=Career Interest at Vivancedata"
              className="inline-flex items-center gap-2 text-brand hover:underline font-medium"
            >
              <Mail className="h-4 w-4" />
              careers@vivancedata.com
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center">
          <h2 className="mb-3 font-display text-serif-md">Here with a project instead?</h2>
          <p className="text-muted-foreground mb-6">
            No roles open, but the consulting side is. If you arrived here with a problem rather
            than a resume, tell me about it.
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

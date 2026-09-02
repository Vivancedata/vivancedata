import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industry Solutions - VivanceData",
  description: "AI solutions built for the trades and the field: construction, HVAC and the service trades, logistics and fleet operations, and manufacturing.",
  keywords: ["industry solutions", "AI for construction", "AI for HVAC", "AI for the trades", "AI for logistics", "AI for fleet operations", "AI for manufacturing"],
  openGraph: {
    title: "Industry-Specific AI Solutions - VivanceData",
    description: "AI solutions for construction, HVAC and the trades, logistics and fleet operations, and manufacturing.",
    type: "website",
    url: "https://vivancedata.com/industries",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry-Specific AI Solutions - VivanceData",
    description: "Specialized AI solutions tailored to your industry.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface IndustryCardProps {
  title: string;
  description: string;
  theme: string;
  href: string;
}

const IndustryCard = ({ title, description, theme, href }: IndustryCardProps) => (
  <div className="bg-card rounded-xl border border-border overflow-hidden group">
    <div className={`relative aspect-video bg-gradient-to-br ${theme}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <h3 className="text-heading-2 absolute bottom-4 left-4 text-primary-foreground">{title}</h3>
    </div>
    <div className="p-6">
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button asChild variant="outline" className="group">
        <Link href={href}>
          <span>Explore Solutions</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  </div>
);

export default function IndustriesPage() {
  const industries = [
    {
      title: "Construction",
      description: "Document intake for submittals, permits and RFIs, daily reports drafted from field notes, bid support, and compliance records that stay current.",
      theme: "from-primary to-primary/85",
      href: "/industries/construction"
    },
    {
      title: "HVAC & Trades",
      description: "After-hours call capture, dispatch and scheduling support, quoting from service history, and the follow-ups the office never gets to.",
      theme: "from-primary to-primary/85",
      href: "/industries/hvac-trades"
    },
    {
      title: "Logistics & Fleet",
      description: "Proof of delivery and BOL processing, exception triage before the customer calls, routine driver communication, and claims documentation.",
      theme: "from-primary to-primary/85",
      href: "/industries/logistics"
    },
    {
      title: "Manufacturing",
      description: "AI-powered systems for predictive maintenance, quality control, supply chain optimization, and smart factory operations.",
      theme: "from-primary to-primary/85",
      href: "/industries/manufacturing"
    }
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Industry-Specific AI Solutions</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          We work with blue-collar and local service businesses — construction, HVAC and the trades,
          logistics and fleet operations, and manufacturing.
        </Paragraph>
      </div>

      <div className="mb-20">
        {/* Four industries, so a 2x2 grid -- a three-column row would leave the
            last card stranded on its own line. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <IndustryCard
              key={industry.title}
              title={industry.title}
              description={industry.description}
              theme={industry.theme}
              href={industry.href}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-heading-1 mb-8 text-center">Why Choose Industry-Specific AI Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Domain Expertise",
              description: "Our solutions are built with deep understanding of industry-specific processes, regulations, and challenges."
            },
            {
              title: "Faster Time-to-Value",
              description: "Pre-built industry components and accelerators reduce implementation time and speed up ROI."
            },
            {
              title: "Tailored Outcomes",
              description: "Solutions designed to address the specific KPIs and metrics that matter most in your industry."
            }
          ].map((benefit) => (
            <div key={benefit.title} className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-heading-3 mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-heading-1 mb-8 text-center">Our Industry Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "01", title: "Industry Assessment", description: "We analyze your specific industry context, challenges, and opportunities." },
            { number: "02", title: "Solution Design", description: "We design AI solutions tailored to your industry's unique requirements and regulations." },
            { number: "03", title: "Implementation", description: "We deploy industry-optimized AI systems with minimal disruption to your operations." },
            { number: "04", title: "Continuous Improvement", description: "We continuously refine and enhance your solutions based on industry developments." }
          ].map((step) => (
            <div key={step.number} className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <span className="text-brand font-bold">{step.number}</span>
              </div>
              <h3 className="text-heading-3 mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-heading-1 mb-4">Ready to Transform Your Industry?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our industry-specific AI solutions can address your unique challenges and opportunities.
        </p>
        <Button asChild size="lg" >
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}

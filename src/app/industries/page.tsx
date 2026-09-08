import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries - Vivancedata",
  description: "AI built for the trades and the field: construction, HVAC and the service trades, logistics and fleet operations, and manufacturing.",
  keywords: ["industry solutions", "AI for construction", "AI for HVAC", "AI for the trades", "AI for logistics", "AI for fleet operations", "AI for manufacturing"],
  openGraph: {
    title: "Industries - Vivancedata",
    description: "AI for construction, HVAC and the trades, logistics and fleet operations, and manufacturing.",
    type: "website",
    url: "https://vivancedata.com/industries",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata Industry Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries - Vivancedata",
    description: "AI for construction, HVAC and the trades, logistics and fleet, and manufacturing.",
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
          <span>See what I build</span>
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
      description: "Quality checks read off photos, maintenance flagged from machine logs, and the paperwork that moves between the floor and the office.",
      theme: "from-primary to-primary/85",
      href: "/industries/manufacturing"
    }
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="mb-4 font-display text-serif-xl">The four trades I work in</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Blue-collar and local service businesses — construction, HVAC and the trades,
          logistics and fleet operations, and manufacturing. Nothing else, on purpose.
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
        <h2 className="mb-8 font-display text-serif-lg text-center">Why the trade matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "The document decides the design",
              description: "A submittal, a bill of lading and a work order each go wrong in their own way. Knowing which fields matter and which are noise is most of the accuracy."
            },
            {
              title: "Narrow on purpose",
              description: "Four trades rather than every industry. The alternative is a general-purpose tool that needs a long project just to learn what a job number is."
            },
            {
              title: "It has to fit the day",
              description: "Whoever uses this is on a ladder or in a truck. Anything that assumes a desk and a spare twenty minutes goes unused."
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
        <h2 className="mb-8 font-display text-serif-lg text-center">How the work runs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "01", title: "Watch the work", description: "A morning with whoever answers the phone and whoever keys in the paperwork." },
            { number: "02", title: "Pick one workflow", description: "The one that repeats most and fails most clearly. If nothing clears that bar, I say so." },
            { number: "03", title: "Build it on your documents", description: "Your permits, your calls, your delivery photos, so you can judge it against answers you already know." },
            { number: "04", title: "Run it beside the old way", description: "The current process keeps going underneath while the new one proves itself, and keeps being tuned as formats drift." }
          ].map((step) => (
            <div key={step.number} className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <span className="text-label uppercase text-mute">{step.number}</span>
              </div>
              <h3 className="text-heading-3 mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="mb-4 font-display text-serif-lg">Not sure this fits your operation?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Tell me what goes wrong most often in your week, and I will tell you straight whether it is worth building for.
        </p>
        <Button asChild size="lg" >
          <Link href="/contact">Book a call</Link>
        </Button>
      </div>
    </Container>
  );
}

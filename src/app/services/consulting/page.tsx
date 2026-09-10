import { Container } from "@/components/common/Container";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Target } from "lucide-react";
import {
  ServiceCTA,
  ServiceHeroSplit,
  ServicePageHeader,
  ServiceSection,
} from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "AI Strategy Consulting - Vivancedata",
  description: "Deciding what to automate first, what to leave alone, and what each option costs to build and to run \u2014 before anyone writes code.",
  keywords: ["AI strategy", "AI consulting", "digital transformation", "AI roadmap", "AI implementation", "AI governance"],
  openGraph: {
    title: "AI Strategy Consulting - Vivancedata",
    description: "Deciding what to automate first, what to leave alone, and what each option costs. Before anyone writes code.",
    type: "website",
    url: "https://vivancedata.com/services/consulting",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata AI Strategy Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Strategy Consulting - Vivancedata",
    description: "Deciding what to automate first and what to leave alone, before anyone writes code.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "What you actually have",
    description: "Where your documents live, what shape they arrive in, and whether they are consistent enough to build on. Sometimes the answer is not yet, and the cheaper fix is a different one.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
  {
    title: "An ordered list, not a strategy deck",
    description: "The jobs worth automating, in the order they are worth doing, with the reason each one sits where it does. Short enough to read in one sitting.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
  {
    title: "Finding the jobs worth doing",
    description: "Going through your week for the tasks that repeat, take someone off the tools, and fail in a way you can point at.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
  {
    title: "Rules for what it may decide alone",
    description: "Which calls the system makes by itself, which ones wait for a person, and what gets written down. In plain language, so it survives someone leaving.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
  {
    title: "Picking tools and vendors",
    description: "Reading the pricing pages and the contracts so you do not end up on a per-seat bill that grows faster than the crew does.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
  {
    title: "Getting it used",
    description: "The dispatcher who has done it the same way for years is who this has to work for. If it does not fit their morning, it sits unopened.",
    icon: <Check className="h-5 w-5 text-mute" />,
  },
];

interface Benefit {
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    title: "You find out early if the answer is no",
    description: "If nothing in your operation repeats often enough to be worth building for, I say so and the work stops there. That answer costs you a few days rather than a quarter.",
  },
  {
    title: "One person, start to finish",
    description: "Whoever sits with your dispatcher is who writes the code and who picks up the phone when it breaks. There is no delivery team to be handed to.",
  },
  {
    title: "Nothing gets replaced on day one",
    description: "What you run now keeps running while the new thing runs beside it. During that window a wrong answer costs nothing, and the disagreements are the useful part.",
  },
  {
    title: "The running cost is quoted up front",
    description: "APIs change and document formats drift, so an automation is not finished when it ships. You get the monthly number before you commit to the build, not after.",
  },
];

export default function ConsultingPage() {
  return (
    <Container className="py-16">
      <ServicePageHeader
        title="AI strategy consulting"
        intro="Deciding what to automate first, what to leave alone, and what each option costs to build and to run \u2014 before anyone writes code."
      />

      <ServiceHeroSplit
        visual={
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-5 flex items-center gap-2">
              <Target className="w-3 h-3" /> How the assessment runs
            </div>
            <div className="flex justify-between gap-2 mb-6">
              {[
                { n: "1", label: "Watch" },
                { n: "2", label: "Shortlist" },
                { n: "3", label: "Cost" },
                { n: "4", label: "Decide" },
              ].map(({ n, label }) => (
                <div key={n} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-pill border border-rule text-label text-mute">
                    {n}
                  </div>
                  <span className="text-muted-foreground text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                "Where your documents actually live",
                "The shortlist, in order",
                "Build cost and monthly cost",
                "What to leave alone",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-muted rounded-sm px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <h2 className="mb-4 font-display text-serif-lg">Deciding what to build, before building it</h2>
        <p className="text-muted-foreground mb-6">
          Most of these projects fail on the choice of job rather than the technology. Automate a task that runs twice a month, or one where nobody can say what the right answer looks like, and the budget is gone before a line of code is written.
        </p>
        <p className="text-muted-foreground mb-6">
          So I start with the people doing the work — whoever answers the phone, whoever keys in the paperwork — and come back with an ordered list of what is worth automating, what each one costs to build and to run, and what to leave alone.
        </p>
        <Button asChild className="self-start group" variant="outline">
          <Link href="/contact">
            <span>Book a call</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </ServiceHeroSplit>

      <ServiceSection heading="What this covers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="border border-rule bg-card p-6">
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="ml-2 font-display text-serif-sm">{service.title}</h3>
              </div>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection heading="Why it works this way">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="border border-rule bg-card p-6">
              <h3 className="mb-3 font-display text-serif-sm">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection heading="How the assessment runs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Watch", description: "A morning with whoever answers the phone and whoever types the paperwork in. Not a workshop." },
            { step: "2", title: "Shortlist", description: "The tasks that repeat often enough, and fail clearly enough, to be worth building for." },
            { step: "3", title: "Cost", description: "What each one takes to build, and what it costs to keep running once it is live." },
            { step: "4", title: "Decide", description: "You pick one to build, or none. Either way the shortlist and the costing are yours." }
          ].map((phase) => (
            <div key={phase.step} className="border border-rule bg-card p-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <span className="text-label uppercase text-mute">{phase.step}</span>
              </div>
              <h3 className="mb-3 font-display text-serif-sm">{phase.title}</h3>
              <p className="text-muted-foreground">{phase.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>
      
      <ServiceCTA
        heading="Not sure what to automate first?"
        body="Tell me which part of the week goes wrong most often, and I will tell you whether it is worth building for."
        actionLabel="Book a call"
      />
    </Container>
  );
}

import { Container } from "@/components/common/Container";
import { VerdictMark } from "@/components/common/Marks";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Eye, BarChart3, Scale, FileText } from "lucide-react";
import {
  designExamples,
  phases,
  principles,
  type PrincipleIcon,
} from "@/constants/responsibleAI";

export const metadata: Metadata = {
  title: "Responsible AI - Vivancedata",
  description: "What a system is allowed to decide on its own, what waits for a person, and what gets written down. The parts of this work that can go wrong quietly.",
  keywords: ["responsible AI", "ethical AI", "AI governance", "AI ethics", "transparent AI", "AI bias", "AI accountability"],
  openGraph: {
    title: "Responsible AI | Vivancedata",
    description: "What a system is allowed to decide on its own, what waits for a person, and what gets written down.",
    type: "website",
    url: "https://vivancedata.com/responsible-ai",
    siteName: "Vivancedata",
    images: [{
      url: "https://vivancedata.com/images/ai-solutions.png",
      width: 1200,
      height: 630,
      alt: "Vivancedata Responsible AI Framework",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsible AI | Vivancedata",
    description: "What a system decides on its own, what waits for a person, and what gets written down.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface PrincipleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Principle = ({ icon, title, description }: PrincipleProps) => (
  <div className="bg-card p-6 rounded-xl border border-border">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-muted rounded-full">
        {icon}
      </div>
      <h3 className="font-display text-serif-sm">{title}</h3>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

interface PhaseProps {
  number: string;
  title: string;
  description: string;
  checks: string[];
}

const Phase = ({ number, title, description, checks }: PhaseProps) => (
  <div className="relative">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
        {number}
      </div>
      <h3 className="font-display text-serif-sm">{title}</h3>
    </div>
    <div className="pl-16">
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {checks.map((check) => (
          <li key={check} className="flex items-start">
            <VerdictMark verdict="filled" label="" className="mr-2 mt-1 h-3.5 w-3.5" />
            <span className="text-foreground">{check}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface CaseStudyProps {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

const CaseStudy = ({ title, challenge, approach, outcome }: CaseStudyProps) => (
  <div className="bg-card p-6 rounded-xl border border-border">
    <h3 className="mb-4 font-display text-serif-sm">{title}</h3>
    
    <div className="mb-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-1">Challenge</h4>
      <p className="text-foreground">{challenge}</p>
    </div>
    
    <div className="mb-4">
      <h4 className="text-sm font-medium text-muted-foreground mb-1">Responsible AI Approach</h4>
      <p className="text-foreground">{approach}</p>
    </div>
    
    <div>
      <h4 className="text-sm font-medium text-muted-foreground mb-1">Outcome</h4>
      <p className="text-foreground">{outcome}</p>
    </div>
  </div>
);

// Icon keys from the constants file resolved to elements here, so the copy
// stays free of JSX.
const PRINCIPLE_ICONS: Record<PrincipleIcon, React.ReactNode> = {
  users: <Users className="h-6 w-6 text-mute" />,
  eye: <Eye className="h-6 w-6 text-mute" />,
  shield: <Shield className="h-6 w-6 text-mute" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6 text-mute" />,
  scale: <Scale className="h-6 w-6 text-mute" />,
  "file-text": <FileText className="h-6 w-6 text-mute" />,
};

export default function ResponsibleAIPage() {

  // Illustrative scenarios, not delivered engagements. The `outcome` field
  // describes what the approach is designed to produce, never a measured result.
  // No number goes in here without a named client who has agreed to publish it.

  return (
    <Container className="py-16">
      <div className="mb-16">
        <Heading className="mb-4 font-display text-serif-xl">Responsible AI</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          The parts of this work that can go wrong quietly: what a system decides on its own,
          what waits for a person, and what gets written down so you can go back and check.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-4">Responsible AI principles</div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-muted border-2 border-brand/40 flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-mute" strokeWidth={1.25} />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Applied from the first look at your documents through to what happens months
                after it is live.
              </p>
            </div>
            <div className="space-y-2">
              {[
                "Bias detection and mitigation",
                "Explainability by design",
                "Privacy preservation",
                "Human oversight preserved",
              ].map((principle) => (
                <div key={principle} className="flex items-center gap-2 bg-muted rounded-sm px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                  <span className="text-muted-foreground text-xs">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="mb-4 font-display text-serif-lg">Why this page exists</h2>
          <p className="text-muted-foreground mb-6">
            A system that reads your paperwork or answers your phone will get things wrong. The
            question is whether it gets them wrong somewhere a person notices, or quietly, in a
            way that surfaces three months later in a billing dispute.
          </p>
          <p className="text-muted-foreground mb-6">
            So most of the design work is about limits. What the system settles by itself, what it
            hands to a person, what it records, and how you check an answer you did not produce
            yourself. None of that is a product. It is how the build is put together.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Book a call</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">The principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle) => (
            <Principle
              key={principle.title}
              icon={PRINCIPLE_ICONS[principle.iconType]}
              title={principle.title}
              description={principle.description}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">How it runs during a build</h2>
        
        <div className="relative">
          {/* Vertical line connecting phases */}
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-muted hidden md:block"></div>
          
          <div className="space-y-12">
            {phases.map((phase) => (
              <Phase
                key={phase.number}
                number={phase.number}
                title={phase.title}
                description={phase.description}
                checks={phase.checks}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">What that looks like in practice</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designExamples.map((study) => (
            <CaseStudy
              key={study.title}
              title={study.title}
              challenge={study.challenge}
              approach={study.approach}
              outcome={study.outcome}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">How this shows up in a build</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          These are practices applied during delivery using established, mostly open-source tooling.
They are not products I sell, and nothing here is a platform you would license.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Bias testing",
              description: "Model outputs are tested across the attributes that carry risk in your domain before anything reaches production, and again on a schedule afterwards.",
              features: [
                "Outcome comparison across protected attributes",
                "Counterfactual tests for individual fairness",
                "Mitigation weighed against measured performance cost",
                "Findings written up rather than left in a notebook"
              ]
            },
            {
              title: "Explainability",
              description: "Every decision a system makes can be traced back to the inputs that drove it, in terms a non-technical reviewer can follow.",
              features: [
                "Feature attribution on individual predictions",
                "Plain-language rationale alongside each output",
                "What-if inspection for borderline cases",
                "Citations back to source documents in retrieval systems"
              ]
            },
            {
              title: "Privacy-preserving techniques",
              description: "Where data cannot or should not move, the architecture works around that constraint rather than asking you to relax it.",
              features: [
                "Keeping data inside systems that already hold it",
                "Minimising what is extracted and retained",
                "Differential privacy where aggregate release is needed",
                "Tiered access with audit trails"
              ]
            },
            {
              title: "Governance and documentation",
              description: "The paperwork a model needs to survive review: what it is, what it was trained on, who approved it, and what changed since.",
              features: [
                "Model inventory and data lineage",
                "Versioning of prompts, models and evaluation sets",
                "Risk assessment recorded before deployment",
                "Audit trail of changes and approvals"
              ]
            }
          ].map((tool) => (
            <div key={tool.title} className="bg-card p-6 rounded-xl border border-border">
              <h3 className="mb-3 font-display text-serif-sm">{tool.title}</h3>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <VerdictMark verdict="filled" label="" className="mr-2 mt-1 h-3.5 w-3.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="mb-4 font-display text-serif-lg">Worried about what it might get wrong?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Tell me what a wrong answer would actually cost in your operation, and we can work out
          where a person has to stay in the loop.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Book a call</Link>
        </Button>
      </div>
    </Container>
  );
}

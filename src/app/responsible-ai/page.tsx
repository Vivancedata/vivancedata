import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Users, Eye, BarChart3, Scale, FileText } from "lucide-react";
import {
  designExamples,
  phases,
  principles,
  type PrincipleIcon,
} from "@/constants/responsibleAI";

export const metadata: Metadata = {
  title: "Responsible AI Framework - VivanceData",
  description: "Our comprehensive approach to ethical, transparent, and human-centered AI implementation that ensures responsible innovation and sustainable outcomes.",
  keywords: ["responsible AI", "ethical AI", "AI governance", "AI ethics", "transparent AI", "AI bias", "AI accountability"],
  openGraph: {
    title: "Responsible AI Framework | VivanceData",
    description: "Ethical, transparent, and human-centered AI implementation. Learn about our approach to responsible AI innovation.",
    type: "website",
    url: "https://vivancedata.com/responsible-ai",
    siteName: "VivanceData",
    images: [{
      url: "https://vivancedata.com/images/ai-solutions.png",
      width: 1200,
      height: 630,
      alt: "VivanceData Responsible AI Framework",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsible AI Framework | VivanceData",
    description: "Ethical and transparent AI implementation with comprehensive governance.",
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
      <h3 className="text-heading-3">{title}</h3>
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
      <h3 className="text-heading-3">{title}</h3>
    </div>
    <div className="pl-16">
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {checks.map((check) => (
          <li key={check} className="flex items-start">
            <Check className="h-5 w-5 text-brand mt-0.5 mr-2 flex-shrink-0" />
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
    <h3 className="text-heading-3 mb-4">{title}</h3>
    
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
  users: <Users className="h-6 w-6 text-brand" />,
  eye: <Eye className="h-6 w-6 text-brand" />,
  shield: <Shield className="h-6 w-6 text-brand" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6 text-brand" />,
  scale: <Scale className="h-6 w-6 text-brand" />,
  "file-text": <FileText className="h-6 w-6 text-brand" />,
};

export default function ResponsibleAIPage() {

  // Illustrative scenarios, not delivered engagements. The `outcome` field
  // describes what the approach is designed to produce, never a measured result.
  // No number goes in here without a named client who has agreed to publish it.

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Responsible AI Framework</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Our comprehensive approach to ethical, transparent, and human-centered AI implementation that ensures responsible innovation and sustainable outcomes.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-4">Responsible AI Principles</div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-muted border-2 border-brand/40 flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 text-brand" />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Ethical guidelines built in at every stage — from data collection to deployment and monitoring.
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
          <h2 className="text-heading-1 mb-4">Why Responsible AI Matters</h2>
          <p className="text-muted-foreground mb-6">
            As AI becomes increasingly integrated into critical business processes and decision-making, ensuring these systems are developed and deployed responsibly is essential. Responsible AI isn&apos;t just an ethical imperative—it&apos;s a business necessity that builds trust, reduces risk, and creates sustainable value.
          </p>
          <p className="text-muted-foreground mb-6">
            At VivanceData, we believe that AI should be designed to augment human capabilities, not replace them. Our Responsible AI Framework guides every AI solution we develop, ensuring that technology serves humanity in ways that are fair, transparent, and beneficial to all stakeholders.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Discuss Responsible AI for Your Business</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-heading-1 mb-8 text-center">Our Responsible AI Principles</h2>
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
        <h2 className="text-heading-1 mb-8 text-center">Our Responsible AI Implementation Process</h2>
        
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
        <h2 className="text-heading-1 mb-8 text-center">Responsible AI in Action</h2>
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
        <h2 className="text-heading-1 mb-8 text-center">How this shows up in a build</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          These are practices applied during delivery using established, mostly open-source tooling.
          They are not products we sell, and nothing here is a platform you would license from us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Bias Testing",
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
              title: "Privacy-Preserving Techniques",
              description: "Where data cannot or should not move, the architecture works around that constraint rather than asking you to relax it.",
              features: [
                "Keeping data inside systems that already hold it",
                "Minimising what is extracted and retained",
                "Differential privacy where aggregate release is needed",
                "Tiered access with audit trails"
              ]
            },
            {
              title: "Governance and Documentation",
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
              <h3 className="text-heading-3 mb-3">{tool.title}</h3>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-brand mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-heading-1 mb-4">Ready to Implement Responsible AI?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our Responsible AI Framework can help your organization develop and deploy ethical, transparent, and human-centered AI solutions.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}

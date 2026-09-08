import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Zap, Brain, Sparkles, Atom, Rocket } from "lucide-react";
import {
  emergingTechnologies,
  innovationProjects,
  type TechnologyIcon,
} from "@/constants/innovationHub";

export const metadata: Metadata = {
  title: "Innovation Hub - Vivancedata",
  description: "What I test before it goes anywhere near a job someone depends on: which new AI techniques are ready for a trade or industrial operation, and which are not.",
  keywords: ["AI innovation", "emerging technology", "R&D", "AI research", "technology trends", "future of AI", "AI experimentation"],
  openGraph: {
    title: "Innovation Hub | Vivancedata",
    description: "What I test before it goes near a job someone depends on, plus two free tools you can use right now.",
    type: "website",
    url: "https://vivancedata.com/innovation-hub",
    siteName: "Vivancedata",
    images: [{
      url: "https://vivancedata.com/images/ai-solutions.png",
      width: 1200,
      height: 630,
      alt: "Vivancedata Innovation Hub - Emerging AI Technologies",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation Hub | Vivancedata",
    description: "What I test before it goes near a job someone depends on.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  maturity: "Emerging" | "Growing" | "Maturing";
  timeframe: string;
}

const TechnologyCard = ({ title, description, icon, maturity, timeframe }: TechnologyCardProps) => {
  const maturityColors = {
    Emerging: "bg-muted text-muted-foreground",
    Growing: "bg-muted text-foreground",
    Maturing: "bg-brand/10 text-brand"
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-3 bg-muted rounded-full">
          {icon}
        </div>
        <h3 className="text-heading-3">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${maturityColors[maturity]}`}>
          {maturity}
        </span>
        <span className="text-sm text-muted-foreground">{timeframe}</span>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  status: "Concept" | "Research" | "Prototype" | "Pilot";
}

const ProjectCard = ({ title, description, technologies, status }: ProjectCardProps) => {
  const statusColors = {
    Concept: "bg-muted text-muted-foreground",
    Research: "bg-muted text-muted-foreground",
    Prototype: "bg-muted text-foreground",
    Pilot: "bg-brand/10 text-brand"
  };


  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="relative aspect-video border-b border-border bg-muted">
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-heading-3 mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-pill border border-rule px-2.5 py-0.5 text-label uppercase text-mute"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Icon keys from the constants file resolved to elements here, so the copy
// stays free of JSX.
const TECHNOLOGY_ICONS: Record<TechnologyIcon, React.ReactNode> = {
  brain: <Brain className="h-6 w-6 text-brand" />,
  atom: <Atom className="h-6 w-6 text-brand" />,
  zap: <Zap className="h-6 w-6 text-brand" />,
  sparkles: <Sparkles className="h-6 w-6 text-brand" />,
  rocket: <Rocket className="h-6 w-6 text-brand" />,
  lightbulb: <Lightbulb className="h-6 w-6 text-brand" />,
};

export default function InnovationHubPage() {

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="mb-4 font-display text-serif-xl">Innovation Hub</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          What I test before it goes anywhere near a job someone depends on — which new
          techniques are ready for a trade or industrial operation, and which are still a demo.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-4">What is actually running</div>
            <div className="space-y-3 flex-1">
              {[
                { stage: "Call triage", count: "live demo", color: "bg-muted text-muted-foreground border-border" },
                { stage: "Paperwork extraction", count: "live demo", color: "bg-muted text-foreground border-border" },
                { stage: "Field note matching", count: "live demo", color: "bg-muted text-brand border-brand/30" },
                { stage: "Open to anyone", count: "no call required", color: "bg-brand/10 text-brand border-brand/30" },
              ].map((item) => (
                <div key={item.stage} className={`border rounded-lg px-4 py-2.5 flex items-center justify-between ${item.color}`}>
                  <span className="text-xs font-medium">{item.stage}</span>
                  <span className="text-xs opacity-70">{item.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-caption text-mute">Fictional sample data · rate-limited · nothing to sign up for</div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="mb-4 font-display text-serif-lg">What I try before you have to live with it</h2>
          <p className="text-muted-foreground mb-6">
            Anything new gets tried here first, on sample data and my own time, rather than on a
            job somebody is depending on. Most of it does not survive that, which is the reason
            for doing it in this order.
          </p>
          <p className="text-muted-foreground mb-6">
            The three demos on this site came out of that. They run on made-up sample data, they
            are rate-limited, and you can open any of them right now without talking to me first.
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
        <h2 className="mb-8 font-display text-serif-lg text-center">Technology radar</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          What I am watching, how ready each one looks, and roughly when it might matter for a trade
          or industrial job. Nothing here is advice to go and buy something yet.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergingTechnologies.map((tech) => (
            <TechnologyCard
              key={tech.title}
              title={tech.title}
              description={tech.description}
              icon={TECHNOLOGY_ICONS[tech.iconType]}
              maturity={tech.maturity}
              timeframe={tech.timeframe}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">Projects</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          What I am building or pulling apart at the moment. The status label says how far along
          each one is, and most of them are not far.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovationProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              status={project.status}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-8 font-display text-serif-lg text-center">Tools you can use right now</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Two working tools, free and unguarded. Both run entirely in your browser and give you a usable answer without talking to anyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "AI Readiness Assessment",
              description: "Twenty questions about your records, your systems, your people and the job itself. It scores each one and tells you which is actually holding you back.",
              href: "/tools/ai-readiness",
              buttonText: "Start the assessment"
            },
            {
              title: "ROI Calculator",
              description: "Model the cost, payback period and three-year return of an AI project against your own headcount and use case before committing budget to it.",
              href: "/tools/roi-calculator",
              buttonText: "Open the calculator"
            }
          ].map((tool) => (
            <div key={tool.title} className="bg-card p-6 rounded-xl border border-border flex flex-col">
              <h3 className="text-heading-3 mb-3">{tool.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">{tool.description}</p>
              <Button asChild className="w-full">
                <Link href={tool.href}>
                  {tool.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="mb-2 font-display text-serif-lg">Reading</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Papers from the wider research community that I keep an eye on.
        </p>
        <div className="space-y-6">
          {[
            {
              title: "Advancing Explainability in Multimodal Foundation Models",
              authors: "External research — Journal of Artificial Intelligence Research",
              publication: "Journal of Artificial Intelligence Research",
              date: "February 2025",
              abstract: "Novel techniques for improving the explainability of decisions made by multimodal foundation models, enabling more transparent and trustworthy AI systems."
            },
            {
              title: "Federated Learning for Privacy-Preserving Healthcare Analytics",
              authors: "External research — IEEE Transactions on Medical Imaging",
              publication: "IEEE Transactions on Medical Imaging",
              date: "December 2024",
              abstract: "A federated learning framework designed for healthcare applications that maintains patient privacy while enabling collaborative model training across multiple institutions."
            },
            {
              title: "Quantum-Enhanced Machine Learning: Opportunities and Challenges",
              authors: "External research — Quantum Information Processing",
              publication: "Quantum Information Processing",
              date: "October 2024",
              abstract: "A survey examining the current state of quantum machine learning, identifying promising applications and addressing key challenges for practical implementation."
            }
          ].map((paper) => (
            <div key={paper.title} className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-heading-3 mb-2">{paper.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
                <span className="text-muted-foreground">{paper.authors}</span>
                <span className="text-muted-foreground">{paper.publication}</span>
                <span className="text-muted-foreground">{paper.date}</span>
              </div>
              <p className="text-foreground mb-4">{paper.abstract}</p>
              <Button variant="outline" size="sm" className="group">
                <span>Read Full Paper</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="mb-4 font-display text-serif-lg">Got the awkward one?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          If your problem has no obvious off-the-shelf answer, that is the kind I want to hear
          about. Bring the job everybody else told you was not worth automating.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Book a call</Link>
        </Button>
      </div>
    </Container>
  );
}

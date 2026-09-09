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
  type InnovationProject,
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
  return (
    <div className="flex flex-col border border-rule bg-card p-6">
      <div className="flex items-center mb-4">
        <span className="mr-4 text-mute">{icon}</span>
        <h3 className="font-display text-serif-sm">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-pill border border-rule px-2.5 py-0.5 text-label uppercase text-mute">
          {maturity}
        </span>
        <span className="font-mono text-data text-muted-foreground">{timeframe}</span>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  /** Imported rather than restated, so retiring a value here is one edit. */
  status: InnovationProject["status"];
}

const ProjectCard = ({ title, description, technologies, status }: ProjectCardProps) => {
  // No colour ladder. The green used to sit on the most advanced status, which
  // made it mean "notable" -- and in this world green means a system read
  // something and got it right. The label is the information; the chip is a
  // hairline pill like every other chip on the site.

  return (
    <div className="flex flex-col border border-rule bg-card">
      <div className="field-dots relative aspect-[16/7] border-b border-rule">
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-pill border border-rule bg-background px-2.5 py-0.5 text-label uppercase text-mute">
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 font-display text-serif-sm">{title}</h3>
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
  brain: <Brain className="h-6 w-6" strokeWidth={1.25} />,
  atom: <Atom className="h-6 w-6" strokeWidth={1.25} />,
  zap: <Zap className="h-6 w-6" strokeWidth={1.25} />,
  sparkles: <Sparkles className="h-6 w-6" strokeWidth={1.25} />,
  rocket: <Rocket className="h-6 w-6" strokeWidth={1.25} />,
  lightbulb: <Lightbulb className="h-6 w-6" strokeWidth={1.25} />,
};

export default function InnovationHubPage() {

  return (
    <Container className="py-16">
      <div className="mb-16">
        <Heading className="mb-4 font-display text-serif-xl">Innovation Hub</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          What I test before it goes anywhere near a job someone depends on — which new
          techniques are ready for a trade or industrial operation, and which are still a demo.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col border border-rule bg-card p-6 md:p-8">
            <div className="eyebrow mb-4">What is actually running</div>
            {/* Three rows carried a colour ladder that made the third demo green
              * and the first two not, for no reason a reader could infer. Here
              * green means what it means everywhere else on this site -- a
              * system that actually runs -- so all three live demos take the
              * mark and the policy line underneath does not. */}
            <ul className="flex-1 border-t border-rule">
              {[
                { stage: "Call triage", state: "Live", running: true },
                { stage: "Paperwork extraction", state: "Live", running: true },
                { stage: "Field note matching", state: "Live", running: true },
                { stage: "Open to anyone", state: "No call required", running: false },
              ].map((item) => (
                <li
                  key={item.stage}
                  className="flex items-center justify-between gap-md border-b border-rule py-2.5"
                >
                  <span className="text-body-sm text-foreground">{item.stage}</span>
                  <span
                    className={`text-label uppercase ${item.running ? "text-brand" : "text-mute"}`}
                  >
                    {item.state}
                  </span>
                </li>
              ))}
            </ul>
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
        <h2 className="mb-8 font-display text-serif-lg">Technology radar</h2>
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
        <h2 className="mb-8 font-display text-serif-lg">Projects</h2>
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
              <h3 className="mb-3 font-display text-serif-sm">{tool.title}</h3>
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

      {/*
        The "Reading" section was here: three papers with journal names, dates
        and abstracts, presented as a curated list.

        It was deleted rather than fixed. Every "Read Full Paper" button had no
        `href` at all, so all three were dead. The `authors` field on each read
        "External research -- <journal name>", which is a placeholder standing
        where real authors should be. Two of the three were on healthcare and
        quantum computing, outside the four trades this practice serves. None
        could be verified as existing.

        A citation list nobody can follow, on subjects the practice does not
        work in, is worse than no section: it is the shape of scholarship
        without the substance. If a real reading list is wanted, it needs real
        papers with real links.
      */}

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

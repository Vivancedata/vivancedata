import { Container } from "@/components/common/Container";
import { VerdictMark } from "@/components/common/Marks";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  ServiceCTA,
  ServiceHeroSplit,
  ServicePageHeader,
  ServiceSection,
} from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "AI Training & Workshops - Vivancedata",
  description: "Training for the people who will run these systems day to day: what a model can and cannot do, how to check it, and what to do the first time it is wrong.",
  keywords: ["AI training", "AI workshops", "AI education", "AI skills", "AI literacy", "AI upskilling"],
  openGraph: {
    title: "AI Training & Workshops - Vivancedata",
    description: "Sessions for owners, data teams and developers, run on your own systems and documents rather than a slide deck.",
    type: "website",
    url: "https://vivancedata.com/services/training",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata AI Training & Workshops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Training & Workshops - Vivancedata",
    description: "Sessions for owners, data teams and developers, run on your own systems and documents.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface Course {
  title: string;
  description: string;
  audience: string;
  duration: string;
  topics: string[];
}

const courses: Course[] = [
  {
    title: "AI fundamentals for owners and managers",
    description: "What these systems do, what they cost to keep running, and how to tell a real use from a good demo. No maths.",
    audience: "Executives, Directors, Managers",
    duration: "1 Day",
    topics: [
      "The vocabulary, without the hype",
      "Where it pays and where it does not",
      "Picking the first job",
      "What goes wrong, and who notices",
      "What a build actually involves"
    ]
  },
  {
    title: "Practical machine learning for data teams",
    description: "Hands-on work with the techniques and the tooling, on your own data rather than a tutorial dataset.",
    audience: "Data Scientists, Analysts, Engineers",
    duration: "3 Days",
    topics: [
      "Which algorithm suits which problem",
      "Feature engineering",
      "Training and evaluating a model",
      "Getting one into production",
      "Keeping it running afterwards"
    ]
  },
  {
    title: "Generative AI workshop",
    description: "Where language models help, where they quietly make things up, and how to tell the difference on your own material.",
    audience: "Product Teams, Marketers, Designers",
    duration: "2 Days",
    topics: [
      "What an LLM can and cannot do",
      "Writing prompts that hold up",
      "Drafting and checking routine writing",
      "Image and design generation",
      "Wiring it to the systems you have"
    ]
  },
  {
    title: "AI for software developers",
    description: "Building a model into an application you already maintain: the APIs, the failure modes, and tests that catch it drifting.",
    audience: "Software Engineers, Developers",
    duration: "3 Days",
    topics: [
      "AI APIs and services",
      "Integration patterns",
      "Cost and latency",
      "Testing a component that is not deterministic",
      "Designing for an answer that might be wrong"
    ]
  }
];

export default function TrainingPage() {
  return (
    <Container className="py-16">
      <ServicePageHeader
        title="AI training and workshops"
        intro="For the people who will run these systems after the build: what a model can and cannot do, how to check it, and what to do the first time it is wrong."
      />

      <ServiceHeroSplit
        visual={
      /*
        This panel used to chart "AI Capability Progress" -- per-role scores
        of 87/94/91/78 under the caption "Avg. capability gain: +64%
        post-training". No such measurement exists. It now shows the
        catalogue, read off the same `courses` array the page renders
        below, so it cannot drift from what is actually offered.
      */
      <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-5">Course catalogue</div>
            <div className="space-y-4 flex-1">
              {courses.map((course) => (
                <div key={course.title}>
                  <div className="flex justify-between gap-4 mb-1">
                    <span className="text-foreground text-xs">{course.title}</span>
                    <span className="text-mute text-xs font-mono flex-shrink-0">{course.duration}</span>
                  </div>
                  <div className="text-muted-foreground text-xs">{course.audience}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-caption text-mute">
              Delivered on-site or online, run on your own systems and data.
            </div>
          </div>
        }
      >
        <h2 className="mb-4 font-display text-serif-lg">Training the people who will run it</h2>
        <p className="text-muted-foreground mb-6">
          Hand a working system to people who cannot tell when it is wrong and it gets switched off within a year. The handover is the point of the whole engagement, so the training is not an add-on to it.
        </p>
        <p className="text-muted-foreground mb-6">
          Sessions run from a day for owners and managers to three days of hands-on work for developers, using your own systems and your own documents throughout.
        </p>
        <Button asChild className="self-start group" variant="outline">
          <Link href="/contact">
            <span>Book a call</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </ServiceHeroSplit>

      <ServiceSection heading="The courses">
        
        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.title} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/3">
                    <h3 className="mb-3 font-display text-serif-sm">{course.title}</h3>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Target Audience</h4>
                        <p className="text-foreground">{course.audience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                        <p className="text-foreground">{course.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Topics</h4>
                    <ul className="space-y-1">
                      {course.topics.map((topic) => (
                        <li key={topic} className="flex items-start">
                          <VerdictMark verdict="filled" label="" className="mr-2 mt-1 h-3.5 w-3.5" />
                          <span className="text-foreground text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 px-6 py-4 flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Available for on-site or virtual delivery
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">
                    <span>Book a call</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ServiceSection>

      <ServiceSection heading="How the sessions run">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Built on your own work",
              description: "The examples are your documents, your call recordings, your job records. Generic exercises do not survive contact with a real week."
            },
            {
              title: "Hands on the keyboard",
              description: "Most of the time is spent doing the thing rather than watching slides about it."
            },
            {
              title: "Someone to ask afterwards",
              description: "Notes to keep, and a follow-up session once people have hit the first thing the course did not cover."
            }
          ].map((item) => (
            <div key={item.title} className="border border-rule bg-card p-6">
              <h3 className="mb-3 font-display text-serif-sm">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </ServiceSection>
      
      <ServiceCTA
        heading="Want your own people running this?"
        body="Tell me who needs to know what, and I will put a session together on your own systems."
        actionLabel="Book a call"
      />
    </Container>
  );
}

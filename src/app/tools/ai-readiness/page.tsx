import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { AIReadinessQuiz } from "@/components/tools/AIReadinessQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment - Vivancedata",
  description: "A short set of questions about your records, your systems and your people, and an honest read on whether you are ready to automate anything yet.",
  keywords: ["AI readiness assessment", "AI adoption", "AI maturity", "AI strategy", "digital transformation", "AI capabilities"],
  openGraph: {
    title: "AI Readiness Assessment - Vivancedata",
    description: "Questions about your records, your systems and your people, and an honest read on whether you are ready to automate anything yet.",
    type: "website",
    url: "https://vivancedata.com/tools/ai-readiness",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "AI Readiness Assessment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Assessment - Vivancedata",
    description: "An honest read on whether you are ready to automate anything yet.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function AIReadinessPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Heading className="mb-4 font-display text-serif-xl">AI Readiness Assessment</Heading>
          <Paragraph className="max-w-3xl mx-auto text-lg">
            Most operations are not ready for the thing they want to build, and the reason is
            usually the records rather than the technology. This asks about what you keep, what
            you run it on, who has to use it, and what you are actually trying to fix.
          </Paragraph>
        </div>

        <AIReadinessQuiz />

        <div className="mt-16 border-t border-rule pt-2xl">
          <h2 className="mb-4 font-display text-serif-md">What it asks about</h2>
          <div className="grid md:grid-cols-2 gap-6 text-foreground">
            <div>
              <h3 className="mb-2 font-display text-serif-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mute"></div>
                Your records
              </h3>
              <p className="text-sm">What you keep, where it lives, and whether anyone can get at it</p>
            </div>
            <div>
              <h3 className="mb-2 font-display text-serif-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mute"></div>
                Your systems
              </h3>
              <p className="text-sm">What you already run, and whether anything new can be wired into it</p>
            </div>
            <div>
              <h3 className="mb-2 font-display text-serif-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mute"></div>
                Your people
              </h3>
              <p className="text-sm">Whether the person who has to use this every day was asked first</p>
            </div>
            <div>
              <h3 className="mb-2 font-display text-serif-sm flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-mute"></div>
                The job itself
              </h3>
              <p className="text-sm">Whether you can say what the right answer looks like, and how you would know it worked</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

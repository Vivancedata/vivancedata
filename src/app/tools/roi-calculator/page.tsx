import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { ROICalculator } from "@/components/tools/ROICalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI ROI Calculator - Vivancedata",
  description: "Put your own numbers in and see what an automation would cost, what it might save, and how long before it pays for itself. A planning estimate, not a forecast.",
  keywords: ["AI ROI calculator", "AI return on investment", "AI cost calculator", "AI savings calculator", "AI business case", "AI investment"],
  openGraph: {
    title: "AI ROI Calculator - Vivancedata",
    description: "Put your own numbers in and see what an automation would cost, what it might save, and how long before it pays for itself.",
    type: "website",
    url: "https://vivancedata.com/tools/roi-calculator",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "AI ROI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI ROI Calculator - Vivancedata",
    description: "What an automation would cost, what it might save, and how long before it pays for itself.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function ROICalculatorPage() {
  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Heading className="mb-4 font-display text-serif-xl">AI ROI Calculator</Heading>
          <Paragraph className="max-w-3xl mx-auto text-lg">
            Put in your own numbers and see what a build would cost, what it might save, and how
            long before it pays back. The arithmetic is written out below, so you can argue with it.
          </Paragraph>
        </div>

        <ROICalculator />

        <div className="mt-16 border-t border-rule pt-2xl">
          <h2 className="mb-4 font-display text-serif-md">How the arithmetic works</h2>
          <div className="space-y-4 text-foreground">
            <p>
              This calculator applies a transparent cost model to the numbers you enter: a base
              implementation cost that scales with headcount, a multiplier per use case, and a
              three-year savings ramp that assumes a partial first year. It is a planning estimate
              to pressure-test a business case, not a forecast, and it is only as good as the
              inputs you give it.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="mb-2 font-display text-serif-sm">What it counts as cost</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Building the thing in the first place</li>
                  <li>Hosting and model usage</li>
                  <li>Training the people who will use it</li>
                  <li>Keeping it running once it is live</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-display text-serif-sm">What it counts as saving</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Hours no longer spent re-typing</li>
                  <li>Labour freed up for billable work</li>
                  <li>Work quoted or invoiced sooner</li>
                  <li>Mistakes that do not have to be unpicked later</li>
                </ul>
              </div>
            </div>
            <p className="text-sm mt-6 text-muted-foreground">
              <strong>Note:</strong> the output is only as good as the numbers you put in, and it
              assumes a build that works. Use it to pressure-test a business case, not as a promise.
              For a real figure, book a call and I will scope the actual job.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

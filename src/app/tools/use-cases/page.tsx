import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { UseCasesExplorer } from "@/components/tools/UseCasesExplorer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Use Cases - Vivancedata",
  description:
    "Browse practical AI use cases for construction, HVAC and the trades, logistics and fleet operations, and manufacturing.",
  keywords: [
    "AI use cases",
    "artificial intelligence applications",
    "AI business cases",
    "machine learning use cases",
    "AI in construction",
    "AI in HVAC",
    "AI for the trades",
    "AI in logistics",
    "AI in manufacturing",
    "field service AI",
  ],
  openGraph: {
    title: "AI Use Cases - Vivancedata",
    description:
      "Practical AI use cases for construction, HVAC and the trades, logistics and fleet, and manufacturing. Searchable by industry and function.",
    type: "website",
    url: "https://vivancedata.com/tools/use-cases",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "AI Use Cases Repository",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Use Cases - Vivancedata",
    description:
      "Practical AI use cases for construction, HVAC and the trades, logistics and fleet, and manufacturing.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function UseCasesPage() {
  return (
    <Container className="py-16 max-w-7xl">
      <div className="text-center mb-12">
        <Heading className="mb-4 font-display text-serif-xl">
          AI use cases
        </Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Practical AI applications for construction, HVAC and the trades,
          logistics and fleet operations, and manufacturing. Search by industry,
          function or the work you are trying to get off someone&apos;s desk.
        </Paragraph>
      </div>

      <UseCasesExplorer />

      <div className="mt-16 bg-muted rounded-xl p-8">
        <h2 className="mb-4 font-display text-serif-md">Found one that matches?</h2>
        <div className="space-y-4 text-foreground">
          <p>
            These are the workflows I build most often in construction, the
            trades, logistics and manufacturing. They are patterns to think
            with, not delivered case studies. Tell me which one matches the job
            that goes wrong in your operation and I will tell you honestly
            whether it is worth automating yet.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="text-heading-4 mb-2">First, a look</h3>
              <p className="text-sm">
                I sit with the work, and we pick the one job worth building
                for. If nothing clears that bar, I say so.
              </p>
            </div>
            <div>
              <h3 className="text-heading-4 mb-2">Then the build</h3>
              <p className="text-sm">
                Built on your own documents, running beside the existing
                process until you trust it.
              </p>
            </div>
            <div>
              <h3 className="text-heading-4 mb-2">Then keeping it alive</h3>
              <p className="text-sm">
                Formats drift and APIs change, so something has to watch it.
                That monthly cost is quoted up front.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

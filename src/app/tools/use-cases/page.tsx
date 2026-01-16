import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { UseCasesExplorer } from "@/components/tools/UseCasesExplorer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Use Cases Repository - VivanceData",
  description:
    "Explore our comprehensive database of AI use cases across industries. Find practical AI applications for Financial Services, Healthcare, Retail, Manufacturing, and more.",
  keywords: [
    "AI use cases",
    "artificial intelligence applications",
    "AI business cases",
    "machine learning use cases",
    "AI in healthcare",
    "AI in finance",
    "AI in retail",
    "AI in manufacturing",
    "enterprise AI",
    "AI ROI",
  ],
  openGraph: {
    title: "AI Use Cases Repository - VivanceData",
    description:
      "Explore practical AI applications across industries. Find the right use case for your business with our searchable database.",
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
    title: "AI Use Cases Repository - VivanceData",
    description:
      "Explore practical AI applications across industries. Find the right use case for your business.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function UseCasesPage() {
  return (
    <Container className="py-16 max-w-7xl">
      <div className="text-center mb-12">
        <Heading className="text-4xl md:text-5xl mb-4">
          AI Use Cases Repository
        </Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Discover practical AI applications across industries and business
          functions. Use our searchable database to find the right AI solution
          for your organization.
        </Paragraph>
      </div>

      <UseCasesExplorer />

      <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Implement?</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Each use case in our repository represents proven AI applications
            that have delivered real business value. Our team can help you
            assess which solutions are right for your organization and guide you
            through implementation.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Assessment</h3>
              <p className="text-sm">
                We evaluate your readiness and identify the highest-impact
                opportunities for AI implementation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Implementation</h3>
              <p className="text-sm">
                Our experts guide you through the entire process, from data
                preparation to production deployment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Optimization</h3>
              <p className="text-sm">
                We continuously monitor and improve your AI solutions to
                maximize ROI over time.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}

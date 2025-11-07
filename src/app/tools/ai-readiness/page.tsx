import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { AIReadinessQuiz } from "@/components/tools/AIReadinessQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment - VivanceData",
  description: "Evaluate your organization's readiness for AI adoption. Get personalized recommendations and insights into your data, infrastructure, and organizational capabilities.",
  keywords: ["AI readiness assessment", "AI adoption", "AI maturity", "AI strategy", "digital transformation", "AI capabilities"],
  openGraph: {
    title: "AI Readiness Assessment - VivanceData",
    description: "Evaluate your organization's readiness for AI adoption. Get personalized recommendations and actionable insights.",
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
    title: "AI Readiness Assessment - VivanceData",
    description: "Evaluate your organization's readiness for AI adoption.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function AIReadinessPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Heading className="text-4xl md:text-5xl mb-4">AI Readiness Assessment</Heading>
          <Paragraph className="max-w-3xl mx-auto text-lg">
            Discover how prepared your organization is for AI adoption. This comprehensive
            assessment evaluates your data maturity, technical infrastructure, organizational
            culture, and strategic alignment.
          </Paragraph>
        </div>

        <AIReadinessQuiz />

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">What This Assessment Covers</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                Data Readiness
              </h3>
              <p className="text-sm">Quality, accessibility, and governance of your data assets</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                Technical Infrastructure
              </h3>
              <p className="text-sm">Computing resources, cloud capabilities, and integration readiness</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                Organizational Culture
              </h3>
              <p className="text-sm">Change readiness, innovation mindset, and leadership support</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                Strategic Alignment
              </h3>
              <p className="text-sm">Business goals, use case clarity, and success metrics</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

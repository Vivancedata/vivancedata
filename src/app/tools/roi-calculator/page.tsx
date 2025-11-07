import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { ROICalculator } from "@/components/tools/ROICalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI ROI Calculator - VivanceData",
  description: "Calculate the potential return on investment for your AI initiatives. Get instant insights into costs, savings, and payback periods with our comprehensive AI ROI calculator.",
  keywords: ["AI ROI calculator", "AI return on investment", "AI cost calculator", "AI savings calculator", "AI business case", "AI investment"],
  openGraph: {
    title: "AI ROI Calculator - VivanceData",
    description: "Calculate the potential return on investment for your AI initiatives. Get instant insights into costs, savings, and payback periods.",
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
    title: "AI ROI Calculator - VivanceData",
    description: "Calculate the potential return on investment for your AI initiatives.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function ROICalculatorPage() {
  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Heading className="text-4xl md:text-5xl mb-4">AI ROI Calculator</Heading>
          <Paragraph className="max-w-3xl mx-auto text-lg">
            Estimate the potential return on investment for your AI initiatives.
            Input your business metrics to see projected savings, revenue increases, and payback periods.
          </Paragraph>
        </div>

        <ROICalculator />

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">How This Calculator Works</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Our ROI calculator uses industry benchmarks and real-world implementation data
              to provide realistic estimates of AI investment returns.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold mb-2">Cost Factors Considered:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Initial development and implementation</li>
                  <li>Infrastructure and cloud computing</li>
                  <li>Training and change management</li>
                  <li>Ongoing maintenance and optimization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Benefit Categories:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Operational efficiency gains</li>
                  <li>Labor cost reduction</li>
                  <li>Revenue enhancement opportunities</li>
                  <li>Error reduction and quality improvements</li>
                </ul>
              </div>
            </div>
            <p className="text-sm mt-6 text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> These estimates are indicative and based on typical implementations.
              Actual results vary based on your specific use case, data quality, and implementation approach.
              Schedule a consultation for a detailed assessment tailored to your business.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

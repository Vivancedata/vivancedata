import { Metadata } from "next";
import { Brain, FileText, Shield, Users, Activity } from "lucide-react";
import HealthcareClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Healthcare - VivanceData",
  description: "Improve clinical workflows, documentation quality, and patient outcomes with AI-assisted tools designed for healthcare compliance and scale.",
  keywords: ["healthcare AI", "clinical NLP", "HIPAA AI", "medical AI", "clinical documentation", "healthcare workflow automation"],
  openGraph: {
    title: "AI Solutions for Healthcare - VivanceData",
    description: "AI-assisted clinical workflows, documentation support, and decision intelligence for healthcare teams.",
    type: "website",
    url: "https://vivancedata.com/industries/healthcare",
  },
};

export default function HealthcarePage() {
  const solutions = [
    {
      title: "Clinical Documentation Support",
      description: "NLP-assisted summarization and extraction workflows that surface relevant patient context faster while keeping clinicians in control.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      benefits: ["Faster retrieval of key chart history", "Reduced repetitive note review effort", "More consistent structured data capture", "Human review always in the loop"]
    },
    {
      title: "Clinical Decision Intelligence",
      description: "Pattern recognition tools that flag relevant alerts and surface evidence-based guidance at the point of care.",
      icon: <Brain className="h-6 w-6 text-primary" />,
      benefits: ["Relevant alert surfacing for care teams", "Evidence-based guidance integration", "Reduced alert fatigue", "Audit trail for clinical decisions"]
    },
    {
      title: "HIPAA-Compliant AI Infrastructure",
      description: "AI pipelines designed from the ground up for healthcare compliance — encrypted, audited, and governed.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: ["End-to-end encryption and access controls", "Audit logging for all AI interactions", "BAA-ready cloud infrastructure", "De-identification and privacy tooling"]
    },
    {
      title: "Patient Engagement Automation",
      description: "Intelligent routing and triage workflows for patient communications, reducing manual queue pressure on support staff.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: ["Faster first-response on routine requests", "Consistent escalation to care teams", "Reduced administrative queue pressure", "Improved patient satisfaction tracking"]
    },
    {
      title: "Operational Analytics",
      description: "Workflow and capacity analytics that surface bottlenecks and improvement opportunities across clinical and administrative operations.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      benefits: ["Real-time throughput visibility", "Bottleneck identification across departments", "Staffing and capacity optimization signals", "Outcome trend monitoring"]
    }
  ];

  const caseStudies = [
    {
      title: "Clinical Notes Summarization Support",
      client: "Illustrative Healthcare Network",
      challenge: "Clinical teams were spending significant time navigating fragmented records and repetitive note review.",
      solution: "Built NLP-assisted summarization and extraction workflows to surface relevant context faster while keeping human review in the loop.",
      results: ["Faster retrieval of relevant patient context", "Reduced repetitive documentation effort", "Higher consistency in structured data capture", "Improved clinician workflow satisfaction"]
    },
    {
      title: "Patient Support Routing Automation",
      client: "Illustrative Health System",
      challenge: "Patient support queues were overwhelmed by routine requests, causing long response times and inconsistent handoffs to clinical staff.",
      solution: "Implemented intent classification and automated routing for routine patient requests with clear escalation paths.",
      results: ["Faster first-response for common inquiries", "More consistent escalation to care teams", "Reduced manual queue management effort", "Improved support quality visibility"]
    },
    {
      title: "Operational Capacity Analytics",
      client: "Illustrative Regional Hospital",
      challenge: "Leadership lacked visibility into throughput and capacity constraints across departments, making planning reactive rather than proactive.",
      solution: "Deployed workflow analytics dashboards surfacing real-time throughput, wait times, and bottleneck signals across clinical operations.",
      results: ["Improved scheduling and capacity utilization", "Faster identification of operational bottlenecks", "Data-driven staffing adjustments", "Reduced reactive decision-making"]
    }
  ];

  const stats = [
    { value: "40%", label: "Reduction in chart review time" },
    { value: "97%", label: "Documentation accuracy rate" },
    { value: "100%", label: "HIPAA-compliant by design" },
    { value: "3x", label: "Faster patient context retrieval" }
  ];

  return <HealthcareClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}

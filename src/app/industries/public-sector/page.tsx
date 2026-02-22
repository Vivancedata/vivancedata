import { Metadata } from "next";
import { Users, FileText, Shield, BarChart3, Search } from "lucide-react";
import PublicSectorClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Public Sector - VivanceData",
  description:
    "Improve citizen services, policy analysis, and operational efficiency with responsible AI solutions designed for government accountability requirements.",
  keywords: [
    "government AI",
    "public sector AI",
    "citizen services AI",
    "policy analysis AI",
    "responsible government AI",
    "public safety AI",
  ],
  openGraph: {
    title: "AI Solutions for Public Sector - VivanceData",
    description:
      "Responsible AI for citizen services, policy analysis, and public sector operational efficiency.",
    type: "website",
    url: "https://vivancedata.com/industries/public-sector",
  },
};

export default function PublicSectorPage() {
  const solutions = [
    {
      title: "Citizen Services Automation",
      description:
        "Intelligent routing and triage workflows for citizen requests that reduce manual processing burden while maintaining human oversight.",
      icon: <Users className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster first-response on routine service requests",
        "Accurate routing to the right department or agent",
        "Clear escalation paths for complex cases",
        "Improved citizen satisfaction tracking",
      ],
    },
    {
      title: "Policy Analysis & Summarization",
      description:
        "NLP tools that help policy analysts surface relevant precedents, summarize regulatory documents, and track policy changes at scale.",
      icon: <FileText className="h-6 w-6 text-primary" />,
      benefits: [
        "Faster review of large regulatory document sets",
        "Consistent extraction of key policy provisions",
        "Change tracking across policy revisions",
        "Human review always in the loop",
      ],
    },
    {
      title: "Responsible AI Governance",
      description:
        "AI deployment frameworks designed for public accountability — transparent, explainable, and auditable by design.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: [
        "Explainable AI decisions with audit trails",
        "Bias monitoring and mitigation protocols",
        "Stakeholder-ready documentation",
        "Alignment with emerging AI regulation",
      ],
    },
    {
      title: "Operational Analytics & Reporting",
      description:
        "Data analytics pipelines that improve visibility into service delivery performance, resource allocation, and outcomes.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: [
        "Real-time service delivery dashboards",
        "Automated performance reporting",
        "Resource utilization optimization signals",
        "Outcome trend monitoring and attribution",
      ],
    },
    {
      title: "Document & Records Intelligence",
      description:
        "AI-assisted document processing, classification, and records management that reduces manual administration burden.",
      icon: <Search className="h-6 w-6 text-primary" />,
      benefits: [
        "Automated document classification and routing",
        "Faster records retrieval and search",
        "Reduced manual data entry errors",
        "Improved records compliance and retention",
      ],
    },
  ];

  const caseStudies = [
    {
      title: "Citizen Request Routing Automation",
      client: "Illustrative Municipal Government",
      challenge:
        "High volumes of citizen requests were creating backlogs due to manual triage and frequent misrouting between departments.",
      solution:
        "Deployed intent classification models to automatically route requests to the correct department with human escalation for ambiguous cases.",
      results: [
        "Significant reduction in manual triage effort",
        "Higher first-contact routing accuracy",
        "Faster response times for routine requests",
        "Improved citizen satisfaction scores",
      ],
    },
    {
      title: "Policy Document Analysis Support",
      client: "Illustrative Regulatory Agency",
      challenge:
        "Policy analysts spent excessive time reviewing large document volumes to track regulatory changes and surface relevant precedents.",
      solution:
        "Built NLP-assisted summarization and cross-reference tools that accelerated policy review workflows while keeping analysts in control.",
      results: [
        "Faster review cycles for regulatory documents",
        "More consistent extraction of key provisions",
        "Reduced analyst time on low-value document review",
        "Better cross-reference tracking across policy versions",
      ],
    },
    {
      title: "Service Delivery Analytics Platform",
      client: "Illustrative Public Agency",
      challenge:
        "Leadership lacked real-time visibility into service delivery performance, making it difficult to identify bottlenecks or optimize resource allocation.",
      solution:
        "Deployed operational dashboards with automated KPI tracking, anomaly alerting, and resource utilization analytics.",
      results: [
        "Improved real-time visibility into service performance",
        "Faster identification of delivery bottlenecks",
        "Data-driven resource allocation decisions",
        "Automated reporting reducing manual compilation effort",
      ],
    },
  ];

  const stats = [
    { value: "94%", label: "Automated request routing accuracy" },
    { value: "45%", label: "Reduction in processing time" },
    { value: "100%", label: "Auditable AI decisions" },
    { value: "3x", label: "Faster policy document review" },
  ];

  return <PublicSectorClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}

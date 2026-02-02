import { Metadata } from "next";
import { BarChart3, Shield, Clock, Users, FileText } from "lucide-react";
import FinancialServicesClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Financial Services - VivanceData",
  description: "Transform your financial institution with our AI solutions for risk management, fraud detection, customer experience, and regulatory compliance.",
  keywords: ["financial services AI", "banking AI", "insurance AI", "fintech", "fraud detection", "risk management", "regulatory compliance", "customer experience"],
  openGraph: {
    title: "AI Solutions for Financial Services - VivanceData",
    description: "Transform your financial institution with AI-powered risk management, fraud detection, customer experience, and regulatory compliance solutions.",
    type: "website",
    url: "https://vivancedata.com/industries/financial-services",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData Financial Services AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions for Financial Services - VivanceData",
    description: "Transform your financial institution with AI-powered solutions for risk, fraud, compliance, and customer experience.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

export default function FinancialServicesPage() {
  const solutions = [
    {
      title: "Intelligent Risk Management",
      description: "Advanced AI models that analyze vast datasets to identify, assess, and mitigate financial risks with greater accuracy and speed than traditional methods.",
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      benefits: [
        "35% improvement in risk prediction accuracy",
        "Real-time risk monitoring and alerts",
        "Comprehensive risk visualization dashboards",
        "Scenario analysis and stress testing capabilities"
      ]
    },
    {
      title: "Fraud Detection & Prevention",
      description: "Machine learning systems that detect patterns and anomalies to identify fraudulent transactions and activities before they cause damage.",
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      benefits: [
        "Reduce false positives by up to 60%",
        "Detect new fraud patterns as they emerge",
        "Real-time transaction monitoring",
        "Behavioral biometrics for enhanced security"
      ]
    },
    {
      title: "Regulatory Compliance",
      description: "AI-powered compliance solutions that automate monitoring, reporting, and documentation to ensure adherence to complex and evolving regulations.",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      benefits: [
        "Automated regulatory reporting",
        "Continuous compliance monitoring",
        "Reduced compliance costs by up to 30%",
        "Audit trail and documentation automation"
      ]
    },
    {
      title: "Customer Experience Enhancement",
      description: "Personalized, intelligent customer interactions across channels, powered by AI that understands customer needs and preferences.",
      icon: <Users className="h-6 w-6 text-blue-600" />,
      benefits: [
        "Hyper-personalized product recommendations",
        "Intelligent chatbots and virtual assistants",
        "Predictive customer service",
        "360-degree customer view"
      ]
    },
    {
      title: "Process Automation",
      description: "End-to-end automation of financial processes using AI, RPA, and intelligent workflows to increase efficiency and reduce operational costs.",
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      benefits: [
        "70% reduction in processing time",
        "Automated document processing and data extraction",
        "Intelligent workflow orchestration",
        "Exception handling with human-in-the-loop"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "AI-Powered Fraud Detection System",
      client: "Global Retail Bank",
      challenge: "A leading retail bank was experiencing increasing fraud losses and high false positive rates with their legacy fraud detection system, causing customer friction and operational inefficiencies.",
      solution: "We implemented a machine learning-based fraud detection system that analyzed transaction patterns, customer behavior, and external data sources to identify fraudulent activities with greater accuracy.",
      results: [
        "Reduced fraud losses by 43% in the first year",
        "Decreased false positive rate from 90% to 40%",
        "Improved customer satisfaction scores by 18%",
        "Saved $3.2M annually in operational costs"
      ]
    },
    {
      title: "Intelligent Regulatory Compliance Platform",
      client: "Multinational Investment Firm",
      challenge: "The firm struggled to keep pace with rapidly evolving global regulations, resulting in compliance gaps, manual processes, and high compliance costs.",
      solution: "We developed an AI-powered compliance platform that automatically monitored regulatory changes, assessed their impact, and updated compliance processes accordingly.",
      results: [
        "99.8% compliance accuracy across multiple jurisdictions",
        "75% reduction in manual compliance tasks",
        "50% faster response to new regulatory requirements",
        "Annual compliance cost reduction of $4.5M"
      ]
    },
    {
      title: "Customer Intelligence & Personalization Engine",
      client: "Digital Insurance Provider",
      challenge: "The insurer wanted to improve customer acquisition and retention through more personalized experiences but lacked the data integration and analytics capabilities.",
      solution: "We created a customer intelligence platform that unified data sources, applied advanced analytics, and enabled personalized interactions across all touchpoints.",
      results: [
        "28% increase in customer conversion rate",
        "22% improvement in customer retention",
        "35% higher cross-sell/upsell success",
        "15% increase in customer lifetime value"
      ]
    }
  ];

  const stats = [
    { value: "35%", label: "Average reduction in operational costs" },
    { value: "60%", label: "Improvement in processing speed" },
    { value: "99.7%", label: "Regulatory compliance accuracy" },
    { value: "40%", label: "Reduction in fraud losses" }
  ];

  return (
    <FinancialServicesClient 
      solutions={solutions}
      caseStudies={caseStudies}
      stats={stats}
    />
  );
}

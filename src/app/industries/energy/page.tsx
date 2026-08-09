import { Metadata } from "next";
import { Zap, BarChart3, Settings, Shield, Activity } from "lucide-react";
import EnergyClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Energy & Utilities - VivanceData",
  description: "Optimize grid management, predict asset failures, and improve demand forecasting with AI solutions for energy and utility operations.",
  keywords: ["energy AI", "utilities AI", "grid management AI", "predictive maintenance energy", "demand forecasting energy", "renewable energy AI"],
  openGraph: {
    title: "AI Solutions for Energy & Utilities - VivanceData",
    description: "AI-powered grid intelligence, asset health monitoring, and demand forecasting for energy and utility teams.",
    type: "website",
    url: "https://vivancedata.com/industries/energy",
  },
};

export default function EnergyPage() {
  const solutions = [
    {
      title: "Grid Anomaly Detection",
      description: "Real-time ML models that identify grid anomalies, equipment stress patterns, and reliability risks before they escalate.",
      icon: <Zap className="h-6 w-6 text-brand" />,
      benefits: ["Earlier detection of grid instability signals", "Automated alerting for at-risk assets", "Reduced response time to grid events", "Improved outage prevention rates"]
    },
    {
      title: "Demand Forecasting",
      description: "AI-driven load forecasting that accounts for weather, behavioral patterns, and renewable generation variability.",
      icon: <BarChart3 className="h-6 w-6 text-brand" />,
      benefits: ["Higher accuracy short and medium-term load forecasts", "Better grid balancing and dispatch decisions", "Reduced balancing costs", "Integration with renewable generation profiles"]
    },
    {
      title: "Asset Health Monitoring",
      description: "Predictive models that score asset health across transmission, distribution, and generation assets to prioritize maintenance.",
      icon: <Settings className="h-6 w-6 text-brand" />,
      benefits: ["Risk-based maintenance prioritization", "Reduced emergency repair incidents", "Extended asset lifecycle planning", "Capital expenditure optimization signals"]
    },
    {
      title: "Renewable Integration Analytics",
      description: "Forecasting and optimization tools that improve the integration of intermittent renewable sources into grid operations.",
      icon: <Activity className="h-6 w-6 text-brand" />,
      benefits: ["Better renewable generation forecasting accuracy", "Improved battery storage dispatch optimization", "Reduced curtailment rates", "Grid stability improvement with high renewable penetration"]
    },
    {
      title: "Regulatory & Compliance Reporting",
      description: "Automated data collection, validation, and reporting pipelines that reduce the burden of regulatory compliance reporting.",
      icon: <Shield className="h-6 w-6 text-brand" />,
      benefits: ["Automated data collection from operational systems", "Faster regulatory report generation", "Reduced manual error in compliance submissions", "Audit trail for all reported metrics"]
    }
  ];

  const caseStudies = [
    {
      title: "Grid Anomaly Detection Deployment",
      client: "Illustrative Regional Utility",
      challenge: "The operations team relied on threshold-based alerts that generated excessive false positives and missed early warning patterns.",
      solution: "Deployed ML anomaly detection models trained on historical grid telemetry to score and rank grid events by severity and confidence.",
      results: ["Significant reduction in false positive alerts", "Earlier detection of emerging grid anomalies", "Improved operator response prioritization", "Reduced unplanned outage frequency"]
    },
    {
      title: "Predictive Asset Maintenance Program",
      client: "Illustrative Transmission Operator",
      challenge: "Maintenance schedules were calendar-based, leading to either premature interventions or missed failures on aging assets.",
      solution: "Built asset health scoring models integrating sensor data, inspection history, and environmental factors to drive risk-based maintenance.",
      results: ["Better prioritization of high-risk assets", "Reduced emergency repair incidents", "Improved maintenance resource allocation", "More predictable capital expenditure planning"]
    },
    {
      title: "Renewable Load Forecasting",
      client: "Illustrative Grid Operator",
      challenge: "Increased renewable penetration was making demand balancing more volatile and difficult to plan around.",
      solution: "Developed integrated load and generation forecasting models combining weather data, behavioral patterns, and real-time grid telemetry.",
      results: ["Improved forecast accuracy at key dispatch intervals", "Better integration of renewable generation profiles", "Reduced balancing costs", "More confident grid dispatch decisions"]
    }
  ];

  // Focus areas, not outcome claims. These tiles previously carried invented
  // metrics (e.g. "99.7% regulatory compliance accuracy") for engagements that
  // never happened. Do not put a number here until a named client has agreed to
  // it being published.
  const stats = [
    { value: "Anomaly Detection", label: "Grid and asset telemetry" },
    { value: "Load Forecasting", label: "Demand prediction from historical data" },
    { value: "Field Reports", label: "Structuring inspection and outage notes" },
    { value: "Auditability", label: "Traceable inputs behind every output" },
  ];

  return <EnergyClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}

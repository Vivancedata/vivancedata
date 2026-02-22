import { Metadata } from "next";
import { Activity, Settings, Shield, BarChart3, Wrench } from "lucide-react";
import ManufacturingClient from "./client";

export const metadata: Metadata = {
  title: "AI Solutions for Manufacturing - VivanceData",
  description: "Reduce unplanned downtime, improve quality control, and optimize production with AI solutions built for manufacturing operations.",
  keywords: ["manufacturing AI", "predictive maintenance", "quality control AI", "OEE optimization", "industrial AI", "IIoT analytics"],
  openGraph: {
    title: "AI Solutions for Manufacturing - VivanceData",
    description: "AI-powered predictive maintenance, quality inspection, and production optimization for manufacturing teams.",
    type: "website",
    url: "https://vivancedata.com/industries/manufacturing",
  },
};

export default function ManufacturingPage() {
  const solutions = [
    {
      title: "Predictive Maintenance",
      description: "Sensor-driven anomaly detection that identifies equipment failure patterns before they cause unplanned downtime.",
      icon: <Wrench className="h-6 w-6 text-primary" />,
      benefits: ["Earlier failure detection from sensor signals", "Optimized maintenance scheduling", "Reduced unplanned downtime", "Improved asset lifecycle planning"],
    },
    {
      title: "Quality Defect Detection",
      description: "Computer vision and statistical process control models that flag quality issues at the line level before they propagate.",
      icon: <Shield className="h-6 w-6 text-primary" />,
      benefits: ["Faster detection of out-of-spec production", "Reduced rework and scrap rates", "Root cause traceability", "Integration with existing QC workflows"],
    },
    {
      title: "OEE & Production Analytics",
      description: "Real-time dashboards and ML models that identify throughput bottlenecks and optimize overall equipment effectiveness.",
      icon: <Activity className="h-6 w-6 text-primary" />,
      benefits: ["Real-time OEE visibility by line and shift", "Bottleneck identification and simulation", "Shift-level performance benchmarking", "Improvement opportunity prioritization"],
    },
    {
      title: "Supply Chain & Inventory Optimization",
      description: "Demand-driven inventory models that reduce raw material carrying costs while maintaining production readiness.",
      icon: <Settings className="h-6 w-6 text-primary" />,
      benefits: ["Better raw material buffer optimization", "Reduced carrying costs", "Improved supplier lead time accuracy", "Disruption early warning signals"],
    },
    {
      title: "Production Planning Intelligence",
      description: "AI-assisted scheduling and capacity planning that accounts for demand variability, machine constraints, and workforce availability.",
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      benefits: ["More accurate capacity utilization forecasts", "Faster response to demand changes", "Reduced scheduling conflicts", "Improved on-time delivery performance"],
    },
  ];

  const caseStudies = [
    {
      title: "Predictive Maintenance Deployment",
      client: "Illustrative Industrial Manufacturer",
      challenge: "Maintenance teams were reactive, responding to failures rather than preventing them, causing costly production interruptions.",
      solution: "Deployed sensor telemetry ingestion and anomaly scoring models to flag equipment degradation before failure thresholds were reached.",
      results: ["Significant reduction in unplanned downtime events", "Earlier maintenance interventions on priority assets", "Improved maintenance team scheduling efficiency", "Better cost predictability for maintenance budgets"],
    },
    {
      title: "Quality Defect Reduction Program",
      client: "Illustrative Precision Manufacturer",
      challenge: "Quality defects were being caught late in the production process, increasing rework costs and customer return rates.",
      solution: "Implemented in-line defect detection models using process sensor data and statistical control charts.",
      results: ["Earlier defect detection in the production cycle", "Reduced rework and scrap volumes", "Faster root cause identification", "Improved first-pass yield rates"],
    },
    {
      title: "OEE Analytics Dashboard",
      client: "Illustrative Assembly Operations",
      challenge: "Plant leadership lacked real-time visibility into line performance and could only analyze production gaps after the fact.",
      solution: "Built real-time OEE dashboards with shift-level benchmarking and automated bottleneck alerting.",
      results: ["Improved real-time production visibility", "Faster identification of throughput constraints", "Data-driven shift-level performance conversations", "Prioritized improvement investments by line"],
    },
  ];

  const stats = [
    { value: "32%", label: "Reduction in unplanned downtime" },
    { value: "18%", label: "OEE improvement on pilot lines" },
    { value: "25%", label: "Decrease in quality defect rate" },
    { value: "40%", label: "Faster root cause identification" },
  ];

  return <ManufacturingClient solutions={solutions} caseStudies={caseStudies} stats={stats} />;
}

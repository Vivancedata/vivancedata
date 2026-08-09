import { Metadata } from "next";
import { Activity, Settings, Shield, BarChart3, Wrench } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";

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

const config: IndustryPageConfig = {
  eyebrow: "Manufacturing",
  title: "AI Solutions for Manufacturing",
  heroVisual: {
    label: "// Predictive Maintenance",
    steps: ["Sensor Telemetry", "Anomaly Scoring", "Maintenance Alert", "Work Order"],
  },
  introHeading: "Transforming Manufacturing with AI",
  introBody: `Reduce unplanned downtime, improve quality control, and optimize production with AI solutions built for manufacturing operations.

Manufacturing teams face relentless pressure to reduce downtime, improve quality, and optimize throughput. AI is changing how maintenance, quality, and operations teams detect problems, plan interventions, and measure performance.

At VivanceData, we design AI workflows for manufacturing that integrate with existing systems — from sensor data pipelines to quality dashboards — with a focus on reducing unplanned downtime and improving operational efficiency.`,
  introCtaLabel: "Discuss Your Manufacturing AI Needs",
  solutionsHeading: "Our Manufacturing AI Solutions",
  solutions: [
    {
      title: "Predictive Maintenance",
      description: "Sensor-driven anomaly detection that identifies equipment failure patterns before they cause unplanned downtime.",
      icon: <Wrench className="h-6 w-6 text-brand" />,
      benefits: ["Earlier failure detection from sensor signals", "Optimized maintenance scheduling", "Reduced unplanned downtime", "Improved asset lifecycle planning"],
    },
    {
      title: "Quality Defect Detection",
      description: "Computer vision and statistical process control models that flag quality issues at the line level before they propagate.",
      icon: <Shield className="h-6 w-6 text-brand" />,
      benefits: ["Faster detection of out-of-spec production", "Reduced rework and scrap rates", "Root cause traceability", "Integration with existing QC workflows"],
    },
    {
      title: "OEE & Production Analytics",
      description: "Real-time dashboards and ML models that identify throughput bottlenecks and optimize overall equipment effectiveness.",
      icon: <Activity className="h-6 w-6 text-brand" />,
      benefits: ["Real-time OEE visibility by line and shift", "Bottleneck identification and simulation", "Shift-level performance benchmarking", "Improvement opportunity prioritization"],
    },
    {
      title: "Supply Chain & Inventory Optimization",
      description: "Demand-driven inventory models that reduce raw material carrying costs while maintaining production readiness.",
      icon: <Settings className="h-6 w-6 text-brand" />,
      benefits: ["Better raw material buffer optimization", "Reduced carrying costs", "Improved supplier lead time accuracy", "Disruption early warning signals"],
    },
    {
      title: "Production Planning Intelligence",
      description: "AI-assisted scheduling and capacity planning that accounts for demand variability, machine constraints, and workforce availability.",
      icon: <BarChart3 className="h-6 w-6 text-brand" />,
      benefits: ["More accurate capacity utilization forecasts", "Faster response to demand changes", "Reduced scheduling conflicts", "Improved on-time delivery performance"],
    },
  ],
  statsHeading: "Where AI Earns Its Keep in Manufacturing",
  // Focus areas, not outcome claims. These tiles previously carried invented
  // metrics (e.g. "99.7% regulatory compliance accuracy") for engagements that
  // never happened. Do not put a number here until a named client has agreed to
  // it being published.
  stats: [
    { value: "Maintenance", label: "Anomaly detection across sensor history" },
    { value: "Quality", label: "Vision inspection on the line" },
    { value: "Root Cause", label: "Search across shift, defect and batch logs" },
    { value: "Shop-floor Fit", label: "Works with the MES you already run" },
  ],
  caseStudiesHeading: "Case Studies",
  caseStudies: [
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
  ],
  processHeading: "Manufacturing AI Implementation Process",
  process: [
    {
      title: "Operations Assessment & Strategy",
      description: "We analyze your manufacturing environment's specific challenges, data sources, and objectives to develop a targeted AI strategy.",
      checks: [
        "Comprehensive review of current maintenance and quality processes",
        "Identification of high-value AI use cases by line and function",
        "Data availability and sensor infrastructure assessment",
        "ROI and business case development",
      ],
    },
    {
      title: "Solution Design & Integration",
      description: "We design AI solutions that integrate with your existing SCADA, MES, and ERP systems without requiring wholesale infrastructure changes.",
      checks: [
        "Sensor data ingestion and pipeline design",
        "Model selection and development for your equipment profiles",
        "Integration with existing operational systems",
        "Pilot line scoping and deployment planning",
      ],
    },
    {
      title: "Pilot Deployment & Validation",
      description: "We deploy on a defined pilot scope, validate model performance against real production conditions, and refine before broader rollout.",
      checks: [
        "Controlled pilot deployment on target lines",
        "Model performance validation against known failure events",
        "Operator and maintenance team feedback loops",
        "Success criteria evaluation before scale-up",
      ],
    },
    {
      title: "Scale-Out & Continuous Improvement",
      description: "We support broader rollout across lines and sites, with ongoing monitoring and model retraining as equipment and conditions evolve.",
      checks: [
        "Phased scale-out across additional lines and facilities",
        "Continuous model monitoring and drift detection",
        "Ongoing model retraining as production conditions change",
        "Performance reporting and improvement tracking",
      ],
    },
  ],
  finalCtaHeading: "Ready to Transform Your Manufacturing Operations?",
  finalCtaBody: "Let's discuss how our AI solutions can help your manufacturing team reduce downtime, improve quality, and optimize production throughput.",
  finalCtaLabel: "Schedule a Consultation",
};

export default function ManufacturingPage() {
  return <IndustryPage config={config} />;
}

import { Metadata } from "next";
import { Activity, Settings, Shield, BarChart3, Wrench } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";

export const metadata: Metadata = {
  title: "AI for Manufacturing - Vivancedata",
  description: "Machine degradation flagged before the line stops, defects caught during the run, and the paperwork between the floor and the office read rather than re-keyed.",
  keywords: ["manufacturing AI", "predictive maintenance", "quality control AI", "OEE optimization", "industrial AI", "IIoT analytics"],
  openGraph: {
    title: "AI for Manufacturing - Vivancedata",
    description: "Predictive maintenance, in-line quality inspection and production analytics for manufacturing teams.",
    type: "website",
    url: "https://vivancedata.com/industries/manufacturing",
  },
};

const config: IndustryPageConfig = {
  eyebrow: "Manufacturing",
  title: "AI for manufacturing",
  heroVisual: {
    label: "// Predictive Maintenance",
    steps: ["Sensor Telemetry", "Anomaly Scoring", "Maintenance Alert", "Work Order"],
  },
  introHeading: "Reading what the floor already tells you",
  introBody: `The plant produces more signal than anyone has time to read: sensor history, shift logs, defect records, inspection photos, and the forms that move between the line and the office.

I build workflows over that material — a machine drifting toward failure raised before it stops the line, an out-of-spec part caught during the run, a cause pulled out of logs nobody has time to cross-reference.

It has to work with the MES, historian and quality system you already run. Nothing gets ripped out, and an uncertain call goes to a person rather than being made quietly.`,
  introCtaLabel: "Book a call",
  solutionsHeading: "What I build for plants",
  solutions: [
    {
      title: "Predictive maintenance",
      description: "Anomaly detection over sensor history, so a machine drifting toward failure raises a work order before it takes the line down.",
      icon: <Wrench className="h-6 w-6 text-brand" />,
      benefits: ["Degradation flagged from sensor history", "Maintenance planned rather than reacted to", "The alert lands as a work order, not an email", "Which assets to watch, ranked"],
    },
    {
      title: "Quality defect detection",
      description: "Vision and process-control models that catch an out-of-spec part at the line rather than at final inspection.",
      icon: <Shield className="h-6 w-6 text-brand" />,
      benefits: ["Out-of-spec work caught during the run", "Less rework and scrap carried downstream", "Defects traceable to shift, batch and machine", "Fits the QC process you already run"],
    },
    {
      title: "OEE and production analytics",
      description: "Dashboards fed from what the machines already report, showing where the line loses time rather than where people assume it does.",
      icon: <Activity className="h-6 w-6 text-brand" />,
      benefits: ["OEE visible by line and by shift", "Bottlenecks named instead of argued about", "Shifts compared on the same basis", "One set of figures for the Monday meeting"],
    },
    {
      title: "Materials and inventory",
      description: "Buffer levels worked out from demand and the lead times your suppliers actually hit, so material is on hand without paying to store months of it.",
      icon: <Settings className="h-6 w-6 text-brand" />,
      benefits: ["Buffers sized from real lead times", "Less cash sitting in raw material", "Supplier lateness visible as a pattern", "Early warning when a line is about to run short"],
    },
    {
      title: "Production planning",
      description: "A schedule proposed from machine constraints, changeover times and who is actually on shift, for a planner to adjust rather than build.",
      icon: <BarChart3 className="h-6 w-6 text-brand" />,
      benefits: ["Capacity forecasts built on real constraints", "Faster re-plan when demand moves", "Fewer clashes between machine and crew", "Planner keeps the final say"],
    },
  ],
  statsHeading: "Where it earns its keep on the floor",
  // Focus areas, not outcome claims. These tiles previously carried invented
  // metrics (e.g. "99.7% regulatory compliance accuracy") for engagements that
  // never happened. Do not put a number here until a named client has agreed to
  // it being published.
  stats: [
    { value: "Maintenance", label: "Anomaly detection across sensor history" },
    { value: "Quality", label: "Vision inspection on the line" },
    { value: "Root cause", label: "Search across shift, defect and batch logs" },
    { value: "Shop-floor fit", label: "Works with the MES you already run" },
  ],
  scenariosHeading: "What a build looks like",
  scenarios: [
    {
      title: "Catching a machine before it stops",
      challenge: "Maintenance is reactive. The team answers failures rather than preventing them, and an unplanned stop takes out the rest of the shift.",
      solution: "Sensor telemetry is ingested and scored for anomalies, so a machine drifting away from its normal pattern raises a work order before it reaches the failure threshold.",
      results: ["Degradation flagged ahead of the stoppage", "Maintenance scheduled rather than scrambled", "Priority assets watched more closely than the rest", "The alert arrives as a work order, not an email"],
    },
    {
      title: "Catching a defect during the run",
      challenge: "Defects are found late in the process, by which point the rework cost is already sunk and some of the batch has moved on.",
      solution: "In-line detection from process sensor data and statistical control charts, flagging drift while the run can still be corrected.",
      results: ["Drift caught during the run, not at final inspection", "Less rework and scrap carried downstream", "Cause traceable to shift, batch and machine", "Inspection effort aimed where it pays"],
    },
    {
      title: "Where the line loses time",
      challenge: "Production gaps can only be picked apart after the fact, so the conversation about a bad week happens a week late.",
      solution: "Dashboards fed from machine data, with shift-level comparison and an alert when the bottleneck moves to a different station.",
      results: ["Line performance visible during the shift", "Throughput constraints named rather than debated", "Shifts compared on the same basis", "Improvement work aimed at the biggest constraint"],
    },
  ],
  processHeading: "How a build runs in a plant",
  process: [
    {
      title: "Operations assessment",
      description: "I walk the floor and the data: which sensors already report, what the shift and defect logs actually contain, and where a stoppage or a scrap batch costs you the most.",
      checks: [
        "Current maintenance and quality practice reviewed",
        "What the sensors and logs already record",
        "Candidate workflows listed by line and function",
        "Build cost and running cost for each",
      ],
    },
    {
      title: "Design and system fit",
      description: "I design against the SCADA, MES and ERP you already run, so what gets built is an addition to that stack rather than a replacement for part of it.",
      checks: [
        "Sensor data ingestion and pipeline design",
        "Model choice for your equipment profiles",
        "Integration with the systems already in place",
        "Pilot line scoped and planned",
      ],
    },
    {
      title: "Pilot on one line",
      description: "It runs on one line beside the current process and gets checked against failures and defects you already know the answer to, before anything depends on it.",
      checks: [
        "Pilot confined to one line or cell",
        "Output checked against known failure events",
        "Operator and maintenance feedback collected",
        "Accuracy agreed before scale-up",
      ],
    },
    {
      title: "Scale-out and ongoing tuning",
      description: "It extends across lines and sites, and I keep monitoring and retraining it as equipment, tooling and conditions change.",
      checks: [
        "Phased extension to further lines and sites",
        "Monitoring for model drift",
        "Retraining as production conditions change",
        "Documented handover to your team",
      ],
    },
  ],
  finalCtaHeading: "What does an unplanned stop cost you?",
  finalCtaBody: "Tell me where the floor loses the most time or the most material, and I will tell you whether it is worth building for.",
  finalCtaLabel: "Book a call",
};

export default function ManufacturingPage() {
  return <IndustryPage config={config} />;
}

export type Industry =
  | "Construction"
  | "HVAC & Trades"
  | "Logistics & Fleet"
  | "Manufacturing";

export type BusinessFunction =
  | "Customer Service"
  | "Operations"
  | "Dispatch"
  | "Finance"
  | "Safety & Compliance";

export type Complexity = "Low" | "Medium" | "High";

export interface UseCase {
  id: string;
  title: string;
  description: string;
  industry: Industry;
  function: BusinessFunction;
  technologies: string[];
  complexity: Complexity;
  /** A duration estimate. The only kind of number that belongs in this file. */
  implementationTime: string;
  keyBenefits: string[];
}

export const industries: Industry[] = [
  "Construction",
  "HVAC & Trades",
  "Logistics & Fleet",
  "Manufacturing",
];

export const businessFunctions: BusinessFunction[] = [
  "Customer Service",
  "Operations",
  "Dispatch",
  "Finance",
  "Safety & Compliance",
];

export const complexityLevels: Complexity[] = ["Low", "Medium", "High"];

// Use cases describe what a workflow does, never what it returned. There are no
// outcome percentages or ROI multiples in here, and `implementationTime` is the
// only number allowed — it is an estimate of effort, not a claim about results.
export const useCases: UseCase[] = [
  {
    id: "submittal-intake",
    title: "Submittal and RFI Intake",
    description:
      "Read the submittals, RFIs and permits that arrive as emailed PDFs, extract the fields that matter, check them against the project's own requirements, and stage the record for a human to approve.",
    industry: "Construction",
    function: "Operations",
    technologies: ["Document Intelligence", "Optical Character Recognition", "Workflow Automation"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Re-keying replaced by review",
      "Consistent capture across subcontractors",
      "Exceptions surfaced instead of buried",
    ],
  },
  {
    id: "daily-report-drafting",
    title: "Daily Report Drafting",
    description:
      "Assemble the field notes, photos and timesheets a crew already captures into the daily report format the client and insurer expect, held for a superintendent to correct and submit.",
    industry: "Construction",
    function: "Operations",
    technologies: ["Large Language Models", "Image Understanding", "Template Generation"],
    complexity: "Medium",
    implementationTime: "4-8 weeks",
    keyBenefits: [
      "Reports drafted rather than written from scratch",
      "One format across every crew",
      "Superintendent reviews instead of authors",
    ],
  },
  {
    id: "bid-history-search",
    title: "Bid and Cost History Search",
    description:
      "Search prior bids, supplier quotes and cost history so an estimator starts from what the business actually paid last time, with the source of each figure attached.",
    industry: "Construction",
    function: "Finance",
    technologies: ["Semantic Search", "Document Intelligence", "Retrieval Augmented Generation"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Faster turnaround on invitations to bid",
      "Historical pricing surfaced with its source",
      "Estimator judgement stays in the loop",
    ],
  },
  {
    id: "certification-tracking",
    title: "Certification and Safety Record Tracking",
    description:
      "Keep certifications, toolbox talks and incident reports searchable and current, reading the expiry date off each uploaded document and raising renewals before they lapse.",
    industry: "Construction",
    function: "Safety & Compliance",
    technologies: ["Optical Character Recognition", "Document Classification", "Scheduled Alerting"],
    complexity: "Low",
    implementationTime: "3-6 weeks",
    keyBenefits: [
      "Expiring certifications flagged early",
      "Records retrievable during an audit",
      "No single point of failure in the filing",
    ],
  },
  {
    id: "after-hours-call-capture",
    title: "After-Hours Call Capture",
    description:
      "Answer the calls that currently reach voicemail, take down the fault, address and access details in a fixed format, judge urgency, and either book the slot or page the on-call technician.",
    industry: "HVAC & Trades",
    function: "Customer Service",
    technologies: ["Speech Recognition", "Natural Language Understanding", "Telephony APIs"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Calls answered outside office hours",
      "Emergencies escalated, routine work booked",
      "Every call logged whether or not it converts",
    ],
  },
  {
    id: "dispatch-scheduling",
    title: "Dispatch and Scheduling Support",
    description:
      "Propose a day's schedule from technician skills, parts on the van and travel time, and re-propose it when a job overruns, leaving the dispatcher to accept, edit or ignore each suggestion.",
    industry: "HVAC & Trades",
    function: "Dispatch",
    technologies: ["Constraint Optimization", "Geospatial Analytics", "Scheduling Integration"],
    complexity: "High",
    implementationTime: "8-14 weeks",
    keyBenefits: [
      "Fewer wasted trips across town",
      "Skill and parts matched to the job",
      "Dispatcher keeps final say",
    ],
  },
  {
    id: "quote-drafting",
    title: "Quoting From Service History",
    description:
      "Draft a quote from the technician's job notes, prior work at that address and current supplier pricing, ready for the technician to adjust before it is sent.",
    industry: "HVAC & Trades",
    function: "Finance",
    technologies: ["Large Language Models", "Pricing Data Integration", "Service History Search"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Quotes drafted the same day as the visit",
      "Prior work at the address surfaced",
      "Technician adjusts before it goes out",
    ],
  },
  {
    id: "service-follow-up",
    title: "Follow-Up and Review Requests",
    description:
      "Chase the maintenance intervals, unapproved quotes and review requests that get dropped when the office is busy, on a schedule rather than when someone finds a spare afternoon.",
    industry: "HVAC & Trades",
    function: "Customer Service",
    technologies: ["Workflow Automation", "CRM Integration", "Messaging APIs"],
    complexity: "Low",
    implementationTime: "3-6 weeks",
    keyBenefits: [
      "Service intervals followed up automatically",
      "Unapproved quotes chased",
      "Review requests sent while the job is fresh",
    ],
  },
  {
    id: "pod-processing",
    title: "Proof of Delivery and BOL Processing",
    description:
      "Read the photographed paperwork drivers already submit, extract the fields, match the document to its load, and push it into billing — holding back anything too illegible to read.",
    industry: "Logistics & Fleet",
    function: "Operations",
    technologies: ["Optical Character Recognition", "Document Intelligence", "Billing Integration"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Documents processed as they arrive",
      "Matched to the correct load automatically",
      "Illegible scans flagged rather than guessed",
    ],
  },
  {
    id: "load-exception-triage",
    title: "Load Exception Triage",
    description:
      "Watch for the loads that are late, mis-scanned or short-delivered, rank them by customer impact, and write them to the dispatch board the team already watches.",
    industry: "Logistics & Fleet",
    function: "Dispatch",
    technologies: ["Anomaly Detection", "Event Stream Processing", "TMS Integration"],
    complexity: "High",
    implementationTime: "8-14 weeks",
    keyBenefits: [
      "Problem loads surfaced early",
      "Ranked by customer impact",
      "Fewer surprises on the customer call",
    ],
  },
  {
    id: "driver-check-calls",
    title: "Routine Driver Communication",
    description:
      "Handle the routine check-calls, ETA updates and document reminders so dispatch spends its time on the loads that are actually going wrong.",
    industry: "Logistics & Fleet",
    function: "Dispatch",
    technologies: ["Natural Language Understanding", "Messaging APIs", "Telematics Integration"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Routine check-calls handled",
      "ETA updates without a phone call",
      "Dispatch focuses on exceptions",
    ],
  },
  {
    id: "damage-claim-assembly",
    title: "Claims and Damage Documentation",
    description:
      "Assemble the photographs, delivery records and correspondence a damage claim needs into one package as soon as damage is reported, while the details are still recoverable.",
    industry: "Logistics & Fleet",
    function: "Safety & Compliance",
    technologies: ["Document Assembly", "Image Understanding", "Records Integration"],
    complexity: "Medium",
    implementationTime: "4-8 weeks",
    keyBenefits: [
      "Evidence gathered while it exists",
      "Consistent claim packages",
      "Records tied to the original load",
    ],
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Equipment Maintenance",
    description:
      "Score sensor telemetry for the degradation patterns that precede a failure, so maintenance is scheduled against a signal rather than a breakdown.",
    industry: "Manufacturing",
    function: "Operations",
    technologies: ["Time Series Analysis", "Anomaly Detection", "Edge Computing"],
    complexity: "High",
    implementationTime: "12-20 weeks",
    keyBenefits: [
      "Earlier failure detection from sensor signals",
      "Maintenance scheduled rather than reactive",
      "Better cost predictability for maintenance budgets",
    ],
  },
  {
    id: "quality-inspection",
    title: "Visual Quality Inspection",
    description:
      "Inspect products on the line with computer vision and statistical process control, flagging out-of-spec output at the point it is produced rather than at final QC.",
    industry: "Manufacturing",
    function: "Operations",
    technologies: ["Computer Vision", "Statistical Process Control", "Edge Computing"],
    complexity: "Medium",
    implementationTime: "8-14 weeks",
    keyBenefits: [
      "Defects caught earlier in the cycle",
      "Reduced rework and scrap volumes",
      "Root cause traceable to the batch",
    ],
  },
  {
    id: "shift-log-search",
    title: "Shift, Defect and Batch Log Search",
    description:
      "Search across shift notes, defect records and batch logs in one place, so a root cause investigation starts from what was actually written down at the time.",
    industry: "Manufacturing",
    function: "Safety & Compliance",
    technologies: ["Semantic Search", "Retrieval Augmented Generation", "MES Integration"],
    complexity: "Medium",
    implementationTime: "6-10 weeks",
    keyBenefits: [
      "Faster root cause identification",
      "Shift handover context preserved",
      "Answers traceable to the source record",
    ],
  },
];

export type IconType = "database" | "brain" | "shield-check" | "message-square";

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  iconType: IconType;
}

// Illustrative engagements, not delivered ones. The `client` field never names a
// company and `results` stay qualitative — no number goes in here without a named
// client who has agreed to publish it.
export const caseStudies: CaseStudy[] = [
  {
    id: "construction-documents",
    title: "Submittal and RFI Intake",
    client: "Illustrative General Contractor",
    industry: "Construction",
    challenge: "Submittals and RFIs arrived as emailed PDFs in no consistent format, and a project engineer was re-keying them into the project system by hand.",
    solution: "Built an intake workflow that extracts the fields from each document, checks them against the project's own requirements, and stages the record for a human to approve.",
    results: [
      "Re-keying replaced by review",
      "Consistent capture regardless of subcontractor format",
      "Mismatches against the spec surfaced at intake",
      "Records land in the existing project system"
    ],
    technologies: ["Document Intelligence", "Optical Character Recognition", "Workflow Automation", "Cloud Computing"],
    iconType: "database",
  },
  {
    id: "trades-call-capture",
    title: "After-Hours Call Capture",
    client: "Illustrative Residential HVAC Contractor",
    industry: "HVAC & Trades",
    challenge: "Calls placed after the office closed went to voicemail, and by morning the customer had usually booked whoever answered first.",
    solution: "Answered the out-of-hours calls, recorded the fault and access details in a fixed format, booked routine work, and paged the on-call technician for genuine emergencies.",
    results: [
      "Overnight calls answered rather than queued",
      "Job details captured in one consistent format",
      "Emergencies escalated, routine work booked",
      "Every call logged whether or not it converted"
    ],
    technologies: ["Speech Recognition", "Natural Language Understanding", "Scheduling Integration", "Telephony APIs"],
    iconType: "message-square",
  },
  {
    id: "logistics-exceptions",
    title: "Exception Surfacing for Dispatch",
    client: "Illustrative Regional Carrier",
    industry: "Logistics & Fleet",
    challenge: "Late, short-delivered and mis-scanned loads were found when the customer phoned, because nobody was watching the board for the ones drifting off plan.",
    solution: "Monitored load status against plan, raised the loads that had gone off track, ranked them by customer impact, and wrote them to the dispatch board the team already watched.",
    results: [
      "Problem loads raised before the customer call",
      "Ranked so dispatch works the worst ones first",
      "Visible in the system dispatch already uses",
      "Fewer exceptions discovered after the fact"
    ],
    technologies: ["Anomaly Detection", "Event Stream Processing", "TMS Integration", "Real-time Alerting"],
    iconType: "shield-check",
  },
  {
    id: "manufacturing-maintenance",
    title: "Predictive Maintenance Deployment",
    client: "Illustrative Industrial Manufacturer",
    industry: "Manufacturing",
    challenge: "Maintenance teams were reactive, responding to failures rather than preventing them, causing costly production interruptions.",
    solution: "Deployed sensor telemetry ingestion and anomaly scoring models to flag equipment degradation before failure thresholds were reached.",
    results: [
      "Earlier maintenance interventions on priority assets",
      "Fewer unplanned downtime events",
      "Improved maintenance team scheduling efficiency",
      "Better cost predictability for maintenance budgets"
    ],
    technologies: ["Time Series Analysis", "Anomaly Detection", "Sensor Telemetry", "MES Integration"],
    iconType: "brain",
  }
];

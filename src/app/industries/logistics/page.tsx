import { Metadata } from "next";
import { ScanLine, AlertTriangle, Radio, FileWarning } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";
import { demos } from "@/constants/demos";

export const metadata: Metadata = {
  title: "AI Solutions for Logistics and Fleet Operations - Vivancedata",
  description: "Read the photographed paperwork drivers already submit, surface the loads going wrong before the customer calls, and keep claims evidence together.",
  keywords: ["logistics AI", "fleet operations", "proof of delivery", "bill of lading processing", "dispatch exception management", "freight claims"],
  openGraph: {
    title: "AI Solutions for Logistics and Fleet Operations - Vivancedata",
    description: "Proof of delivery processing, exception triage, driver communication and claims documentation for carriers and fleets.",
    type: "website",
    url: "https://vivancedata.com/industries/logistics",
  },
};

const config: IndustryPageConfig = {
  eyebrow: "Logistics & Fleet",
  title: "AI Solutions for Logistics and Fleet Operations",
  heroVisual: {
    label: "// Proof of Delivery",
    steps: ["Driver Photo", "Field Extraction", "Match to Load", "Billing"],
  },
  introHeading: "Working From the Paper Your Drivers Already Photograph",
  introBody: `Paperwork and exceptions set the pace. Proof of delivery, bills of lading and damage claims arrive as photographs of paper, and a delayed load is found by someone noticing rather than being told.

At Vivancedata, we build workflows that read those photographs, tie each document back to its load, and put the problem loads in front of a dispatcher while there is still time to do something about them.

Everything writes into the TMS or dispatch board your team already watches. An illegible scan is flagged for a person, never guessed at.`,
  introCtaLabel: "Book a call",
  demo: demos.paperwork,
  solutionsHeading: "Our Logistics AI Solutions",
  solutions: [
    {
      title: "Proof of Delivery and BOL Processing",
      description: "Read the photographed paperwork drivers already submit, extract the fields, match it to the load, and push it into billing without someone typing it twice.",
      icon: <ScanLine className="h-6 w-6 text-brand" />,
      benefits: [
        "Documents processed as they arrive",
        "Matched to the correct load automatically",
        "Billing gets clean data sooner",
        "Illegible scans flagged rather than guessed",
      ],
    },
    {
      title: "Exception Triage",
      description: "Watch for the loads that are late, mis-scanned or short-delivered and put them in front of a dispatcher before the customer calls.",
      icon: <AlertTriangle className="h-6 w-6 text-brand" />,
      benefits: [
        "Problem loads surfaced early",
        "Ranked by customer impact",
        "Fewer surprises on the customer call",
        "Written to the systems dispatch already watches",
      ],
    },
    {
      title: "Driver Communication",
      description: "Handle the routine check-calls, ETA updates and document reminders so dispatch spends its time on the loads that are actually going wrong.",
      icon: <Radio className="h-6 w-6 text-brand" />,
      benefits: [
        "Routine check-calls handled",
        "ETA updates without a phone call",
        "Document reminders before the driver is home",
        "Dispatch focuses on exceptions",
      ],
    },
    {
      title: "Claims and Damage Documentation",
      description: "Assemble the photographs, delivery records and correspondence a damage claim needs into one file while the details are still recoverable.",
      icon: <FileWarning className="h-6 w-6 text-brand" />,
      benefits: [
        "Evidence gathered while it exists",
        "Consistent claim packages",
        "Faster response to customer disputes",
        "Records tied to the original load",
      ],
    },
  ],
  statsHeading: "Where AI Earns Its Keep in Logistics",
  stats: [
    { value: "Paper to Data", label: "Reads the photos drivers already take" },
    { value: "Exception-First", label: "Surfaces the load going wrong" },
    { value: "TMS Fit", label: "Writes into the system dispatch runs" },
    { value: "Audit Trail", label: "Every document tied to its load" },
  ],
  scenariosHeading: "What a build looks like",
  scenarios: [
    {
      title: "Proof of Delivery Intake",
      demo: demos.paperwork,
      challenge: "Drivers submitted delivery paperwork as phone photographs, and billing staff re-typed the fields off the image before an invoice could go out.",
      solution: "Read each submitted image, extracted the delivery fields, matched the document to its load, and pushed the result into billing — holding back anything too illegible to read for a person to handle.",
      results: [
        "Documents processed as drivers submit them",
        "Each document tied back to its load",
        "Billing works from extracted data rather than images",
        "Unreadable scans routed to a person, not guessed",
      ],
    },
    {
      title: "Exception Surfacing for Dispatch",
      challenge: "Late, short-delivered and mis-scanned loads were found when the customer phoned, because nobody was watching the board for the ones drifting off plan.",
      solution: "Monitored load status against plan, raised the loads that had gone off track, ranked them by customer impact, and wrote them to the dispatch board the team already watched.",
      results: [
        "Problem loads raised before the customer call",
        "Ranked so dispatch works the worst ones first",
        "Visible in the system dispatch already uses",
        "Fewer exceptions discovered after the fact",
      ],
    },
    {
      title: "Damage Claim Assembly",
      challenge: "Assembling a damage claim meant chasing photographs, delivery records and email threads weeks after the fact, by which point some of it was gone.",
      solution: "Pulled the photographs, delivery records and correspondence attached to a load into a single claim package as soon as damage was reported, in a consistent structure.",
      results: [
        "Evidence collected while it is still recoverable",
        "Consistent structure across claim packages",
        "Faster response to a customer dispute",
        "Every item traceable to the original load",
      ],
    },
  ],
  processHeading: "Logistics AI Implementation Process",
  process: [
    {
      title: "Document and Exception Audit",
      description: "We trace what arrives from drivers and in what condition, and where an exception is currently caught — usually by a person noticing — to pick the first workflow worth building.",
      checks: [
        "Document types and image quality surveyed",
        "Current exception detection path traced",
        "Load matching rules confirmed with dispatch",
        "First workflow chosen by billing impact",
      ],
    },
    {
      title: "Extraction and TMS Integration Design",
      description: "We design extraction and load matching against your own document formats, and confirm how results write back into the TMS or dispatch board your team already watches.",
      checks: [
        "Field mapping across BOL and POD formats",
        "Load matching and confidence thresholds set",
        "Write-back path into your TMS or dispatch board",
        "Routing defined for illegible scans",
      ],
    },
    {
      title: "Pilot on a Defined Lane",
      description: "We run the workflow on one lane or terminal in parallel with the current process, check the matches and the flags against what your team finds, and tune before it carries weight. Typical pilot scope is 3-6 weeks.",
      checks: [
        "Run in parallel on one lane or terminal",
        "Matches and flags checked against your team's findings",
        "Billing data quality reviewed downstream",
        "Thresholds tuned before it carries weight",
      ],
    },
    {
      title: "Rollout and Ongoing Tuning",
      description: "We extend across lanes and document types, and keep tuning as customer paperwork and delivery patterns change.",
      checks: [
        "Extension across lanes and document types",
        "Monitoring as customer paperwork changes",
        "New formats added as carriers change",
        "Documented handover to your team",
      ],
    },
  ],
  finalCtaHeading: "Ready to Get Ahead of the Exceptions?",
  finalCtaBody: "Let's discuss where your paperwork and your problem loads are currently found by hand, and what it would take to surface them instead.",
  finalCtaLabel: "Book a call",
};

export default function LogisticsPage() {
  return <IndustryPage config={config} />;
}

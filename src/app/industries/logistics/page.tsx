import { Metadata } from "next";
import { ScanLine, AlertTriangle, Radio, FileWarning } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";
import { demos } from "@/constants/demos";

export const metadata: Metadata = {
  title: "AI for Logistics and Fleet Operations - Vivancedata",
  description: "Read the photographed paperwork drivers already submit, surface the loads going wrong before the customer calls, and keep claims evidence together.",
  keywords: ["logistics AI", "fleet operations", "proof of delivery", "bill of lading processing", "dispatch exception management", "freight claims"],
  openGraph: {
    title: "AI for Logistics and Fleet Operations - Vivancedata",
    description: "Proof of delivery processing, exception triage, driver communication and claims documentation for carriers and fleets.",
    type: "website",
    url: "https://vivancedata.com/industries/logistics",
  },
};

const config: IndustryPageConfig = {
  eyebrow: "Logistics & Fleet",
  title: "AI for logistics and fleet operations",
  heroVisual: {
    label: "// Proof of Delivery",
    steps: ["Driver Photo", "Field Extraction", "Match to Load", "Billing"],
  },
  introHeading: "Working from the paper your drivers already photograph",
  introBody: `Paperwork and exceptions set the pace. Proof of delivery, bills of lading and damage claims arrive as photographs of paper, and a delayed load is found by someone noticing rather than being told.

I build workflows that read those photographs, tie each document back to its load, and put the problem loads in front of a dispatcher while there is still time to do something about them.

Everything writes into the TMS or dispatch board your team already watches. An illegible scan is flagged for a person, never guessed at.`,
  introCtaLabel: "Book a call",
  demo: demos.paperwork,
  solutionsHeading: "What I build for carriers and fleets",
  solutions: [
    {
      title: "Proof of delivery and BOL processing",
      description: "Read the photographed paperwork drivers already submit, extract the fields, match it to the load, and push it into billing without someone typing it twice.",
      icon: <ScanLine className="h-6 w-6 text-mute" />,
      benefits: [
        "Documents processed as they arrive",
        "Matched to the correct load automatically",
        "Billing gets clean data sooner",
        "Illegible scans flagged rather than guessed",
      ],
    },
    {
      title: "Exception triage",
      description: "Watch for the loads that are late, mis-scanned or short-delivered and put them in front of a dispatcher before the customer calls.",
      icon: <AlertTriangle className="h-6 w-6 text-mute" />,
      benefits: [
        "Problem loads surfaced early",
        "Ranked by customer impact",
        "Fewer surprises on the customer call",
        "Written to the systems dispatch already watches",
      ],
    },
    {
      title: "Driver communication",
      description: "Handle the routine check-calls, ETA updates and document reminders so dispatch spends its time on the loads that are actually going wrong.",
      icon: <Radio className="h-6 w-6 text-mute" />,
      benefits: [
        "Routine check-calls handled",
        "ETA updates without a phone call",
        "Document reminders before the driver is home",
        "Dispatch focuses on exceptions",
      ],
    },
    {
      title: "Claims and damage documentation",
      description: "Assemble the photographs, delivery records and correspondence a damage claim needs into one file while the details are still recoverable.",
      icon: <FileWarning className="h-6 w-6 text-mute" />,
      benefits: [
        "Evidence gathered while it exists",
        "Consistent claim packages",
        "Faster response to customer disputes",
        "Records tied to the original load",
      ],
    },
  ],
  statsHeading: "Where it earns its keep in a fleet",
  stats: [
    { value: "Paper to data", label: "Reads the photos drivers already take" },
    { value: "Exception-first", label: "Surfaces the load going wrong" },
    { value: "TMS fit", label: "Writes into the system dispatch runs" },
    { value: "Audit trail", label: "Every document tied to its load" },
  ],
  scenariosHeading: "What a build looks like",
  scenarios: [
    {
      title: "Proof of delivery intake",
      demo: demos.paperwork,
      challenge: "Drivers submit delivery paperwork as phone photographs, and billing staff re-type the fields off the image before an invoice can go out.",
      solution: "Each submitted image is read, the delivery fields pulled out, the document matched to its load, and the result pushed into billing. Anything too illegible is held back for a person rather than guessed at.",
      results: [
        "Documents processed as drivers submit them",
        "Each document tied back to its load",
        "Billing works from extracted data rather than images",
        "Unreadable scans routed to a person, not guessed",
      ],
    },
    {
      title: "Exception surfacing for dispatch",
      challenge: "Late, short-delivered and mis-scanned loads get found when the customer phones, because nobody is watching the board for the ones drifting off plan.",
      solution: "Load status is checked against plan, the ones off track are raised and ranked by customer impact, and they appear on the dispatch board the team already watches.",
      results: [
        "Problem loads raised before the customer call",
        "Ranked so dispatch works the worst ones first",
        "Visible in the system dispatch already uses",
        "Fewer exceptions discovered after the fact",
      ],
    },
    {
      title: "Damage claim assembly",
      challenge: "Assembling a damage claim means chasing photographs, delivery records and email threads weeks after the fact, by which point some of it is gone.",
      solution: "As soon as damage is reported, the photographs, delivery records and correspondence attached to that load are pulled into one claim package, in the same structure every time.",
      results: [
        "Evidence collected while it is still recoverable",
        "Consistent structure across claim packages",
        "Faster response to a customer dispute",
        "Every item traceable to the original load",
      ],
    },
  ],
  processHeading: "How a build runs in a fleet",
  process: [
    {
      title: "Document and exception audit",
      description: "I trace what arrives from drivers and in what condition, and where an exception gets caught today, which is usually a person happening to notice. That picks the first workflow worth building.",
      checks: [
        "Document types and image quality surveyed",
        "Current exception detection path traced",
        "Load matching rules confirmed with dispatch",
        "First workflow chosen by billing impact",
      ],
    },
    {
      title: "Extraction and TMS integration design",
      description: "I design the extraction and load matching against your own document formats, and settle how results write back into the TMS or dispatch board your team already watches.",
      checks: [
        "Field mapping across BOL and POD formats",
        "Load matching and confidence thresholds set",
        "Write-back path into your TMS or dispatch board",
        "Routing defined for illegible scans",
      ],
    },
    {
      title: "Pilot on one lane",
      description: "The workflow runs on a single lane or terminal in parallel with the current process. Its matches and flags get checked against what your team finds, and tuned before anything downstream depends on them. Typical pilot scope is 3-6 weeks.",
      checks: [
        "Run in parallel on one lane or terminal",
        "Matches and flags checked against your team's findings",
        "Billing data quality reviewed downstream",
        "Thresholds tuned before it carries weight",
      ],
    },
    {
      title: "Rollout and ongoing tuning",
      description: "It extends across lanes and document types, and I keep tuning it as customer paperwork and delivery patterns change.",
      checks: [
        "Extension across lanes and document types",
        "Monitoring as customer paperwork changes",
        "New formats added as carriers change",
        "Documented handover to your team",
      ],
    },
  ],
  finalCtaHeading: "Finding your problem loads by hand?",
  finalCtaBody: "Tell me how a late or short load gets noticed today, and I will tell you what it would take to have it raised instead of discovered.",
  finalCtaLabel: "Book a call",
};

export default function LogisticsPage() {
  return <IndustryPage config={config} />;
}

import { Metadata } from "next";
import { ClipboardList, FileText, HardHat, Calculator } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";
import { demos } from "@/constants/demos";

export const metadata: Metadata = {
  title: "AI for Construction - Vivancedata",
  description: "Cut the paperwork load on submittals, RFIs, daily reports and permits with AI that writes into the project software your team already runs.",
  keywords: ["construction AI", "submittal processing", "RFI automation", "daily reports", "construction document management", "preconstruction estimating"],
  openGraph: {
    title: "AI for Construction - Vivancedata",
    description: "Document intake, daily report assembly, bid support and compliance records for construction teams.",
    type: "website",
    url: "https://vivancedata.com/industries/construction",
  },
};

const config: IndustryPageConfig = {
  eyebrow: "Construction",
  title: "AI for construction",
  heroVisual: {
    label: "// Submittal Intake",
    steps: ["Emailed PDF", "Field Extraction", "Validation", "Project System"],
  },
  introHeading: "Taking the paperwork off the critical path",
  introBody: `Paperwork volume is the constraint. RFIs, submittals, daily reports, permits and invoices move through email and PDFs, and the people who understand them are needed on site.

I build workflows that read the documents your projects already generate, check them against your own rules, and hand a superintendent or estimator something to review rather than something to type.

Nothing here replaces the judgement of the person signing off. The work is drafted, the exceptions are surfaced, and a human decides what goes into the record.`,
  introCtaLabel: "Book a call",
  demo: demos.paperwork,
  solutionsHeading: "What I build for construction sites",
  solutions: [
    {
      title: "Document intake",
      description: "Pull structured data out of submittals, permits, RFIs and supplier invoices, validate it against your project rules, and write it into the system you already use.",
      icon: <FileText className="h-6 w-6 text-brand" />,
      benefits: [
        "Fewer hours re-keying PDFs",
        "Consistent capture across subcontractors",
        "Exceptions surfaced instead of buried",
        "Writes into your existing project software",
      ],
    },
    {
      title: "Daily report assembly",
      description: "Turn field notes, photos and timesheets into the daily report format your client and insurer expect, drafted for a human to check rather than written from scratch.",
      icon: <ClipboardList className="h-6 w-6 text-brand" />,
      benefits: [
        "Reports drafted in minutes not evenings",
        "Consistent format across crews",
        "Photo and note context kept together",
        "Superintendent reviews rather than authors",
      ],
    },
    {
      title: "Bid and estimate support",
      description: "Search prior bids, supplier quotes and cost history so estimators start from what you actually paid last time instead of a blank sheet.",
      icon: <Calculator className="h-6 w-6 text-brand" />,
      benefits: [
        "Faster turnaround on invitations to bid",
        "Historical pricing surfaced with its source",
        "Fewer missed scope items",
        "Estimator judgement stays in the loop",
      ],
    },
    {
      title: "Compliance and safety records",
      description: "Keep certifications, toolbox talks and incident reports searchable and current, with expiries flagged before they lapse.",
      icon: <HardHat className="h-6 w-6 text-brand" />,
      benefits: [
        "Expiring certifications flagged early",
        "Incident write-ups drafted from field input",
        "Records retrievable during an audit",
        "Nothing depends on one person's filing habits",
      ],
    },
  ],
  statsHeading: "Where it earns its keep on a project",
  stats: [
    { value: "Document intake", label: "Submittals, permits, RFIs and invoices" },
    { value: "Field-first", label: "Works from photos and notes crews already take" },
    { value: "Your software", label: "Writes into the project system you run" },
    { value: "Human sign-off", label: "Drafts for review, never filed automatically" },
  ],
  scenariosHeading: "What a build looks like",
  scenarios: [
    {
      title: "Submittal processing",
      demo: demos.paperwork,
      challenge: "Submittals arrive as emailed PDFs from dozens of subcontractors in no consistent format, and a project engineer re-keys them into the project system by hand.",
      solution: "An intake workflow reads each submittal, pulls out the spec section, product data and dates, checks them against the project's own requirements, and stages the record for the engineer to approve.",
      results: [
        "Re-keying replaced by review",
        "Consistent capture regardless of subcontractor format",
        "Mismatches against the spec surfaced at intake",
        "Records land in the existing project system",
      ],
    },
    {
      title: "Daily report drafting",
      demo: demos.field,
      challenge: "Superintendents write daily reports in the evening from memory, photos and scattered notes, and the format varies by crew.",
      solution: "The photos, timesheets and voice notes already captured during the day are assembled into a draft in the format the client wants, held for the superintendent to correct and submit.",
      results: [
        "Reports drafted from what the crew already recorded",
        "One format across every crew and site",
        "Photo evidence stays attached to the entry it supports",
        "Superintendent signs off rather than writes",
      ],
    },
    {
      title: "Certification expiry tracking",
      challenge: "Certifications and training records live in one administrator's spreadsheet, and a lapse gets discovered when a crew arrives at a site that will not let them work.",
      solution: "Certification records go into one searchable set, the expiry date is read off each uploaded document, and renewals are raised ahead of the date on a schedule you set.",
      results: [
        "Renewals raised before the certificate lapses",
        "Records retrievable during a site audit",
        "Coverage visible per crew and per site",
        "No single point of failure in the filing",
      ],
    },
  ],
  processHeading: "How a construction build runs",
  process: [
    {
      title: "Document and workflow assessment",
      description: "I follow the paperwork you already produce: which documents arrive, in what format, who handles them, and where the queue backs up. Then we pick the one workflow worth automating first.",
      checks: [
        "Inventory of document types and where each one arrives",
        "Volume and handling time measured per workflow",
        "Confirmation of which system holds the record",
        "One workflow chosen for the first build",
      ],
    },
    {
      title: "Extraction design and system fit",
      description: "I design the extraction and validation against your own project rules, and settle early how results write back into the project software you already run rather than into a new system beside it.",
      checks: [
        "Field mapping against your own project rules",
        "Validation thresholds and exception routing",
        "Write-back path into your existing project software",
        "Handling defined for illegible and non-standard formats",
      ],
    },
    {
      title: "Pilot on a live project",
      description: "The workflow runs on one active project alongside your current process. Its output gets compared against what your team produces, and tuned before anything depends on it. Typical pilot scope is 3-6 weeks.",
      checks: [
        "Run in parallel with the current process",
        "Output compared against what your team produces",
        "Field and office feedback collected",
        "Accuracy agreed before anything depends on it",
      ],
    },
    {
      title: "Rollout and ongoing tuning",
      description: "The workflow extends to more projects and document types, and I keep tuning it as subcontractor formats and project requirements change.",
      checks: [
        "Extension to further projects and document types",
        "Monitoring for drift as formats change",
        "New subcontractor formats added as they appear",
        "Documented handover to your team",
      ],
    },
  ],
  finalCtaHeading: "Which documents cost your team the most evenings?",
  finalCtaBody: "Tell me which ones, and I will tell you what it would take to draft them instead of typing them.",
  finalCtaLabel: "Book a call",
};

export default function ConstructionPage() {
  return <IndustryPage config={config} />;
}

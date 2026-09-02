import { Metadata } from "next";
import { PhoneCall, CalendarClock, Receipt, MessageSquare } from "lucide-react";
import { IndustryPage, type IndustryPageConfig } from "@/components/industries/IndustryPage";
import { demos } from "@/constants/demos";

export const metadata: Metadata = {
  title: "Answer the calls you are missing after hours - Vivancedata",
  description: "Answer the after-hours calls that go to voicemail, triage the emergencies, and get quotes and follow-ups out while the job is still fresh.",
  keywords: ["HVAC AI", "trades AI", "after-hours call answering", "dispatch software", "service scheduling", "field service automation"],
  openGraph: {
    title: "Answer the calls you are missing after hours - Vivancedata",
    description: "Call capture, dispatch support, quoting and follow-up for HVAC, plumbing, electrical and other service trades.",
    type: "website",
    url: "https://vivancedata.com/industries/hvac-trades",
  },
};

const config: IndustryPageConfig = {
  eyebrow: "HVAC & Trades",
  title: "Answer the calls you're missing after hours",
  heroVisual: {
    label: "// After-Hours Call Capture",
    steps: ["Missed Call", "Transcribed Intake", "Triaged Urgency", "Booked or Escalated"],
  },
  introHeading: "The job is won or lost on the phone",
  introBody: `An after-hours call that goes to voicemail is a booked job lost to whoever answers next, and the office cannot staff every hour a boiler fails.

I build call handling, dispatch and follow-up around the way a service business actually runs — the phone first, the schedule second, and the paperwork last.

A real emergency still reaches a person. What changes is that routine work gets booked instead of sitting in a voicemail box until morning.`,
  introCtaLabel: "Book a call",
  demo: demos.calls,
  solutionsHeading: "What I build for service businesses",
  solutions: [
    {
      title: "After-Hours Call Capture",
      description: "Answer the calls that currently reach voicemail, take down the job details, judge urgency, and either book the slot or escalate a genuine emergency to the on-call tech.",
      icon: <PhoneCall className="h-6 w-6 text-brand" />,
      benefits: [
        "Calls answered outside office hours",
        "Job details captured in a consistent format",
        "Emergencies escalated, routine work booked",
        "Every call logged whether or not it converts",
      ],
    },
    {
      title: "Dispatch and Scheduling Support",
      description: "Match jobs to technicians using skills, parts on the van and travel time, and propose a schedule the dispatcher adjusts rather than builds.",
      icon: <CalendarClock className="h-6 w-6 text-brand" />,
      benefits: [
        "Fewer wasted trips across town",
        "Skill and parts matched to the job",
        "Dispatcher keeps final say",
        "Reschedules handled without a rebuild",
      ],
    },
    {
      title: "Quoting From Service History",
      description: "Draft a quote from the job description, prior work at that address and current supplier pricing, ready for the tech to adjust.",
      icon: <Receipt className="h-6 w-6 text-brand" />,
      benefits: [
        "Quotes out same day",
        "Prior work at the address surfaced",
        "Pricing pulled from current supplier data",
        "Technician adjusts before it is sent",
      ],
    },
    {
      title: "Follow-Up and Review Requests",
      description: "Chase the maintenance intervals, unapproved quotes and review requests that get dropped when the office is busy.",
      icon: <MessageSquare className="h-6 w-6 text-brand" />,
      benefits: [
        "Service intervals followed up automatically",
        "Unapproved quotes chased",
        "Review requests sent while the job is fresh",
        "Stops depending on a spare afternoon",
      ],
    },
  ],
  statsHeading: "Where AI Earns Its Keep in the Trades",
  stats: [
    { value: "Phone-First", label: "Built around the call, not a web form" },
    { value: "After Hours", label: "Covers the times the office cannot" },
    { value: "Van and Skill Aware", label: "Dispatch that knows who carries what" },
    { value: "Escalation", label: "Real emergencies reach a human fast" },
  ],
  scenariosHeading: "What a build looks like",
  scenarios: [
    {
      title: "Overnight Call Handling",
      demo: demos.calls,
      challenge: "Calls placed after the office closed went to voicemail, and by the time anyone listened the next morning the customer had already booked someone else.",
      solution: "Set up an after-hours intake that answers the call, records the fault, address and access details in a fixed format, books routine work into open slots, and pages the on-call technician when the description reads as an emergency.",
      results: [
        "Overnight calls answered rather than queued",
        "Job details arrive in one consistent format",
        "On-call technician paged only for genuine emergencies",
        "Every call logged, including the ones that did not convert",
      ],
    },
    {
      title: "Dispatch Board Support",
      challenge: "The dispatcher rebuilt the day's board by hand every time a job overran, and technicians were sent to work they did not carry the parts for.",
      solution: "Proposed a schedule from technician skills, van stock and travel time, and re-proposed it when a job overran, leaving the dispatcher to accept, edit or ignore each suggestion.",
      results: [
        "Fewer trips to jobs the van was not stocked for",
        "Reschedules proposed instead of rebuilt from scratch",
        "Skill matching applied before the assignment",
        "Dispatcher keeps the final call on every move",
      ],
    },
    {
      title: "Quote and Follow-Up Chasing",
      challenge: "Quotes went out late and unapproved ones were never chased, because the only person who could do it was also running the office.",
      solution: "Drafted quotes from the technician's job notes, prior work at the address and current supplier pricing for the technician to adjust, then followed up on the ones left unapproved and on lapsed maintenance intervals.",
      results: [
        "Quotes drafted the same day as the visit",
        "Prior work at the address surfaced during quoting",
        "Unapproved quotes chased on a schedule",
        "Follow-up no longer waits for a quiet afternoon",
      ],
    },
  ],
  processHeading: "Trades AI Implementation Process",
  process: [
    {
      title: "Call and Job Flow Review",
      description: "We walk the path a job takes from first call to invoice, find where it stalls — usually the phone outside office hours — and agree what a captured job has to contain to be useful.",
      checks: [
        "Call volume mapped by hour and by outcome",
        "Current voicemail and after-hours handling reviewed",
        "Agreement on what a complete job record contains",
        "Urgency tiers drafted with your dispatchers",
      ],
    },
    {
      title: "Intake and Escalation Design",
      description: "We define the intake script, the urgency rules and the escalation path, so it is clear in advance which calls book themselves and which reach a person immediately.",
      checks: [
        "Intake script and required fields defined",
        "Urgency rules and escalation thresholds set",
        "On-call routing path confirmed",
        "Booking write-back into your scheduling system",
      ],
    },
    {
      title: "Live Pilot Alongside the Office",
      description: "We run the workflow on a defined slice — one shift, one branch or the out-of-hours window — while the office keeps its current process, and compare the two. Typical pilot scope is 3-6 weeks.",
      checks: [
        "Run on a defined shift or the out-of-hours window",
        "Captured jobs compared against office handling",
        "Escalation accuracy reviewed call by call",
        "Technician and dispatcher feedback collected",
      ],
    },
    {
      title: "Extension and Tuning",
      description: "We extend to more hours, more crews and the follow-up work, and keep tuning the urgency rules against the calls that actually came in.",
      checks: [
        "Extension to more hours and more crews",
        "Follow-up and review workflows added",
        "Urgency rules tuned against real call history",
        "Documented handover to your team",
      ],
    },
  ],
  finalCtaHeading: "Ready to Stop Losing Jobs to Voicemail?",
  finalCtaBody: "Tell me what happens to your calls after hours today, and I will tell you what it would take to have them answered, triaged and booked.",
  finalCtaLabel: "Book a call",
};

export default function HvacTradesPage() {
  return <IndustryPage config={config} />;
}

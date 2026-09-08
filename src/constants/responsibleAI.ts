/**
 * Copy for /responsible-ai.
 *
 * These arrays used to be declared inside the page component, so a wording
 * change meant editing JSX-adjacent code -- against this repo's own rule that
 * page content lives in src/constants. Icons are stored as keys rather than
 * rendered elements, the way `caseStudies.ts` already does it, so this file
 * stays free of JSX and the page owns presentation.
 */

export type PrincipleIcon = "bar-chart-3" | "eye" | "file-text" | "scale" | "shield" | "users";

export interface Principle {
  iconType: PrincipleIcon;
  title: string;
  description: string;
}

export interface Phase {
  number: string;
  title: string;
  description: string;
  checks: string[];
}

export interface DesignExample {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export const principles: Principle[] = [
  {
    iconType: "users",
    title: "The judgement stays with your people",
    description: "A system takes typing off a dispatcher or a project engineer. It does not take the decision off them. Where being wrong is expensive, the step keeps a person in it by design, not as a courtesy."
  },
  {
    iconType: "eye",
    title: "You can see why it did that",
    description: "Every automated decision keeps a record of what it read and which part of which document it read it from. If a figure lands in your project system, you can follow it back to the page it came off."
  },
  {
    iconType: "shield",
    title: "Trained on your records, checked for what they got wrong",
    description: "A system that learns from your history inherits your history, including the parts you would not want repeated automatically. I look for those patterns before the build, and I tell you when I find one I cannot design around."
  },
  {
    iconType: "bar-chart-3",
    title: "It says when it is unsure",
    description: "Anything below the confidence threshold goes to a person instead of being guessed at. An illegible signature comes back as illegible, and accuracy is re-checked as your documents and the systems around them drift."
  },
  {
    iconType: "scale",
    title: "One name on it",
    description: "I build it, so the question of why it did something comes to me and gets answered by the person who wrote it. There is no committee between you and the explanation."
  },
  {
    iconType: "file-text",
    title: "Scoped to the job it was built for",
    description: "What the system may read, and what that data may be used for, is agreed in writing before anything is built. Access is limited to what the workflow needs, and the underlying records keep an access trail."
  }
];

export const phases: Phase[] = [
  {
    number: "1",
    title: "Before anything is built",
    description: "Most of this work is deciding what the system is not allowed to do. That gets written down while it is still cheap to change.",
    checks: [
      "Who is hurt by a wrong answer, and how badly — the customer, the crew, the driver",
      "The worst plausible failure, described in one sentence you can argue with",
      "What the system may read, and what it may never use that data for",
      "The confidence threshold below which it must hand back to a person"
    ]
  },
  {
    number: "2",
    title: "While it is being built",
    description: "The design decisions that make a system explainable have to be made during the build. They cannot be added to a finished one.",
    checks: [
      "Sample documents drawn from your messy range, not the three clean ones",
      "A check on whether your own records carry a pattern you would not want automated",
      "Every extracted value linked back to the page and region it came from",
      "A human approval kept in any step where being wrong is expensive"
    ]
  },
  {
    number: "3",
    title: "Before it goes live",
    description: "I try to break it on purpose, on your material, while nothing depends on the answer.",
    checks: [
      "The bad inputs run deliberately: the illegible scan, the heavy accent, the missing page",
      "Output compared against what your people produce on the same documents",
      "Put in front of whoever will use it daily, before launch rather than after",
      "What it cannot do written down in plain terms and handed over with it"
    ]
  },
  {
    number: "4",
    title: "Once it is running",
    description: "It runs beside your existing process first, and nothing depends on it until the two agree.",
    checks: [
      "The disagreements between the system and the old way reviewed, not just counted",
      "Accuracy re-checked as document formats and upstream APIs drift",
      "A way for your people to report a bad answer and get a reply from me",
      "A switch-off procedure, and a named person who is allowed to use it"
    ]
  },
  {
    number: "5",
    title: "Keeping it honest afterwards",
    description: "A system nobody is watching degrades quietly. The monthly cost is what stops that.",
    checks: [
      "Errors reviewed with you on a set interval, not when someone complains",
      "Any change to what the system decides agreed before it ships",
      "Versions kept, so you can see what changed and when",
      "The data agreement revisited whenever the system's job changes"
    ]
  }
];

export const designExamples: DesignExample[] = [
  {
    title: "Construction: Document Extraction You Can Audit",
    challenge: "A contractor wants submittals and invoices read automatically, but a wrong figure filed into the project record is worse than a slow one, and an auditor later has to see where each value came from.",
    approach: "Extract with a confidence threshold rather than a best guess, keep every value linked to the page and region it was read from, hold anything below the threshold for a person, and log who approved each record.",
    outcome: "The design goal is a project record where every extracted field can be traced back to the document it came from, and nothing enters it without a named approval."
  },
  {
    title: "HVAC & Trades: Call Triage That Escalates Honestly",
    challenge: "A service business wants after-hours calls answered, but a system that misreads an emergency as routine leaves someone without heat overnight, and one that escalates everything is just a pager.",
    approach: "Bias the urgency rules toward escalation, state plainly to the caller that they are speaking to an automated intake, keep a human escalation path open at every point, and review the misclassified calls weekly.",
    outcome: "The design goal is triage whose failure mode is waking an on-call technician unnecessarily, never leaving a genuine emergency in a queue."
  },
  {
    title: "Logistics: Monitoring Loads Without Monitoring Drivers",
    challenge: "A carrier wants late and off-plan loads surfaced early, and the same telematics data would also support scoring individual drivers on behaviour they were never told was being measured.",
    approach: "Scope the data to the load rather than the person, agree in advance what the signals may and may not be used for, tell drivers what is collected, and keep an access trail on the underlying records.",
    outcome: "The design goal is exception visibility for dispatch that does not quietly become a performance surveillance system."
  }
];

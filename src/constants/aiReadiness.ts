export type ReadinessCategory = "data" | "infrastructure" | "culture" | "strategy";

export const CATEGORY_LABELS: Record<ReadinessCategory, string> = {
  data: "Your records",
  infrastructure: "Your systems",
  culture: "Your people",
  strategy: "Your plan",
};

export interface ReadinessQuestion {
  id: string;
  category: ReadinessCategory;
  question: string;
  options: {
    value: number;
    label: string;
  }[];
}

export const questions: ReadinessQuestion[] = [
  // Your records (4 questions)
  {
    id: "data-1",
    category: "data",
    question: "If you needed last year's job records right now, how easily could you get them?",
    options: [
      { value: 1, label: "Spread across paper, an inbox and somebody's memory" },
      { value: 2, label: "Findable, but it would cost someone half a day" },
      { value: 3, label: "Mostly in one system, with gaps and duplicates" },
      { value: 4, label: "In one system, and clean enough to trust" },
      { value: 5, label: "In one system, and other software can already read it" },
    ],
  },
  {
    id: "data-2",
    category: "data",
    question: "Is there an agreed way that jobs, customers and documents get named and filed?",
    options: [
      { value: 1, label: "Everyone files things their own way" },
      { value: 2, label: "A few shared habits, none of them written down" },
      { value: 3, label: "Written rules for the things that matter most" },
      { value: 4, label: "Clear rules, and one person owns them" },
      { value: 5, label: "Rules the software enforces, rather than people remembering" },
    ],
  },
  {
    id: "data-3",
    category: "data",
    question: "How far back do your records go in a form a computer could read?",
    options: [
      { value: 1, label: "Less than 6 months" },
      { value: 2, label: "6 months to 1 year" },
      { value: 3, label: "1-2 years" },
      { value: 4, label: "2-5 years" },
      { value: 5, label: "5+ years, kept the same way throughout" },
    ],
  },
  {
    id: "data-4",
    category: "data",
    question: "Are outcomes recorded — which quote won, which call was an emergency, which delivery was short?",
    options: [
      { value: 1, label: "None of that gets written down" },
      { value: 2, label: "Noted informally, in whatever field is handy" },
      { value: 3, label: "Recorded on the jobs that matter most" },
      { value: 4, label: "Recorded consistently across most work" },
      { value: 5, label: "Recorded, and someone checks it is right" },
    ],
  },
  // Your systems (4 questions)
  {
    id: "infra-1",
    category: "infrastructure",
    question: "Where does the software you run the business on actually live?",
    options: [
      { value: 1, label: "On paper, or on one machine in the office" },
      { value: 2, label: "Mostly local, with email and files online" },
      { value: 3, label: "A mix — some online, some on the office machine" },
      { value: 4, label: "Online for the main jobs: scheduling, accounts, projects" },
      { value: 5, label: "Online throughout, and built to be connected to" },
    ],
  },
  {
    id: "infra-2",
    category: "infrastructure",
    question: "Has anyone here used AI tools on real work yet?",
    options: [
      { value: 1, label: "No, and there is no appetite to try" },
      { value: 2, label: "Someone has played with a chatbot on their own time" },
      { value: 3, label: "One or two tasks get done with it, unofficially" },
      { value: 4, label: "Used regularly by part of the team" },
      { value: 5, label: "Already running inside a workflow the business relies on" },
    ],
  },
  {
    id: "infra-3",
    category: "infrastructure",
    question: "Do your systems pass information between themselves, or does a person retype it?",
    options: [
      { value: 1, label: "A person retypes everything from one system to the next" },
      { value: 2, label: "One or two exports, run by hand" },
      { value: 3, label: "Some systems connected, the rest retyped" },
      { value: 4, label: "The main systems are connected properly" },
      { value: 5, label: "Connected throughout, and new tools can plug into them" },
    ],
  },
  {
    id: "infra-4",
    category: "infrastructure",
    question: "What could the business realistically put behind this in the first year?",
    options: [
      { value: 1, label: "Nothing budgeted, and cash is tight" },
      { value: 2, label: "A small amount to try one thing" },
      { value: 3, label: "Enough for one workflow, if the payback is clear" },
      { value: 4, label: "A set budget, already agreed" },
      { value: 5, label: "Funded as a priority, with room to go further" },
    ],
  },
  // Your people (4 questions)
  {
    id: "culture-1",
    category: "culture",
    question: "Where do you and the other decision-makers stand on this?",
    options: [
      { value: 1, label: "Sceptical, and burned by a software promise before" },
      { value: 2, label: "Curious, but nobody is pushing for it" },
      { value: 3, label: "Interested, if someone shows it working first" },
      { value: 4, label: "Behind it, and prepared to spend on it" },
      { value: 5, label: "Driving it, and already clearing obstacles out of the way" },
    ],
  },
  {
    id: "culture-2",
    category: "culture",
    question: "When a job goes badly, does anyone go back and look at the record?",
    options: [
      { value: 1, label: "Decisions run on gut and memory" },
      { value: 2, label: "The numbers come out only when something has gone wrong" },
      { value: 3, label: "The main numbers get reviewed on a regular basis" },
      { value: 4, label: "Most decisions start from what the record says" },
      { value: 5, label: "Everyone works from the same numbers, daily" },
    ],
  },
  {
    id: "culture-3",
    category: "culture",
    question: "Is there anyone in-house who is good with software?",
    options: [
      { value: 1, label: "Nobody — software is outsourced or endured" },
      { value: 2, label: "One person who is handy with a spreadsheet" },
      { value: 3, label: "Someone who sets up and fixes the systems you run" },
      { value: 4, label: "A dedicated IT or operations person" },
      { value: 5, label: "In-house developers, or someone who works with data" },
    ],
  },
  {
    id: "culture-4",
    category: "culture",
    question: "How does the crew take it when the way of working changes?",
    options: [
      { value: 1, label: "Badly — new tools get quietly abandoned" },
      { value: 2, label: "Slowly, and only while the old way stays available" },
      { value: 3, label: "Fine, once someone senior has used it first" },
      { value: 4, label: "Well — people suggest improvements themselves" },
      { value: 5, label: "They try things and tell you what worked" },
    ],
  },
  // Your plan (4 questions)
  {
    id: "strategy-1",
    category: "strategy",
    question: "Do you know which job you would automate first?",
    options: [
      { value: 1, label: "No — the interest is general" },
      { value: 2, label: "A rough sense of where the pain is" },
      { value: 3, label: "One or two candidates in mind" },
      { value: 4, label: "A shortlist, with a rough idea of what each saves" },
      { value: 5, label: "One workflow chosen, and the reasoning behind it" },
    ],
  },
  {
    id: "strategy-2",
    category: "strategy",
    question: "Six months in, would you be able to tell whether it had worked?",
    options: [
      { value: 1, label: "No — it would come down to a feeling" },
      { value: 2, label: "A rough impression, nothing measured" },
      { value: 3, label: "One or two numbers you already track" },
      { value: 4, label: "Before-and-after figures you could hold it to" },
      { value: 5, label: "Those figures are already being measured now" },
    ],
  },
  {
    id: "strategy-3",
    category: "strategy",
    question: "Where are you in all this?",
    options: [
      { value: 1, label: "Reading about it for the first time" },
      { value: 2, label: "Working out what it could do here" },
      { value: 3, label: "Trying things on small jobs" },
      { value: 4, label: "Building something people actually use" },
      { value: 5, label: "Running it, and looking at the next workflow" },
    ],
  },
  {
    id: "strategy-4",
    category: "strategy",
    question: "Have you thought about what happens the first time it gets something wrong?",
    options: [
      { value: 1, label: "Not yet" },
      { value: 2, label: "It is a worry, but nothing is written down" },
      { value: 3, label: "Some ground rules agreed out loud" },
      { value: 4, label: "Written rules for what it may and may not decide on its own" },
      { value: 5, label: "Written rules, and someone checking they are followed" },
    ],
  },
];

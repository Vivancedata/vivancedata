export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

/**
 * The engagement sequence, in the first person singular.
 *
 * The previous version ran to seven steps written as "our team creates", "our
 * engineers develop" -- a staffed consultancy this practice is not, describing a
 * methodology in language that could belong to any firm on earth. It also
 * contradicted /about, which says every engagement is led directly by Lorenzo.
 *
 * Five steps, because that is how many there actually are, and each one names a
 * thing that physically happens rather than a phase of a lifecycle. `iconType`
 * is gone with the card layout it fed -- see Process.tsx.
 */
export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "I watch the work happen",
    description:
      "A morning with whoever answers the phone and whoever keys in the paperwork. No workshop, no questionnaire. I want to see where the day actually snags, and it's rarely where the org chart says it does.",
  },
  {
    number: 2,
    title: "We pick one workflow",
    description:
      "The one with the most repetition and the clearest failure, not the most impressive one. If nothing clears that bar, I'll tell you so, and the assessment ends there instead of turning into a build.",
  },
  {
    number: 3,
    title: "I build it on your own documents",
    description:
      "Your permits, your call recordings, your delivery photos. You see the output on material you already know the right answer for. That's the only way to judge whether it works.",
  },
  {
    number: 4,
    title: "It runs beside the old way first",
    description:
      "For a few weeks the existing process keeps running underneath. A wrong answer costs nothing during that window, and the places where the two disagree show me what accuracy work is left.",
  },
  {
    number: 5,
    title: "You get the keys",
    description:
      "Code, prompts, credentials and written documentation transfer to you. Keep me on to run it, or run it yourself. You get the same handover either way.",
  },
];

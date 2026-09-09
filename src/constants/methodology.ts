export interface MethodologyPhase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconType: 'compass' | 'target' | 'layers' | 'rocket' | 'zap' | 'trendingUp';
}

export interface FrameworkBenefit {
  title: string;
  description: string;
}

export interface MethodologyFAQ {
  question: string;
  answer: string;
}

export const frameworkName = 'How an engagement runs';
export const frameworkTagline = 'One workflow at a time, proved on your own documents';

export const frameworkDescription = `Six phases from working out whether a workflow is worth automating at all, through building it on your own documents, to running it beside the existing process before anything depends on it. It is written down so you can see what happens next, and where you can stop.`;

export const methodologyPhases: MethodologyPhase[] = [
  {
    id: 'discover',
    number: 1,
    title: 'Discover',
    subtitle: 'Find where the day actually snags',
    description: 'I sit with the work as it is actually done: which jobs go wrong, how often, and what it costs when they do. That means your documents, your systems and the people using them, not a questionnaire.',
    deliverables: [
      'A written read on the documents and systems you actually run',
      'Every candidate workflow ranked by effort against what it saves',
      'The ones not worth touching yet, named as such',
    ],
    duration: '1-2 weeks',
    iconType: 'compass',
  },
  {
    id: 'architect',
    number: 2,
    title: 'Architect',
    subtitle: 'Small enough to finish, specific enough to test',
    description: 'I design the smallest system that addresses the workflow we picked, against your real formats and the software you already run. You get the design, the measure of success, and an honest read on what it will not do.',
    deliverables: [
      'The design for the one workflow we picked, in terms you can argue with',
      'How it fits the project system, dispatch board or line software you already run',
      'What counts as working, agreed before anyone builds it',
    ],
    duration: '2-3 weeks',
    iconType: 'target',
  },
  {
    id: 'prototype',
    number: 3,
    title: 'Prototype',
    subtitle: 'See it hold up, or fail, before you commit',
    description: 'I build it on your own documents before you commission a build, so feasibility is demonstrated rather than asserted. If it does not hold up on your material, this is the cheap place to find out.',
    deliverables: [
      'A working prototype running on your own material',
      'Where it got things wrong on that material, and how often',
      'A decision to carry on or stop, made on what you saw',
    ],
    duration: '3-4 weeks',
    iconType: 'layers',
  },
  {
    id: 'implement',
    number: 4,
    title: 'Implement',
    subtitle: 'Into the real workflow, not beside it',
    description: 'I build the production version and integrate it with the systems you already run. Anything the system is unsure of surfaces to a person rather than being guessed at, and every automated decision leaves a record.',
    deliverables: [
      'The production system, integrated rather than sitting beside everything',
      'Written documentation of what it does and what it touches',
      'Your people trained on it while it is being built, not after',
    ],
    duration: '6-12 weeks',
    iconType: 'rocket',
  },
  {
    id: 'deploy',
    number: 5,
    title: 'Deploy',
    subtitle: 'A window where a wrong answer costs nothing',
    description: 'It runs beside the existing process first, and its output is compared against what your people produce. Nothing depends on it until that comparison holds. Your team is trained on it and the handover is written down.',
    deliverables: [
      'The system live, with the existing process still running underneath it',
      'Alerts when it goes quiet or starts disagreeing with your people',
      'A runbook for the morning something breaks and I am asleep',
    ],
    duration: '2-4 weeks',
    iconType: 'zap',
  },
  {
    id: 'scale',
    number: 6,
    title: 'Scale',
    subtitle: 'It will not stay working on its own',
    description: 'I stay on to keep it working. Upstream formats drift and APIs change, and an unattended workflow degrades within months -- that is what the monthly retainer is for, not for keeping you dependent.',
    deliverables: [
      'The errors from the last period, reviewed with you rather than filed',
      'The next workflow scoped, if there is one worth doing',
      'Fixes for format drift and upstream API changes as they land',
    ],
    duration: 'Ongoing',
    iconType: 'trendingUp',
  },
];

export const frameworkBenefits: FrameworkBenefit[] = [
  {
    title: 'You see it on your own material early',
    description: 'The prototype runs on your documents before the build is commissioned, so the decision to carry on is made on evidence rather than on a proposal.',
  },
  {
    title: 'Every phase can be the last',
    description: 'If the prototype does not hold up on your material, you stop there having paid for an assessment rather than a build.',
  },
  {
    title: 'Scoped by payback, not by ambition',
    description: 'Workflows are ranked by the effort to build against what they actually save, and the ones not worth touching yet are named as such.',
  },
  {
    title: 'Handover is written down',
    description: 'Your people are trained on what was built and the handover is documented. You should be able to run it without me.',
  },
];

export const methodologyFAQs: MethodologyFAQ[] = [
  {
    question: 'How long does a typical engagement take?',
    answer: 'It depends on the workflow, and I would rather quote a fixed price on a defined first build than a range for something unscoped. The pilot scope quoted on the industry pages is 3-6 weeks of running beside your existing process.',
  },
  {
    question: 'What if we already have some AI initiatives in progress?',
    answer: 'That is common, and it does not mean starting over. I can look at what is already running, say plainly where the gaps are, and build alongside it rather than replacing work you have already paid for.',
  },
  {
    question: 'Do we need a data science team to work with Vivancedata?',
    answer: 'No. I do the work myself. If you have your own data or engineering people, I work alongside them and hand over documentation as we go.',
  },
  {
    question: 'What industries do you work in?',
    answer: 'Construction, HVAC and the trades, logistics and fleet operations, and manufacturing. The phases run the same way in all four; what changes is what I am designing around — the site, the van, the dispatch board, the line.',
  },
  {
    question: 'What stops it doing something it should not?',
    answer: 'Every automated decision leaves a record of what it read and why, anything below the confidence threshold goes to a person, and the scope of what the system may use the data for is agreed in writing before it is built. I am not a compliance service: where a regulation applies to your industry, I will build to what you and your advisers specify.',
  },
];

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
  metric?: string;
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
    subtitle: 'Understand Your AI Opportunity',
    description: 'I sit with the work as it is actually done: which jobs go wrong, how often, and what it costs when they do. That means your documents, your systems and the people using them, not a questionnaire.',
    deliverables: [
      'AI Readiness Assessment Report',
      'Opportunity Prioritization Matrix',
      'Data Quality & Infrastructure Audit',
    ],
    duration: '1-2 weeks',
    iconType: 'compass',
  },
  {
    id: 'architect',
    number: 2,
    title: 'Architect',
    subtitle: 'Design Your AI Strategy',
    description: 'I design the smallest system that addresses the workflow we picked, against your real formats and the software you already run. You get the design, the measure of success, and an honest read on what it will not do.',
    deliverables: [
      'Strategic AI Roadmap',
      'Technical Architecture Blueprint',
      'ROI Projections & Success Metrics',
    ],
    duration: '2-3 weeks',
    iconType: 'target',
  },
  {
    id: 'prototype',
    number: 3,
    title: 'Prototype',
    subtitle: 'Validate With Working Solutions',
    description: 'I build it on your own documents before you commission a build, so feasibility is demonstrated rather than asserted. If it does not hold up on your material, this is the cheap place to find out.',
    deliverables: [
      'Functional AI Prototype',
      'Performance Benchmark Report',
      'User Feedback & Iteration Plan',
    ],
    duration: '3-4 weeks',
    iconType: 'layers',
  },
  {
    id: 'implement',
    number: 4,
    title: 'Implement',
    subtitle: 'Build Production-Ready Solutions',
    description: 'I build the production version and integrate it with the systems you already run. Anything the system is unsure of surfaces to a person rather than being guessed at, and every automated decision leaves a record.',
    deliverables: [
      'Production AI System',
      'Integration Documentation',
      'Training & Knowledge Transfer',
    ],
    duration: '6-12 weeks',
    iconType: 'rocket',
  },
  {
    id: 'deploy',
    number: 5,
    title: 'Deploy',
    subtitle: 'Launch With Confidence',
    description: 'It runs beside the existing process first, and its output is compared against what your people produce. Nothing depends on it until that comparison holds. Your team is trained on it and the handover is written down.',
    deliverables: [
      'Deployed AI Solution',
      'Monitoring & Alerting Dashboard',
      'Operations Runbook',
    ],
    duration: '2-4 weeks',
    iconType: 'zap',
  },
  {
    id: 'scale',
    number: 6,
    title: 'Scale',
    subtitle: 'Optimize & Expand Impact',
    description: 'I stay on to keep it working. Upstream formats drift and APIs change, and an unattended workflow degrades within months -- that is what the monthly retainer is for, not for keeping you dependent.',
    deliverables: [
      'Performance Optimization Report',
      'Expansion Opportunity Assessment',
      'Continuous Improvement Plan',
    ],
    duration: 'Ongoing',
    iconType: 'trendingUp',
  },
];

export const frameworkBenefits: FrameworkBenefit[] = [
  {
    title: 'You see it on your own material early',
    description: 'The prototype runs on your documents before the build is commissioned, so the decision to carry on is made on evidence rather than on a proposal.',
    metric: '60% faster deployment',
  },
  {
    title: 'Every phase can be the last',
    description: 'If the prototype does not hold up on your material, you stop there having paid for an assessment rather than a build.',
    metric: '90% project success rate',
  },
  {
    title: 'Scoped by payback, not by ambition',
    description: 'Workflows are ranked by the effort to build against what they actually save, and the ones not worth touching yet are named as such.',
    metric: '3-5x average ROI',
  },
  {
    title: 'Handover is written down',
    description: 'Your people are trained on what was built and the handover is documented. You should be able to run it without me.',
    metric: 'Self-sufficient in 6 months',
  },
];

export const methodologyFAQs: MethodologyFAQ[] = [
  {
    question: 'How long does a typical engagement take?',
    answer: 'It depends on the workflow, and I would rather quote a fixed price on a defined first build than a range for something unscoped. The pilot scope quoted on the industry pages is 3-6 weeks of running beside your existing process.',
  },
  {
    question: 'What if we already have some AI initiatives in progress?',
    answer: 'Yes. I can assess what you already have, say where the gaps are, and work alongside an initiative that is already running rather than restarting it.',
  },
  {
    question: 'Do we need a data science team to work with Vivancedata?',
    answer: 'No. I do the work myself. If you have your own data or engineering people, I work alongside them and hand over documentation as we go.',
  },
  {
    question: 'What industries do you work in?',
    answer: 'We apply it in construction, HVAC and the trades, logistics and fleet operations, and manufacturing. The phases themselves are industry-agnostic; what changes is the operational reality we design around — the site, the van, the dispatch board, the line.',
  },
  {
    question: 'How do you ensure AI solutions are ethical and compliant?',
    answer: 'Every automated decision leaves a record of what it read and why, anything below the confidence threshold goes to a person, and the scope of what the system may use the data for is agreed in writing before it is built. I am not a compliance service: where a regulation applies to your industry, I will build to what you and your advisers specify.',
  },
];

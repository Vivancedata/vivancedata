import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Users, Eye, BarChart3, Scale, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Responsible AI Framework - VivanceData",
  description: "Our comprehensive approach to ethical, transparent, and human-centered AI implementation that ensures responsible innovation and sustainable outcomes.",
  keywords: ["responsible AI", "ethical AI", "AI governance", "AI ethics", "transparent AI", "AI bias", "AI accountability"],
};

interface PrincipleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Principle = ({ icon, title, description }: PrincipleProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center mb-4">
      <div className="mr-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

interface PhaseProps {
  number: string;
  title: string;
  description: string;
  checks: string[];
}

const Phase = ({ number, title, description, checks }: PhaseProps) => (
  <div className="relative">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0">
        {number}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="pl-16">
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <ul className="space-y-2">
        {checks.map((check, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-200">{check}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface CaseStudyProps {
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
}

const CaseStudy = ({ title, challenge, approach, outcome }: CaseStudyProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Challenge</h4>
      <p className="text-gray-700 dark:text-gray-200">{challenge}</p>
    </div>
    
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Responsible AI Approach</h4>
      <p className="text-gray-700 dark:text-gray-200">{approach}</p>
    </div>
    
    <div>
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Outcome</h4>
      <p className="text-gray-700 dark:text-gray-200">{outcome}</p>
    </div>
  </div>
);

export default function ResponsibleAIPage() {
  const principles = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Human-Centered & Inclusive",
      description: "We design AI systems that augment human capabilities, respect human autonomy, and consider the needs of all stakeholders, including underrepresented groups."
    },
    {
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      title: "Transparent & Explainable",
      description: "We ensure AI systems are understandable, with clear documentation of how decisions are made and the ability to explain outcomes in human terms."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Fair & Unbiased",
      description: "We actively identify and mitigate biases in data and algorithms to ensure equitable outcomes across different demographic groups."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Robust & Reliable",
      description: "We build AI systems that perform consistently, handle edge cases gracefully, and maintain accuracy over time with changing conditions."
    },
    {
      icon: <Scale className="h-6 w-6 text-blue-600" />,
      title: "Accountable & Governed",
      description: "We establish clear lines of responsibility for AI systems, with appropriate oversight and governance throughout the lifecycle."
    },
    {
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Privacy & Security",
      description: "We implement strong data protection measures and ensure AI systems respect privacy rights while maintaining security against threats."
    }
  ];

  const phases = [
    {
      number: "1",
      title: "Assessment & Planning",
      description: "Before any AI development begins, we conduct a thorough assessment of potential ethical implications and establish clear guidelines.",
      checks: [
        "Stakeholder impact analysis to identify affected groups",
        "Risk assessment for potential harms or unintended consequences",
        "Data privacy and security evaluation",
        "Establishment of ethical boundaries and success metrics"
      ]
    },
    {
      number: "2",
      title: "Design & Development",
      description: "During the design and development phase, we incorporate ethical considerations into the technical implementation.",
      checks: [
        "Diverse and representative data collection and curation",
        "Bias detection and mitigation in training data",
        "Explainability mechanisms built into model architecture",
        "Regular ethical reviews throughout development"
      ]
    },
    {
      number: "3",
      title: "Testing & Validation",
      description: "We rigorously test AI systems to ensure they meet our ethical standards before deployment.",
      checks: [
        "Fairness testing across different demographic groups",
        "Adversarial testing to identify potential vulnerabilities",
        "User testing with diverse participants",
        "Documentation of model limitations and edge cases"
      ]
    },
    {
      number: "4",
      title: "Deployment & Monitoring",
      description: "After deployment, we continuously monitor AI systems to ensure they maintain ethical performance.",
      checks: [
        "Ongoing performance monitoring for drift or degradation",
        "Regular audits for fairness and bias",
        "Feedback mechanisms for users to report concerns",
        "Incident response plan for addressing ethical issues"
      ]
    },
    {
      number: "5",
      title: "Governance & Improvement",
      description: "We maintain oversight and continuously improve our AI systems based on real-world performance.",
      checks: [
        "Regular review by ethics committee or board",
        "Continuous learning and improvement based on feedback",
        "Transparency reporting on system performance",
        "Version control and responsible updates"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "Financial Services: Ethical Loan Approval System",
      challenge: "A financial institution needed an AI system to automate loan approvals while ensuring fairness across demographic groups and regulatory compliance.",
      approach: "We implemented a transparent model with explainable decisions, conducted extensive fairness testing across protected attributes, and established a human review process for edge cases.",
      outcome: "The system achieved 99.7% regulatory compliance while reducing approval time by 60% and maintaining equal approval rates across demographic groups when controlling for relevant factors."
    },
    {
      title: "Healthcare: Privacy-Preserving Patient Analytics",
      challenge: "A healthcare provider wanted to use AI to identify at-risk patients while strictly protecting sensitive patient data and maintaining trust.",
      approach: "We developed a federated learning approach that kept data on local systems, implemented differential privacy techniques, and created tiered access controls with audit trails.",
      outcome: "The solution successfully identified 28% more at-risk patients while maintaining HIPAA compliance and zero data breaches, earning patient trust through transparent communication."
    },
    {
      title: "Retail: Unbiased Customer Recommendation Engine",
      challenge: "A retailer needed a recommendation system that would provide personalized suggestions without reinforcing stereotypes or creating filter bubbles.",
      approach: "We designed a diverse-by-default algorithm with explicit fairness constraints, implemented explanation features for recommendations, and created a feedback loop for continuous improvement.",
      outcome: "The system increased conversion rates by 23% while receiving positive user feedback for discovery of new products and avoiding problematic stereotyping in recommendations."
    }
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Responsible AI Framework</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Our comprehensive approach to ethical, transparent, and human-centered AI implementation that ensures responsible innovation and sustainable outcomes.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20">
            <Image
              src="/images/ai-solutions.png"
              alt="Responsible AI Framework"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Responsible AI Matters</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            As AI becomes increasingly integrated into critical business processes and decision-making, ensuring these systems are developed and deployed responsibly is essential. Responsible AI isn&apos;t just an ethical imperative—it&apos;s a business necessity that builds trust, reduces risk, and creates sustainable value.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At VivanceData, we believe that AI should be designed to augment human capabilities, not replace them. Our Responsible AI Framework guides every AI solution we develop, ensuring that technology serves humanity in ways that are fair, transparent, and beneficial to all stakeholders.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Discuss Responsible AI for Your Business</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Responsible AI Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle, index) => (
            <Principle
              key={index}
              icon={principle.icon}
              title={principle.title}
              description={principle.description}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Responsible AI Implementation Process</h2>
        
        <div className="relative">
          {/* Vertical line connecting phases */}
          <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50 hidden md:block"></div>
          
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <Phase
                key={index}
                number={phase.number}
                title={phase.title}
                description={phase.description}
                checks={phase.checks}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Responsible AI in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudy
              key={index}
              title={study.title}
              challenge={study.challenge}
              approach={study.approach}
              outcome={study.outcome}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Responsible AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Bias Detection & Mitigation",
              description: "Our proprietary tools identify and address biases in data and algorithms, ensuring fair outcomes across different demographic groups.",
              features: [
                "Automated bias detection across protected attributes",
                "Counterfactual testing for fairness evaluation",
                "Mitigation techniques that preserve model performance",
                "Comprehensive reporting and documentation"
              ]
            },
            {
              title: "Explainability Dashboard",
              description: "Interactive visualizations that make AI decision-making transparent and understandable to both technical and non-technical stakeholders.",
              features: [
                "Feature importance analysis",
                "Natural language explanations of model decisions",
                "What-if scenario testing",
                "User-friendly interface for business users"
              ]
            },
            {
              title: "Privacy-Preserving AI",
              description: "Techniques and tools that enable powerful AI capabilities while protecting sensitive data and maintaining privacy.",
              features: [
                "Federated learning implementation",
                "Differential privacy techniques",
                "Secure multi-party computation",
                "Privacy impact assessment framework"
              ]
            },
            {
              title: "AI Governance Platform",
              description: "A comprehensive system for managing the entire lifecycle of AI models with appropriate oversight and documentation.",
              features: [
                "Model inventory and lineage tracking",
                "Automated compliance checking",
                "Risk assessment and mitigation",
                "Audit trails and version control"
              ]
            }
          ].map((tool, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
              <ul className="space-y-2">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Implement Responsible AI?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how our Responsible AI Framework can help your organization develop and deploy ethical, transparent, and human-centered AI solutions.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}

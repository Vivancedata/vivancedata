import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Zap, Brain, Sparkles, Atom, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Innovation Hub - VivanceData",
  description: "Explore our cutting-edge research and experimentation with emerging AI technologies that are shaping the future of business and society.",
  keywords: ["AI innovation", "emerging technology", "R&D", "AI research", "technology trends", "future of AI", "AI experimentation"],
  openGraph: {
    title: "Innovation Hub | VivanceData - Emerging AI Technologies",
    description: "Discover cutting-edge AI research and emerging technologies. Explore multimodal AI, quantum ML, edge computing, and AI ethics.",
    type: "website",
    url: "https://vivancedata.com/innovation-hub",
    siteName: "VivanceData",
    images: [{
      url: "https://vivancedata.com/images/ai-solutions.png",
      width: 1200,
      height: 630,
      alt: "VivanceData Innovation Hub - Emerging AI Technologies",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation Hub | VivanceData",
    description: "Cutting-edge AI research and emerging technologies shaping the future.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  maturity: "Emerging" | "Growing" | "Maturing";
  timeframe: string;
}

const TechnologyCard = ({ title, description, icon, maturity, timeframe }: TechnologyCardProps) => {
  const maturityColors = {
    Emerging: "bg-muted text-muted-foreground",
    Growing: "bg-muted text-foreground",
    Maturing: "bg-brand/10 text-brand"
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-3 bg-muted rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${maturityColors[maturity]}`}>
          {maturity}
        </span>
        <span className="text-sm text-muted-foreground">{timeframe}</span>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  status: "Concept" | "Research" | "Prototype" | "Pilot";
}

const ProjectCard = ({ title, description, technologies, status }: ProjectCardProps) => {
  const statusColors = {
    Concept: "bg-muted text-muted-foreground",
    Research: "bg-muted text-muted-foreground",
    Prototype: "bg-muted text-foreground",
    Pilot: "bg-brand/10 text-brand"
  };


  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="relative aspect-video border-b border-border bg-muted">
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-brand"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function InnovationHubPage() {
  const emergingTechnologies = [
    {
      title: "Multimodal Foundation Models",
      description: "AI systems that can process and generate multiple types of data (text, images, audio, video) with a single model architecture.",
      icon: <Brain className="h-6 w-6 text-brand" />,
      maturity: "Growing" as const,
      timeframe: "1-2 years"
    },
    {
      title: "Neuromorphic Computing",
      description: "Computing architectures inspired by the human brain that enable more efficient AI processing and learning capabilities.",
      icon: <Atom className="h-6 w-6 text-brand" />,
      maturity: "Emerging" as const,
      timeframe: "3-5 years"
    },
    {
      title: "Federated Learning",
      description: "Machine learning technique that trains algorithms across multiple devices while keeping data localized, enhancing privacy and security.",
      icon: <Zap className="h-6 w-6 text-brand" />,
      maturity: "Growing" as const,
      timeframe: "Now-1 year"
    },
    {
      title: "Quantum Machine Learning",
      description: "Intersection of quantum computing and machine learning that promises exponential speedups for certain AI algorithms and problems.",
      icon: <Sparkles className="h-6 w-6 text-brand" />,
      maturity: "Emerging" as const,
      timeframe: "5+ years"
    },
    {
      title: "Autonomous AI Agents",
      description: "Self-directed AI systems that can perform complex tasks with minimal human intervention through planning and reasoning capabilities.",
      icon: <Rocket className="h-6 w-6 text-brand" />,
      maturity: "Emerging" as const,
      timeframe: "2-3 years"
    },
    {
      title: "Explainable AI (XAI)",
      description: "Techniques and methods that make AI decision-making processes transparent and interpretable to humans.",
      icon: <Lightbulb className="h-6 w-6 text-brand" />,
      maturity: "Maturing" as const,
      timeframe: "Now"
    }
  ];

  const innovationProjects = [
    {
      title: "Adaptive Multimodal Assistant",
      description: "An AI assistant that seamlessly combines text, voice, and visual understanding to provide context-aware support across multiple domains.",
      technologies: ["Multimodal AI", "NLP", "Computer Vision", "Reinforcement Learning"],
      status: "Prototype" as const
    },
    {
      title: "Privacy-Preserving Analytics Platform",
      description: "A data analytics system that enables powerful insights while maintaining strict privacy guarantees through federated learning and differential privacy.",
      technologies: ["Federated Learning", "Differential Privacy", "Secure Computing", "Analytics"],
      status: "Pilot" as const
    },
    {
      title: "Autonomous Decision Support System",
      description: "An AI system that provides real-time decision recommendations by continuously monitoring data streams and adapting to changing conditions.",
      technologies: ["Reinforcement Learning", "Time Series Analysis", "Causal Inference", "Decision Theory"],
      status: "Research" as const
    },
    {
      title: "Quantum-Enhanced Optimization Engine",
      description: "A hybrid classical-quantum system for solving complex optimization problems in logistics, finance, and resource allocation.",
      technologies: ["Quantum Computing", "Optimization Algorithms", "Hybrid Computing", "Operations Research"],
      status: "Concept" as const
    },
    {
      title: "Generative Design Collaborator",
      description: "An AI system that works alongside human designers to generate and refine creative solutions for product design, architecture, and visual arts.",
      technologies: ["Generative AI", "3D Modeling", "Human-AI Collaboration", "Design Theory"],
      status: "Prototype" as const
    },
    {
      title: "Explainable Financial Risk Assessment",
      description: "A transparent AI system for evaluating financial risks with clear explanations of its reasoning process and confidence levels.",
      technologies: ["Explainable AI", "Financial Modeling", "Risk Analysis", "Natural Language Generation"],
      status: "Pilot" as const
    }
  ];

  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">Innovation Hub</Heading>
        <Paragraph className="max-w-3xl mx-auto text-lg">
          Explore our cutting-edge research and experimentation with emerging AI technologies that are shaping the future of business and society.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="aspect-video rounded-md overflow-hidden border border-border bg-card p-6 md:p-8 flex flex-col">
            <div className="eyebrow mb-4">R&amp;D Pipeline</div>
            <div className="space-y-3 flex-1">
              {[
                { stage: "Research", count: "12 active projects", color: "bg-muted text-muted-foreground border-border" },
                { stage: "Prototype", count: "7 in testing", color: "bg-muted text-foreground border-border" },
                { stage: "Pilot", count: "3 client pilots", color: "bg-muted text-brand border-brand/30" },
                { stage: "Production", count: "18 shipped solutions", color: "bg-brand/10 text-brand border-brand/30" },
              ].map((item) => (
                <div key={item.stage} className={`border rounded-lg px-4 py-2.5 flex items-center justify-between ${item.color}`}>
                  <span className="text-xs font-medium">{item.stage}</span>
                  <span className="text-xs opacity-70">{item.count}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-caption text-mute">Emerging: multimodal agents · autonomous workflows · edge AI</div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Pioneering the Future of AI</h2>
          <p className="text-muted-foreground mb-6">
            At VivanceData, innovation is at the core of everything we do. Our Innovation Hub is where we explore emerging technologies, experiment with new approaches, and develop the next generation of AI solutions that will transform businesses and industries.
          </p>
          <p className="text-muted-foreground mb-6">
            Through a combination of in-house research, academic partnerships, and client collaborations, we&apos;re pushing the boundaries of what&apos;s possible with artificial intelligence while maintaining our commitment to responsible and ethical innovation.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Partner with Us on Innovation</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Technology Radar</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Our technology radar tracks emerging AI technologies and their potential impact on business and society. We continuously evaluate these technologies for their maturity, applicability, and strategic value.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergingTechnologies.map((tech) => (
            <TechnologyCard
              key={tech.title}
              title={tech.title}
              description={tech.description}
              icon={tech.icon}
              maturity={tech.maturity}
              timeframe={tech.timeframe}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Innovation Projects</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Explore our current innovation projects where we&apos;re applying emerging technologies to solve complex business challenges and create new opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovationProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              status={project.status}
            />
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Interactive AI Demos</h2>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
          Experience the power of AI firsthand with our interactive demos. These simplified versions of our technologies showcase the capabilities and potential applications of our innovations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Sentiment Analysis",
              description: "Try our real-time sentiment analysis model that can detect emotions and attitudes in text.",
              placeholder: "Enter a sentence to analyze its sentiment...",
              buttonText: "Analyze Sentiment"
            },
            {
              title: "Image Recognition",
              description: "Upload an image to see our computer vision model identify objects and scenes.",
              placeholder: "Upload an image",
              buttonText: "Identify Objects"
            }
          ].map((demo) => (
            <div key={demo.title} className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-3">{demo.title}</h3>
              <p className="text-muted-foreground mb-6">{demo.description}</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={demo.placeholder}
                  className="w-full rounded-lg bg-muted py-2 px-4 text-sm placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                <Button className="w-full">
                  {demo.buttonText}
                </Button>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Results will appear here</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Curated Research Reading</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Papers and publications from the broader AI research community that we track and reference in our work.
        </p>
        <div className="space-y-6">
          {[
            {
              title: "Advancing Explainability in Multimodal Foundation Models",
              authors: "External research — Journal of Artificial Intelligence Research",
              publication: "Journal of Artificial Intelligence Research",
              date: "February 2025",
              abstract: "Novel techniques for improving the explainability of decisions made by multimodal foundation models, enabling more transparent and trustworthy AI systems."
            },
            {
              title: "Federated Learning for Privacy-Preserving Healthcare Analytics",
              authors: "External research — IEEE Transactions on Medical Imaging",
              publication: "IEEE Transactions on Medical Imaging",
              date: "December 2024",
              abstract: "A federated learning framework designed for healthcare applications that maintains patient privacy while enabling collaborative model training across multiple institutions."
            },
            {
              title: "Quantum-Enhanced Machine Learning: Opportunities and Challenges",
              authors: "External research — Quantum Information Processing",
              publication: "Quantum Information Processing",
              date: "October 2024",
              abstract: "A survey examining the current state of quantum machine learning, identifying promising applications and addressing key challenges for practical implementation."
            }
          ].map((paper) => (
            <div key={paper.title} className="bg-card p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm">
                <span className="text-muted-foreground">{paper.authors}</span>
                <span className="text-muted-foreground">{paper.publication}</span>
                <span className="text-muted-foreground">{paper.date}</span>
              </div>
              <p className="text-foreground mb-4">{paper.abstract}</p>
              <Button variant="outline" size="sm" className="group">
                <span>Read Full Paper</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Collaborate with Our Innovation Team</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Interested in partnering with us on cutting-edge AI research and development? Our innovation team works with clients, academic institutions, and technology partners to explore new frontiers in artificial intelligence.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Discuss Innovation Opportunities</Link>
        </Button>
      </div>
    </Container>
  );
}

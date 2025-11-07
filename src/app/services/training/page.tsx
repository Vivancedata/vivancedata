import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Training & Workshops - VivanceData",
  description: "Empower your team with the knowledge and skills they need to effectively leverage AI technologies in your organization. Custom training programs for all levels.",
  keywords: ["AI training", "AI workshops", "AI education", "AI skills", "AI literacy", "AI upskilling"],
  openGraph: {
    title: "AI Training & Workshops - VivanceData",
    description: "Build AI capabilities across your organization. Custom training programs for executives, data teams, developers, and more.",
    type: "website",
    url: "https://vivancedata.com/services/training",
    images: [
      {
        url: "https://vivancedata.com/images/ai-solutions.png",
        width: 1200,
        height: 630,
        alt: "VivanceData AI Training & Workshops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Training & Workshops - VivanceData",
    description: "Build AI capabilities across your organization with custom training programs.",
    images: ["https://vivancedata.com/images/ai-solutions.png"],
  },
};

interface Course {
  title: string;
  description: string;
  audience: string;
  duration: string;
  topics: string[];
}

const courses: Course[] = [
  {
    title: "AI Fundamentals for Business Leaders",
    description: "A comprehensive overview of AI technologies, applications, and strategic considerations for executives and decision-makers.",
    audience: "Executives, Directors, Managers",
    duration: "1 Day",
    topics: [
      "AI terminology and concepts",
      "Business applications of AI",
      "AI strategy development",
      "Ethical considerations",
      "Implementation roadmap"
    ]
  },
  {
    title: "Practical Machine Learning for Data Teams",
    description: "Hands-on training in machine learning techniques, tools, and best practices for data scientists and analysts.",
    audience: "Data Scientists, Analysts, Engineers",
    duration: "3 Days",
    topics: [
      "ML algorithms and techniques",
      "Feature engineering",
      "Model training and evaluation",
      "Deployment strategies",
      "MLOps fundamentals"
    ]
  },
  {
    title: "Generative AI Applications Workshop",
    description: "Explore the capabilities and applications of generative AI technologies for content creation, design, and innovation.",
    audience: "Product Teams, Marketers, Designers",
    duration: "2 Days",
    topics: [
      "LLM capabilities and limitations",
      "Prompt engineering techniques",
      "Content generation workflows",
      "Image and design generation",
      "Integration strategies"
    ]
  },
  {
    title: "AI for Software Developers",
    description: "Learn how to integrate AI capabilities into applications and develop AI-enhanced software products.",
    audience: "Software Engineers, Developers",
    duration: "3 Days",
    topics: [
      "AI APIs and services",
      "Model integration patterns",
      "Performance optimization",
      "Testing AI components",
      "User experience design for AI"
    ]
  }
];

export default function TrainingPage() {
  return (
    <Container className="py-16">
      <div className="text-center mb-16">
        <Heading className="text-4xl md:text-5xl mb-4">AI Training & Workshops</Heading>
        <Paragraph className="max-w-2xl mx-auto text-lg">
          Empower your team with the knowledge and skills they need to effectively leverage AI technologies in your organization.
        </Paragraph>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="w-full md:w-1/2">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-blue-100 dark:bg-blue-900/20">
            <Image
              src="/images/ai-solutions.png"
              alt="AI Training & Workshops"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Build AI Capabilities Across Your Organization</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Successful AI adoption requires more than just technology—it requires people with the right skills and knowledge. Our training programs are designed to build AI literacy and capabilities at all levels of your organization.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            From executive workshops to hands-on technical training, we offer customized learning experiences that address your specific needs and objectives.
          </p>
          <Button asChild className="self-start group" variant="outline">
            <Link href="/contact">
              <span>Inquire About Training</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Training Programs</h2>
        
        <div className="space-y-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-2/3">
                    <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Target Audience</h4>
                        <p className="text-gray-700 dark:text-gray-200">{course.audience}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Duration</h4>
                        <p className="text-gray-700 dark:text-gray-200">{course.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Topics</h4>
                    <ul className="space-y-1">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Available for on-site or virtual delivery
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">
                    <span>Request Details</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Training Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Customized Content",
              description: "We tailor our training materials to your industry, use cases, and specific business challenges."
            },
            {
              title: "Practical Exercises",
              description: "Hands-on activities and real-world scenarios help reinforce learning and build practical skills."
            },
            {
              title: "Ongoing Support",
              description: "Post-training resources and follow-up sessions ensure your team can apply what they've learned."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Upskill Your Team?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact us to discuss your training needs and how we can help build AI capabilities across your organization.
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </Container>
  );
}

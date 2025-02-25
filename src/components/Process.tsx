"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck, Code, FileSearch, LightbulbIcon, LineChart, Settings, Users } from "lucide-react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery & Assessment",
    description: "We begin by understanding your business challenges, goals, and current systems through in-depth consultations and technical assessments.",
    icon: <FileSearch className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 2,
    title: "Strategy Development",
    description: "Our team creates a tailored AI strategy that aligns with your business objectives, including technology selection, implementation roadmap, and ROI projections.",
    icon: <LightbulbIcon className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 3,
    title: "Solution Design",
    description: "We design a comprehensive solution architecture that integrates with your existing systems and addresses your specific requirements.",
    icon: <Settings className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 4,
    title: "Development & Integration",
    description: "Our engineers develop and integrate the AI solution, ensuring seamless functionality with your existing infrastructure and workflows.",
    icon: <Code className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 5,
    title: "Testing & Optimization",
    description: "We rigorously test the solution and optimize its performance based on real-world data and feedback to ensure it meets all requirements.",
    icon: <ClipboardCheck className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 6,
    title: "Deployment & Training",
    description: "The solution is deployed to your environment, and we provide comprehensive training to ensure your team can effectively utilize the new capabilities.",
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
  {
    number: 7,
    title: "Monitoring & Continuous Improvement",
    description: "We provide ongoing support, monitoring, and continuous improvement to ensure your AI solution evolves with your business needs and technological advancements.",
    icon: <LineChart className="h-8 w-8 text-blue-500" />,
  },
];

const Process = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Our Approach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our proven methodology ensures successful AI implementation from initial concept to ongoing optimization and support.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

          {/* Process Steps */}
          <div className="space-y-12 relative">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-6">
                      <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-blue-600 font-semibold">Step {step.number}</div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold border-4 border-white shadow-lg z-10 my-4 md:my-0">
                  {step.number}
                </div>

                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Ready to transform your business with our AI solutions? Let&apos;s start the journey together.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <span>Schedule a Consultation</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;

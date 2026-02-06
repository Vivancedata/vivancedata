"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardCheck, Code, FileSearch, LightbulbIcon, LineChart, Settings, Users } from "lucide-react";
import { processSteps } from "@/constants/process";

// Helper function to get the appropriate icon component based on iconType
const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case "fileSearch":
      return <FileSearch className="h-8 w-8 text-primary" />;
    case "lightbulb":
      return <LightbulbIcon className="h-8 w-8 text-primary" />;
    case "settings":
      return <Settings className="h-8 w-8 text-primary" />;
    case "code":
      return <Code className="h-8 w-8 text-primary" />;
    case "clipboardCheck":
      return <ClipboardCheck className="h-8 w-8 text-primary" />;
    case "users":
      return <Users className="h-8 w-8 text-primary" />;
    case "lineChart":
      return <LineChart className="h-8 w-8 text-primary" />;
    default:
      return <FileSearch className="h-8 w-8 text-primary" />;
  }
};

const Process = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Our Approach
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How We Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our proven methodology ensures successful AI implementation from initial concept to ongoing optimization and support.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 hidden md:block"></div>

          {/* Process Steps */}
          <div className="space-y-12 relative">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] h-full bg-card">
                    <CardContent className="p-6">
                      <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-3 mr-4">
                          {getIconComponent(step.iconType)}
                        </div>
                        <div>
                          <div className="text-primary font-semibold">Step {step.number}</div>
                          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold border-4 border-background shadow-lg z-10 my-4 md:my-0 transition-transform duration-300 hover:scale-110 hover:bg-primary/90">
                  {step.number}
                </div>

                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
            Ready to transform your business with our AI solutions? Let&apos;s start the journey together.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <span>Schedule a Consultation</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Process;

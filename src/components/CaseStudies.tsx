"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart, Brain, Database, LineChart, MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";
import aiSolutionsImage from "@/public/images/ai-solutions.png";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  icon: React.ReactNode;
  image: any;
}

const caseStudies: CaseStudy[] = [
  {
    id: "retail-analytics",
    title: "AI-Powered Inventory Optimization",
    client: "Global Retail Chain",
    industry: "Retail",
    challenge: "The client was struggling with inventory management across 500+ stores, leading to frequent stockouts and overstock situations that were costing millions annually.",
    solution: "We implemented a predictive analytics solution that uses machine learning to forecast demand patterns based on historical data, seasonal trends, and external factors like weather and local events.",
    results: [
      "30% reduction in stockouts",
      "25% decrease in excess inventory",
      "$4.2M annual savings in inventory costs",
      "15% improvement in customer satisfaction scores"
    ],
    technologies: ["Predictive Analytics", "Machine Learning", "Computer Vision", "Cloud Computing"],
    icon: <Database className="h-10 w-10 text-blue-500" />,
    image: aiSolutionsImage
  },
  {
    id: "healthcare-nlp",
    title: "Medical Records Analysis System",
    client: "National Healthcare Provider",
    industry: "Healthcare",
    challenge: "Physicians were spending 40% of their time on documentation and manual review of patient records, reducing patient care time and causing burnout.",
    solution: "We developed an NLP-based system that automatically extracts and categorizes key information from medical records, providing physicians with instant access to relevant patient data and insights.",
    results: [
      "60% reduction in documentation time",
      "35% increase in patient consultation time",
      "93% accuracy in information extraction",
      "Significant improvement in physician satisfaction"
    ],
    technologies: ["Natural Language Processing", "Machine Learning", "Healthcare AI", "HIPAA-Compliant Cloud"],
    icon: <Brain className="h-10 w-10 text-blue-500" />,
    image: aiSolutionsImage
  },
  {
    id: "finance-fraud",
    title: "Real-time Fraud Detection System",
    client: "International Financial Institution",
    industry: "Finance",
    challenge: "The client was experiencing increasing fraud losses despite existing rule-based detection systems, with fraudulent transactions often being identified too late.",
    solution: "We implemented an advanced AI fraud detection system that analyzes transaction patterns in real-time, using anomaly detection and behavioral analysis to identify suspicious activities instantly.",
    results: [
      "82% reduction in fraud losses",
      "95% accuracy in fraud detection",
      "Reduced false positives by 67%",
      "Real-time alerts for suspicious activities"
    ],
    technologies: ["Anomaly Detection", "Behavioral Analytics", "Real-time Processing", "Secure API Integration"],
    icon: <ShieldCheck className="h-10 w-10 text-blue-500" />,
    image: aiSolutionsImage
  },
  {
    id: "customer-service",
    title: "AI Customer Service Automation",
    client: "E-commerce Platform",
    industry: "E-commerce",
    challenge: "The client's customer service team was overwhelmed with repetitive inquiries, leading to long response times and customer dissatisfaction.",
    solution: "We developed an AI-powered customer service solution with intelligent chatbots and automated response systems that handle routine inquiries while seamlessly escalating complex issues to human agents.",
    results: [
      "75% of customer inquiries resolved automatically",
      "Average response time reduced from hours to seconds",
      "40% reduction in customer service costs",
      "Customer satisfaction increased by 35%"
    ],
    technologies: ["Natural Language Understanding", "Conversational AI", "Sentiment Analysis", "Integration APIs"],
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    image: aiSolutionsImage
  }
];

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore how our AI solutions have transformed businesses across industries, delivering measurable results and competitive advantages.
          </p>
        </div>

        <Tabs defaultValue={caseStudies[0].id} className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {caseStudies.map((study) => (
                <TabsTrigger 
                  key={study.id} 
                  value={study.id}
                  className="flex flex-col items-center py-3 px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {study.icon}
                  <span className="mt-2 text-sm">{study.industry}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {caseStudies.map((study) => (
            <TabsContent key={study.id} value={study.id} className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-6 md:p-8 lg:p-10">
                    <CardHeader className="p-0 mb-6">
                      <div className="mb-4">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-2">
                          {study.industry}
                        </Badge>
                        <CardTitle className="text-2xl md:text-3xl">{study.title}</CardTitle>
                        <p className="text-gray-500 mt-1">Client: {study.client}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Challenge</h4>
                        <CardDescription className="text-base">
                          {study.challenge}
                        </CardDescription>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Solution</h4>
                        <CardDescription className="text-base">
                          {study.solution}
                        </CardDescription>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Results</h4>
                        <ul className="space-y-2">
                          {study.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <div className="rounded-full bg-green-100 p-1 mr-2 mt-1">
                                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {study.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0 mt-8">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <span>Read Full Case Study</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </div>
                  <div className="relative h-64 lg:h-auto bg-gradient-to-r from-blue-600 to-indigo-600">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="relative w-full h-full max-w-md">
                        <Image 
                          src={study.image} 
                          alt={study.title}
                          className="object-cover rounded-lg shadow-lg"
                          fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end p-6">
                          <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-full p-2">
                              {study.industry === "Retail" && <BarChart className="h-6 w-6 text-blue-600" />}
                              {study.industry === "Healthcare" && <Brain className="h-6 w-6 text-blue-600" />}
                              {study.industry === "Finance" && <LineChart className="h-6 w-6 text-blue-600" />}
                              {study.industry === "E-commerce" && <MessageSquare className="h-6 w-6 text-blue-600" />}
                            </div>
                            <div className="text-white">
                              <p className="font-semibold">{study.industry} Solution</p>
                              <p className="text-sm opacity-80">Powered by VivaceFlow AI</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

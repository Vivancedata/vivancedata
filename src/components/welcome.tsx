"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, BarChart3, Brain } from "lucide-react";

export default function Welcome() {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      title: "AI-Powered Solutions",
      description: "Cutting-edge artificial intelligence tailored to your specific business challenges."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
      title: "Data-Driven Insights",
      description: "Transform your raw data into actionable business intelligence."
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Rapid Implementation",
      description: "Get up and running quickly with our streamlined deployment process."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: "Proven Results",
      description: "Join hundreds of businesses that have achieved measurable ROI with our solutions."
    }
  ];

  return (
    <section className="container mx-auto py-16 px-4 md:py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
        <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
          Why Choose VivaceFlow
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Transforming Businesses Through <span className="text-blue-600">Intelligent Automation</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="rounded-full bg-blue-50 p-3 w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 h-auto">
          <span>Explore Our Services</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-6 h-auto">
          Schedule a Consultation
        </Button>
      </div>
    </section>
  );
};

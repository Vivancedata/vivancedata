"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart, Brain, Database, LineChart, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";
import { caseStudies, IconType } from "@/constants/caseStudies";

// Helper function to get the appropriate icon component based on iconType
const getIconComponent = (iconType: IconType) => {
  switch (iconType) {
    case "database":
      return <Database className="h-10 w-10 text-blue-500" />;
    case "brain":
      return <Brain className="h-10 w-10 text-blue-500" />;
    case "shield-check":
      return <ShieldCheck className="h-10 w-10 text-blue-500" />;
    case "message-square":
      return <MessageSquare className="h-10 w-10 text-blue-500" />;
    default:
      return <Database className="h-10 w-10 text-blue-500" />;
  }
};

// Helper function to get industry-specific icon
const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Retail":
      return <BarChart className="h-7 w-7 text-blue-600" />;
    case "Healthcare":
      return <Brain className="h-7 w-7 text-blue-600" />;
    case "Finance":
      return <LineChart className="h-7 w-7 text-blue-600" />;
    case "E-commerce":
      return <MessageSquare className="h-7 w-7 text-blue-600" />;
    default:
      return <BarChart className="h-7 w-7 text-blue-600" />;
  }
};

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);

  return (
    <section className="w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <AnimateOnScroll variant="fadeInUp" className="text-center mb-16">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Case Studies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore how our AI solutions have transformed businesses across industries, delivering measurable results and competitive advantages.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeIn" delay={0.2}>
          <Tabs defaultValue={caseStudies[0].id} className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1 bg-slate-100/80 backdrop-blur-sm rounded-2xl">
                {caseStudies.map((study, index) => (
                  <TabsTrigger 
                    key={study.id} 
                    value={study.id}
                    className="flex flex-col items-center py-4 px-6 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-500 hover:bg-blue-50"
                  >
                    <motion.div 
                      className="transition-all duration-300 data-[state=active]:scale-110"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {getIconComponent(study.iconType)}
                    </motion.div>
                    <span className="mt-2 text-sm font-medium">{study.industry}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {caseStudies.map((study) => (
              <TabsContent 
                key={study.id} 
                value={study.id} 
                className="mt-0"
              >
                <AnimateOnScroll variant="fadeInUp" className="mt-0">
                  <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-8 md:p-10 lg:p-12">
                        <CardHeader className="p-0 mb-8">
                          <div className="mb-6">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3 px-3 py-1">
                              {study.industry}
                            </Badge>
                            <CardTitle className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                              {study.title}
                            </CardTitle>
                            <p className="text-gray-500 mt-2 text-lg">Client: {study.client}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 space-y-8">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          >
                            <h4 className="font-bold text-xl mb-3 text-blue-800">Challenge</h4>
                            <CardDescription className="text-base text-gray-600">
                              {study.challenge}
                            </CardDescription>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h4 className="font-bold text-xl mb-3 text-blue-800">Solution</h4>
                            <CardDescription className="text-base text-gray-600">
                              {study.solution}
                            </CardDescription>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <h4 className="font-bold text-xl mb-3 text-blue-800">Results</h4>
                            <ul className="space-y-3">
                              {study.results.map((result, index) => (
                                <motion.li 
                                  key={index} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                                >
                                  <div className="rounded-full bg-green-100 p-1 mr-3 mt-1 shadow-sm">
                                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-700 text-lg">{result}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <h4 className="font-bold text-xl mb-3 text-blue-800">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, index) => (
                                <Badge 
                                  key={index} 
                                  variant="outline" 
                                  className="bg-blue-50 border-blue-200 text-blue-700 px-3 py-1 text-sm"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </motion.div>
                        </CardContent>
                        <CardFooter className="p-0 mt-10">
                          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 px-8 py-6 h-auto text-lg rounded-xl group transition-all duration-300">
                            <span>Read Full Case Study</span>
                            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </CardFooter>
                      </div>
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600">
                          <motion.div 
                            className="absolute inset-0 opacity-30"
                            animate={{ 
                              backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{ 
                              duration: 20, 
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                            style={{
                              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <motion.div 
                            className="relative w-full h-full max-w-md"
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Image 
                              src={study.image} 
                              alt={study.title}
                              className="object-cover rounded-xl shadow-2xl"
                              fill
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-8">
                              <div className="flex items-center space-x-4">
                                <div className="bg-white rounded-full p-3 shadow-lg">
                                  {study.industry === "Retail" && <BarChart className="h-7 w-7 text-blue-600" />}
                                  {study.industry === "Healthcare" && <Brain className="h-7 w-7 text-blue-600" />}
                                  {study.industry === "Finance" && <LineChart className="h-7 w-7 text-blue-600" />}
                                  {study.industry === "E-commerce" && <MessageSquare className="h-7 w-7 text-blue-600" />}
                                </div>
                                <div className="text-white">
                                  <p className="font-bold text-xl">{study.industry} Solution</p>
                                  <p className="text-sm opacity-90">Powered by VivanceData AI</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              </TabsContent>
            ))}
          </Tabs>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeInUp" delay={0.4} className="text-center mt-16">
          <Button 
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50 group transition-all duration-300 px-6 py-6 h-auto"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CaseStudies;

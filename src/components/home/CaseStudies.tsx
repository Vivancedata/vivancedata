"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart, Brain, Database, LineChart, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { motion } from "framer-motion";
import { caseStudies, IconType } from "@/constants/caseStudies";
import { prefersReducedMotion } from "@/lib/performance";

// Helper function to get the appropriate icon component based on iconType
const getIconComponent = (iconType: IconType) => {
  switch (iconType) {
    case "database":
      return <Database className="h-10 w-10 text-primary" />;
    case "brain":
      return <Brain className="h-10 w-10 text-primary" />;
    case "shield-check":
      return <ShieldCheck className="h-10 w-10 text-primary" />;
    case "message-square":
      return <MessageSquare className="h-10 w-10 text-primary" />;
    default:
      return <Database className="h-10 w-10 text-primary" />;
  }
};

const CaseStudies = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: detecting user's reduced motion preference on mount, runs once
    setReducedMotion(prefersReducedMotion());
  }, []);

  // reducedMotion is available for future animation enhancements
  void reducedMotion;

  return (
    <section className="w-full py-20 md:py-32 overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />

        <AnimateOnScroll variant="fadeInUp" className="text-center mb-16">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Case Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore how our AI solutions have transformed businesses across industries, delivering measurable results and competitive advantages.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeIn" delay={0.2}>
          <Tabs defaultValue={caseStudies[0].id} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 p-1 bg-muted/80 dark:bg-muted/40 backdrop-blur-sm rounded-2xl">
                {caseStudies.map((study) => (
                  <TabsTrigger
                    key={study.id}
                    value={study.id}
                    className="flex flex-col items-center py-4 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-500 hover:bg-primary/10"
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
                  <Card className="border-0 shadow-2xl overflow-hidden rounded-2xl bg-card/90 dark:bg-card/50 backdrop-blur-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="p-8 md:p-10 lg:p-12">
                        <CardHeader className="p-0 mb-8">
                          <div className="mb-6">
                            <Badge className="bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/10 mb-3 px-3 py-1">
                              {study.industry}
                            </Badge>
                            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">
                              {study.title}
                            </CardTitle>
                            <p className="text-muted-foreground mt-2 text-lg">Client: {study.client}</p>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 space-y-8">
                          <div>
                            <h4 className="font-bold text-xl mb-3 text-primary">Challenge</h4>
                            <CardDescription className="text-base text-muted-foreground">
                              {study.challenge}
                            </CardDescription>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-3 text-primary">Solution</h4>
                            <CardDescription className="text-base text-muted-foreground">
                              {study.solution}
                            </CardDescription>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-3 text-primary">Results</h4>
                            <ul className="space-y-3">
                              {study.results.map((result, index) => (
                                <li
                                  key={index}
                                  className="flex items-start"
                                >
                                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1 mr-3 mt-1 shadow-sm">
                                    <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-foreground/80 text-lg">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-xl mb-3 text-primary">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-primary/5 dark:bg-primary/10 border-primary/20 text-primary px-3 py-1 text-sm"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-0 mt-10">
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 px-8 py-6 h-auto text-lg rounded-xl group transition-all duration-300">
                            <span>Read Full Case Study</span>
                            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </CardFooter>
                      </div>
                      <div className="relative h-80 lg:h-auto overflow-hidden">
                        <div className="absolute inset-0 bg-primary">
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
                              alt={`${study.title} - ${study.industry} case study showcasing ${study.client}'s AI transformation`}
                              className="object-cover rounded-xl shadow-2xl"
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            />
                            <div className="absolute inset-0 bg-black/55 rounded-xl flex items-end p-8">
                              <div className="flex items-center space-x-4">
                                <div className="bg-background rounded-full p-3 shadow-lg">
                                  {study.industry === "Retail" && <BarChart className="h-7 w-7 text-primary" />}
                                  {study.industry === "Healthcare" && <Brain className="h-7 w-7 text-primary" />}
                                  {study.industry === "Finance" && <LineChart className="h-7 w-7 text-primary" />}
                                  {study.industry === "E-commerce" && <MessageSquare className="h-7 w-7 text-primary" />}
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
            className="border-primary text-primary hover:bg-primary/10 group transition-all duration-300 px-6 py-6 h-auto"
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

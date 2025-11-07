"use client";

import React from "react";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services } from "@/constants/services";

export default function Overview() {
  return (
    <section className="container mx-auto py-16 px-4 md:py-24">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          Our Services
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Comprehensive <span className="text-primary">AI Solutions</span> for Modern Businesses
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          From strategy to implementation, we provide end-to-end AI services to help you stay ahead in today&apos;s competitive landscape.
        </p>
      </div>

      <Tabs defaultValue="generative-ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {services.map(service => (
            <TabsTrigger key={service.id} value={service.id} className="text-sm md:text-base">
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {services.map(service => (
          <TabsContent key={service.id} value={service.id}>
            <Card className="border-0 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <CardTitle className="text-2xl md:text-3xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base md:text-lg mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="rounded-full bg-green-100 p-1 mt-0.5">
                          <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <CardFooter className="px-0 pt-6">
                    <Button className="bg-primary hover:bg-primary/90">
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
                <div className="relative h-64 md:h-auto overflow-hidden rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-transparent flex items-center justify-center">
                    <div className="text-white p-6 md:p-8 max-w-md">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to transform your business?</h3>
                      <p className="mb-4 text-primary-foreground/80">Our team of experts is ready to help you implement {service.title.toLowerCase()}.</p>
                      <Button variant="outline" className="border-white text-white hover:bg-white/20">
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

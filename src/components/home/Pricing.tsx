"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, HelpCircle, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTiers } from "@/constants/pricing";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing for Your AI Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your business needs. All plans include our core AI platform and can be customized to your specific requirements.
          </p>
          
          <div className="mt-8 inline-block">
            <Tabs 
              defaultValue="monthly" 
              className="w-[300px]"
              onValueChange={(value) => setBillingCycle(value as "monthly" | "annually")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">
                  Annually
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border ${tier.popular ? 'border-blue-400 shadow-lg shadow-blue-100' : 'border-gray-200'} relative`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-blue-600 hover:bg-blue-700 px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-4xl font-bold">
                    {billingCycle === "monthly" ? tier.price.monthly : tier.price.annually}
                    {tier.name !== "Enterprise" && (
                      <span className="text-base font-normal text-gray-500">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </p>
                  {tier.name !== "Enterprise" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Billed {billingCycle === "monthly" ? "monthly" : "annually"}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                          {feature.name}
                        </span>
                        {feature.tooltip && (
                          <div className="group relative inline-block ml-1">
                            <HelpCircle className="h-4 w-4 text-gray-400 inline-block" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                              {feature.tooltip}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-gray-700 mb-6">
                We understand that every business has unique needs. Our team can create a tailored AI solution specifically designed for your organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Custom AI model development and training</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Specialized integration with your existing systems</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Flexible pricing based on your specific requirements</p>
                </div>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-3 mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">100% Satisfaction Guarantee</h4>
                <p className="text-gray-600">
                  We&apos;re confident in our solutions. If you&apos;re not satisfied within the first 30 days, we&apos;ll work with you to make it right or provide a full refund.
                </p>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-gray-700 mb-4">
                  Have questions about our pricing or need help choosing the right plan?
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Contact Our Sales Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

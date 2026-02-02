"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, HelpCircle, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingTiers } from "@/constants/pricing";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Pricing Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Transparent Pricing for Your AI Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
                  <Badge className="ml-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`border ${tier.popular ? 'border-primary shadow-lg shadow-primary/20' : 'border-border'} relative bg-card`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary hover:bg-primary/90 px-3 py-1 text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{tier.name}</CardTitle>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-foreground">
                    {billingCycle === "monthly" ? tier.price.monthly : tier.price.annually}
                    {tier.name !== "Enterprise" && (
                      <span className="text-base font-normal text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </p>
                  {tier.name !== "Enterprise" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed {billingCycle === "monthly" ? "monthly" : "annually"}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground/50 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <span className={feature.included ? "text-foreground/80" : "text-muted-foreground/60"}>
                          {feature.name}
                        </span>
                        {feature.tooltip && (
                          <div className="group relative inline-block ml-1">
                            <HelpCircle className="h-4 w-4 text-muted-foreground inline-block" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10 border border-border">
                              {feature.tooltip}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
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
                  className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-muted/50 dark:bg-muted/20 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6">
                We understand that every business has unique needs. Our team can create a tailored AI solution specifically designed for your organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-foreground/80">Custom AI model development and training</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-foreground/80">Specialized integration with your existing systems</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-foreground/80">Flexible pricing based on your specific requirements</p>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                <span>Schedule a Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-md border border-border">
              <div className="text-center mb-6">
                <div className="inline-block bg-primary/10 dark:bg-primary/20 rounded-full p-3 mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">100% Satisfaction Guarantee</h4>
                <p className="text-muted-foreground">
                  We&apos;re confident in our solutions. If you&apos;re not satisfied within the first 30 days, we&apos;ll work with you to make it right or provide a full refund.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-center text-foreground/80 mb-4">
                  Have questions about our pricing or need help choosing the right plan?
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
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

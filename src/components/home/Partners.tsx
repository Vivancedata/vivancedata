"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { partners } from "@/constants/partners";

const Partners = () => {

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-4">
            Trusted By Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Partners & Clients</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re proud to work with leading organizations across industries, helping them leverage AI to achieve their business goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {partners.map((partner) => (
            <Card key={partner.name} className="border border-border hover:border-primary/30 hover:shadow-md dark:hover:shadow-primary/5 transition-all duration-300 bg-card">
              <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                <div className="bg-primary text-primary-foreground text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  {partner.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">{partner.industry}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Join Our Partner Network</h3>
              <p className="text-muted-foreground mb-6">
                Become a VivanceData partner and gain access to cutting-edge AI solutions, technical resources, and joint marketing opportunities. Together, we can deliver exceptional value to clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Access to our AI technology stack and APIs</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Technical training and certification programs</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Joint marketing and business development</p>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                <span>Become a Partner</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-md dark:shadow-primary/5">
              <div className="text-center mb-6">
                <div className="inline-block bg-primary/10 dark:bg-primary/20 rounded-full p-3 mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Partner Success Story</h4>
                <p className="text-muted-foreground italic">
                  &quot;Partnering with VivanceData has allowed us to offer cutting-edge AI solutions to our clients, expanding our service portfolio and increasing our revenue by 40% in the first year.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-foreground">Sarah Thompson</p>
                  <p className="text-sm text-muted-foreground">CEO, TechInnovate Solutions</p>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-center text-muted-foreground mb-4">
                  Join 50+ partners worldwide who are already benefiting from our partnership program.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20">
                    Learn More
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

export default Partners;

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
            Industries We Serve
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Sectors & Domains</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I work with teams across these sectors to design and implement practical AI solutions tailored to domain-specific constraints.
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
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Interested in Working Together?</h3>
              <p className="text-muted-foreground mb-6">
                Whether you need advisory support, a full implementation, or an ongoing AI capability partner — let&apos;s start with a conversation about what you&apos;re trying to achieve.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Senior-level involvement on every engagement</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Domain-aware AI design, not generic templates</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/20 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground">Focus on outcomes you can measure and own</p>
                </div>
              </div>
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="/contact">
                  <span>Get in Touch</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="bg-card dark:bg-card/80 rounded-xl p-6 shadow-md dark:shadow-primary/5">
              <div className="text-center mb-6">
                <div className="inline-block bg-primary/10 dark:bg-primary/20 rounded-full p-3 mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-foreground">How Engagements Start</h4>
                <p className="text-muted-foreground text-sm">
                  Every project begins with a scoping call — no sales funnel, no pitch deck. Just a direct conversation about your goals, constraints, and what success looks like.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-center text-muted-foreground text-sm mb-4">
                  Initial consultations are free and carry no obligation.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20" asChild>
                    <a href="/contact">Schedule a Call</a>
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

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { partners } from "@/constants/partners";

const Partners = () => {

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            Trusted By Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners & Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We&apos;re proud to work with leading organizations across industries, helping them leverage AI to achieve their business goals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {partners.map((partner, index) => (
            <Card key={index} className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
              <CardContent className="flex flex-col items-center justify-center p-6 h-32">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  {partner.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-semibold">{partner.name}</p>
                  <p className="text-sm text-gray-500">{partner.industry}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Partner Network</h3>
              <p className="text-gray-700 mb-6">
                Become a VivaceFlow partner and gain access to cutting-edge AI solutions, technical resources, and joint marketing opportunities. Together, we can deliver exceptional value to clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Access to our AI technology stack and APIs</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Technical training and certification programs</p>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full bg-blue-100 p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Joint marketing and business development</p>
                </div>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                <span>Become a Partner</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-100 rounded-full p-3 mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Partner Success Story</h4>
                <p className="text-gray-600 italic">
                  &quot;Partnering with VivaceFlow has allowed us to offer cutting-edge AI solutions to our clients, expanding our service portfolio and increasing our revenue by 40% in the first year.&quot;
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Sarah Thompson</p>
                  <p className="text-sm text-gray-500">CEO, TechInnovate Solutions</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <p className="text-center text-gray-700 mb-4">
                  Join 50+ partners worldwide who are already benefiting from our partnership program.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
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

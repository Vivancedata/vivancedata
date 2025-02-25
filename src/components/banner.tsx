"use client";

import React from "react";
import Image from "next/image";
import banner from "@/public/images/banner.png";
import { Button } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={banner}
          alt="Banner Image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="container relative mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                AI Solutions That <span className="text-blue-400">Transform</span> Your Business
              </h1>
              <p className="mt-4 max-w-lg text-xl text-blue-100">
                Leverage cutting-edge artificial intelligence to drive innovation, efficiency, and growth for your organization.
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-64 w-full max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-sm sm:h-80 md:h-96">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-indigo-500"></div>
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-lg border border-white/20 bg-white/5 p-8">
                <div className="text-center">
                  <h3 className="mb-2 text-2xl font-bold">Ready to Transform?</h3>
                  <p className="mb-6">Schedule a free consultation with our AI experts</p>
                  <Button className="bg-white text-blue-900 hover:bg-blue-100">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

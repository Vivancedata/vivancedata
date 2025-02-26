"use client"

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, BarChart3, Brain, ChevronRight } from "lucide-react";
import { AnimateOnScroll, StaggerContainer } from "@/hooks/useAnimateOnScroll";
import { motion, useInView, useAnimation } from "framer-motion";
import { features, statistics } from "@/constants/welcome";

// Helper function to get the appropriate icon component based on iconType
const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case "brain":
      return <Brain className="h-7 w-7 text-blue-500" />;
    case "barChart":
      return <BarChart3 className="h-7 w-7 text-blue-500" />;
    case "zap":
      return <Zap className="h-7 w-7 text-blue-500" />;
    case "checkCircle":
      return <CheckCircle className="h-7 w-7 text-blue-500" />;
    default:
      return <Brain className="h-7 w-7 text-blue-500" />;
  }
};

export default function Welcome() {

  // Animated counter for statistics
  interface CounterProps {
    end: number;
    duration?: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }

  const CounterAnimation: React.FC<CounterProps> = ({ 
    end, 
    duration = 2, 
    label, 
    prefix = "", 
    suffix = "" 
  }) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
    const [count, setCount] = React.useState(0);
    
    useEffect(() => {
      if (isInView) {
        let startTime: number | null = null;
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        
        requestAnimationFrame(animateCount);
        controls.start("visible");
      }
    }, [isInView, end, duration, controls]);
    
    return (
      <div ref={nodeRef} className="text-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
            {prefix}{count}{suffix}
          </h3>
          <p className="text-gray-600 font-medium">{label}</p>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="container mx-auto py-20 px-4 md:py-32 overflow-hidden">
      <div className="relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        
        <AnimateOnScroll variant="fadeInUp" className="flex flex-col items-center justify-center text-center space-y-6 mb-20">
          <div className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800 mb-4">
            Why Choose VivaceFlow
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Transforming Businesses Through <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Intelligent Automation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
            We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col p-8 bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group"
            >
              <div className="rounded-2xl bg-blue-50 p-4 w-fit mb-6 group-hover:bg-blue-100 transition-colors duration-300">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {getIconComponent(feature.icon)}
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </div>
          ))}
        </StaggerContainer>

        {/* Stats section */}
        <AnimateOnScroll variant="fadeIn" className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact in Numbers</h3>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                We&apos;ve helped businesses across industries achieve remarkable results with our AI solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
              {statistics.map((stat, index) => (
                <CounterAnimation 
                  key={index}
                  end={stat.end} 
                  label={stat.label} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeInUp" className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-7 h-auto text-lg font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-xl group">
            <span>Explore Our Services</span>
            <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-7 h-auto text-lg font-medium rounded-xl transition-all duration-300">
            Schedule a Consultation
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

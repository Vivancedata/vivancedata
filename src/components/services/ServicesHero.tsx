"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { TextReveal } from "@/components/common/Animations";

interface ServicesHeroProps {
  title: string;
  description: string;
}

export function ServicesHero({ title, description }: ServicesHeroProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 md:py-32 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(101,111,243,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(76,29,149,0.3),transparent_50%)]"></div>
        
        {/* Floating shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Content */}
      <motion.div 
        className="container relative z-10 mx-auto px-4 text-center"
        style={{ y: textY, opacity }}
      >
        <AnimateOnScroll variant="fadeInUp" className="mb-4">
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-blue-100">Our Services</span>
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant="flipIn" className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            {title}
          </h1>
        </AnimateOnScroll>
        
        <AnimateOnScroll variant="fadeInUp" delay={0.2}>
          <TextReveal 
            text={description}
            className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100 leading-relaxed"
          />
        </AnimateOnScroll>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-100 mb-2">Scroll to explore</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-100"
            >
              <path 
                d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import React from "react";
import { m } from "framer-motion";
import { AnimateOnScroll, Parallax } from "@/hooks/useAnimateOnScroll";
import { TextReveal } from "@/components/common/Animations";

interface AboutHeroProps {
  title: string;
  description: string;
}

export function AboutHero({ title, description }: AboutHeroProps): React.ReactElement {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, particleId) => ({
        id: `particle-${particleId + 1}`,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        yOffset: Math.random() * 30 - 15,
        xOffset: Math.random() * 30 - 15,
        duration: Math.random() * 5 + 5,
      })),
    []
  );

  return (
    <section className="relative w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 md:py-28 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <m.div
            key={particle.id}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, particle.yOffset],
              x: [0, particle.xOffset],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <Parallax speed={0.2} direction="up" className="relative z-10">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnScroll variant="fadeInUp" className="mb-6">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium text-blue-100">About Us</span>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll variant="scaleIn" className="mb-6">
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
        </div>
      </Parallax>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <m.path 
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z" 
            fill="white"
            fillOpacity="0.05"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <m.path 
            d="M0 120L48 115C96 110 192 100 288 95C384 90 480 90 576 95C672 100 768 110 864 110C960 110 1056 100 1152 95C1248 90 1344 90 1392 90L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z" 
            fill="white"
            fillOpacity="0.1"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </svg>
      </div>
    </section>
  );
}

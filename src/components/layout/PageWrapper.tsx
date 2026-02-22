"use client";

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { ScrollProgress } from "@/components/common/Animations";
import { getOptimalAnimationSettings } from "@/lib/performance";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ 
  children, 
  className = ""
}: PageWrapperProps) {
  const { enableAnimations, duration } = getOptimalAnimationSettings();

  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Page content with enter/exit animations */}
      <AnimatePresence mode="wait">
        <m.div
          className={className}
          initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
          animate={enableAnimations ? { opacity: 1, y: 0 } : undefined}
          exit={enableAnimations ? { opacity: 0, y: -20 } : undefined}
          transition={{ duration: duration * 0.8 }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </>
  );
}

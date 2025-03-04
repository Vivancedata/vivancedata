"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollProgress } from "@/components/common/Animations";
import { getOptimalAnimationSettings, preloadCriticalResources } from "@/lib/performance";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  preloadResources?: string[];
}

export default function PageWrapper({ 
  children, 
  className = "",
  preloadResources = []
}: PageWrapperProps) {
  const { enableAnimations, duration } = getOptimalAnimationSettings();

  useEffect(() => {
    // Preload critical resources if provided
    if (preloadResources.length > 0) {
      preloadCriticalResources(preloadResources);
    }
  }, [preloadResources]);

  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Page content with enter/exit animations */}
      <AnimatePresence mode="wait">
        <motion.div
          className={className}
          initial={enableAnimations ? { opacity: 0, y: 20 } : undefined}
          animate={enableAnimations ? { opacity: 1, y: 0 } : undefined}
          exit={enableAnimations ? { opacity: 0, y: -20 } : undefined}
          transition={{ duration: duration * 0.8 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

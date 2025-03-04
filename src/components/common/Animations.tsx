"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { prefersReducedMotion } from "@/lib/performance";

// Hover card animation
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const cardVariants: Variants = {
    initial: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: reducedMotion ? 1 : 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for buttons or icons
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  interval?: number; // Time in ms between pulses
  scale?: number; // How much to scale during pulse
}

export function Pulse({ 
  children, 
  className = "", 
  interval = 2000, 
  scale = 1.05 
}: PulseProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsPulsing(false);
      return;
    }

    const timer = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, interval / 2);

    return () => clearInterval(timer);
  }, [interval, reducedMotion]);

  return (
    <motion.div
      className={className}
      animate={{
        scale: isPulsing ? scale : 1
      }}
      transition={{
        duration: interval / 2000,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Fade in/out transition
interface FadeProps {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
  className?: string;
}

export function Fade({ 
  children, 
  show, 
  duration = 0.3, 
  className = "" 
}: FadeProps) {
  const variants: Variants = {
    hidden: { 
      opacity: 0,
      transition: { duration }
    },
    visible: { 
      opacity: 1,
      transition: { duration }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  staggerChildren?: number;
  once?: boolean;
}

export function TextReveal({ 
  text, 
  className = "", 
  staggerChildren = 0.03,
  once = true
}: TextRevealProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: 0.1
      }
    }
  };

  const childVariants: Variants = {
    hidden: { 
      y: reducedMotion ? 0 : 20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={`${className} overflow-hidden`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-1.5">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`char-${wordIndex}-${charIndex}`}
              className="inline-block"
              variants={childVariants}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

// Shimmer effect for loading states
interface ShimmerProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Shimmer({ 
  className = "", 
  width = "100%", 
  height = "100%" 
}: ShimmerProps) {
  const shimmerVariants: Variants = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: "calc(500px + 100%) 0",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:500px_100%] ${className}`}
      style={{ width, height }}
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
    />
  );
}

// Button with click animation
interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AnimatedButton({ 
  children, 
  onClick, 
  className = "",
  disabled = false
}: AnimatedButtonProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: reducedMotion ? 1 : 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: reducedMotion ? 1 : 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? "initial" : "hover"}
      whileTap={disabled ? "initial" : "tap"}
    >
      {children}
    </motion.button>
  );
}

// Scroll progress indicator
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 origin-left"
      style={{ width: `${scrollProgress}%` }}
    />
  );
}

// Animated counter
interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

export function Counter({ 
  from, 
  to, 
  duration = 2, 
  className = "",
  formatter = (value) => Math.round(value).toString()
}: CounterProps) {
  const [count, setCount] = useState(from);
  const [inView, setInView] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = from + (to - from) * progress;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, inView]);

  return (
    <div ref={ref} className={className}>
      {formatter(count)}
    </div>
  );
}

"use client";

import React, { useRef, useMemo } from "react";
import { m, useInView, Variants } from "framer-motion";

// Animation variants for different entrance effects
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8
    }
  }
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

// New animation variants
const flipInVariants: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Custom spring-like ease
    }
  }
};

const bounceInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const blurInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

const slideUpVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1] // Custom cubic-bezier
    }
  }
};

const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -15, scale: 0.95 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: { 
      duration: 0.7,
      ease: "easeOut" as const
    }
  }
};

/**
 * The scroll-driven twin of the design system's `.settle` utility.
 *
 * `settle-in` in `@vivancedata/ui` runs on load: opacity 0.32 -> 1, a 3px rise,
 * and a 2px blur clearing, over 620ms on cubic-bezier(0.16, 1, 0.3, 1). The
 * values here are that keyframe, to the number, driven by the viewport instead
 * of by page load.
 *
 * Deliberately not a new gesture. The site already has one motion idea — a
 * thing arriving into focus rather than flying in — and a photograph developing
 * as it enters is that same idea applied to an image. It starts at 0.32 rather
 * than 0 because a specimen fading up from nothing reads as a loading state,
 * which is the exact failure the wireframe hero it replaces was guilty of.
 */
const settleVariants: Variants = {
  hidden: { opacity: 0.32, y: 3, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.62,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Map of variant names to their implementations
const variantMap = {
  settle: settleVariants,
  fadeInUp: fadeInUpVariants,
  fadeInLeft: fadeInLeftVariants,
  fadeInRight: fadeInRightVariants,
  fadeIn: fadeInVariants,
  scaleIn: scaleInVariants,
  flipIn: flipInVariants,
  bounceIn: bounceInVariants,
  blurIn: blurInVariants,
  slideUp: slideUpVariants,
  rotateIn: rotateInVariants,
};

// Types for the AnimateOnScroll component
type AnimationVariant = keyof typeof variantMap;

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  duration?: number;
  as?: React.ElementType;
}

// Component that animates its children when they enter the viewport
export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  variant = "fadeInUp",
  delay = 0,
  threshold = 0.1,
  className = "",
  once = true,
  duration,
  as = m.div,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    once,
    amount: threshold
  });

  // Memoize the variants to prevent unnecessary re-renders
  const currentVariant = useMemo(() => {
    const baseVariant = variantMap[variant];
    
    // If custom duration is provided, create a modified variant
    if (duration && baseVariant.visible && typeof baseVariant.visible === 'object' && 'transition' in baseVariant.visible) {
      const visibleVariant = baseVariant.visible as { transition?: Record<string, unknown> };
      return {
        ...baseVariant,
        visible: {
          ...baseVariant.visible,
          transition: {
            ...visibleVariant.transition,
            duration
          }
        }
      };
    }
    
    return baseVariant;
  }, [variant, duration]);

  const MotionComponent = as;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={currentVariant}
      transition={{ delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

// Types for the StaggerContainer component
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  childClassName?: string;
  direction?: "up" | "down" | "left" | "right";
  as?: React.ElementType;
}

// Component that staggers the animation of its children
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = "",
  threshold = 0.1,
  once = true,
  childClassName = "",
  direction = "up",
  as = "div"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    once,
    amount: threshold
  });

  // Determine animation direction
  const getDirectionVariants = useMemo(() => {
    switch (direction) {
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: i * staggerDelay
            }
          })
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              delay: i * staggerDelay
            }
          })
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              delay: i * staggerDelay
            }
          })
        };
      case "up":
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay: i * staggerDelay
            }
          })
        };
    }
  }, [direction, staggerDelay]);

  // Clone children and add staggered animation
  const childrenArray = React.Children.toArray(children);
  const keyCounts = new Map<string, number>();
  let order = 0;
  const staggeredChildren: React.ReactNode[] = [];

  for (const child of childrenArray) {
    if (!React.isValidElement(child)) {
      staggeredChildren.push(child);
      continue;
    }

    const baseKey =
      child.key !== null
        ? String(child.key)
        : `staggered-${typeof child.type === "string" ? child.type : "child"}`;
    const keyCount = keyCounts.get(baseKey) ?? 0;
    keyCounts.set(baseKey, keyCount + 1);
    const stableKey = keyCount === 0 ? baseKey : `${baseKey}-${keyCount}`;

    staggeredChildren.push(
      <m.div
        key={stableKey}
        custom={order}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={getDirectionVariants}
        className={childClassName}
      >
        {child}
      </m.div>
    );
    order += 1;
  }

  const Component = as;

  return (
    <Component ref={ref} className={className}>
      {staggeredChildren}
    </Component>
  );
};


"use client";

/**
 * Utility functions for performance optimization
 */

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit the rate at which a function can fire
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Memoize function to cache expensive function calls
export function memoize<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

// Lazy load images with Intersection Observer
export function lazyLoadImages(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }
  
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Detect if the device has reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Optimize animations based on device capability
export function getOptimalAnimationSettings() {
  const reducedMotion = prefersReducedMotion();
  const isLowPowerDevice = isLowEndDevice();
  
  return {
    enableAnimations: !reducedMotion,
    simplifyAnimations: isLowPowerDevice,
    duration: isLowPowerDevice ? 0.3 : 0.6,
    staggerDelay: isLowPowerDevice ? 0.05 : 0.1,
  };
}

// Detect if the device is likely a low-end device
function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Check for hardware concurrency (CPU cores)
  const lowCPUCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  // Check for device memory (if available)
  const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  
  // Check if the device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  return (lowCPUCores || lowMemory) && isMobile;
}

// Preload critical resources
export function preloadCriticalResources(resources: string[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  resources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    
    // Determine the as attribute based on file extension
    if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (/\.(png|jpg|jpeg|gif|webp)$/i.test(resource)) {
      link.as = 'image';
    } else if (/\.(woff|woff2|ttf|otf)$/i.test(resource)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  });
}

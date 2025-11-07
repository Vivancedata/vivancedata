/**
 * Utility functions for performance optimization
 *
 * Note: These utilities use browser APIs and should be called from client components
 */

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

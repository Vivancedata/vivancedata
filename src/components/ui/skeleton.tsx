import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional variant for different skeleton shapes
   */
  variant?: "default" | "circular" | "rounded";
}

/**
 * Skeleton component for loading states
 * Uses Tailwind animate-pulse for the shimmer effect
 */
function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        {
          "rounded-md": variant === "default",
          "rounded-full": variant === "circular",
          "rounded-xl": variant === "rounded",
        },
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * SkeletonText - For text placeholders with varying widths
 */
function SkeletonText({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * SkeletonCard - For card-style loading placeholders
 */
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-secondary/50 overflow-hidden",
        className
      )}
    >
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-16" />
        <div className="flex gap-2">
          <Skeleton variant="circular" className="h-6 w-16" />
          <Skeleton variant="circular" className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

/**
 * SkeletonInput - For form input placeholders
 */
function SkeletonInput({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

/**
 * SkeletonButton - For button placeholders
 */
function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-32", className)} />;
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonInput, SkeletonButton };

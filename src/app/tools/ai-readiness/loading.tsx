import { Container } from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function AIReadinessLoading() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
          <Skeleton className="h-6 w-3/4 max-w-2xl mx-auto" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>

          {/* Question Card Skeleton */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            {/* Card Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton variant="circular" className="h-9 w-9" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5" />
            </div>

            {/* Radio Options Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton variant="circular" className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <Skeleton className="h-5 w-full" style={{ maxWidth: `${85 - i * 5}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons Skeleton */}
          <div className="flex justify-between">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* What This Assessment Covers Section Skeleton */}
        <div className="mt-16 rounded-xl bg-muted/50 p-8">
          <Skeleton className="h-7 w-64 mb-6" />
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton variant="circular" className="h-2 w-2" />
                  <Skeleton className="h-5 w-36" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

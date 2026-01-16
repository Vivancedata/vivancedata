import { Container } from "@/components/common/Container";
import { Skeleton, SkeletonInput, SkeletonButton } from "@/components/ui/skeleton";

export default function ROICalculatorLoading() {
  return (
    <Container className="py-16">
      <div className="max-w-5xl mx-auto">
        {/* Page Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-72 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
          <Skeleton className="h-6 w-3/4 max-w-2xl mx-auto" />
        </div>

        {/* Business Inputs Card Skeleton */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          {/* Card Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton variant="circular" className="h-5 w-5" />
              <Skeleton className="h-6 w-36" />
            </div>
            <Skeleton className="h-4 w-72" />
          </div>

          {/* Form Inputs Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
            <div className="md:col-span-2 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Calculate Button */}
          <SkeletonButton className="w-full mt-6 h-12" />
        </div>

        {/* How This Calculator Works Section Skeleton */}
        <div className="mt-16 rounded-xl bg-muted/50 p-8">
          <Skeleton className="h-7 w-64 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Cost Factors */}
              <div>
                <Skeleton className="h-5 w-44 mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton variant="circular" className="h-2 w-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefit Categories */}
              <div>
                <Skeleton className="h-5 w-40 mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton variant="circular" className="h-2 w-2" />
                      <Skeleton className="h-4 w-44" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </Container>
  );
}

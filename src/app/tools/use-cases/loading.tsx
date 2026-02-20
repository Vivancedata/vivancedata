import { Container } from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm h-full">
      {/* Badges */}
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      {/* Title */}
      <Skeleton className="h-6 w-full mb-2" />
      {/* Description */}
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      {/* Tech badges */}
      <div className="flex gap-1 mb-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t">
        {[1, 2, 3].map((stat) => (
          <div key={`stat-${stat}`} className="text-center">
            <Skeleton className="h-4 w-4 mx-auto mb-1" />
            <Skeleton className="h-3 w-12 mx-auto mb-1" />
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
        ))}
      </div>
      {/* Benefits */}
      <div className="pt-3 border-t mt-4">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-5/6 mb-1" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

export default function UseCasesLoading() {
  return (
    <Container className="py-16 max-w-7xl">
      {/* Page Header Skeleton */}
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-2" />
        <Skeleton className="h-6 w-3/4 max-w-2xl mx-auto" />
      </div>

      {/* Filters Card Skeleton */}
      <div className="rounded-xl border bg-card p-6 shadow-sm mb-8">
        {/* Search Input */}
        <Skeleton className="h-10 w-full mb-4" />

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((filter) => (
            <div key={`filter-${filter}`}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Use Cases Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <SkeletonCard key={`card-${card}`} />
        ))}
      </div>

      {/* CTA Section Skeleton */}
      <div className="mt-16 rounded-xl bg-muted/50 p-8">
        <Skeleton className="h-7 w-48 mb-4" />
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-5/6 mb-6" />

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((cta) => (
            <div key={`cta-${cta}`}>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>

        <Skeleton className="h-11 w-48 mt-6" />
      </div>
    </Container>
  );
}

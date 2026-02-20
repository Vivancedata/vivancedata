import { Container } from "@/components/common/Container";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <Container className="py-16">
      {/* Page Header Skeleton */}
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
      </div>

      {/* Blog Filters Skeleton */}
      <div className="space-y-4 mb-8">
        {/* Search Input Skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />

        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((tag) => (
            <Skeleton key={`tag-${tag}`} variant="circular" className="h-7 w-20" />
          ))}
        </div>
      </div>

      {/* Blog Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <SkeletonCard key={`card-${card}`} />
        ))}
      </div>
    </Container>
  );
}

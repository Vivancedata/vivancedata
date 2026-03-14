import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="container mx-auto min-h-screen px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="mt-6 h-12 w-full max-w-3xl" />
          <Skeleton className="mt-3 h-12 w-4/5 max-w-2xl" />
          <Skeleton className="mt-8 h-5 w-3/4 max-w-2xl" />
          <Skeleton className="mt-3 h-5 w-2/3 max-w-xl" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={`hero-card-${index + 1}`}
              className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="mt-6 h-7 w-3/4" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-11/12" />
              <Skeleton className="mt-2 h-4 w-4/5" />
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`support-block-${index + 1}`}
              className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm"
            >
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="mt-5 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

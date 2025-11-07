import { Container } from "@/components/common/Container";

export default function BlogLoading() {
  return (
    <Container className="py-16">
      <div className="text-center mb-12">
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl bg-secondary/50 overflow-hidden animate-pulse">
            <div className="aspect-square w-full bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-16 bg-gray-300 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

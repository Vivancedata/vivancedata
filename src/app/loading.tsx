import { Container } from "@/components/common/Container";

export default function Loading() {
  return (
    <Container className="py-24">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    </Container>
  );
}

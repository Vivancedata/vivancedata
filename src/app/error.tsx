"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <AlertTriangle className="h-16 w-16 text-red-600" />
          </div>
        </div>

        <Heading className="text-3xl md:text-4xl mb-4">
          Something Went Wrong
        </Heading>

        <Paragraph className="text-lg mb-8 text-gray-600">
          We encountered an unexpected error. This has been logged and we&apos;ll look into it.
        </Paragraph>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm text-red-800 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Paragraph className="text-sm text-gray-500">
            If this problem persists, please{" "}
            <Link href="/contact" className="text-primary hover:text-primary/90 underline">
              contact our support team
            </Link>
            .
          </Paragraph>
        </div>
      </div>
    </Container>
  );
}

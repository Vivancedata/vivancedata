import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold text-primary">404</span>
        </div>

        <Heading className="text-3xl md:text-4xl mb-4">
          Page Not Found
        </Heading>

        <Paragraph className="text-lg mb-8 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or the URL might be incorrect.
        </Paragraph>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Browse Blog
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Paragraph className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </Paragraph>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-primary hover:text-primary/90 hover:underline">
              Our Services
            </Link>
            <Link href="/industries" className="text-primary hover:text-primary/90 hover:underline">
              Industries
            </Link>
            <Link href="/case-studies" className="text-primary hover:text-primary/90 hover:underline">
              Case Studies
            </Link>
            <Link href="/about" className="text-primary hover:text-primary/90 hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-primary hover:text-primary/90 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

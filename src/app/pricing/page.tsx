import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Button } from "@/components/ui/button";
import Pricing from "@/components/home/Pricing";
import { pricingPageContent } from "@/constants/pricing";

export const metadata: Metadata = {
  title: "Pricing - Vivancedata",
  description:
    "What an AI build costs: a one-off fee to scope and build it, and a monthly fee to keep it working. Starting figures for assessment, build and ongoing partnership.",
  keywords: ["AI consulting pricing", "AI automation cost", "AI retainer", "AI project pricing"],
  openGraph: {
    title: "Pricing - Vivancedata",
    description:
      "A build has two costs: getting it working, and keeping it working. Both are listed.",
    type: "website",
    url: "https://vivancedata.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <Container className="py-16">
      <div className="max-w-[62ch]">
        <Heading className="mb-4 max-w-[17ch] font-display text-serif-xl">{pricingPageContent.title}</Heading>
        <Paragraph className="mx-auto max-w-[60ch] text-lg">{pricingPageContent.description}</Paragraph>
      </div>

      <Pricing showHeader={false} />

      <div className="max-w-[80ch] border border-rule bg-card p-8">
        <h2 className="mb-3 font-display text-serif-md">{pricingPageContent.whyRetainer.title}</h2>
        <p className="max-w-[60ch] text-muted-foreground">{pricingPageContent.whyRetainer.body}</p>
      </div>

      <div className="mt-8 max-w-[62ch]">
        <p className="mx-auto max-w-[60ch] text-sm text-muted-foreground">{pricingPageContent.note}</p>
        <Button asChild size="lg" shape="pill" className="mt-6">
          <Link href="/contact">Book a call</Link>
        </Button>
      </div>
    </Container>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Heading } from "@/components/common/Heading";
import { Paragraph } from "@/components/common/Paragraph";
import { Button } from "@/components/ui/button";
import Pricing from "@/components/home/Pricing";
import { pricingPageContent } from "@/constants/pricing";

export const metadata: Metadata = {
  title: "Pricing - VivanceData",
  description:
    "What an AI build costs: a one-off fee to scope and build it, and a monthly fee to keep it working. Starting figures for assessment, build and ongoing partnership.",
  keywords: ["AI consulting pricing", "AI automation cost", "AI retainer", "AI project pricing"],
  openGraph: {
    title: "Pricing - VivanceData",
    description:
      "A build has two costs: getting it working, and keeping it working. Both are listed.",
    type: "website",
    url: "https://vivancedata.com/pricing",
  },
};

export default function PricingPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">{pricingPageContent.eyebrow}</p>
        <Heading className="mb-4 text-4xl md:text-5xl">{pricingPageContent.title}</Heading>
        <Paragraph className="mx-auto max-w-[60ch] text-lg">{pricingPageContent.description}</Paragraph>
      </div>

      <Pricing showHeader={false} />

      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8">
        <h2 className="text-heading-2 mb-3">{pricingPageContent.whyRetainer.title}</h2>
        <p className="max-w-[60ch] text-muted-foreground">{pricingPageContent.whyRetainer.body}</p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="mx-auto max-w-[60ch] text-sm text-muted-foreground">{pricingPageContent.note}</p>
        <Button asChild size="lg" shape="pill" className="mt-6">
          <Link href="/contact">Get a fixed price</Link>
        </Button>
      </div>
    </Container>
  );
}

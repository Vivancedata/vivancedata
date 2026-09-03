import Welcome from "@/components/home/Welcome";
import ClientLogos from "@/components/home/ClientLogos";
import Process from "@/components/home/Process";
import Pricing from "@/components/home/Pricing";
import { DemoBooking } from "@/components/home/DemoBooking";
import { Metadata } from "next";

// Search and social copy tracks the hero. A contractor searching for this does
// not type "intelligent automation" -- they type the trade and the problem, so
// the title and keywords name both rather than the category.
export const metadata: Metadata = {
  title: "VivanceData - AI for construction, HVAC, logistics and manufacturing",
  description: "Small, specific AI systems for trades and field operations: after-hours calls answered and booked, permits and delivery paperwork read instead of re-keyed. Built on your own documents, and yours to keep.",
  keywords: ["AI for contractors", "HVAC after-hours call answering", "construction document automation", "permit data extraction", "proof of delivery automation", "AI consulting for trades", "field operations automation"],
  openGraph: {
    title: "VivanceData - AI for construction, HVAC, logistics and manufacturing",
    description: "After-hours calls answered and booked. Permits and delivery paperwork read instead of re-keyed. Built on your own documents.",
    type: "website",
    url: "https://vivancedata.com",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "VivanceData AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivanceData - AI for construction, HVAC, logistics and manufacturing",
    description: "After-hours calls answered and booked. Paperwork read instead of re-keyed.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
};

// JSON-LD schema for the homepage.
//
// Keep the name and description here in step with `metadata` above. They drifted
// once already: the visible copy was rewritten for the blue-collar niche while
// this object kept "AI Solutions for Modern Businesses" and "Transforming
// Businesses Through Intelligent Automation", so search engines carried on
// reading the old positioning out of the structured data after it had gone from
// the page. Structured data is not decoration -- it is the version Google quotes.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vivancedata.com/#organization",
      "name": "VivanceData",
      "url": "https://vivancedata.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vivancedata.com/icons/Logo.png",
        "width": 180,
        "height": 60
      },
      "description": "VivanceData builds small, specific AI systems for construction, HVAC, logistics and manufacturing businesses \u2014 after-hours call handling and document intake, built on the client's own paperwork.",
      "sameAs": [
        "https://github.com/Vivancedata",
        "https://www.linkedin.com/in/lorenzo-scaturchio"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://vivancedata.com/#website",
      "url": "https://vivancedata.com",
      "name": "VivanceData - AI for construction, HVAC, logistics and manufacturing",
      "description": "After-hours calls answered and booked. Permits and delivery paperwork read instead of re-keyed.",
      "publisher": {
        "@id": "https://vivancedata.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://vivancedata.com/#webpage",
      "url": "https://vivancedata.com",
      "name": "VivanceData - AI for construction, HVAC, logistics and manufacturing",
      "description": "Small, specific AI systems for trades and field operations, proved on your own documents before you pay for a build.",
      "isPartOf": {
        "@id": "https://vivancedata.com/#website"
      },
      "about": {
        "@id": "https://vivancedata.com/#organization"
      }
    }
  ]
};

/*
 * Five bands and a footer, in the order a buyer needs them: what the problem
 * is, whether it is their trade, how the work runs, what it costs, and how to
 * start. The page used to run fourteen -- 18,915px at 1440 and 38,697px at 390,
 * with fourteen CTAs and three consecutive closing asks, which put the booking
 * form at roughly the thirty-seventh screen on a phone. What went made the
 * generic AI-agency case the hero above it contradicts: Overview, TrustSection,
 * Integrations' twenty vendor logos, the "Success Stories" band, Team, Blog, an
 * FAQ, a second contact form and a third closing CTA.
 *
 * There is exactly one ask on this page now, and it is DemoBooking.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Welcome />
      <ClientLogos />
      <Process />
      <Pricing />
      <DemoBooking />
    </div>
  );
}

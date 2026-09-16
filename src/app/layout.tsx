import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter as Footer } from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { AppChrome } from "@/components/layout/AppChrome";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "@vivancedata/ui/styles";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MotionProvider } from "@/components/common/MotionProvider";

// Three voices, and each one has a job. Instrument Serif sets display type and
// carries the italic that turns one word of a sentence; Geist Sans sets prose
// and UI; Geist Mono sets machine facts -- times, job numbers, extracted fields,
// money -- and the controls that operate them. Exposed as CSS variables that
// tailwind.preset.ts reads.
//
// The serif is loaded with its italic because the italic is not decoration
// here: it is the emphasis mechanism, in place of a second weight the face
// does not have and in place of colouring words green, which would spend the
// brand mark on typography instead of on evidence.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vivancedata - AI for construction, HVAC, logistics and manufacturing",
    template: "%s | Vivancedata"
  },
  description: "After-hours calls answered and booked. Permits and delivery paperwork read instead of re-keyed. Built by Lorenzo Scaturchio on your own documents, and yours to keep.",
  keywords: ["AI for contractors", "HVAC after-hours call answering", "construction document automation", "proof of delivery automation", "AI consulting for trades"],
  authors: [{ name: "Lorenzo Scaturchio" }],
  creator: "Lorenzo Scaturchio",
  publisher: "Vivancedata",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vivancedata.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vivancedata.com",
    title: "Vivancedata - AI for construction, HVAC, logistics and manufacturing",
    description: "After-hours calls answered and booked. Paperwork read instead of re-keyed.",
    siteName: "Vivancedata",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Vivancedata - AI for construction, HVAC, logistics and manufacturing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivancedata - AI for construction, HVAC, logistics and manufacturing",
    description: "After-hours calls answered and booked. Paperwork read instead of re-keyed.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      // The design system sets scroll-behavior: smooth; this opts out of it for
      // route transitions, which is what Next.js asks for.
      data-scroll-behavior="smooth"
      // `data-world` opts this app into the `nightshift` token set in
      // @vivancedata/ui. The CRM, the learning platform and the three demo
      // sites do not set it and keep the light Geist sheet.
      data-world="nightshift"
      className={`antialiased ${geistSans.variable} ${geistMono.variable} ${displaySerif.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        {/*
          * Scroll reveals animate *to* visible, so their hidden state is
          * server-rendered: /industries/construction ships 22 elements with an
          * inline `opacity:0`, including every "What I build" block. The text is
          * in the HTML — crawlers and readers get it — but a person sees a
          * mostly empty page until JavaScript hydrates and the observer fires.
          *
          * This restores them when scripting is off. It does NOT cover the worse
          * case, where JavaScript is enabled but slow or broken; that needs the
          * reveals rebuilt to start visible and enhance from there, which is a
          * change to every call site rather than a line here.
          */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
      {/* The direction contract for this build. Emitted into the markup, not
        * left as a JSX comment the compiler drops, so it can be audited in a
        * production build: `curl -s vivancedata.com | grep NIGHTSHIFT`. */}
      <div
        hidden
        dangerouslySetInnerHTML={{
          __html: `<!--
NIGHTSHIFT / direction contract

THESIS: This page is the night log of a practice whose only real proof is three
systems that already run. It refuses the AI-consultancy hero (gradient wash,
capability cards, logo wall) and refuses its opposite, the stark white platform
sheet this site already was.

OWN-WORLD: Warm near-black #0E0E0C under cream #EDEAE5. Structure is a 1px
hairline grid; nothing is a card and nothing casts a shadow. Instrument Serif
sets display and turns one word of a sentence italic; Geist Sans sets prose;
Geist Mono sets every machine fact. Brand green is ink, never light: it marks
affirmative machine state -- a value a system filled, a capability a tier
includes, a link that opens one of those systems -- and nothing else. Not
emphasis, not prices, not links in general.

STORY: An owner-operator recognises their own 9pm in the first line, watches
three systems read a call, a slip and a field note, learns what it costs, and
books a call. One ask on the page.

FIRST VIEWPORT: Left-set serif headline to 6rem on a warm-black field, two mono
controls beneath, a full-bleed hairline, and under it the night log: three
machine records on a dot matrix, green only on the values a system filled.

FORM: Pinned by the user's reference image; dense technical grid. No roll --
a brief-pinned direction beats it.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
-->`,
        }}
      />
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Pages use framer-motion's tree-shakeable `m.*` components, which
            * only animate when LazyMotion has supplied the feature bundle.
            * Without this provider every AnimateOnScroll element stays pinned
            * at its `hidden` variant -- i.e. opacity 0 -- so the body content
            * of all six industry pages rendered invisible. */}
          <MotionProvider>
            <header>
              <MainNav />
            </header>
            <PageWrapper className="flex-grow w-full">
              <main className="w-full overflow-x-clip px-4" id="main-content">
                {children}
              </main>
            </PageWrapper>
            <Footer />
            <AppChrome />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter as Footer } from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { AppChrome } from "@/components/layout/AppChrome";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@vivancedata/ui/styles";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { MotionProvider } from "@/components/common/MotionProvider";

// Geist Sans sets all UI and prose; Geist Mono sets code and the uppercase
// section eyebrows. Exposed as CSS variables that tailwind.preset.ts reads.
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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
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
      className={`antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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

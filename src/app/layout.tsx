import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter as Footer } from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { DeferredChrome } from "@/components/layout/DeferredChrome";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import type { Metadata, Viewport } from "next";
import "@vivancedata/ui/styles";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "VivanceData - AI Solutions for Modern Businesses",
    template: "%s | VivanceData"
  },
  description: "Boutique AI consulting practice helping businesses move from strategy to production. Founded by Lorenzo Scaturchio.",
  keywords: ["AI solutions", "artificial intelligence", "business automation", "machine learning", "data analytics", "generative AI", "AI consulting"],
  authors: [{ name: "Lorenzo Scaturchio" }],
  creator: "Lorenzo Scaturchio",
  publisher: "VivanceData",
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
    title: "VivanceData - AI Solutions for Modern Businesses",
    description: "Transforming Businesses Through Intelligent Automation",
    siteName: "VivanceData",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "VivanceData - AI Solutions for Modern Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivanceData - AI Solutions for Modern Businesses",
    description: "Transforming Businesses Through Intelligent Automation",
    images: ["https://vivancedata.com/images/banner.png"],
    creator: "@vivancedata",
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
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <GoogleAnalytics />
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
          <header>
            <MainNav />
          </header>
          <PageWrapper className="flex-grow w-full">
            <main className="w-full px-4" id="main-content">
              {children}
            </main>
          </PageWrapper>
          <Footer />
          <DeferredChrome />
        </ThemeProvider>
      </body>
    </html>
  );
}

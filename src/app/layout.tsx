import { MainNav } from "@/components/layout/MainNav";
import { SiteFooter as Footer } from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

// Optimize font loading
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "VivanceData - AI Solutions for Modern Businesses",
    template: "%s | VivanceData"
  },
  description: "We combine cutting-edge AI technology with deep industry expertise to deliver solutions that drive real business outcomes.",
  keywords: ["AI solutions", "artificial intelligence", "business automation", "machine learning", "data analytics", "generative AI", "AI consulting"],
  authors: [{ name: "VivanceData Team" }],
  creator: "VivanceData",
  publisher: "VivanceData",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vivancedata.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
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
  // Critical resources to preload
  const criticalResources = [
    "/images/banner.png",
    "/icons/Logo.png"
  ];

  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", fontSans.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <MainNav />
          </header>
          <PageWrapper preloadResources={criticalResources} className="flex-grow w-full">
            <main className="w-full px-4" id="main-content">
              {children}
            </main>
          </PageWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

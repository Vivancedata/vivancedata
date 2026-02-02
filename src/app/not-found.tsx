import { Metadata } from "next"
import { NotFoundContent } from "@/components/common/NotFoundContent"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found. Navigate back to our homepage or explore our AI solutions, services, and resources.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - Page Not Found | VivanceData",
    description: "The page you are looking for could not be found. Explore our AI solutions and services.",
    type: "website",
    url: "https://vivancedata.com/404",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "VivanceData - AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "404 - Page Not Found | VivanceData",
    description: "The page you are looking for could not be found. Explore our AI solutions and services.",
  },
}

export default function NotFound() {
  return <NotFoundContent />
}

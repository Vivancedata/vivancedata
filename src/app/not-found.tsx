import { Metadata } from "next"
import { NotFoundContent } from "@/components/common/NotFoundContent"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for couldn't be found. Head back to the homepage, or have a look at the services and resources.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "404 - Page Not Found | VivanceData",
    description: "The page you're looking for couldn't be found. Try the homepage or the services pages.",
    type: "website",
    url: "https://www.vivancedata.com/404",
    images: [
      {
        url: "https://www.vivancedata.com/images/banner.png",
        width: 2560,
        height: 1280,
        alt: "VivanceData - AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "404 - Page Not Found | VivanceData",
    description: "The page you're looking for couldn't be found. Try the homepage or the services pages.",
  },
}

export default function NotFound() {
  return <NotFoundContent />
}

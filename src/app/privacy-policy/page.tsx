import { Container } from "@/components/common/Container";
import { Metadata } from "next";
import { CookieSettingsButton } from "./CookieSettingsButton";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy & Transparency | Vivancedata",
  description: "Transparency about data handling, analytics, and business practices for Vivancedata's AI consulting services.",
  openGraph: {
    title: "Privacy Policy & Transparency | Vivancedata",
    description: "How I handle data, what the analytics do and do not collect, and which third-party services this site uses.",
    type: "website",
    url: "https://vivancedata.com/privacy-policy",
    siteName: "Vivancedata",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Vivancedata",
    description: "How I handle data and what this site collects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Keep this page in step with the code. The data flows it describes live in:
 * - instrumentation-client.ts / sentry.data-collection.ts (Sentry, Replay)
 * - src/components/analytics/GoogleAnalytics.tsx and src/lib/cookieConsent.ts
 * - src/app/api/contact, src/app/api/tool-report, src/app/api/newsletter
 * - src/lib/rateLimit.ts (Upstash)
 * When one of those changes what is collected or where it goes, update this
 * page and the date in the same pull request.
 */
export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy & Transparency</h1>
        <p className="lead">
          Last updated: October 20, 2026
        </p>

        <h2>Transparency Statement</h2>
        <p>
          This page sets out what the site collects, where it goes, and who else touches it along the way.
          If something here is unclear, ask me and I will answer it plainly.
        </p>

        <h2>Cookies and your consent</h2>
        <p>
          The first time you visit, a banner asks which optional cookies you allow. Your choice is stored in
          your browser&apos;s local storage, so the banner does not ask again. Nothing in the
          &ldquo;analytics&rdquo; or &ldquo;marketing&rdquo; categories runs until you allow it. To change
          your choice, use this button and the banner will ask again:
        </p>
        <CookieSettingsButton />

        <h2>Analytics & Tracking</h2>
        <p>
          <strong>Google Analytics.</strong> The site can load Google Analytics, but only after you allow
          analytics cookies. If you do, Google receives the pages you visit, your browser and device details
          and your IP address, and sets its own cookies. As of the date above no Google Analytics property is
          configured, so nothing is sent to Google even if you allow analytics. If I switch it on, it will
          still load only for visitors who have allowed analytics.
        </p>
        <p>
          The site does not use Vercel Analytics, Speed Insights or advertising pixels.
        </p>

        <h2>Error monitoring and Session Replay</h2>
        <p>
          I use Sentry to find and fix errors. When something breaks, Sentry receives the error, the page
          address, and your browser and operating system. Sentry is configured not to collect user details,
          cookies or request bodies. Its traffic goes through this site&apos;s own{" "}
          <code>/monitoring</code> path rather than straight to Sentry, so it is not cut off by ad-blockers.
        </p>
        <p>
          <strong>Session Replay</strong> is part of Sentry and loads only if you allow analytics cookies.
          With your consent it records how a visit unfolds (page structure, clicks, scrolling and
          navigation) for about 1 in 10 visits, and for any visit in which an error happens. All text on the
          page and everything you type is masked, and images and video are blocked, so a replay shows layout
          and movement, not content. If you refuse analytics cookies, no replay is recorded.
        </p>

        <h2>Information Collection</h2>
        <p>
          I collect only what you send me through the site:
        </p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, and, if you give them, your phone number,
            company, the service you are interested in, and your message. It is emailed to my inbox and you get
            a confirmation email. It is not stored in a database on this site.
          </li>
          <li>
            <strong>ROI calculator and AI readiness reports:</strong> when you ask for your results by email,
            the email address you enter and a summary of your answers and results are sent to you, and a copy
            with your address is sent to my inbox as a lead, so I may follow up. Nothing is stored on the site
            itself.
          </li>
          <li>
            <strong>Newsletter:</strong> if you subscribe, your email address and, if given, your first name are
            sent to the newsletter provider (ConvertKit or Mailchimp) that manages the list. Every newsletter
            includes an unsubscribe link.
          </li>
          <li>Project-related communications by email, if we work together.</li>
        </ul>

        <h2>Data Storage & Security</h2>
        <p>
          Form submissions live in my email inbox and, for the newsletter, with the newsletter provider. To stop
          the forms being abused, each form counts requests per IP address in Upstash Redis for about a minute.
          The site is served over HTTPS.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          This site relies on a few third-party services:
        </p>
        <ul>
          <li>Vercel: website hosting and deployment (Vercel keeps standard request logs, including IP addresses)</li>
          <li>Resend: delivery of contact form, confirmation and report emails</li>
          <li>Upstash: rate limiting to protect the forms from abuse</li>
          <li>Sentry: error tracking, and Session Replay if you allow analytics</li>
          <li>ConvertKit or Mailchimp: the newsletter list, if you subscribe</li>
          <li>Google Analytics: only if configured and only if you allow analytics (not active as of the date above)</li>
          <li>GitHub: code repository and version control</li>
        </ul>
        <p>
          Some of these services process data in the United States. Each has its own privacy policy, and I
          encourage you to review them. I do not sell your data.
        </p>

        <h2>Open Source</h2>
        <p>
          This website is open source, and you can verify how your data is handled by reviewing the code on
          my GitHub repository. I believe in transparency through code.
        </p>

        <h2>Sustainability Practices</h2>
        <p>
          I try to keep the site light:
        </p>
        <ul>
          <li>Optimizing website performance to reduce server load</li>
          <li>Using efficient code practices</li>
          <li>Choosing eco-friendly hosting providers</li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Request access to your personal data</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt-out of communications</li>
          <li>Withdraw cookie consent at any time</li>
          <li>Know how your data is being used</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For any questions about this privacy policy or data handling practices, please contact me at{" "}
          <a href="mailto:lorenzosca7@gmail.com">lorenzosca7@gmail.com</a>.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
          This privacy policy may be updated periodically to reflect changes in practices or regulations.
          Significant changes will be communicated through the website or email if necessary.
        </p>
      </div>
    </Container>
  );
}

import { Container } from "@/components/common/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
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

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>Privacy Policy & Transparency</h1>
        <p className="lead">
          Last updated: February 4, 2025
        </p>
        
        <h2>Transparency Statement</h2>
        <p>
          This page sets out what the site collects, where it goes, and who else touches it along the way.
          If something here is unclear, ask me and I will answer it plainly.
        </p>

        <h2>Analytics & Tracking</h2>
        <p>
          I use Vercel Analytics and Speed Insights to understand website performance and user experience.
          These tools are privacy-focused and do not collect personally identifiable information. The analytics
          help me improve the website&apos;s performance and content quality.
        </p>

        <h2>Information Collection</h2>
        <p>
          I collect minimal information, only what&apos;s necessary to provide my services:
        </p>
        <ul>
          <li>Contact form submissions (name, email, message)</li>
          <li>Newsletter subscriptions (email address), if you choose to subscribe</li>
          <li>Project-related communications</li>
        </ul>

        <h2>Data Storage & Security</h2>
        <p>
          All data is stored securely using modern encryption standards. I use:
        </p>
        <ul>
          <li>Vercel for website hosting and deployment</li>
          <li>Secure email servers for communications</li>
          <li>Industry-standard security practices for all stored data</li>
        </ul>

        <h2>Third-Party Services</h2>
        <p>
          This site relies on a few third-party services:
        </p>
        <ul>
          <li>Vercel - Website hosting and analytics</li>
          <li>Resend - Delivery of contact form and confirmation emails</li>
          <li>Upstash - Rate limiting to protect the contact and newsletter forms from abuse</li>
          <li>Sentry - Error tracking and diagnostics</li>
          <li>GitHub - Code repository and version control</li>
        </ul>
        <p>
          Each service has its own privacy policy, and I encourage you to review them.
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

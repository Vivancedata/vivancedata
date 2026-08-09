import React from 'react';
import { ProfileForm } from '@/components/contact/Form';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Metadata } from 'next';
import { Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact Us - VivanceData",
  description: "Get in touch to discuss what you are trying to automate. You will talk to the person who would do the work, not an account manager.",
  keywords: ["contact VivanceData", "AI consultation", "get in touch", "AI services inquiry", "business consultation"],
  openGraph: {
    title: "Contact Us - VivanceData",
    description: "Book a consultation and talk directly to the person who would build it.",
    type: "website",
    url: "https://vivancedata.com/contact",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Contact VivanceData",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - VivanceData",
    description: "Book a consultation and talk directly to the person who would build it.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
};

const ContactPage = () => {
  return (
    <Container className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Heading className="text-4xl md:text-5xl mb-4">Get in Touch</Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            Ready to transform your business with AI? Let&apos;s discuss how we can help you
            achieve your goals. Fill out the form below and one of our AI consultants will
            get back to you within 24 hours.
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-heading-3 mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-muted p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@vivancedata.com" className="text-muted-foreground hover:text-brand">
                      info@vivancedata.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-muted p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM PST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <h3 className="text-heading-4 mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Response within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Free initial consultation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Custom AI solution assessment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  No commitment required
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ProfileForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;

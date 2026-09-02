import React from 'react';
import { ProfileForm } from '@/components/contact/Form';
import { Container } from '@/components/common/Container';
import { Heading } from '@/components/common/Heading';
import { Paragraph } from '@/components/common/Paragraph';
import { Metadata } from 'next';
import { Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: "Book a call - Vivancedata",
  description: "Tell me what is slowing your operation down. You will hear back from me, not an account manager, within one working day.",
  keywords: ["contact Vivancedata", "book a call", "AI for contractors", "after-hours call answering", "paperwork automation"],
  openGraph: {
    title: "Book a call - Vivancedata",
    description: "Book a consultation and talk directly to the person who would build it.",
    type: "website",
    url: "https://vivancedata.com/contact",
    images: [
      {
        url: "https://vivancedata.com/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Contact Vivancedata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a call - Vivancedata",
    description: "Book a consultation and talk directly to the person who would build it.",
    images: ["https://vivancedata.com/images/banner.png"],
  },
};

const ContactPage = () => {
  return (
    <Container className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Heading className="text-4xl md:text-5xl mb-4">Book a call</Heading>
          <Paragraph className="max-w-2xl mx-auto text-lg">
            Tell me which job keeps going wrong: the after-hours calls, the paperwork typed twice,
            the photos that never get matched. You&apos;ll hear back from me, not an account manager,
            within one working day.
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-muted rounded-xl p-6">
              <h2 className="text-heading-3 mb-6">Contact Information</h2>

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
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM PST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <h2 className="text-heading-4 mb-3">What happens next</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  A reply from me within one working day
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  A first call that costs nothing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  An honest read on whether the job is worth automating
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  A fixed price in writing before anything starts
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

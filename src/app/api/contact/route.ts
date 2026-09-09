import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildRateLimitHeaders, enforceRateLimit } from '@/lib/rateLimit';
import { emailAddress, sendCourtesy, sendCritical, teamInbox } from '@/lib/email';
import { buildEnquiryConfirmation, buildEnquiryNotification } from '@/emails/contact';

const contactSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: emailAddress,
  // The buyer here is phone-first and reads this between jobs, so the form
  // offers a number and the enquiry carries it. Optional: not everyone will.
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  serviceInterest: z.string().trim().optional(),
  message: z.string().trim().min(1),
});

const CONTACT_RATE_LIMIT_OPTIONS = {
  keyPrefix: 'api:contact',
  maxRequests: 5,
  window: '1 m',
  windowMs: 60 * 1000,
} as const;

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, CONTACT_RATE_LIMIT_OPTIONS);
    const rateLimitHeaders = buildRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'That is more messages than this form accepts in a short window. Wait a minute and send again, or email info@vivancedata.com.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const parsed = contactSchema.safeParse(await request.json());

    if (!parsed.success) {
      // The schema is an implementation detail; the two messages callers have
      // always seen are the interface. A missing field still outranks a bad
      // address, as it did when these were two sequential checks.
      const hasMissingField = parsed.error.issues.some((issue) => issue.path[0] !== 'email');

      return NextResponse.json(
        { error: hasMissingField ? 'Some required fields are still empty.' : 'That email address does not look right.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const enquiry = parsed.data;

    const notification = await sendCritical({
      fromName: 'Vivancedata Contact Form',
      to: teamInbox(),
      replyTo: enquiry.email,
      subject: `New Contact Form Submission from ${enquiry.firstName} ${enquiry.lastName}`,
      html: buildEnquiryNotification(enquiry),
    });

    if (!notification.ok) {
      // Fail HONESTLY. This path used to log the submission and fall through
      // to the success response -- and next.config strips console.log in
      // production, so a prospect saw "we will get back to you soon" while
      // their message was destroyed: not emailed, not stored, not even logged.
      // A visible failure that hands over a direct address loses fewer leads
      // than a quiet lie.
      return notification.reason === 'unconfigured'
        ? NextResponse.json(
            {
              success: false,
              error:
                'The contact form is not able to send right now. Please email info@vivancedata.com directly.',
            },
            { status: 503, headers: rateLimitHeaders }
          )
        : NextResponse.json(
            {
              error:
                'I could not deliver your message. Please email info@vivancedata.com directly so it is not lost.',
            },
            { status: 502, headers: rateLimitHeaders }
          );
    }

    await sendCourtesy(
      {
        fromName: 'Vivancedata',
        to: enquiry.email,
        subject: 'I have your message',
        html: buildEnquiryConfirmation(enquiry),
      },
      'contact form confirmation'
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Message received. You will hear back from me within one working day.',
      },
      { status: 200, headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something broke on my end and your message did not send. Please try again, or email info@vivancedata.com so it is not lost.' },
      { status: 500 }
    );
  }
}

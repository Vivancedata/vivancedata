import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildRateLimitHeaders, enforceRateLimit } from '@/lib/rateLimit';
import { emailAddress, sendCritical, teamInbox } from '@/lib/email';
import { SERVICE_KEYS, buildEnquiryNotification } from '@/emails/contact';

// Names go into the notification's subject line, a plain-text header, so a
// line break in one is refused rather than passed on to the mail provider.
const nameField = z.string().trim().min(1).max(100).regex(/^[^\r\n]*$/);

const contactSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  email: emailAddress,
  // The buyer here is phone-first and reads this between jobs, so the form
  // offers a number and the enquiry carries it. Optional: not everyone will.
  phone: z.string().trim().max(32).optional(),
  company: z.string().trim().max(200).optional(),
  // The contact form sends "" until a service is picked. Anything else must be
  // one of the select's values.
  serviceInterest: z.union([z.enum(SERVICE_KEYS), z.literal('')]).optional(),
  message: z.string().trim().min(1).max(10_000),
  // BotTrapField: hidden from people, so a value here was typed by a bot.
  contactCheck: z.string().trim().max(200).optional(),
});

const CONTACT_RATE_LIMIT_OPTIONS = {
  keyPrefix: 'api:contact',
  maxRequests: 5,
  window: '1 m',
  windowMs: 60 * 1000,
} as const;

export async function POST(request: NextRequest) {
  try {
    // The body and the rate-limit check are independent, so both start now;
    // a request that is turned away simply never reads its body.
    const bodyPromise = request.json();
    bodyPromise.catch(() => {});
    const rateLimit = await enforceRateLimit(request, CONTACT_RATE_LIMIT_OPTIONS);
    const rateLimitHeaders = buildRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'That is more messages than this form accepts in a short window. Wait a minute and send again, or email lorenzo@vivancedata.com.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const parsed = contactSchema.safeParse(await bodyPromise);

    if (!parsed.success) {
      // The schema is an implementation detail; the two messages callers have
      // always seen are the interface. A missing field still outranks a bad
      // address, as it did when these were two sequential checks.
      const hasMissingField = parsed.error.issues.some(
        (issue) => issue.path[0] !== 'email' && issue.code !== 'too_big'
      );
      const hasOverlongField = parsed.error.issues.some((issue) => issue.code === 'too_big');

      return NextResponse.json(
        {
          error: hasMissingField
            ? 'Some required fields are still empty.'
            : hasOverlongField
              ? 'Something you entered is longer than this form accepts.'
              : 'That email address does not look right.',
        },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const enquiry = parsed.data;
    const received = () =>
      NextResponse.json(
        {
          success: true,
          message: 'Message received. You will hear back from me within one working day.',
        },
        { status: 200, headers: rateLimitHeaders }
      );

    if (enquiry.contactCheck) {
      // The one place a send is skipped and success still reported, and it is
      // deliberate: an error would tell the bot to retry with the field empty.
      // A person cannot reach this, because the field is never shown to one.
      console.warn('Contact form: bot trap filled, enquiry dropped');
      return received();
    }

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
                'The contact form is not able to send right now. Please email lorenzo@vivancedata.com directly.',
            },
            { status: 503, headers: rateLimitHeaders }
          )
        : NextResponse.json(
            {
              error:
                'I could not deliver your message. Please email lorenzo@vivancedata.com directly so it is not lost.',
            },
            { status: 502, headers: rateLimitHeaders }
          );
    }

    // No confirmation goes to the address in the form. Bots fill this form
    // with strangers' addresses, and each confirmation was mail from this
    // domain to someone who never wrote: the complaints that earns put
    // Resend sending, and the domain's inbox placement, at risk. The page
    // already tells a real visitor the message arrived.
    return received();
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something broke on my end and your message did not send. Please try again, or email lorenzo@vivancedata.com so it is not lost.' },
      { status: 500 }
    );
  }
}

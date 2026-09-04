import { Resend } from 'resend';
import { z } from 'zod';

/**
 * The one place that knows how this site sends email: how an address is
 * validated and normalised, and what happens when there is no way to deliver.
 *
 * Templates live in `src/emails/`; routes map results to HTTP. Neither of those
 * concerns belongs here, and no HTTP type crosses this interface.
 */

/**
 * Addresses used to arrive through three different normalisations -- a bare
 * regex twice and a zod field once, with lowercasing done afterwards in two
 * routes and not at all in the third. This field is the single answer.
 * 254 is the RFC 5321 path limit.
 *
 * `.email()` on a string is deprecated in zod 4 in favour of top-level
 * `z.email()`, and swapping it is a trap: `z.email()` validates the format
 * FIRST, so " Foo@Example.COM " is rejected outright instead of being trimmed
 * and lowercased into a valid address, and the 254 cap is lost with it. The
 * order of the chain is the behaviour. Whoever migrates to zod 5 has to
 * preserve trim -> lowercase -> length -> format, not just rename the call.
 */
export const emailAddress = z.string().trim().toLowerCase().min(1).max(254).email();

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
};

/** Escape user input before interpolating it into an email template. */
export function escapeHtml(str: string): string {
  // The pattern only matches keys of HTML_ESCAPES, so the lookup is total.
  return str.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

const STYLES = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
  .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  .field { margin-bottom: 15px; }
  .label { font-weight: bold; color: #374151; }
  .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
  .message { white-space: pre-wrap; }
  .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
  .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
`;

/**
 * The frame every email from this site shares. `title` is plain text and is
 * escaped here; `body` is already-rendered HTML, so templates escape their own
 * interpolations. Keeping the two asymmetric is deliberate -- a template that
 * forgot to escape its title would otherwise be silently exploitable.
 */
export function layout({ title, body }: { title: string; body: string }): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">${escapeHtml(title)}</h2>
        </div>
        <div class="content">
          ${body}
        </div>
      </div>
    </body>
    </html>
  `;
}

/** The inbox enquiries and leads are delivered to. */
export function teamInbox(): string {
  return process.env.CONTACT_FORM_TO_EMAIL || 'info@vivancedata.com';
}

function fromAddress(): string {
  return process.env.CONTACT_FORM_FROM_EMAIL || 'noreply@vivancedata.com';
}

/**
 * `EMAIL_DRY_RUN=1` reports success without sending anything.
 *
 * This used to be inferred from `NODE_ENV`, which is how the original bug
 * happened: the non-production path logged the submission and returned
 * success, `next.config.mjs` strips `console.log` from production builds, and
 * a prospect saw "we will get back to you soon" while their message was
 * destroyed. Pretending to send is now something you opt into by name, and it
 * cannot be reached by accident.
 */
export function isDryRun(): boolean {
  const flag = process.env.EMAIL_DRY_RUN;
  return flag === '1' || flag === 'true';
}

export interface OutboundEmail {
  /** Display name in the From header, e.g. "VivanceData Contact Form". */
  fromName: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export type SendFailure = 'send-failed' | 'unconfigured';

export type SendResult = { ok: true } | { ok: false; reason: SendFailure };

type Delivery = { ok: true } | { ok: false; reason: SendFailure; error?: unknown };

async function deliver(email: OutboundEmail): Promise<Delivery> {
  if (isDryRun()) {
    // console.warn rather than console.log: next.config.mjs strips log from
    // production builds, and a dry run that leaves no trace is the silent
    // success this module exists to prevent. Recipient and subject only --
    // the rendered body carries the visitor's own words.
    console.warn(`Email dry run: not sending "${email.subject}" to ${email.to}`);
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, reason: 'unconfigured' };
  }

  // Constructed per send rather than once at module scope. The old
  // module-scope client read the key at import time, so a test could not stub
  // it and a key supplied after boot was never picked up.
  const result = await new Resend(apiKey).emails.send({
    from: `${email.fromName} <${fromAddress()}>`,
    to: email.to,
    replyTo: email.replyTo,
    subject: email.subject,
    html: email.html,
  });

  // Resend resolves with { data, error } rather than rejecting on API-level
  // failures (unverified sender domain, rejected recipient), so an unchecked
  // send reports success while nothing arrives.
  if (result.error) {
    return { ok: false, reason: 'send-failed', error: result.error };
  }

  return { ok: true };
}

/**
 * A send the request cannot succeed without: the enquiry itself, or the report
 * a visitor asked for. The caller is expected to fail the request on a false
 * result rather than continue.
 */
export async function sendCritical(email: OutboundEmail): Promise<SendResult> {
  const delivery = await deliver(email);

  if (delivery.ok) {
    return { ok: true };
  }

  if (delivery.reason === 'send-failed') {
    console.error(
      `Email: CRITICAL SEND FAILED -- "${email.subject}" to ${email.to}`,
      delivery.error
    );
  }

  return { ok: false, reason: delivery.reason };
}

/**
 * A send whose failure must not fail the request, but must stay recoverable by
 * hand: a dropped lead notification is a lost lead. The log always carries
 * recipient, subject and context, which the contact route's confirmation
 * failure previously dropped.
 */
export async function sendCourtesy(email: OutboundEmail, context: string): Promise<void> {
  const delivery = await deliver(email);

  if (delivery.ok) {
    return;
  }

  console.error(`Email: COURTESY SEND FAILED -- ${context}`, {
    to: email.to,
    subject: email.subject,
    reason: delivery.reason,
    error: delivery.error,
  });
}

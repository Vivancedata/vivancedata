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
  return str.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] || char);
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

export type SendResult = { ok: true } | { ok: false; reason: 'send-failed' | 'unconfigured' };

type Delivery =
  | { ok: true }
  | { ok: false; reason: 'send-failed'; error: unknown }
  | { ok: false; reason: 'unconfigured' };

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
    error: delivery.reason === 'send-failed' ? delivery.error : undefined,
  });
}

import { escapeHtml, layout } from '@/lib/email';

export interface ContactEnquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string;
  message: string;
}

/** The values the contact form's service select offers; the route accepts only these. */
export const SERVICE_KEYS = ['generative-ai', 'consulting', 'training', 'other'] as const;

const SERVICE_NAMES: Record<(typeof SERVICE_KEYS)[number], string> = {
  'generative-ai': 'Generative AI',
  consulting: 'AI Strategy Consulting',
  training: 'AI Training & Workshops',
  other: 'Not sure yet',
};

function serviceName(serviceInterest?: string): string {
  if (!serviceInterest) {
    return 'Not provided';
  }
  // Own keys only: a plain-object lookup of "constructor" returns a function,
  // which escapeHtml then threw on.
  return Object.hasOwn(SERVICE_NAMES, serviceInterest)
    ? SERVICE_NAMES[serviceInterest as keyof typeof SERVICE_NAMES]
    : serviceInterest;
}

/** The enquiry itself. Losing this loses the lead, so it is sent as critical. */
export function buildEnquiryNotification(enquiry: ContactEnquiry): string {
  const safeEmail = escapeHtml(enquiry.email);

  return layout({
    title: 'New enquiry from the contact form',
    body: `
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${escapeHtml(enquiry.firstName)} ${escapeHtml(enquiry.lastName)}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
          </div>
          <div class="field">
            <div class="label">Phone</div>
            <div class="value">${escapeHtml(enquiry.phone || 'Not provided')}</div>
          </div>
          <div class="field">
            <div class="label">Company</div>
            <div class="value">${escapeHtml(enquiry.company || 'Not provided')}</div>
          </div>
          <div class="field">
            <div class="label">What they need</div>
            <div class="value">${escapeHtml(serviceName(enquiry.serviceInterest))}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="value message">${escapeHtml(enquiry.message)}</div>
          </div>
          <p style="color: #706c65; font-size: 12px; margin-top: 20px;">
            Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', timeZoneName: 'short' })}
          </p>`,
  });
}

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

const SERVICE_NAMES: Record<string, string> = {
  'generative-ai': 'Generative AI',
  consulting: 'AI Strategy Consulting',
  training: 'AI Training & Workshops',
  other: 'Not sure yet',
};

function serviceName(serviceInterest?: string): string {
  if (!serviceInterest) {
    return 'Not provided';
  }
  return SERVICE_NAMES[serviceInterest] || serviceInterest;
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
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
          </p>`,
  });
}

/** The courtesy acknowledgement. The enquiry is already delivered without it. */
export function buildEnquiryConfirmation(enquiry: ContactEnquiry): string {
  return layout({
    title: `Got your message, ${enquiry.firstName}`,
    body: `
          <p>Your message is in my inbox, and I read them all myself.</p>
          <p>You'll hear back from me, not an account manager, within <strong>one working day</strong>. If it cannot wait that long, write to info@vivancedata.com and say so.</p>
          <p><strong>Here's what you sent:</strong></p>
          <ul>
            <li><strong>What you need:</strong> ${escapeHtml(serviceName(enquiry.serviceInterest))}</li>
            <li><strong>Company:</strong> ${escapeHtml(enquiry.company || 'Not provided')}</li>
          </ul>
          <p>If you want a rough number before we speak, the ROI calculator takes a couple of minutes:</p>
          <p style="text-align: center;">
            <a href="https://vivancedata.com/tools/roi-calculator" class="button">Open the ROI calculator</a>
          </p>
          <div class="footer">
            <p>Vivancedata &mdash; Lorenzo Scaturchio</p>
            <p>https://vivancedata.com</p>
          </div>`,
  });
}

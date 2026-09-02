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
  'generative-ai': 'Generative AI Solutions',
  consulting: 'AI Strategy Consulting',
  solutions: 'Pre-built AI Solutions',
  training: 'AI Training & Workshops',
  other: 'Other',
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
    title: 'New Contact Form Submission',
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
            <div class="label">Service Interest</div>
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
    title: `Thank You, ${enquiry.firstName}!`,
    body: `
          <p>We've received your message and appreciate you reaching out to VivanceData.</p>
          <p>One of our AI consultants will review your inquiry and get back to you within <strong>24 hours</strong>.</p>
          <p><strong>Here's what you submitted:</strong></p>
          <ul>
            <li><strong>Service Interest:</strong> ${escapeHtml(serviceName(enquiry.serviceInterest))}</li>
            <li><strong>Company:</strong> ${escapeHtml(enquiry.company || 'Not provided')}</li>
          </ul>
          <p>In the meantime, feel free to explore our resources:</p>
          <p style="text-align: center;">
            <a href="https://vivancedata.com/tools/roi-calculator" class="button">Try Our AI ROI Calculator</a>
          </p>
          <div class="footer">
            <p>VivanceData - Transforming Businesses with AI</p>
            <p>https://vivancedata.com</p>
          </div>`,
  });
}

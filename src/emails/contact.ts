import { escapeHtml } from '@/lib/email';

export interface ContactEnquiry {
  firstName: string;
  lastName: string;
  email: string;
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

const ADMIN_STYLES = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
  .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  .field { margin-bottom: 15px; }
  .label { font-weight: bold; color: #374151; }
  .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
  .message { white-space: pre-wrap; }
`;

const CONFIRMATION_STYLES = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: #2563eb; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
  .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
  .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
`;

function serviceName(serviceInterest?: string): string {
  if (!serviceInterest) {
    return 'Not provided';
  }
  return SERVICE_NAMES[serviceInterest] || serviceInterest;
}

/** The enquiry itself. Losing this loses the lead, so it is sent as critical. */
export function buildEnquiryNotification(enquiry: ContactEnquiry): string {
  const name = `${escapeHtml(enquiry.firstName)} ${escapeHtml(enquiry.lastName)}`;
  const safeEmail = escapeHtml(enquiry.email);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${ADMIN_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
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
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/** The courtesy acknowledgement. The enquiry is already delivered without it. */
export function buildEnquiryConfirmation(enquiry: ContactEnquiry): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${CONFIRMATION_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Thank You, ${escapeHtml(enquiry.firstName)}!</h1>
        </div>
        <div class="content">
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
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

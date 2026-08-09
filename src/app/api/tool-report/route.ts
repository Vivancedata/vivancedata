import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { buildRateLimitHeaders, enforceRateLimit } from '@/lib/rateLimit';

// Escape HTML to prevent XSS attacks in email templates
function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

const toolReportSchema = z.object({
  email: z.string().trim().min(1).max(254).email(),
  tool: z.enum(['roi-calculator', 'ai-readiness']),
  summary: z
    .record(z.string().min(1).max(80), z.union([z.string().max(200), z.number().finite()]))
    .refine((value) => Object.keys(value).length > 0, {
      message: 'Summary must contain at least one entry',
    })
    .refine((value) => Object.keys(value).length <= 25, {
      message: 'Summary contains too many entries',
    }),
  recommendations: z.array(z.string().min(1).max(500)).max(10).optional(),
});

type ToolReportData = z.infer<typeof toolReportSchema>;

const TOOL_LABELS: Record<ToolReportData['tool'], string> = {
  'roi-calculator': 'AI ROI Calculator',
  'ai-readiness': 'AI Readiness Assessment',
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const TOOL_REPORT_RATE_LIMIT_OPTIONS = {
  keyPrefix: 'api:tool-report',
  maxRequests: 5,
  window: '1 m',
  windowMs: 60 * 1000,
} as const;

const EMAIL_STYLES = `
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
  .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
  .field { margin-bottom: 15px; }
  .label { font-weight: bold; color: #374151; }
  .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
  .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
  .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
`;

function renderSummaryRows(summary: ToolReportData['summary']): string {
  return Object.entries(summary)
    .map(
      ([key, value]) => `
                <div class="field">
                  <div class="label">${escapeHtml(key)}</div>
                  <div class="value">${escapeHtml(String(value))}</div>
                </div>`
    )
    .join('');
}

function renderRecommendations(recommendations: string[]): string {
  if (recommendations.length === 0) {
    return '';
  }

  const items = recommendations
    .map((recommendation) => `<li>${escapeHtml(recommendation)}</li>`)
    .join('');

  return `
                <div class="field">
                  <div class="label">Where to focus next</div>
                  <div class="value">
                    <ul style="margin: 0; padding-left: 20px;">${items}</ul>
                  </div>
                </div>`;
}

function buildVisitorEmail(data: ToolReportData, toolLabel: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">Your ${escapeHtml(toolLabel)} results</h2>
        </div>
        <div class="content">
          <p>Thanks for using the ${escapeHtml(toolLabel)}. Here is a copy of the results you saw, so you can keep them or share them internally.</p>
          ${renderSummaryRows(data.summary)}
          ${renderRecommendations(data.recommendations ?? [])}
          <p>These figures come from the answers you entered. They are a planning aid, not a forecast.</p>
          <p style="text-align: center;">
            <a href="https://vivancedata.com/contact" class="button">Talk to a consultant</a>
          </p>
          <div class="footer">
            <p>VivanceData</p>
            <p>https://vivancedata.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildLeadNotificationEmail(data: ToolReportData, toolLabel: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">New ${escapeHtml(toolLabel)} lead</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Tool</div>
            <div class="value">${escapeHtml(toolLabel)}</div>
          </div>
          ${renderSummaryRows(data.summary)}
          ${renderRecommendations(data.recommendations ?? [])}
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, TOOL_REPORT_RATE_LIMIT_OPTIONS);
    const rateLimitHeaders = buildRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const parsed = toolReportSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request. Please check your email address and try again.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const data: ToolReportData = {
      ...parsed.data,
      email: parsed.data.email.toLowerCase(),
    };
    const toolLabel = TOOL_LABELS[data.tool];

    if (resend) {
      const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'info@vivancedata.com';
      const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL || 'noreply@vivancedata.com';

      // Resend resolves with { data, error } rather than rejecting on API-level
      // failures (unverified sender domain, rejected recipient), so the outer
      // try/catch alone would let a failed send report success. Both results are
      // checked explicitly.
      const visitorResult = await resend.emails.send({
        from: `VivanceData <${fromEmail}>`,
        to: data.email,
        subject: `Your ${toolLabel} results`,
        html: buildVisitorEmail(data, toolLabel),
      });

      if (visitorResult.error) {
        // The visitor asked for this and did not get it -- tell them.
        console.error('Tool report: visitor email failed', visitorResult.error);
        return NextResponse.json(
          { error: 'We could not send your report. Please check the address and try again.' },
          { status: 502, headers: rateLimitHeaders }
        );
      }

      const notificationResult = await resend.emails.send({
        from: `VivanceData Tools <${fromEmail}>`,
        to: toEmail,
        replyTo: data.email,
        subject: `New ${toolLabel} lead: ${data.email}`,
        html: buildLeadNotificationEmail(data, toolLabel),
      });

      // The visitor already has their report, so failing their request here
      // would help nobody -- but a dropped notification is a lost lead, so it
      // must be loud on the server rather than swallowed.
      if (notificationResult.error) {
        console.error(
          `Tool report: LEAD NOTIFICATION FAILED for ${data.email} (${data.tool})`,
          notificationResult.error
        );
      }
    } else {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Email service not configured. Please try again later.' },
          { status: 503, headers: rateLimitHeaders }
        );
      }

      // Log submission if Resend is not configured (development mode)
      console.log('Tool report request (Resend not configured):', {
        email: data.email,
        tool: data.tool,
        summary: data.summary,
        recommendations: data.recommendations,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your report is on its way. Check your inbox in a few minutes.',
      },
      { status: 200, headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error('Tool report error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}

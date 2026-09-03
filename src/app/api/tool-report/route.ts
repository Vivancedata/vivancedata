import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildRateLimitHeaders, enforceRateLimit } from '@/lib/rateLimit';
import { emailAddress, sendCourtesy, sendCritical, teamInbox } from '@/lib/email';
import { TOOL_LABELS, buildLeadNotification, buildVisitorReport } from '@/emails/toolReport';

const toolReportSchema = z.object({
  email: emailAddress,
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

const TOOL_REPORT_RATE_LIMIT_OPTIONS = {
  keyPrefix: 'api:tool-report',
  maxRequests: 5,
  window: '1 m',
  windowMs: 60 * 1000,
} as const;

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

    const report = parsed.data;
    const toolLabel = TOOL_LABELS[report.tool];

    const visitorCopy = await sendCritical({
      fromName: 'Vivancedata',
      to: report.email,
      subject: `Your ${toolLabel} results`,
      html: buildVisitorReport(report),
    });

    if (!visitorCopy.ok) {
      // The visitor asked for this and did not get it -- tell them.
      return visitorCopy.reason === 'unconfigured'
        ? NextResponse.json(
            { error: 'Email service not configured. Please try again later.' },
            { status: 503, headers: rateLimitHeaders }
          )
        : NextResponse.json(
            { error: 'We could not send your report. Please check the address and try again.' },
            { status: 502, headers: rateLimitHeaders }
          );
    }

    await sendCourtesy(
      {
        fromName: 'Vivancedata Tools',
        to: teamInbox(),
        replyTo: report.email,
        subject: `New ${toolLabel} lead: ${report.email}`,
        html: buildLeadNotification(report),
      },
      `${toolLabel} lead notification`
    );

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

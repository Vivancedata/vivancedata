import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildRateLimitHeaders, enforceRateLimit } from '@/lib/rateLimit';
import { emailAddress, isDryRun } from '@/lib/email';

// This route delivers through ConvertKit or Mailchimp rather than Resend, so
// it shares only the two decisions that are not provider-specific: what a
// valid address is, and whether reporting success without delivering is
// permitted right now.
const newsletterSchema = z.object({
  email: emailAddress,
  firstName: z.string().trim().optional(),
});

const NEWSLETTER_RATE_LIMIT_OPTIONS = {
  keyPrefix: 'api:newsletter',
  maxRequests: 5,
  window: '1 m',
  windowMs: 60 * 1000,
} as const;

interface ConvertKitResponse {
  subscription?: {
    id: number;
    state: string;
    subscriber: {
      id: number;
      email_address: string;
    };
  };
  error?: string;
  message?: string;
}

interface MailchimpResponse {
  id?: string;
  email_address?: string;
  status?: string;
  title?: string;
  detail?: string;
}

async function subscribeToConvertKit(email: string, firstName?: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return { success: false, error: 'ConvertKit not configured' };
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: firstName || '',
        }),
      }
    );

    const data: ConvertKitResponse = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || data.error || 'ConvertKit subscription failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('ConvertKit error:', error);
    return { success: false, error: 'Failed to connect to ConvertKit' };
  }
}

async function subscribeToMailchimp(email: string, firstName?: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { success: false, error: 'Mailchimp not configured' };
  }

  const datacenter = apiKey.split('-')[1];

  if (!datacenter) {
    return { success: false, error: 'Invalid Mailchimp API key format' };
  }

  try {
    const response = await fetch(
      `https://${datacenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName || '',
          },
        }),
      }
    );

    const data: MailchimpResponse = await response.json();

    if (!response.ok) {
      // Handle "already subscribed" as success
      if (data.title === 'Member Exists') {
        return { success: true };
      }
      return { success: false, error: data.detail || data.title || 'Mailchimp subscription failed' };
    }

    return { success: true };
  } catch (error) {
    console.error('Mailchimp error:', error);
    return { success: false, error: 'Failed to connect to Mailchimp' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = await enforceRateLimit(request, NEWSLETTER_RATE_LIMIT_OPTIONS);
    const rateLimitHeaders = buildRateLimitHeaders(rateLimit);

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: rateLimitHeaders }
      );
    }

    const parsed = newsletterSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { email, firstName } = parsed.data;

    // Try ConvertKit first, then Mailchimp
    const hasConvertKit = process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID;
    const hasMailchimp = process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_AUDIENCE_ID;

    if (hasConvertKit) {
      const result = await subscribeToConvertKit(email, firstName);
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to newsletter!',
          provider: 'convertkit',
        }, { headers: rateLimitHeaders });
      }
      // If ConvertKit fails but Mailchimp is configured, try Mailchimp
      if (!hasMailchimp) {
        console.error('ConvertKit subscription failed:', result.error);
        return NextResponse.json(
          { error: result.error || 'Failed to subscribe. Please try again.' },
          { status: 500, headers: rateLimitHeaders }
        );
      }
    }

    if (hasMailchimp) {
      const result = await subscribeToMailchimp(email, firstName);
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to newsletter!',
          provider: 'mailchimp',
        }, { headers: rateLimitHeaders });
      }
      console.error('Mailchimp subscription failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe. Please try again.' },
        { status: 500, headers: rateLimitHeaders }
      );
    }

    if (isDryRun()) {
      console.warn(`Newsletter dry run: not subscribing ${email}`);
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        provider: 'dry-run',
      }, { headers: rateLimitHeaders });
    }

    // No provider, and no explicit permission to pretend: say so. Reporting a
    // subscription that did not happen is the same lie the contact form used
    // to tell, and NODE_ENV is not consent.
    return NextResponse.json(
      { error: 'Newsletter service not configured. Please try again later.' },
      { status: 503, headers: rateLimitHeaders }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

interface NewsletterData {
  email: string;
  firstName?: string;
}

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
    const body: NewsletterData = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase().trim();
    const firstName = body.firstName?.trim();

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
        });
      }
      // If ConvertKit fails but Mailchimp is configured, try Mailchimp
      if (!hasMailchimp) {
        console.error('ConvertKit subscription failed:', result.error);
        return NextResponse.json(
          { error: result.error || 'Failed to subscribe. Please try again.' },
          { status: 500 }
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
        });
      }
      console.error('Mailchimp subscription failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    // No provider configured - log for development
    console.log('Newsletter subscription (no provider configured):', {
      email,
      firstName,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      provider: 'none',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

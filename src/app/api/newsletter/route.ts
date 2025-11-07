import { NextRequest, NextResponse } from 'next/server';

interface NewsletterData {
  email: string;
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

    // TODO: Implement newsletter subscription logic
    // Option 1: Using ConvertKit
    /*
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: body.email,
        }),
      }
    );
    */

    // Option 2: Using Mailchimp
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const DATACENTER = MAILCHIMP_API_KEY?.split('-')[1];

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({
          email_address: body.email,
          status: 'subscribed',
        }),
      }
    );
    */

    // For now, just log the subscription
    console.log('Newsletter subscription:', {
      email: body.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

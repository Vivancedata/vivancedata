import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Map service interest to readable name
    const serviceNames: Record<string, string> = {
      'generative-ai': 'Generative AI Solutions',
      'consulting': 'AI Strategy Consulting',
      'solutions': 'Pre-built AI Solutions',
      'training': 'AI Training & Workshops',
      'other': 'Other',
    };
    const serviceName = serviceNames[body.serviceInterest] || body.serviceInterest;

    // Send email if Resend is configured
    if (resend) {
      const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'info@vivancedata.com';
      const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL || 'noreply@vivancedata.com';

      // Send notification to admin
      await resend.emails.send({
        from: `VivanceData Contact Form <${fromEmail}>`,
        to: toEmail,
        replyTo: body.email,
        subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #374151; }
              .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
              .message { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${body.firstName} ${body.lastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${body.company || 'Not provided'}</div>
                </div>
                <div class="field">
                  <div class="label">Service Interest</div>
                  <div class="value">${serviceName}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value message">${body.message}</div>
                </div>
                <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                  Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // Send confirmation to user
      await resend.emails.send({
        from: `VivanceData <${fromEmail}>`,
        to: body.email,
        subject: 'Thank you for contacting VivanceData',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2563eb; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
              .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
              .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Thank You, ${body.firstName}!</h1>
              </div>
              <div class="content">
                <p>We've received your message and appreciate you reaching out to VivanceData.</p>
                <p>One of our AI consultants will review your inquiry and get back to you within <strong>24 hours</strong>.</p>
                <p><strong>Here's what you submitted:</strong></p>
                <ul>
                  <li><strong>Service Interest:</strong> ${serviceName}</li>
                  <li><strong>Company:</strong> ${body.company || 'Not provided'}</li>
                </ul>
                <p>In the meantime, feel free to explore our resources:</p>
                <p style="text-align: center;">
                  <a href="https://vivancedata.com/tools/roi-calculator" class="button">Try Our AI ROI Calculator</a>
                </p>
                <div class="footer">
                  <p>VivanceData - Transforming Businesses with AI</p>
                  <p>123 AI Boulevard, San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } else {
      // Log submission if Resend is not configured (development mode)
      console.log('Contact form submission (Resend not configured):', {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        company: body.company,
        serviceInterest: body.serviceInterest,
        message: body.message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}

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

// Simple in-memory rate limiting (use Redis in production for distributed systems)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

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

    // Sanitize user inputs for HTML email
    const safeFirstName = escapeHtml(body.firstName);
    const safeLastName = escapeHtml(body.lastName);
    const safeEmail = escapeHtml(body.email);
    const safeCompany = escapeHtml(body.company || 'Not provided');
    const safeMessage = escapeHtml(body.message);
    const safeServiceName = escapeHtml(serviceName);

    // Send email if Resend is configured
    if (resend) {
      const toEmail = process.env.CONTACT_FORM_TO_EMAIL || 'info@vivancedata.com';
      const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL || 'noreply@vivancedata.com';

      // Send notification to admin
      await resend.emails.send({
        from: `VivanceData Contact Form <${fromEmail}>`,
        to: toEmail,
        replyTo: body.email,
        subject: `New Contact Form Submission from ${safeFirstName} ${safeLastName}`,
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
                  <div class="value">${safeFirstName} ${safeLastName}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
                </div>
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${safeCompany}</div>
                </div>
                <div class="field">
                  <div class="label">Service Interest</div>
                  <div class="value">${safeServiceName}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value message">${safeMessage}</div>
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
                <h1 style="margin: 0;">Thank You, ${safeFirstName}!</h1>
              </div>
              <div class="content">
                <p>We've received your message and appreciate you reaching out to VivanceData.</p>
                <p>One of our AI consultants will review your inquiry and get back to you within <strong>24 hours</strong>.</p>
                <p><strong>Here's what you submitted:</strong></p>
                <ul>
                  <li><strong>Service Interest:</strong> ${safeServiceName}</li>
                  <li><strong>Company:</strong> ${safeCompany}</li>
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
        `,
      });
    } else {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Email service not configured. Please try again later.' },
          { status: 503 }
        );
      }

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

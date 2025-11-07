import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
}

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

    // TODO: Implement email sending logic
    // Option 1: Using Resend (recommended)
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL || 'noreply@vivancedata.com',
      to: process.env.CONTACT_FORM_TO_EMAIL || 'info@vivancedata.com',
      subject: `New Contact Form Submission from ${body.firstName} ${body.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Service Interest:</strong> ${body.serviceInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    });
    */

    // For now, just log the submission
    console.log('Contact form submission:', {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      company: body.company,
      serviceInterest: body.serviceInterest,
      timestamp: new Date().toISOString(),
    });

    // Return success response
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

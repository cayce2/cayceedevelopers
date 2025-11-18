/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request: NextRequest) {
  try {
    const { name, email, date, time } = await request.json();
    console.log('Received booking data:', { name, email, date, time });

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is missing');
      return NextResponse.json({ error: 'SendGrid API key is not configured' }, { status: 500 });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid API key set');

    const msg = {
      to: 'cayceedevelopers@gmail.com',
      from: {
        email: 'cayceedevelopers@gmail.com',
        name: 'Caycee Developers'
      },
      replyTo: email,
      subject: `[BOOKING] New Consultation: ${name}`,
      text: `New consultation booking:\n\nClient: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}\n\nPlease confirm this appointment.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Consultation Booking</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          <p style="margin-top: 20px;">Please confirm this appointment with the client.</p>
        </div>
      `
    };

    console.log('Sending email with message:', msg);
    const result = await sgMail.send(msg);
    console.log('Email sent successfully:', result[0].statusCode);
    
    return NextResponse.json({ success: true, statusCode: result[0].statusCode });
  } catch (error: any) {
    console.error('SendGrid error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.body
    });
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message 
    }, { status: 500 });
  }
}
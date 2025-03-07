import { NextResponse } from 'next/server'
import sendmail from 'sendmail'

// Initialize sendmail
const sendmailTransport = sendmail({
  silent: process.env.NODE_ENV === 'production', // Only show logs in development
  smtpPort: 25, // Standard SMTP port
  smtpHost: 'localhost' // Default SMTP host
})

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()
    
    // Create a promise-based wrapper for sendmail
    const sendEmailPromise = () => {
      return new Promise((resolve, reject) => {
        sendmailTransport({
          from: email, // Sender's email
          to: 'cayceedevelopers@gmail.com', // Recipient's email
          replyTo: email, // Set reply-to to the user's email
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #6d28d9;">New Contact Form Submission</h2>
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          `
        }, (err, reply) => {
          if (err) {
            console.error('Error in sendmail:', err)
            reject(err)
          } else {
            console.log('Email sent successfully!')
            resolve(reply)
          }
        })
      })
    }

    // Send the email
    await sendEmailPromise()
    
    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

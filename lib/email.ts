interface EmailData {
    to: string
    subject: string
    name: string
    email: string
    message: string
  }
  
  export async function sendEmail(data: EmailData): Promise<void> {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }
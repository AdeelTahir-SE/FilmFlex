import { NextResponse } from 'next/server';
import sendgridMail from '@sendgrid/mail';

// Corrected the typo in the environment variable

export async function POST(request) {
  try {
    console.log(process.env.SENDGRID_API_KEY)
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { email, subject, question } = await request.json();
    console.log(email, subject, question);

    // Validate that all required fields are provided
    if (!email || !subject || !question) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Define the message to send
    const msg = {
      to: 'adeeltahir6a@gmail.com', // Your main email or server email
      from: email, // User's email (from the frontend)
      subject: subject, // Subject provided by the user
      text: question, // Email body
      html: `<p>${question}</p>`, // HTML body (if needed)
    };

    // Send the email using SendGrid
    await sendgridMail.send(msg);

    // Return success response
    return NextResponse.json({ success: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

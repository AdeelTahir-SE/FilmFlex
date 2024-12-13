import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #fff; background-color: #000; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
        <header style="text-align: center; padding: 10px 0; background-color: #990000; border-radius: 10px 10px 0 0;">
          <h1 style="color: #fff; font-size: 24px; margin: 0;">Welcome to <span style="color: #e3e3e3;">Film Flex</span></h1>
        </header>
        <main style="padding: 20px; background-color: #333;">
          <h2 style="color: #ff4444; font-size: 20px;">Thank You for Subscribing!</h2>
          <p style="font-size: 16px; color: #ccc;">
            We are thrilled to have you on board. Get ready to dive into the world of cinema with exclusive updates on new movie releases, special offers, and much more.
          </p>
          <p style="font-size: 16px; color: #ccc;">
            At <strong style="color: #fff;">Film Flex</strong>, we strive to bring you the best movie ticket booking experience. Stay tuned for exciting updates, tailored just for you.
          </p>
        </main>
        <footer style="text-align: center; background-color: #222; padding: 10px; border-radius: 0 0 10px 10px; margin-top: 20px;">
          <p style="font-size: 14px; color: #888;">© ${new Date().getFullYear()} Film Flex. All rights reserved.</p>
          <p style="font-size: 14px; color: #888;">Follow us on:</p>
          <div style="margin-top: 10px;">
            <a href="https://www.linkedin.com/in/adeel-tahir-fullstackdeveoper/" style="margin-right: 10px; text-decoration: none; color: #ff4444;">LinkedIn</a>
            <a href="https://github.com/AdeelTahir-SE" style="margin-left: 10px; text-decoration: none; color: #ff4444;">GitHub</a>
          </div>
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: `FILMFLEX <${process.env.EMAIL_SERVER}>`,
      to: email,
      subject: 'Welcome to Film Flex - Subscribed to Newsletter ✔',
      html: emailContent,
    });

    return NextResponse.json({ success: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

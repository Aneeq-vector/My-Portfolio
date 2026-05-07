import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Auto-reply email to the sender
    await transporter.sendMail({
      from: `"Ahmed Aneeq" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank You for Contacting Me",
      html: `
        <p>Hi, <b>${name}</b></p>

        <p>Thank you for reaching out through my portfolio website. I truly appreciate your interest and the time you took to contact me.</p>

        <p>Your message has been received successfully, and I will review it carefully and get back to you as soon as possible.</p>

        <p>In the meantime, feel free to connect with me through my platforms below:</p>

        <p>
          📧 Email: ahmedaneeq.official@gmail.com<br/>
          📱 WhatsApp/Call: https://wa.me/+94710900155<br/>
          💼 LinkedIn: https://www.linkedin.com/in/ahmed-aneeq-b8b073325/<br/>
          🐙 GitHub: https://github.com/Aneeq-vector<br/>
          📸 Instagram: https://instagram.com/neeq.dev<br/>
          📱 TikTok: https://www.tiktok.com/@mr_xnee
        </p>

        <p>I look forward to connecting with you.</p>

        <p>Best regards,<br/>Ahmed Aneeq</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return res.status(500).json({ message: "Email failed to send" });
  }
}
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { username, message, date, time } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail email (set in Vercel env)
      pass: process.env.GMAIL_PASS, // Gmail app password (set in Vercel env)
    },
  });

  try {
    await transporter.sendMail({
      from: `"Anonymous Dashboard" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New Message from ${username}`,
      text: `Username: ${username}\nDate: ${date}\nTime: ${time}\nMessage: ${message}`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

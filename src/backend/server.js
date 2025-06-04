import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('Starting backend server...');

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const FRONTEND_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://raremindswebsite.netlify.app'
    : 'http://localhost:5173';

app.post('/api/send-pdf', async (req, res) => {
  const { name, email, pdfUrl, institution } = req.body;
  if (!name || !email || !pdfUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Your Requested Case Study PDF${institution ? ` - ${institution}` : ''}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your interest. Here is your requested case study${institution ? ` for <b>${institution}</b>` : ''}:</p>
        <p><a href="${FRONTEND_BASE_URL}${pdfUrl}" target="_blank" rel="noopener">Download PDF</a></p>
        <p>Best regards,<br/>Rareminds Team</p>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
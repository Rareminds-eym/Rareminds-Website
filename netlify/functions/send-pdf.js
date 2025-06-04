const nodemailer = require('nodemailer');

exports.handler = async function(event) {
  const { name, email, pdfUrl, institution } = JSON.parse(event.body);

  if (!name || !email || !pdfUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  const FRONTEND_BASE_URL = 'https://raremindswebsite.netlify.app';

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
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};
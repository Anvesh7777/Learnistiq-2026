import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(
      "SMTP connection error:",
      error.message
    );
  } else {
    console.log(
      "Brevo SMTP server is ready"
    );
  }
});

export const sendEmail = async (
  to,
  subject,
  html
) => {
  try {
    const info =
      await transporter.sendMail({
        from: `"Learnistiq" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

    console.log(
      "Email sent:",
      info.messageId
    );

    return info;
  } catch (error) {
    console.log(
      "Email sending error:",
      error.message
    );

    throw error;
  }
};
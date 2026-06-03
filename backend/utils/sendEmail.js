import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

console.log(
  "EMAIL_USER:",
  process.env.EMAIL_USER
);

console.log(
  "EMAIL_PASS length:",
  process.env.EMAIL_PASS?.length
);

const transporter =
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },

    connectionTimeout:
      30000,

    greetingTimeout:
      30000,

    socketTimeout:
      30000,
  });

export const sendEmail =
  async (
    to,
    subject,
    html
  ) => {
    try {
      await transporter.sendMail({
        from: `"Learnistiq" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      console.log(
        `Email sent to ${to}`
      );
    } catch (error) {
      console.log(
        "Email sending error:",
        error.message
      );

      throw error;
    }
  };
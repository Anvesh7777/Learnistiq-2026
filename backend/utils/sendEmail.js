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

    requireTLS: true,

    auth: {
      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,
    },

    tls: {
      rejectUnauthorized:
        false,
    },

    connectionTimeout:
      30000,

    greetingTimeout:
      30000,

    socketTimeout:
      30000,
  });

transporter.verify(
  (error, success) => {
    if (error) {
      console.log(
        "SMTP connection error:",
        error.message
      );
    } else {
      console.log(
        "SMTP server is ready"
      );
    }
  }
);

export const sendEmail =
  async (
    to,
    subject,
    html
  ) => {
    try {
      const info =
        await transporter.sendMail(
          {
            from: `"Learnistiq" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html,
          }
        );

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
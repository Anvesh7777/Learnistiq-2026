import dotenv from "dotenv";

import { sendEmail } from "./utils/sendEmail.js";

import {
  getWelcomeTemplate,
  getEnrollmentTemplate,
  getForgotPasswordTemplate,
  getCertificateTemplate,
} from "./utils/emailTemplates.js";

dotenv.config();

const runEmailTests = async () => {
  try {
    const testEmail =
      process.env.EMAIL_USER;

    if (!testEmail) {
      throw new Error(
        "EMAIL_USER not found in .env"
      );
    }

    console.log(
      "🚀 Starting Learnistiq email tests..."
    );

    // Welcome Email
    await sendEmail(
      testEmail,
      "Welcome to Learnistiq",
      getWelcomeTemplate(
        "Anvesh"
      )
    );

    console.log(
      "✅ Welcome email sent"
    );

    // Enrollment Email
    await sendEmail(
      testEmail,
      "Course Enrollment Confirmation",
      getEnrollmentTemplate(
        "Anvesh",
        `
          <li>MERN Stack Mastery</li>
          <li>Advanced Data Structures & Algorithms</li>
        `
      )
    );

    console.log(
      "✅ Enrollment email sent"
    );

    // Forgot Password Email
    await sendEmail(
      testEmail,
      "Password Reset Request",
      getForgotPasswordTemplate(
        "Anvesh",
        "https://learnistiq.com/reset-password/test-token"
      )
    );

    console.log(
      "✅ Password reset email sent"
    );

    // Certificate Email
    await sendEmail(
      testEmail,
      "Course Completion Certificate",
      getCertificateTemplate(
        "Anvesh Mahajan",
        "MERN Stack Mastery"
      )
    );

    console.log(
      "✅ Certificate email sent"
    );

    console.log(
      "\n🎉 All Learnistiq email templates tested successfully."
    );
  } catch (error) {
    console.error(
      "\n❌ Email test failed:"
    );

    console.error(error);
  }
};

runEmailTests();
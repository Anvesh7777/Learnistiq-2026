export const getWelcomeTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fb; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

    <h1 style="color: #4F46E5;">
      Welcome to Learnistiq 
    </h1>

    <p>Hi <strong>${name}</strong>,</p>

    <p>
      Welcome to Learnistiq. We are excited to have you as part of our learning community.
    </p>

    <p>
      Every great career begins with a commitment to continuous learning.
      Whether you're preparing for interviews, building projects, or mastering new technologies,
      Learnistiq is here to support your journey.
    </p>

    <p>
      Start learning today and take one step closer to your goals.
    </p>

    <br />

    <p>
      Best wishes,
    </p>

    <p>
      <strong>Team Learnistiq</strong><br />
      Learn • Build • Grow
    </p>

  </div>
</body>
</html>
`;

export const getEnrollmentTemplate = (
  name,
  courseList
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fb; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

    <h1 style="color: #16A34A;">
      Enrollment Successful 🎉
    </h1>

    <p>Hi <strong>${name}</strong>,</p>

    <p>
      Your enrollment has been confirmed successfully.
    </p>

    <p>
      You now have access to:
    </p>

    <ul>
      ${courseList}
    </ul>

    <p>
      Learning consistently creates long-term success.
      Complete your lectures, build projects, and apply what you learn.
    </p>

    <p>
      We look forward to supporting your growth.
    </p>

    <br />

    <p>
      <strong>Team Learnistiq</strong><br />
      Learn • Build • Grow
    </p>

  </div>
</body>
</html>
`;

export const getForgotPasswordTemplate = (
  name,
  resetUrl
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fb; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

    <h1 style="color: #DC2626;">
      Password Reset Request
    </h1>

    <p>Hi <strong>${name}</strong>,</p>

    <p>
      We received a request to reset your Learnistiq account password.
    </p>

    <p>
      Click the link below to create a new password:
    </p>

    <p>
      <a href="${resetUrl}">
        ${resetUrl}
      </a>
    </p>

    <p>
      This link will expire in 15 minutes.
    </p>

    <p>
      If you did not request a password reset, you can safely ignore this email.
    </p>

    <br />

    <p>
      <strong>Team Learnistiq</strong><br />
      Learn • Build • Grow
    </p>

  </div>
</body>
</html>
`;

export const getCertificateTemplate = (
  name,
  courseName
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fb; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">

    <h1 style="color: #F59E0B;">
      Congratulations 🎓
    </h1>

    <p>Hi <strong>${name}</strong>,</p>

    <p>
      Congratulations on successfully completing
      <strong>${courseName}</strong>.
    </p>

    <p>
      Your dedication, consistency, and hard work have paid off.
    </p>

    <p>
      Your certificate is now available in your Learnistiq dashboard.
    </p>

    <p>
      Keep learning, keep building, and keep growing.
    </p>

    <br />

    <p>
      <strong>Team Learnistiq</strong><br />
      Learn • Build • Grow
    </p>

  </div>
</body>
</html>
`;
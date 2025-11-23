import nodemailer from "nodemailer";

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Threaddit Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    console.log(`Email sent to: ${email}`);
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};

export default sendEmail;


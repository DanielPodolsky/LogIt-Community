import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, message) => {
  let transport = createTransport({
    service: "gmail",
    auth: {
      // user: process.env.GMAIL_MAIL,
      user: "danielpodolsky2@gmail.com",
      pass: "fayd tjay ancp vnwt",
    },
  });

  try {
    await transport.sendMail({
      from: "danielpodolsky2@gmail.com",
      to: to,
      subject, // The same as subject: subject
      text: message,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;

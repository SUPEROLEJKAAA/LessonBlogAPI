import nodemailer from "nodemailer";
import { config } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
});

export const mailHelper = {
  registation: (email: string, code: string) => {
    transporter.sendMail({
      from: config.email,
      to: email,
      subject: "Thank you for your registration",
      html: `<h1>Thank for your registration</h1> <p>To finish registration please follow the link below:<a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a></p>`,
    });
  },
  resend: async (email: string, code: string) => {
     transporter.sendMail({
      from: config.email,
      to: email,
      subject: "Re-link to account activation",
      html: `<h1>Re-link to account activation</h1> <p>To finish registration please follow the link below:<a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a></p>`,
    });
  },
};

import nodemailer from "nodemailer";
import "dotenv/config";

const {
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  PORT = "3000",
  EMAIL_FROM = "AwesomeApp",
  EMAIL_PORT = "465",
} = process.env;

const BASE_URL = process.env.BASE_URL || `http://localhost:${Number(PORT)}`;

const nodemailerConfig = {
  host: EMAIL_HOST,
  port: Number(EMAIL_PORT),
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const options = { ...data, from: `${EMAIL_FROM} <${EMAIL_USER}>` };
  return transport.sendMail(options);
};

export const sendVerificationEmail = async (email, verificationToken) => {
  const verifyLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;
  const subject = "Verify your email";

  return sendEmail({
    to: email,
    subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${subject}</title>
      </head>
        <body>
        <h1>Verify email address</h1>
        <p>Please verify your email address to activate your account.</p>
        </br>
        <a target="_blank" href="${verifyLink}">Verify your email</a>
        </br>
      
        <p>If you do not wish to create a new account, simply ignore this email.</p>
        </br>
        <p>Best regards</p>
        <p>The AwesomeApp Team</p>
      </body>
    </html>
    `,
  });
};

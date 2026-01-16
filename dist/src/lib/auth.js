import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASSWORD,
    },
});
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
                const info = await transporter.sendMail({
                    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
                    to: process.env.APP_USER,
                    subject: "Please verify Your Email",
                    html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="100%" max-width="600px" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#111827; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">Verify Your Email</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <p style="font-size:16px; color:#333;">
                Hi <strong>${user.name || "there"}</strong>,
              </p>

              <p style="font-size:15px; color:#555; line-height:1.6;">
                Thanks for signing up! Please confirm your email address by clicking the button below.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${verificationUrl}"
                   style="background:#2563eb; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#666; line-height:1.6;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="font-size:13px; color:#2563eb; word-break:break-all;">
                ${verificationUrl}
              </p>

              <p style="font-size:14px; color:#666; margin-top:30px;">
                If you didn’t create this account, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#333; margin-top:20px;">
                — The Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center;">
              <p style="font-size:12px; color:#999; margin:0;">
                © ${new Date().getFullYear()} Your App. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
                    `
                });
                console.log("Message sent:", info.messageId);
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    // client side code add korte hobe r o kicu 
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            accessType: "offline",
            prompt: "select_account consent",
        },
    }
});
//# sourceMappingURL=auth.js.map
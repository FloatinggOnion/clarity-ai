import Resend from "@auth/core/providers/resend";
import { Resend as ResendAPI } from "resend";
import { alphabet, generateRandomString } from "oslo/crypto";
import PasswordResetEmailTemplate from "@/components/auth/PasswordResetEmailTemplate";
 
export const ResendOTPPasswordReset = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "Clarity AI",
      to: [email],
      subject: `Reset your Clarity AI password`,
      react: PasswordResetEmailTemplate({ email, token }),
    });
 
    if (error) {
      throw new Error("Could not send");
    }
  },
});
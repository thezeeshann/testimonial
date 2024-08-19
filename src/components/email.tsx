"use server";

import getBaseUrl from "@/lib/base-url";
import { Resend } from "resend";
import Email from "@/components/email-template";
import Password from "@/components/password-template";

const resend = new Resend(process.env.RESEND_API_KEY);
const doamin = getBaseUrl();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${doamin}/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Testimonial <onboarding@resend.dev>",
    to: email,
    subject: "Please verify email for Testimonial",
    react: <Email url={confirmLink} />,
  });

  if (error) return error;
  if (data) return data;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${doamin}/new-password?token=${token}`;
  console.log(confirmLink);
  const { data, error } = await resend.emails.send({
    from: "Testimonial <onboarding@resend.dev>",
    to: email,
    subject: "Password reset for Testimonial",
    react: <Password url={confirmLink} />,
  });

  if (error) return error;
  if (data) return data;
};

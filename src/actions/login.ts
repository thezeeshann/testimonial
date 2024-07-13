"use server";

import db from "@/lib/db";
import { loginSchema } from "@/lib/validations/login";
import { z } from "zod";
import bcrypt from "bcrypt";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { generateEmailVerificationToken } from "./token";
import { sendVerificationEmail } from "./email";

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { email, password } = validatedFields.data;

    const existUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser?.email !== email) {
      return {
        error: "Email not found",
      };
    }

    if (!existUser) {
      return {
        error: "User not found",
      };
    }

    if (!existUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(
        existUser.email
      );
      const { token, email } = verificationToken;
      await sendVerificationEmail(email, token);
      return {
        success: "Confirmation email send",
      };
    }

    const passwordMatch = await bcrypt.compare(password, existUser.password);

    if (!passwordMatch) {
      return {
        error: "Email or Password Incorrect",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "User Signed In!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return error.message;
        case "CallbackRouteError":
          return error.message;
        case "AccessDenied":
          return error.message;
        case "OAuthSignInError":
          return error.message;
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
  }
};

"use server";

import db from "@/lib/db";
import { loginSchema } from "@/lib/validations/login";
import { z } from "zod";
import bcrypt from "bcrypt";
import { signIn } from "@/lib/auth";

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

    if (existUser?.email != email) {
      return {
        error: "Email not found",
      };
    }

    if (!existUser) {
      return {
        error: "User not found",
      };
    }

    const passwordMatch = await bcrypt.compare(password, existUser.password);

    if (!passwordMatch) {
      return {
        error: "Email or Password Incorrect",
      };
    }

    await signIn("credentials",{values})

  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
};

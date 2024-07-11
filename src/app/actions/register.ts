"use server";

import { registerSchema } from "@/lib/validations/register";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { email, name, password } = validatedFields.data;

    const existUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser) {
      return {
        error: "Email alredy in use!",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: "User created successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

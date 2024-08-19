"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { newPasswordSchema } from "@/lib/validations/new-password";
import { getPasswordResetTokenByToken } from "./token";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>
) => {
  try {
    const validatedFields = newPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }
    const { password, token } = validatedFields.data;

    if (!token) {
      return { error: "Missing token!" };
    }
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return {
        error: "Token not found",
      };
    }

    const hashExpired = new Date(existingToken.expires) < new Date();
    if (hashExpired) {
      return {
        error: "Token has expires",
      };
    }

    const existingUser = await db.user.findFirst({
      where: {
        email: existingToken.email,
      },
    });

    if (!existingUser) {
      return {
        error: "User  not found",
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: existingUser.id },
        data: { password: hashPassword },
      });

      await tx.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
    });

    return {
      success: "password updated",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

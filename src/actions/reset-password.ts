"use server";

import db from "@/lib/db";
import { generatePasswordResetToken } from "./token";
import { resetSchema } from "@/lib/validations/reset";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/components/email";

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
  try {
    const validatedFields = resetSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }
    const { email } = validatedFields.data!;

    const existingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken?.token!);

    return { success: "Reset email sent!" };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

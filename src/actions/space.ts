"use server";

import { spaceSchema } from "@/lib/validations/space";
import { currentUser } from "@/lib/user";
import db from "@/lib/db";
import { z } from "zod";

export const space = async (values: z.infer<typeof spaceSchema>) => {
  try {
    const validatedFields = spaceSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const user = await currentUser();
    if (!user) {
      return {
        error: "Unauthorized",
      };
    }

    const {
      name,
      logo,
      title,
      message,
      rating,
      theme,
      questionOne,
      questionThree,
      questionTwo,
    } = validatedFields.data;

    await db.spaces.create({
      data: {
        message,
        name,
        title,
        logo,
        questionOne,
        questionThree,
        questionTwo,
        rating,
        theme,
        userId: user.id,
      },
    });

    return {
      success: "🎉 You just added a new space.",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

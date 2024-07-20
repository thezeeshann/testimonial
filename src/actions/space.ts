"use server";

import db from "@/lib/db";
import { spaceSchema } from "@/lib/validations/space";
import { z } from "zod";

export const space = async (values: z.infer<typeof spaceSchema>) => {
  try {
    const validatedFields = spaceSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
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
      },
    });

    return {
      success: "You just added a new space.",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

// userId        String?
// user          User?     @relation(fields: [userId], references: [id])

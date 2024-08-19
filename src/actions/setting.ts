"use server";

import { settingsSchema } from "@/lib/validations/setting";
import { currentUser } from "@/lib/user";
import { z } from "zod";
import db from "@/lib/db";

export const setting = async (values: z.infer<typeof settingsSchema>) => {
  try {
    const validatedFields = settingsSchema.safeParse(values);
    const { name, image } = validatedFields.data!;
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

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: name,
        image: image,
      },
    });

    return {
      success: "Setting updated",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};

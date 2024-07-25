"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/user";
import { testimonialSchema } from "@/lib/validations/testimonial";
import { z } from "zod";

export const testimonials = async (
  values: z.infer<typeof testimonialSchema>
) => {
  try {
    const validatedFields = testimonialSchema.safeParse(values);
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

    const { email, message, name, permission, rating, image, photo } =
      validatedFields.data;

    await db.testimonial.create({
      data: {
        name,
        message,
        email,
        rating,
        image,
        photo,
        permission,
        userId: user.id,
      },
    });

    
    return {
      success: "🎉 Testimonial created.",
    };

  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

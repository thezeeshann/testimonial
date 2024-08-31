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

    const { email, message, name, permission, rating, image, photo, spaceId } =
      validatedFields.data;

    if (
      !email ||
      !message ||
      !name ||
      spaceId === "" ||
      !rating ||
      !permission
    ) {
      return {
        error: "Required field is missing",
      };
    }

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
        spaceId,
      },
    });

    return {
      success: "🎉 Testimonial created.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
    };
  }
};

export const getTestimonials = async () => {
  try {
    const testimonial = await db.testimonial.findMany();
    if (!testimonial) {
      return {
        error: "Testimonial not found",
      };
    }
    return {
      data: testimonial,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

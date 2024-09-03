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

    const { email, message, name, permission, rating, image, photo, spaceId } =
      validatedFields.data;

    if (!email || !message || !name || !rating || spaceId === "") {
      return {
        error: "field is missing",
      };
    }

    await db.testimonial.create({
      data: {
        email,
        message,
        name,
        rating,
        image,
        photo,
        permission,
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

export const deleteTestimonials = async (testimonialId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        error: "Unauthorized",
      };
    }

    await db.testimonial.delete({
      where: {
        id: testimonialId,
      },
    });

    return {
      success: "Testimonial deleted.",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

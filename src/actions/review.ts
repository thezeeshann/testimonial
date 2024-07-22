"use server";

import db from "@/lib/db";

export const getSingleReview = async (slug: string) => {
  try {
    const review = await db.spaces.findFirst({
      where: {
        name: slug,
      },
    });

    return {
      data: review,
    };
  } catch (error) {
    return {
      error: "Something went wrong while fetchiing single review data",
    };
  }
};

export const getSpace = async (id: string) => {
  try {
    const review = await db.spaces.findFirst({
      where: {
        userId: id,
      },
    });
    return {
      data: review,
    };
  } catch (error) {
    return {
      error: "Something went wrong while fetchiing the review data",
    };
  }
};

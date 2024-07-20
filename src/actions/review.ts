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

export const getReviews = async () => {
  try {
    const review = await db.spaces.findMany();
    console.log(review);
    return {
      data: review,
    };
  } catch (error) {
    return {
      error: "Something went wrong while fetchiing the review data",
    };
  }
};

import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters logn",
  }),
  message: z.string().min(6, {
    message: "Message must be at least 6 characters logn",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  image: z.string().optional(),
  rating: z.number().min(1).max(5),
  photo: z.string().optional(),
  permission: z.boolean().default(false),
  spaceId: z.string(),
});

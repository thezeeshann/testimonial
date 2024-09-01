import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters logn",
  }),
  message: z.string().min(20, {
    message: "Message must be at least 20 characters logn",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  rating: z.number().min(1).max(5),
  image: z.string().optional(),
  photo: z.string().optional(),
  permission: z.boolean().default(false),
  spaceId: z.string(),
});

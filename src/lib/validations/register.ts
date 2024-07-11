import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters logn",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
});

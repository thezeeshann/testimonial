import { z } from "zod";

export const settingsSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Name must be at least 4 characters logn",
    })
    .optional(),
  image: z.string().optional(),
});

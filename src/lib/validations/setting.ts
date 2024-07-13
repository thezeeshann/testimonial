import { z } from "zod";

export const settingsSchema = z.object({
  name: z.optional(z.string()),
  image: z.optional(z.string()),
});

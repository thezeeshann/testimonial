import { z } from "zod";

export const spaceSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters logn",
  }),
  logo: z.string().optional(),
  title: z.string().min(4, {
    message: "Title must be at least 4 characters logn",
  }),
  message: z.string().min(6, {
    message: "Message must be at least 6 characters logn",
  }),
  rating: z.boolean().optional(),
  theme: z.enum(["Light", "Dark"]),
  questionOne: z.string().min(6, {
    message: "Question must be at least 6 characters logn",
  }),
  questionTwo: z.string().min(6, {
    message: "Question must be at least 6 characters logn",
  }),
  questionThree: z.string().min(6, {
    message: "Question must be at least 6 characters logn",
  }),
});

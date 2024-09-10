import * as z from "zod";

export const schema = z.object({
  name: z.string().min(3, "Category must contain at least 3 characters"),
});

export type CategoryFormData = z.infer<typeof schema>;

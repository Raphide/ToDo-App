import * as z from "zod";

export const schema = z.object({
  task: z.string().min(3, "Task must contain at least 3 characters"),
  categoryId: z.string().min(1, "Must choose a Category"),
  priority: z.string().min(1, "Must choose a Priority"),
  description: z.string().min(1, "Must have at least 1 character in the Description"),
});

export type TodoFormData = z.infer<typeof schema>;

import * as z from "zod";

export const schema = z.object({
  task: z.string().min(3),
  categoryId: z.string().min(1),
 // to-do: need to figure out how to get to
  priority: z.string().min(1),
  description: z.string().min(1),
});

export type TodoFormData = z.infer<typeof schema>;

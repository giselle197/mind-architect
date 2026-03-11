import { z } from "zod";

/**
 * node come from data/world.json
 */
export const nodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
});

export type Node = z.infer<typeof nodeSchema>;

import { z } from "zod";

/**
 * node come from data/world.json
 */
export const nodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type KnowledgeNode = z.infer<typeof nodeSchema>;

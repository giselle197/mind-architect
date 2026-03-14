import type { KnowledgeNode } from "../core/KnowledgeNode";

export type TreeNode = KnowledgeNode & {
  children: TreeNode[];
};

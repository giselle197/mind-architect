import type { TreeNode } from "./TreeNode";
import type { KnowledgeNode } from "./KnowledgeNode";

export type LayoutNode = KnowledgeNode & {
  x: number;
  y: number;
};

export type LayoutTreeNode = TreeNode<LayoutNode>;

import type { KnowledgeNode, TreeNode } from "../core/KnowledgeNode";

export type LayoutNode = KnowledgeNode & {
  x: number;
  y: number;
};

export type LayoutTreeNode = TreeNode<LayoutNode>;

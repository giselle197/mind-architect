import type { TreeNode } from "../graph/TreeNode";

export type LayoutNode = TreeNode & {
  children: LayoutNode[];
  x: number;
  y: number;
};

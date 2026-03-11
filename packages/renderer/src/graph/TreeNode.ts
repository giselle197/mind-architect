import type { Node } from "../core/Node";

export type TreeNode = Node & {
  children: TreeNode[];
};

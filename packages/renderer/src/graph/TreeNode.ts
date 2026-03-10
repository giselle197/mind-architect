import type { NodeDTO } from "../core/Node";

export type TreeNode = NodeDTO & {
  children: TreeNode[];
};

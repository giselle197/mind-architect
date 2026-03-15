/**
 * Generic Tree structure
 * T = payload type
 */
export type TreeNode<T> = {
  data: T;
  children: TreeNode<T>[];
};
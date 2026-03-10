import type { NodeDTO } from "../core/Node";
import type { TreeNode } from "./TreeNode";

export function buildTree(nodes: NodeDTO[]): TreeNode {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // Build a lookup map from node id to TreeNode
  for (const n of nodes) {
    if (map.has(n.id)) {
      throw new Error(`Duplicate node id: ${n.id}`);
    }

    map.set(n.id, { ...n, children: [] });
  }

  // Build parent-child relationships
  for (const node of map.values()) {
    if (node.parentId === null) {
      roots.push(node);
      continue;
    }

    const parent = map.get(node.parentId);

    if (!parent) {
      throw new Error(
        `Parent not found: node=${node.id}, parentId=${node.parentId}`,
      );
    }

    parent.children.push(node);
  }

  // Validate that the graph contains exactly one root
  if (roots.length !== 1) {
    throw new Error(`Expected exactly 1 root, got ${roots.length}`);
  }

  return roots[0];
}

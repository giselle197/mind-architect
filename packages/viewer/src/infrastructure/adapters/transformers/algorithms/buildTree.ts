import type { KnowledgeNode, KnowledgeTreeNode } from "#core";

export function buildTree(nodes: KnowledgeNode[]): KnowledgeTreeNode {
  const map = new Map<string, KnowledgeTreeNode>();
  const roots: KnowledgeTreeNode[] = [];

  // Build a lookup map from node id to KnowledgeNode
  for (const n of nodes) {
    if (map.has(n.id)) {
      throw new Error(`Duplicate node id: ${n.id}`);
    }

    map.set(n.id, { data: n, children: [] });
  }

  // Build parent-child relationships
  for (const node of map.values()) {
    if (node.data.parentId === null) {
      roots.push(node);
      continue;
    }

    const parent = map.get(node.data.parentId);

    if (!parent) {
      throw new Error(
        `Parent not found: node=${node.data.id}, parentId=${node.data.parentId}`,
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

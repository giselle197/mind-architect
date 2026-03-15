import type { KnowledgeTreeNode } from "../core/KnowledgeNode";
import type { LayoutTreeNode } from "../core/LayoutNode";

export function layoutTree(
  root: KnowledgeTreeNode,
  options?: {
    horizontalSpacing?: number;
    verticalSpacing?: number;
  },
): LayoutTreeNode {
  const horizontalSpacing = options?.horizontalSpacing ?? 180;
  const verticalSpacing = options?.verticalSpacing ?? 120;

  let leafIndex = 0;
  const visited = new Set<string>();

  const dfs = (node: KnowledgeTreeNode, depth: number): LayoutTreeNode => {
    if (visited.has(node.data.id)) {
      throw new Error(`Cycle detected at node ${node.data.id}`);
    }

    visited.add(node.data.id);

    const layoutTreeNode: LayoutTreeNode = {
      data: { ...node.data, x: 0, y: depth * verticalSpacing },
      children: [],
    };

    // leaf
    if (node.children.length === 0) {
      layoutTreeNode.data.x = leafIndex * horizontalSpacing;
      leafIndex++;

      return layoutTreeNode;
    }

    // children layout
    const childLayouts = node.children.map((child) => dfs(child, depth + 1));

    layoutTreeNode.children = childLayouts;

    // compute parent x
    if (childLayouts.length === 1) {
      layoutTreeNode.data.x = childLayouts[0].data.x;
    } else {
      // parent placed at center of children
      const centerX =
        childLayouts.reduce((sumX, child) => sumX + child.data.x, 0) /
        childLayouts.length;

      layoutTreeNode.data.x = centerX;
    }

    return layoutTreeNode;
  };

  return dfs(root, 0);
}

import type { TreeNode } from "../graph/TreeNode";
import type { LayoutNode } from "./LayoutNode";

export function layoutTree(
  root: TreeNode,
  options?: {
    horizontalSpacing?: number;
    verticalSpacing?: number;
  },
): LayoutNode {
  const horizontalSpacing = options?.horizontalSpacing ?? 180;
  const verticalSpacing = options?.verticalSpacing ?? 120;

  let leafIndex = 0;
  const visited = new Set<string>();

  const dfs = (node: TreeNode, depth: number): LayoutNode => {
    if (visited.has(node.id)) {
      throw new Error(`Cycle detected at node ${node.id}`);
    }

    visited.add(node.id);

    const layoutNode: LayoutNode = {
      ...node,
      x: 0,
      y: depth * verticalSpacing,
      children: [],
    };

    // leaf
    if (node.children.length === 0) {
      layoutNode.x = leafIndex * horizontalSpacing;
      leafIndex++;

      return layoutNode;
    }

    // children layout
    const childLayouts = node.children.map((child) => dfs(child, depth + 1));

    layoutNode.children = childLayouts;

    // compute parent x
    if (childLayouts.length === 1) {
      layoutNode.x = childLayouts[0].x;
    } else {
      // parent placed at center of children
      const centerX =
        childLayouts.reduce((sumX, child) => sumX + child.x, 0) /
        childLayouts.length;

      layoutNode.x = centerX;
    }

    return layoutNode;
  };

  return dfs(root, 0);
}

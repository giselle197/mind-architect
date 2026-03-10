import type { TreeNode } from "../graph/TreeNode";
import type { LayoutNode } from "./LayoutNode";

export function layoutTree(root: TreeNode): LayoutNode {
  const horizontalSpacing = 180;
  const verticalSpacing = 120;
  let leafIndex = 0;

  const dfs = (node: TreeNode, depth: number): LayoutNode => {
    const layoutNode: LayoutNode = {
      ...node,
      x: 0,
      y: depth * verticalSpacing,
      children: [],
    };

    if (node.children.length === 0) {
      layoutNode.x = leafIndex * horizontalSpacing;
      leafIndex++;
    } else {
      const childLayouts = node.children.map((child) => dfs(child, depth + 1));

      const avgX =
        childLayouts.reduce((a, b) => a + b.x, 0) / childLayouts.length;

      layoutNode.x = avgX;
      layoutNode.children = childLayouts;
    }

    return layoutNode;
  };

  return dfs(root, 0);
}

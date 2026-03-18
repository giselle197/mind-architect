import type { KnowledgeTreeNode, TransformerPort, WorldData } from "../../../core";
import { buildTree } from "./algorithms/buildTree";
import { layoutTree } from "./algorithms/layoutTree";
import type { LayoutTreeNode } from "./models/LayoutNode";

export class LogicalTreeTransformer implements TransformerPort<
  WorldData,
  KnowledgeTreeNode
> {
  transform(data: WorldData) {
    return buildTree(data.nodes);
  }
}

export class LayoutTreeTransformer implements TransformerPort<
  WorldData,
  LayoutTreeNode
> {
  transform(data: WorldData): LayoutTreeNode {
    const tree = buildTree(data.nodes);
    if (!tree) throw new Error("Build tree failed");
    return layoutTree(tree);
  }
}

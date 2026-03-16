import type { KnowledgeTreeNode } from "../core/KnowledgeNode";
import type { LayoutTreeNode } from "./LayoutNode";
import { layoutTree } from "./layoutTree";

export interface LayoutEngine {
  layout(root: KnowledgeTreeNode): LayoutTreeNode;
}

export class FlatLayoutEngine implements LayoutEngine {
  layout(root: KnowledgeTreeNode): LayoutTreeNode {
    return layoutTree(root);
  }
}

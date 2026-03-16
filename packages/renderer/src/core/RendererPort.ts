import type { LayoutTreeNode } from "../layout/LayoutNode";

export interface RendererPort {
  render(root: LayoutTreeNode, container: HTMLElement): void;

  dispose(): void;
}

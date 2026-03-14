import type { Node } from "../core/Node";

export interface RendererPort {
  render(data: { nodes: Node[] }, container: HTMLElement): void;

  dispose(): void;
}

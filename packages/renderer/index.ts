import { DevRenderer } from "./src/adapters/dev/DevRenderer";
import { DevTreeDiagramRenderer } from "./src/adapters/dev/DevTreeDiagramRenderer";
import type { RendererPort } from "./src/core/RendererPort";

export const renderers: Record<string, new () => RendererPort> = {
  dev: DevRenderer,
  tree: DevTreeDiagramRenderer,
};

export { DevRenderer, DevTreeDiagramRenderer };
export type { RendererPort };

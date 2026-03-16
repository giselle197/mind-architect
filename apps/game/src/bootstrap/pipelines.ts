import type { RendererPort, WorldData } from "@mind-architect/renderer";
import { buildTree } from "@mind-architect/renderer/src/graph/buildTree";
import { layoutTree } from "@mind-architect/renderer/src/layout/layoutTree";

export interface AppPipeline {
  run(container: HTMLElement, data: WorldData): void;
  dispose?(): void;
}

export class StandardPipeline implements AppPipeline {
  private renderer: RendererPort;
  constructor(renderer: RendererPort) {
    this.renderer = renderer;
  }

  run(container: HTMLElement, data: WorldData) {
    const tree = buildTree(data.nodes);
    if (!tree) return;
    const layoutRoot = layoutTree(tree);
    this.renderer.render(layoutRoot, container);
  }

  dispose() {
    this.renderer.dispose?.();
  }
}

export class DevPipeline implements AppPipeline {
  private mode: "raw" | "tree";
  constructor(mode: "raw" | "tree") {
    this.mode = mode;
  }

  run(container: HTMLElement, data: WorldData) {
    let output: unknown;

    if (this.mode === "raw") {
      output = data;
    } else {
      output = buildTree(data.nodes);
    }

    container.innerHTML = `<pre>${JSON.stringify(output, null, 2)}</pre>`;
  }
}

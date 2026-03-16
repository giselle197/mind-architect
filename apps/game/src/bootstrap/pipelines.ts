import type {
  RendererPort,
  WorldData,
  LayoutEngine,
} from "@mind-architect/renderer";
import { buildTree } from "@mind-architect/renderer";
export interface AppPipeline {
  run(container: HTMLElement, data: WorldData): void;
  dispose?(): void;
}

export class StandardPipeline implements AppPipeline {
  private layoutEngine: LayoutEngine;
  private renderer: RendererPort;
  constructor(layoutEngine: LayoutEngine, renderer: RendererPort) {
    this.layoutEngine = layoutEngine;
    this.renderer = renderer;
  }

  run(container: HTMLElement, data: WorldData) {
    const tree = buildTree(data.nodes);
    if (!tree) return;
    const layoutRoot = this.layoutEngine.layout(tree);
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

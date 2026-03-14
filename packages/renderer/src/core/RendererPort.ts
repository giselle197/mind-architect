import type { WorldData } from "./WorldData";

export interface RendererPort {
  render(data: WorldData, container: HTMLElement): void;

  dispose(): void;
}

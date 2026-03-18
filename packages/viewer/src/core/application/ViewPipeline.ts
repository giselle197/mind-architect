import type { WorldData } from "../domain/WorldData";
import type { RendererPort, TransformerPort } from "./ports";

export class ViewPipeline<TInput = WorldData, TOutput = TInput> {
  constructor(
    private readonly transformer: TransformerPort<TInput, TOutput>,
    private readonly renderer: RendererPort<TOutput>,
  ) {}

  execute(container: HTMLElement, data: TInput): void {
    const viewData = this.transformer.transform(data);
    this.renderer.render(viewData, container);
  }

  dispose(): void {
    this.renderer.dispose?.();
  }
}

export interface RendererPort {
  render(
    data: Record<string, any>,
    container: HTMLElement
  ): void;

  dispose(): void;
}
export interface TransformerPort<TInput, TOutput> {
  transform(data: TInput): TOutput;
}

export interface RendererPort<TOutput> {
  render(viewData: TOutput, container: HTMLElement): void;
  dispose(): void;
}

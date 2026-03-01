import type { RendererPort } from "@mind-architect/core/src/application/ports/RendererPort";

export function startApp(
  container: HTMLElement,
  data: Record<string, any>,
  renderer: RendererPort,
) {
  renderer.render(data, container);
}
import type { RendererPort } from "@mind-architect/renderer";

export function startApp(
  container: HTMLElement,
  data: Record<string, any>,
  renderer: RendererPort,
) {
  renderer.render(data, container);
}
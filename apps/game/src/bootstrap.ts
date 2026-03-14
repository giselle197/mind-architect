import type { Node, RendererPort } from "@mind-architect/renderer";

export function startApp(
  container: HTMLElement,
  data: { nodes: Node[] },
  renderer: RendererPort,
) {
  renderer.render(data, container);
}

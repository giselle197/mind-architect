import type { KnowledgeNode, RendererPort } from "@mind-architect/renderer";

export function startApp(
  container: HTMLElement,
  data: { nodes: KnowledgeNode[] },
  renderer: RendererPort,
) {
  renderer.render(data, container);
}

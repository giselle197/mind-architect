import type { RendererPort } from "../../core/RendererPort";

export class DevRenderer implements RendererPort {
  render(data: any, container: HTMLElement) {
    container.innerHTML = "";

    const root = document.createElement("div");

    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(data, null, 2);

    root.appendChild(pre);
    container.appendChild(root);
  }

  dispose() { }
}
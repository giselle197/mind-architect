import type { RendererPort } from "../../../core";

export class JsonRenderer implements RendererPort<any> {
  render(data: any, container: HTMLElement) {
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }

  dispose() {}
}

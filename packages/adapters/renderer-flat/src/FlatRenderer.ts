export class FlatRenderer {
  render(data: any, container: HTMLElement) {
    container.innerHTML = "";

    const root = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = data.nodes?.[0]?.name ?? "No Name";

    root.appendChild(title);
    container.appendChild(root);
  }

  dispose() { }
}
import type { RendererPort } from "../../core";
import type { LayoutTreeNode } from "../transformers/models/LayoutNode";

export class TreeDiagramRenderer implements RendererPort<LayoutTreeNode> {
  private svg?: SVGSVGElement;

  render(root: LayoutTreeNode, container: HTMLElement) {
    container.innerHTML = "";

    const svg = this.createSvg();
    this.svg = svg;

    this.renderEdges(svg, root);
    this.renderNodes(svg, root);

    container.appendChild(svg);
  }

  dispose() {
    if (this.svg && this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
  }

  private createSvg(): SVGSVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.background = "#ffffcc";
    svg.style.fontFamily = "monospace";
    svg.style.display = "block";

    return svg;
  }

  private renderEdges(svg: SVGSVGElement, root: LayoutTreeNode) {
    const draw = (node: LayoutTreeNode) => {
      for (const child of node.children) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );

        line.setAttribute("x1", String(node.data.x + 60));
        line.setAttribute("y1", String(node.data.y + 40));
        line.setAttribute("x2", String(child.data.x + 60));
        line.setAttribute("y2", String(child.data.y));

        line.setAttribute("stroke", "#444");
        line.setAttribute("stroke-width", "1.5");

        svg.appendChild(line);

        draw(child);
      }
    };

    draw(root);
  }

  private renderNodes(svg: SVGSVGElement, root: LayoutTreeNode) {
    const nodeWidth = 120;
    const nodeHeight = 40;

    const draw = (node: LayoutTreeNode) => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );

      rect.setAttribute("x", String(node.data.x));
      rect.setAttribute("y", String(node.data.y));
      rect.setAttribute("width", String(nodeWidth));
      rect.setAttribute("height", String(nodeHeight));
      rect.setAttribute("rx", "6");
      rect.setAttribute("fill", "#f4f4f4");
      rect.setAttribute("stroke", "#333");

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );

      text.setAttribute("x", String(node.data.x + nodeWidth / 2));
      text.setAttribute("y", String(node.data.y + nodeHeight / 2 + 5));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", "#000");

      text.textContent = node.data.name;

      group.appendChild(rect);
      group.appendChild(text);
      svg.appendChild(group);

      for (const child of node.children) {
        draw(child);
      }
    };

    draw(root);
  }
}

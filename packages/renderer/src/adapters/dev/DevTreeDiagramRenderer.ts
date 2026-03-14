import { WorldData } from "../../core/WorldData";

import type { RendererPort } from "../../core/RendererPort";

import { buildTree } from "../../graph/buildTree";
import type { LayoutNode } from "../../layout/LayoutNode";
import { layoutTree } from "../../layout/TreeLayout";

export class DevTreeDiagramRenderer implements RendererPort {
  private svg?: SVGSVGElement;

  render(data: WorldData, container: HTMLElement) {
    container.innerHTML = "";

    const tree = buildTree(data.nodes);
    if (!tree) return;

    const layoutRoot = layoutTree(tree);

    const svg = this.createSvg();
    this.svg = svg;

    this.renderEdges(svg, layoutRoot);
    this.renderNodes(svg, layoutRoot);

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

  private renderEdges(svg: SVGSVGElement, root: LayoutNode) {
    const draw = (node: LayoutNode) => {
      for (const child of node.children) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );

        line.setAttribute("x1", String(node.x + 60));
        line.setAttribute("y1", String(node.y + 40));
        line.setAttribute("x2", String(child.x + 60));
        line.setAttribute("y2", String(child.y));

        line.setAttribute("stroke", "#444");
        line.setAttribute("stroke-width", "1.5");

        svg.appendChild(line);

        draw(child);
      }
    };

    draw(root);
  }

  private renderNodes(svg: SVGSVGElement, root: LayoutNode) {
    const nodeWidth = 120;
    const nodeHeight = 40;

    const draw = (node: LayoutNode) => {
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );

      rect.setAttribute("x", String(node.x));
      rect.setAttribute("y", String(node.y));
      rect.setAttribute("width", String(nodeWidth));
      rect.setAttribute("height", String(nodeHeight));
      rect.setAttribute("rx", "6");
      rect.setAttribute("fill", "#f4f4f4");
      rect.setAttribute("stroke", "#333");

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );

      text.setAttribute("x", String(node.x + nodeWidth / 2));
      text.setAttribute("y", String(node.y + nodeHeight / 2 + 5));
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "12");
      text.setAttribute("fill", "#000");

      text.textContent = node.name;

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

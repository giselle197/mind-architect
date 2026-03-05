import type { NodeDTO } from "../../core/Node";
import type { RendererPort } from "../../core/RendererPort";

type TreeNode = NodeDTO & {
  children: TreeNode[];
  x?: number;
  y?: number;
};

export class DevTreeDiagramRenderer implements RendererPort {
  private svg?: SVGSVGElement;

  render(world: { nodes: NodeDTO[] }, container: HTMLElement) {
    container.innerHTML = "";

    const tree = this.buildTree(world.nodes);
    if (!tree) return;

    this.layoutTree(tree);

    const svg = this.createSvg();
    this.svg = svg;

    this.renderEdges(svg, tree);
    this.renderNodes(svg, tree);

    container.appendChild(svg);
  }

  dispose() {
    if (this.svg && this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
  }

  private buildTree(nodes: NodeDTO[]): TreeNode | null {
    const map = new Map<string, TreeNode>();
    const roots: TreeNode[] = [];

    for (const n of nodes) {
      map.set(n.id, { ...n, children: [] });
    }

    for (const node of map.values()) {
      if (node.parentId === null) {
        roots.push(node);
      } else {
        const parent = map.get(node.parentId);
        if (parent) parent.children.push(node);
      }
    }

    return roots[0] ?? null;
  }

  private layoutTree(root: TreeNode) {
    const horizontalSpacing = 180;
    const verticalSpacing = 120;
    let leafIndex = 0;

    const dfs = (node: TreeNode, depth: number): number => {
      node.y = depth * verticalSpacing;

      if (node.children.length === 0) {
        node.x = leafIndex * horizontalSpacing;
        leafIndex++;
      } else {
        const childXs = node.children.map((child) => dfs(child, depth + 1));
        node.x = childXs.reduce((a, b) => a + b, 0) / childXs.length;
      }

      return node.x!;
    };

    dfs(root, 0);
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

  private renderEdges(svg: SVGSVGElement, root: TreeNode) {
    const draw = (node: TreeNode) => {
      for (const child of node.children) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );

        line.setAttribute("x1", String(node.x! + 60));
        line.setAttribute("y1", String(node.y! + 40));
        line.setAttribute("x2", String(child.x! + 60));
        line.setAttribute("y2", String(child.y!));

        line.setAttribute("stroke", "#444");
        line.setAttribute("stroke-width", "1.5");

        svg.appendChild(line);

        draw(child);
      }
    };

    draw(root);
  }

  private renderNodes(svg: SVGSVGElement, root: TreeNode) {
    const nodeWidth = 120;
    const nodeHeight = 40;

    const draw = (node: TreeNode) => {
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

      text.setAttribute("x", String(node.x! + nodeWidth / 2));
      text.setAttribute("y", String(node.y! + nodeHeight / 2 + 5));
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

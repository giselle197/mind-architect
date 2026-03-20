import type { RendererPort } from "#core";
import type { LayoutTreeNode } from "../transformers";
export class FlatRenderer implements RendererPort<LayoutTreeNode> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  render(root: LayoutTreeNode, container: HTMLElement): void {
    container.innerHTML = "";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas 2D context not supported");
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    canvas.style.display = "block";

    this.canvas = canvas;
    this.ctx = ctx;

    container.appendChild(canvas);

    this.drawBackground(width, height);
    this.drawEdges(root);
    this.drawNodes(root);
  }

  dispose(): void {
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }

    this.canvas = null;
    this.ctx = null;
  }

  private drawBackground(width: number, height: number): void {
    if (!this.ctx) return;

    const ctx = this.ctx;

    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(0, 0, width, height);
  }

  private drawEdges(root: LayoutTreeNode): void {
    if (!this.ctx) return;

    const ctx = this.ctx;

    const draw = (node: LayoutTreeNode) => {
      for (const child of node.children) {
        ctx.beginPath();
        ctx.moveTo(node.data.x + 60, node.data.y + 40);
        ctx.lineTo(child.data.x + 60, child.data.y + 40);

        ctx.strokeStyle = "#4aa3ff";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        draw(child);
      }
    };

    draw(root);
  }

  private drawNodes(root: LayoutTreeNode): void {
    if (!this.ctx) return;

    const ctx = this.ctx;
    const nodeWidth = 120;
    const nodeHeight = 40;

    const draw = (node: LayoutTreeNode) => {
      ctx.fillStyle = "#1e2638";
      ctx.fillRect(node.data.x, node.data.y, nodeWidth, nodeHeight);

      ctx.strokeStyle = "#4aa3ff";
      ctx.lineWidth = 1;
      ctx.strokeRect(node.data.x, node.data.y, nodeWidth, nodeHeight);

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        node.data.name,
        node.data.x + nodeWidth / 2,
        node.data.y + nodeHeight / 2,
      );

      for (const child of node.children) {
        draw(child);
      }
    };

    draw(root);
  }
}

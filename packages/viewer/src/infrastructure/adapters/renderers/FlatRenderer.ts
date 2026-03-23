import type { KnowledgeTreeNode, RendererPort } from "#core";
import { createHighDPICanvas } from "./graphics/canvas";

/**
 * 動態產生深藍色系漸層樣式
 * 利用 HSL (色相, 飽和度, 亮度) 來推算每一層的顏色
 */
function getStyleForLevel(level: number) {
  // 亮度 (Lightness)：Base 是 15%，每深一層加 6%(變亮)，最高鎖定在 45% 確保保持深色系
  const lightness = Math.min(15 + level * 6, 45);
  // 邊框亮度：永遠比背景亮 20%，讓外框能清晰可見
  const borderLightness = Math.min(lightness + 20, 60);

  return {
    // Hue 222 是偏科技感的深邃藍色
    bg: `hsl(222, 35%, ${lightness}%)`,
    border: `hsl(222, 50%, ${borderLightness}%)`,
    text: "#ffffff", // 深色背景統一用白字最清晰
  };
}

export class FlatRenderer implements RendererPort<KnowledgeTreeNode> {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  render(root: KnowledgeTreeNode, container: HTMLElement): void {
    container.innerHTML = "";

    // 1. 取得設定好的高畫質畫布實例 (封裝了所有瑣碎設定與 Side Effect)
    const { canvas, ctx, width, height, dpr } = createHighDPICanvas(container);

    // 2. 綁定到類別屬性並掛載至 DOM
    this.canvas = canvas;
    this.ctx = ctx;
    container.appendChild(canvas);

    // 3. 執行繪圖邏輯
    this.drawBackground(width, height);

    // Root 節點留一點邊界 (Margin)
    const margin = 20;
    this.drawNode(
      root,
      margin,
      margin,
      width - margin * 2,
      height - margin * 2,
      0, // 初始 level 為 0
    );
  }

  dispose(): void {
    if (this.canvas?.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
  }

  private drawBackground(width: number, height: number) {
    if (!this.ctx) return;

    this.ctx.fillStyle = "#0b0f1a"; // 畫布底色：極深的星空藍
    this.ctx.fillRect(0, 0, width, height);
  }

  /**
   * 統一的繪製節點函式 (支援遞迴嵌套)
   */
  private drawNode(
    node: KnowledgeTreeNode,
    x: number,
    y: number,
    width: number,
    height: number,
    level: number,
  ) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    // 太小的節點直接放棄渲染
    if (width <= 4 || height <= 4) return;

    // --- 1. 系統化計算佈局參數 (Layout Variables) ---
    // 隨著 level 變深，Padding 和 Gap 應該要等比例縮小，避免吃光空間
    const basePadding = Math.max(2, 16 - level * 4);
    const paddingX = basePadding;
    const paddingBottom = basePadding;
    const gap = Math.max(1, basePadding / 2); // 網格間距，Gap 是 Padding 的一小半

    // 強制轉整數，避免 Sub-pixel (Canvas 在非整數座標上繪圖產生的模糊問題)
    const bx = Math.round(x);
    const by = Math.round(y);
    const bw = Math.round(width);
    const bh = Math.round(height);

    const style = getStyleForLevel(level);

    // 繪製節點本體 (長方形)
    ctx.fillStyle = style.bg;
    ctx.fillRect(bx, by, bw, bh);

    // 統一畫邊框，level 0 的外框稍微粗一點
    ctx.strokeStyle = style.border;
    ctx.lineWidth = level === 0 ? 2 : 1;
    ctx.strokeRect(bx, by, bw, bh);

    // --- 2. 系統化計算字體參數 (Typography Variables) ---
    const titleHeight = Math.max(14, Math.round(Math.min(24, bh * 0.15))); // 標題區高度
    const fontSize = Math.max(10, Math.min(16, titleHeight * 0.65)); // 字體大小隨標題區縮放
    const textOffsetY = Math.round(fontSize * 0.2); // Y 軸視覺微調：依據字體大小給予動態偏移

    // 只有空間足夠才繪製文字
    if (bw > 24 && bh > titleHeight + basePadding) {
      ctx.fillStyle = style.text;
      ctx.font = `bold ${Math.round(fontSize)}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textX = Math.round(bx + bw / 2);
      const textY = Math.round(by + titleHeight / 2 + textOffsetY); // 標題區的中間偏下
      ctx.fillText(node.data.name, textX, textY);
    }

    // --- 3. 網格空間計算 (Box Model) ---
    const children = node.children || [];
    if (!children.length) return;

    const paddingTop = titleHeight + basePadding / 2; // 上方預留 標題 + 半個 padding

    const innerX = bx + paddingX;
    const innerY = by + paddingTop;
    // 計算留給子節點的內部空間 (扣除 padding 與標題空間)
    const innerW = bw - paddingX * 2;
    const innerH = bh - paddingTop - paddingBottom;

    // 如果扣掉 padding 後沒有空間了，就不畫子節點
    if (innerW <= gap || innerH <= gap) return;

    // 計算最佳欄列數（盡量接近正方形網格）
    const cols = Math.ceil(Math.sqrt(children.length));
    const rows = Math.ceil(children.length / cols);
    const cellW = innerW / cols;
    const cellH = innerH / rows;

    // 計算當前子節點在網格中的位置
    children.forEach((child, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const cx = innerX + col * cellW + gap / 2;
      const cy = innerY + row * cellH + gap / 2;
      const cw = cellW - gap;
      const ch = cellH - gap;

      this.drawNode(child, cx, cy, cw, ch, level + 1);
    });
  }
}

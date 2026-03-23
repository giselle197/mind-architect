/**
 * 工廠函式：建立並初始化高畫質 Canvas
 * @param container 用來計算畫布基準尺寸的容器
 * @returns 包含設定完成的 canvas, ctx, 邏輯寬高與 dpr
 */
export function createHighDPICanvas(container: HTMLElement) {
  // 1. 建立 Canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D not supported");

  // 2. 取得容器尺寸 (邏輯尺寸)
  const rect = container.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || window.innerHeight;

  // 3. 處理硬體像素比
  const dpr = window.devicePixelRatio || 1;

  // 設定實際物理像素
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  // 設定 CSS 顯示尺寸
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.display = "block"; // 消除 Canvas 底部自帶的幽靈空白 (inline 元素的 baseline 對齊空白)
  canvas.style.outline = "none";

  // 4. 寫入全域縮放 (Side Effect 被封裝在此函式內部)
  ctx.scale(dpr, dpr);

  return { canvas, ctx, width, height, dpr };
}

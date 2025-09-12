const DEFAULT_DARKEN_FACTOR = 0.3;

function darkenColor(
  color: { r: number; g: number; b: number },
  factor: number,
): string {
  const r = Math.floor(color.r * (1 - factor));
  const g = Math.floor(color.g * (1 - factor));
  const b = Math.floor(color.b * (1 - factor));
  return `rgb(${r}, ${g}, ${b})`;
}

export function renderTShirt(canvas: HTMLCanvasElement, color: string): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  const scale = 1.5;
  const bodyWidth = 35 * scale;
  const bodyHeight = 60 * scale;
  const neckRadius = 8 * scale;
  const sleeveWidth = 16 * scale;
  const sleeveHeight = 18 * scale;

  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const color1 = color;
  const color2 = darkenColor({ r, g, b }, DEFAULT_DARKEN_FACTOR);

  const bodyLeft = centerX - bodyWidth / 2;
  const bodyRight = centerX + bodyWidth / 2;
  const bodyTop = centerY - bodyHeight / 2;
  const bodyBottom = centerY + bodyHeight / 2;
  const shoulderY = bodyTop + 5 * scale;

  const gradient = ctx.createLinearGradient(
    centerX,
    bodyTop,
    centerX,
    bodyBottom,
  );
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.fillStyle = gradient;

  ctx.moveTo(bodyLeft, shoulderY);
  ctx.lineTo(bodyLeft - sleeveWidth, shoulderY);
  ctx.lineTo(bodyLeft - sleeveWidth + 3 * scale, shoulderY + sleeveHeight);
  ctx.lineTo(bodyLeft, shoulderY + sleeveHeight);
  ctx.lineTo(bodyLeft, bodyBottom);
  ctx.lineTo(bodyRight, bodyBottom);
  ctx.lineTo(bodyRight, shoulderY + sleeveHeight);
  ctx.lineTo(bodyRight + sleeveWidth - 3 * scale, shoulderY + sleeveHeight);
  ctx.lineTo(bodyRight + sleeveWidth, shoulderY);
  ctx.lineTo(bodyRight, shoulderY);
  ctx.lineTo(centerX + neckRadius, shoulderY);
  ctx.arc(centerX, shoulderY, neckRadius, 0, Math.PI, false);
  ctx.lineTo(bodyLeft, shoulderY);

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

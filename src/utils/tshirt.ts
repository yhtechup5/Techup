const DEFAULT_DARKEN_FACTOR = 0.3;

export interface TShirtProperties {
  id: number;
  color: string;
  title: string;
}

export const TSHIRT_COLLECTION: TShirtProperties[] = [
  { id: 1, color: "#f8f8ff", title: "Ghost White" },
  { id: 2, color: "#e6e6fa", title: "Lavender" },
  { id: 3, color: "#ffefd5", title: "Papaya Whip" },
  { id: 4, color: "#ffb6c1", title: "Light Pink" },
  { id: 5, color: "#dda0dd", title: "Plum" },
  { id: 6, color: "#d3d3d3", title: "Light Gray" },
  { id: 7, color: "#e0e0e0", title: "Platinum" },
  { id: 8, color: "#c8f7c5", title: "Mint Green" },
  { id: 9, color: "#ffd1dc", title: "Rose" },
  { id: 10, color: "#b0e0e6", title: "Powder Blue" },
  { id: 11, color: "#f5deb3", title: "Wheat" },
  { id: 12, color: "#d8bfd8", title: "Thistle" },
  { id: 13, color: "#dcd0ff", title: "Periwinkle" },
  { id: 14, color: "#afeeee", title: "Pale Turquoise" },
  { id: 15, color: "#ffe4b5", title: "Moccasin" },
  { id: 16, color: "#da70d6", title: "Orchid" },
  { id: 17, color: "#98fb98", title: "Pale Green" },
  { id: 18, color: "#87ceeb", title: "Sky Blue" },
  { id: 19, color: "#f0e68c", title: "Khaki" },
  { id: 20, color: "#20b2aa", title: "Light Sea Green" },
  { id: 21, color: "#f4a460", title: "Sandy Brown" },
  { id: 22, color: "#ffc0cb", title: "Pink" },
  { id: 23, color: "#add8e6", title: "Light Blue" },
  { id: 24, color: "#ffcccb", title: "Light Coral" },
  { id: 25, color: "#fffacd", title: "Lemon Chiffon" },
  { id: 26, color: "#deb887", title: "Burlywood" },
  { id: 27, color: "#f5f5dc", title: "Beige" },
  { id: 28, color: "#ffffff", title: "Pure White" },
];

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

  const hex = color.replace("#", "");
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

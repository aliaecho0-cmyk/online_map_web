/** 一体化像素校园：24 像素 / 格，共用调色板、光向和地形边界。 */
import { GRID, GRID_COLS, GRID_ROWS, LABELS } from '../data/map-grid.js';
import { paintLandmarks } from './pixel-landmarks.js';

const TILE = 24;
export const MAP_PIXEL_SIZE = GRID_COLS * TILE;
const P = {
  ink: '#594661', stone: '#e1dcdf', seam: '#cec6d1', stoneLight: '#eee9e9',
  edge: '#a797b0', grass: '#b7d1a5', grassLight: '#c9dfb5', grassDark: '#91b58c',
  leaf: '#87b6a1', leafLight: '#b2d2ad', leafDark: '#608e8d', leafShade: '#597a87',
  lilac: '#c386db', pink: '#e5b5f1', cream: '#f5efd9', wood: '#bd9274', woodDark: '#896c62',
};

function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function noise(x, y, seed = 0) {
  let n = Math.imul(x + 31, 374761393) ^ Math.imul(y + 17, 668265263) ^ Math.imul(seed, 1274126177);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return (n ^ (n >>> 16)) >>> 0;
}

function isGrass(x, y) {
  return GRID[y]?.[x] === 'P' && !(x >= 5 && x < 15 && y >= 4 && y < 12);
}

function stone(ctx) {
  rect(ctx, 0, 0, GRID_COLS * TILE, GRID_ROWS * TILE, P.stone);
  // 错缝石板跨越语义格线，纹理对比低于摊位和标签。
  for (let y = 0; y < GRID_ROWS * TILE; y += 12) {
    for (let x = -18 * ((y / 12) % 2); x < GRID_COLS * TILE; x += 36) {
      const n = noise(x, y);
      rect(ctx, x + 1, y + 1, 34, 10, n % 5 === 0 ? '#e7e1e4' : P.stone);
      rect(ctx, x + 3, y + 11, 31, 1, P.seam);
      rect(ctx, x + 35, y + 3, 1, 7, P.seam);
      if (n % 3 === 0) rect(ctx, x + 5, y + 2, 9, 1, P.stoneLight);
    }
  }
}

function grass(ctx) {
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      if (!isGrass(x, y)) continue;
      const px = x * TILE, py = y * TILE;
      rect(ctx, px, py, TILE, TILE, P.grass);
      for (let i = 0; i < 5; i++) {
        const n = noise(x, y, i);
        const gx = px + 3 + n % 18, gy = py + 3 + (n >>> 8) % 18;
        rect(ctx, gx, gy, 2 + n % 2, 1, i % 2 ? P.grassLight : P.grassDark);
        if (i === 0) rect(ctx, gx + 1, gy - 2, 1, 2, P.grassDark);
      }
      if (!isGrass(x, y - 1)) {
        rect(ctx, px, py, TILE, 2, P.edge);
        rect(ctx, px, py + 2, TILE, 2, P.grassLight);
      }
      if (!isGrass(x, y + 1)) {
        rect(ctx, px, py + 21, TILE, 1, P.grassDark);
        rect(ctx, px, py + 22, TILE, 2, P.edge);
      }
      if (!isGrass(x - 1, y)) rect(ctx, px, py, 2, TILE, P.edge);
      if (!isGrass(x + 1, y)) rect(ctx, px + 22, py, 2, TILE, P.edge);
    }
  }
}

function tree(ctx, x, y, pink = false) {
  const base = pink ? '#ce94bf' : P.leaf;
  const light = pink ? '#edbdd9' : P.leafLight;
  const dark = pink ? '#a176ad' : P.leafDark;
  const shade = pink ? '#855e94' : P.leafShade;
  rect(ctx, x - 12, y - 3, 33, 7, '#96b69c');
  rect(ctx, x - 2, y - 16, 7, 18, P.ink);
  rect(ctx, x - 1, y - 16, 3, 17, P.wood);
  rect(ctx, x - 5, y - 7, 4, 3, P.woodDark);
  for (const [dx, dy, w, h] of [[-8,-43,16,4],[-14,-39,28,5],[-18,-34,36,17],[-14,-17,29,6],[-8,-11,18,3]]) {
    rect(ctx, x + dx, y + dy, w, h, P.ink);
  }
  for (const [dx, dy, w, h, color] of [
    [-7,-41,14,5,light],[-12,-37,24,6,base],[-16,-32,32,14,base],
    [-12,-18,25,5,dark],[-7,-13,16,3,shade],[10,-29,6,11,dark],
    [5,-19,8,6,shade],[-13,-33,13,7,light],[-8,-37,10,7,light],
    [-15,-25,7,3,light],[-3,-24,5,2,light],[4,-33,3,2,light],[1,-18,3,2,dark],
  ]) rect(ctx, x + dx, y + dy, w, h, color);
}

function flowers(ctx, x, y) {
  for (let i = 0; i < 4; i++) {
    const dx = x + i * 6, dy = y + (i % 2) * 3;
    rect(ctx, dx + 1, dy, 1, 5, P.leafDark);
    rect(ctx, dx, dy, 4, 2, i % 2 ? P.pink : P.cream);
    rect(ctx, dx + 1, dy - 1, 2, 4, i % 2 ? P.pink : P.cream);
    rect(ctx, dx + 1, dy, 1, 1, '#d4ac67');
  }
}

function bench(ctx, x, y) {
  rect(ctx, x + 2, y + 10, 29, 3, '#98b498');
  rect(ctx, x + 3, y + 2, 2, 10, P.ink);
  rect(ctx, x + 25, y + 2, 2, 10, P.ink);
  rect(ctx, x, y, 30, 5, P.woodDark);
  rect(ctx, x + 1, y, 28, 2, '#dec0a0');
  rect(ctx, x, y + 7, 30, 3, P.wood);
}

function gardens(ctx) {
  // 仅裁剪到草坪；右侧两行 W 道路保持可见。
  ctx.save();
  ctx.beginPath();
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      if (isGrass(x, y)) ctx.rect(x * TILE, y * TILE, TILE, TILE);
    }
  }
  ctx.clip();
  for (const [x, y, pink] of [
    [5.2,15.3,0],[7.3,14.8,0],[11,14.9,0],[14.5,15.3,1],
    [5.2,18.3,1],[7.3,18.7,0],[14.7,18.4,0],[5,21,0],
    [21.4,16.1,0],[24,15.8,1],[28.6,16.1,0],[21.3,18.7,1],[28.6,18.9,0],
  ]) tree(ctx, Math.round(x * TILE), Math.round(y * TILE), pink);
  for (const [x,y] of [[8,14.1],[12,17.8],[5.2,19.7],[14,20.3],[26.5,14.5],[23,18.1],[26.4,18.3],[21.1,21.3],[27,21.3]]) {
    flowers(ctx, x * TILE, y * TILE);
  }
  bench(ctx, 8.5 * TILE, 17.7 * TILE);
  bench(ctx, 25.3 * TILE, 17.7 * TILE);
  ctx.restore();
}

function plaza(ctx) {
  const x = 5 * TILE, y = 4 * TILE, w = 10 * TILE, h = 8 * TILE;
  rect(ctx, x, y, w, h, P.edge);
  rect(ctx, x + 3, y + 3, w - 6, h - 6, '#f0e8e7');
  // 四层石阶围绕同一个下沉广场。
  for (let i = 0; i < 4; i++) {
    const inset = 6 + i * 5;
    rect(ctx, x + inset, y + inset, w - inset * 2, h - inset * 2, i % 2 ? '#eee6e6' : '#c8bccb');
    rect(ctx, x + inset + 2, y + inset + 2, w - inset * 2 - 4, h - inset * 2 - 4, '#e5dade');
  }
  const ix = x + 26, iy = y + 26;
  rect(ctx, ix, iy, w - 52, h - 52, '#eee4e3');
  for (let sy = iy; sy < y + h - 26; sy += 14) {
    rect(ctx, ix, sy, w - 52, 1, '#d8cbd4');
    for (let sx = ix + ((sy - iy) % 28 ? 14 : 0); sx < x + w - 26; sx += 28) {
      rect(ctx, sx, sy, 1, 14, '#d8cbd4');
    }
  }
  rect(ctx, x + 58, y + 32, 126, 49, P.ink);
  rect(ctx, x + 61, y + 35, 120, 42, P.woodDark);
  for (let sy = y + 38; sy < y + 77; sy += 6) rect(ctx, x + 63, sy, 116, 4, P.wood);
  rect(ctx, x + 55, y + 26, 132, 8, '#9b78b1');
  rect(ctx, x + 58, y + 27, 126, 3, P.pink);
  rect(ctx, x + 60, y + 33, 10, 29, P.lilac);
  rect(ctx, x + 172, y + 33, 10, 29, P.lilac);
  rect(ctx, x + 106, y + 81, 32, 4, '#ac949d');
  rect(ctx, x + 102, y + 85, 40, 3, '#c9b9bb');
  for (const sx of [x + 35, x + w - 47]) {
    rect(ctx, sx, y + 34, 12, 18, P.ink);
    rect(ctx, sx + 2, y + 37, 8, 5, '#8d7998');
    rect(ctx, sx + 3, y + 45, 6, 4, '#8d7998');
  }
  for (const sx of [x + 13, x + w - 30]) {
    rect(ctx, sx, y + h - 35, 17, 19, P.woodDark);
    rect(ctx, sx - 2, y + h - 37, 21, 8, P.leafDark);
    rect(ctx, sx + 1, y + h - 40, 15, 6, P.leafLight);
    flowers(ctx, sx, y + h - 37);
  }
  rect(ctx, x + 116, y + 139, 8, 20, '#c4acd2');
  rect(ctx, x + 110, y + 145, 20, 8, '#c4acd2');
  rect(ctx, x + 118, y + 145, 4, 8, P.cream);
}

function building(ctx, x, y, w, h) {
  rect(ctx, x + 4, y + 5, w - 4, h - 5, '#b5a9bb');
  rect(ctx, x + 4, y + 20, w - 9, h - 22, P.ink);
  rect(ctx, x + 7, y + 23, w - 15, h - 28, '#f0e5db');
  rect(ctx, x + w - 17, y + 23, 9, h - 28, '#c9b7bb');
  for (let wx = x + 14; wx < x + w - 22; wx += 22) {
    rect(ctx, wx, y + 38, 12, Math.max(12, h - 49), P.ink);
    rect(ctx, wx + 2, y + 40, 8, Math.max(8, h - 53), '#92b9bc');
    rect(ctx, wx + 3, y + 41, 2, 5, '#d4e5df');
    rect(ctx, wx - 2, y + 35, 16, 3, '#d9c8c4');
  }
  rect(ctx, x, y + 15, w - 4, 15, P.ink);
  rect(ctx, x + 4, y + 7, w - 12, 15, P.ink);
  rect(ctx, x + 10, y + 2, w - 24, 10, P.ink);
  rect(ctx, x + 11, y + 4, w - 26, 5, '#d5b7df');
  rect(ctx, x + 6, y + 10, w - 16, 7, '#bc9aca');
  rect(ctx, x + 2, y + 18, w - 8, 8, '#a282b4');
  for (let rx = x + 15; rx < x + w - 13; rx += 15) {
    rect(ctx, rx, y + 10, 1, 6, '#aa87bc');
    rect(ctx, rx - 5, y + 19, 1, 6, '#8e719f');
  }
  rect(ctx, x + 3, y + 26, w - 10, 2, '#d9c2e1');
  rect(ctx, x + 4, y + h - 5, w - 9, 3, '#c5b9bf');
}

function pool(ctx) {
  const x = 21 * TILE, y = 6 * TILE, w = 9 * TILE, h = 4 * TILE;
  rect(ctx, x, y, w, h, P.edge);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, '#ece5e9');
  rect(ctx, x + 6, y + 6, w - 12, h - 12, '#648d9e');
  rect(ctx, x + 8, y + 9, w - 16, h - 17, '#9bc6ce');
  rect(ctx, x + 9, y + 11, w - 18, 3, '#b7d9db');
  for (let i = 0; i < 48; i++) {
    const n = noise(i, 7);
    rect(ctx, x + 13 + n % (w - 38), y + 17 + (n >>> 8) % (h - 34), 4 + n % 9, 1, i % 2 ? '#c7e4df' : '#83b4c3');
  }
  for (const [dx,dy] of [[25,24],[172,57],[183,30]]) {
    rect(ctx, x + dx, y + dy, 9, 4, '#789d98');
    rect(ctx, x + dx + 1, y + dy - 1, 6, 3, '#b5c99b');
    rect(ctx, x + dx + 5, y + dy - 3, 3, 3, P.pink);
  }
}

function booth(ctx, x, y, service = false) {
  const roof = service ? '#d4b877' : '#a9c799';
  const shade = service ? '#a68b63' : '#7f9f88';
  rect(ctx, x + 3, y + 21, 20, 3, '#bbafbd');
  rect(ctx, x + 3, y + 6, 18, 17, P.woodDark);
  rect(ctx, x + 5, y + 7, 14, 13, '#f2e7d4');
  rect(ctx, x + 1, y + 5, 22, 7, P.ink);
  rect(ctx, x + 3, y + 2, 18, 6, P.ink);
  rect(ctx, x + 4, y + 3, 16, 3, roof);
  rect(ctx, x + 2, y + 6, 20, 4, roof);
  for (let dx = 6; dx < 21; dx += 7) rect(ctx, x + dx, y + 3, 3, 7, '#e7ecd7');
  rect(ctx, x + 2, y + 10, 20, 2, shade);
  rect(ctx, x + 3, y + 17, 18, 3, P.wood);
  rect(ctx, x + 4, y + 17, 16, 1, '#ddc4a0');
  rect(ctx, x + 5, y + 21, 2, 2, P.ink);
  rect(ctx, x + 17, y + 21, 2, 2, P.ink);
}

function labels(ctx) {
  ctx.font = '12px "px-cjk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const label of LABELS) {
    const x = Math.round(label.x * TILE), y = Math.round(label.y * TILE);
    const width = Math.ceil(ctx.measureText(label.text).width / 2) * 2 + 12;
    const landmark = ['社联摊位', '一瓯茶', '社联兑奖点'].includes(label.text);
    rect(ctx, x - width / 2 + 2, y - 6, width, 17, landmark ? P.woodDark : '#ac9fb4');
    rect(ctx, x - width / 2, y - 8, width, 17, landmark ? P.woodDark : '#b8a8be');
    rect(ctx, x - width / 2 + 1, y - 7, width - 2, 14, landmark ? P.cream : '#f0e9ee');
    rect(ctx, x - width / 2 + 3, y - 5, 2, 2, landmark ? '#c9ab7a' : '#ccb8d5');
    ctx.fillStyle = P.ink;
    ctx.fillText(label.text, x, y);
  }
}

export function createMapPainter() {
  return {
    /** 调用方使用 30×30 格坐标；像素绘制不改变命中坐标。 */
    paint(ctx) {
      ctx.save();
      ctx.scale(1 / TILE, 1 / TILE);
      ctx.imageSmoothingEnabled = false;
      stone(ctx);
      grass(ctx);
      plaza(ctx);
      gardens(ctx);
      building(ctx, 21 * TILE, TILE, 9 * TILE, 3 * TILE);
      pool(ctx);
      // 教学楼保留原南侧不规则占地。
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 26 * TILE, 9 * TILE, 4 * TILE);
      ctx.rect(9 * TILE, 26 * TILE, 3 * TILE, 2 * TILE);
      ctx.rect(11 * TILE, 28 * TILE, TILE, TILE);
      ctx.clip();
      building(ctx, 0, 26 * TILE, 12 * TILE, 4 * TILE);
      ctx.restore();
      for (let y = 0; y < GRID_ROWS; y++) {
        for (let x = 0; x < GRID_COLS; x++) {
          if (GRID[y][x] === 'G') booth(ctx, x * TILE, y * TILE);
          if (GRID[y][x] === 'O') booth(ctx, x * TILE, y * TILE, true);
        }
      }
      paintLandmarks(ctx);
      labels(ctx);
      ctx.restore();
    },
  };
}

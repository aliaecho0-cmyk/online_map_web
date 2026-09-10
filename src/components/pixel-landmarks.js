// Landmark artwork uses the same 24-pixel tiles as the surrounding landscape.
const C = {
  ink: '#594661', deep: '#786083', lilac: '#c386db', pink: '#e5b5f1',
  cream: '#f5efd9', wood: '#bd9274', timber: '#896c62', sage: '#a5c99d',
  gold: '#dfb557', goldLight: '#f4d981', goldShade: '#ae854a',
  roofLight: '#d3a2e5', leaf: '#789978', stone: '#c8bebc',
};

export function paintLandmarks(ctx) {
  const r = (color, x, y, w, h) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  ctx.save();

  // Association market: one continuous striped canopy over a wooden stall.
  r(C.stone, 240, 496, 96, 8);
  r(C.cream, 241, 496, 94, 2);
  r(C.timber, 244, 480, 88, 22);
  r(C.wood, 245, 480, 86, 20);
  for (let x = 248; x < 331; x += 10) r(C.timber, x, 488, 1, 11);
  r(C.ink, 247, 470, 3, 31);
  r(C.wood, 247, 471, 1, 29);
  r(C.ink, 326, 470, 3, 31);
  r(C.wood, 326, 471, 1, 29);
  r(C.ink, 248, 456, 80, 2);
  r(C.ink, 244, 458, 88, 3);
  r(C.ink, 242, 461, 92, 6);
  r(C.ink, 240, 467, 96, 8);
  r(C.lilac, 246, 458, 84, 3);
  r(C.lilac, 244, 461, 88, 6);
  r(C.lilac, 242, 467, 92, 5);
  for (let x = 250; x < 326; x += 16) {
    r(C.cream, x, 458, 8, 3);
    r(C.cream, x - 1, 461, 9, 6);
    r(C.cream, x - 2, 467, 10, 5);
    r(C.pink, x + 8, 459, 2, 7);
  }
  r(C.roofLight, 248, 458, 80, 1);
  r(C.deep, 242, 469, 92, 1);
  for (let x = 242; x < 334; x += 8) {
    const width = Math.min(8, 334 - x);
    r((x - 242) % 16 === 0 ? C.lilac : C.cream, x, 471, width, 3);
    r(C.deep, x + 1, 474, width - 2, 1);
  }
  // Warm lanterns hang from the two outer supports.
  for (const x of [249, 325]) {
    r(C.timber, x, 475, 1, 2);
    r(C.goldShade, x - 2, 477, 5, 5);
    r(C.goldLight, x - 1, 477, 3, 4);
    r(C.cream, x - 1, 478, 1, 2);
    r(C.timber, x, 482, 1, 1);
  }
  // Small wares at either end leave the middle fascia clear for its label.
  r(C.timber, 251, 478, 11, 5);
  r(C.cream, 252, 476, 3, 5);
  r(C.pink, 252, 476, 3, 1);
  r(C.sage, 256, 477, 4, 4);
  r(C.leaf, 257, 476, 2, 1);
  r(C.timber, 314, 478, 10, 5);
  r(C.gold, 315, 475, 3, 6);
  r(C.cream, 316, 474, 1, 1);
  r(C.roofLight, 320, 477, 3, 4);
  r(C.ink, 245, 482, 86, 3);
  r(C.cream, 245, 482, 86, 1);
  r(C.wood, 246, 485, 84, 13);
  r(C.timber, 246, 497, 84, 2);
  r(C.cream, 262, 486, 51, 9);
  r(C.gold, 262, 495, 51, 1);
  for (const x of [249, 316]) {
    r(C.timber, x, 487, 9, 8);
    r(C.wood, x + 1, 488, 7, 6);
    r(C.goldLight, x + 2, 489, 5, 1);
    r(C.goldLight, x + 2, 492, 5, 1);
  }
  r(C.timber, 240, 499, 5, 5);
  r(C.wood, 241, 500, 3, 3);
  r(C.leaf, 240, 496, 5, 3);
  r(C.sage, 241, 494, 3, 4);
  r(C.pink, 242, 495, 2, 2);
  r(C.timber, 331, 499, 5, 5);
  r(C.wood, 332, 500, 3, 3);
  r(C.leaf, 331, 496, 5, 3);
  r(C.sage, 332, 494, 3, 4);
  r(C.cream, 332, 495, 2, 2);

  // Redemption monument: a faceted gold column on three shallow stone steps.
  r(C.stone, 72, 87, 48, 9);
  r(C.cream, 73, 87, 45, 2);
  r(C.deep, 76, 84, 41, 9);
  r(C.goldShade, 77, 85, 39, 7);
  r(C.gold, 78, 85, 36, 5);
  r(C.goldLight, 78, 85, 36, 1);
  r(C.ink, 81, 79, 31, 7);
  r(C.gold, 82, 79, 28, 5);
  r(C.goldLight, 82, 79, 28, 1);
  r(C.goldShade, 105, 81, 5, 3);
  r(C.ink, 86, 53, 22, 28);
  r(C.goldShade, 87, 54, 20, 26);
  r(C.gold, 88, 54, 14, 26);
  r(C.goldLight, 88, 54, 2, 25);
  r(C.goldShade, 100, 55, 2, 24);
  r(C.ink, 88, 49, 17, 4);
  r(C.ink, 86, 52, 22, 2);
  r(C.goldLight, 89, 50, 15, 2);
  r(C.gold, 87, 52, 19, 2);
  r(C.cream, 89, 50, 12, 1);
  // The carved star uses a darker offset and a pale upper edge.
  r(C.goldShade, 95, 60, 2, 11);
  r(C.goldShade, 91, 64, 10, 3);
  r(C.goldLight, 94, 59, 2, 11);
  r(C.goldLight, 90, 63, 10, 3);
  r(C.cream, 94, 60, 1, 8);
  r(C.cream, 92, 63, 6, 1);
  r(C.goldShade, 91, 74, 8, 1);
  r(C.goldLight, 91, 76, 8, 1);

  // Tea house occupies three tiles; its fourth tile is an open tea terrace.
  r(C.timber, 456, 621, 72, 3);
  r(C.ink, 459, 601, 66, 21);
  r(C.wood, 460, 602, 64, 19);
  r(C.cream, 463, 603, 57, 15);
  r(C.timber, 462, 617, 60, 4);
  for (const x of [462, 486, 500, 520]) r(C.timber, x, 604, 2, 17);
  r(C.deep, 465, 606, 19, 8);
  r(C.goldLight, 466, 607, 17, 6);
  for (const x of [471, 477]) r(C.timber, x, 607, 1, 7);
  r(C.timber, 465, 610, 19, 1);
  r(C.ink, 489, 607, 9, 14);
  r(C.deep, 491, 607, 6, 14);
  r(C.gold, 495, 614, 1, 2);
  r(C.deep, 504, 606, 13, 8);
  r(C.sage, 505, 607, 11, 6);
  r(C.cream, 506, 608, 3, 4);
  r(C.timber, 510, 607, 1, 7);
  r(C.wood, 503, 615, 15, 2);
  r(C.ink, 465, 590, 54, 2);
  r(C.ink, 461, 592, 62, 3);
  r(C.ink, 458, 595, 68, 3);
  r(C.ink, 456, 598, 72, 6);
  r(C.lilac, 466, 591, 52, 2);
  r(C.deep, 462, 593, 60, 3);
  r(C.lilac, 459, 596, 66, 3);
  r(C.deep, 457, 599, 70, 3);
  r(C.roofLight, 466, 591, 52, 1);
  for (let x = 463; x < 522; x += 8) {
    r(C.roofLight, x, 594, 5, 1);
    r(C.pink, x - 3, 597, 5, 1);
    r(C.lilac, x - 5, 600, 6, 1);
  }
  r(C.wood, 458, 602, 68, 1);
  r(C.timber, 519, 604, 6, 1);
  r(C.goldShade, 520, 605, 5, 8);
  r(C.goldLight, 521, 605, 3, 7);
  r(C.cream, 521, 607, 1, 3);
  r(C.ink, 522, 612, 1, 2);
  // A hanging pot-and-cup sign remains readable without rasterized lettering.
  r(C.timber, 474, 602, 1, 2);
  r(C.timber, 467, 603, 15, 6);
  r(C.cream, 468, 604, 13, 4);
  r(C.leaf, 470, 605, 5, 2);
  r(C.leaf, 471, 604, 2, 1);
  r(C.leaf, 474, 604, 2, 1);
  r(C.leaf, 478, 605, 2, 2);
  r(C.gold, 477, 607, 4, 1);
  // Outdoor tea table, two stools, and a planter on the remaining tile.
  r(C.timber, 528, 601, 24, 23);
  r(C.wood, 529, 602, 22, 21);
  for (let y = 605; y < 624; y += 5) r(C.timber, 529, y, 22, 1);
  r(C.cream, 529, 602, 22, 1);
  r(C.ink, 534, 608, 12, 8);
  r(C.timber, 535, 607, 10, 8);
  r(C.wood, 534, 608, 12, 5);
  r(C.goldLight, 535, 608, 10, 1);
  r(C.sage, 537, 609, 4, 3);
  r(C.cream, 538, 608, 2, 1);
  r(C.cream, 542, 610, 2, 2);
  for (const y of [603, 618]) {
    r(C.ink, 538, y, 5, 4);
    r(C.gold, 538, y, 5, 2);
  }
  r(C.timber, 547, 618, 4, 5);
  r(C.leaf, 546, 615, 6, 4);
  r(C.sage, 548, 613, 3, 5);
  ctx.restore();
}

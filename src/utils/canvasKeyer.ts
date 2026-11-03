/**
 * Studio background keyer: converts studio white backdrop into a smooth alpha channel
 * using edge-seeded flood fill + soft luminance ramp so interior white labels & pearls stay solid.
 */
export async function keyStudioSheetToTransparent(
  srcUrl: string,
  cropBoxes: [number, number, number, number][],
  refW: number,
  refH: number
): Promise<string> {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = srcUrl;
  await img.decode();
  const W = img.naturalWidth || 1280;
  const H = img.naturalHeight || 720;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return srcUrl;

  ctx.drawImage(img, 0, 0, W, H);
  const imgData = ctx.getImageData(0, 0, W, H);
  const d = imgData.data;
  const visited = new Uint8Array(W * H);
  const queue = new Int32Array(W * H);
  let qHead = 0;
  let qTail = 0;

  const isBgCandidate = (idx: number) => {
    const r = d[idx];
    const g = d[idx + 1];
    const b = d[idx + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    const sat = max - min;
    return luma > 224 && sat < 22;
  };

  const pushSeed = (x: number, y: number) => {
    if (x < 0 || x >= W || y < 0 || y >= H) return;
    const p = y * W + x;
    if (!visited[p] && isBgCandidate(p * 4)) {
      visited[p] = 1;
      queue[qTail++] = p;
    }
  };

  // Seed outer borders of entire sheet
  for (let x = 0; x < W; x++) {
    pushSeed(x, 0);
    pushSeed(x, H - 1);
  }
  for (let y = 0; y < H; y++) {
    pushSeed(0, y);
    pushSeed(W - 1, y);
  }

  // Also seed the perimeter of each crop box
  const sx = W / refW;
  const sy = H / refH;
  cropBoxes.forEach(([x0, x1, y0, y1]) => {
    const px0 = Math.max(0, Math.floor(x0 * sx));
    const px1 = Math.min(W - 1, Math.ceil(x1 * sx));
    const py0 = Math.max(0, Math.floor(y0 * sy));
    const py1 = Math.min(H - 1, Math.ceil(y1 * sy));
    for (let x = px0; x <= px1; x++) {
      pushSeed(x, py0);
      pushSeed(x, py1);
    }
    for (let y = py0; y <= py1; y++) {
      pushSeed(px0, y);
      pushSeed(px1, y);
    }
  });

  // Seed closed loops where pixel is pure neutral studio white
  for (let y = 4; y < H - 4; y += 4) {
    for (let x = 4; x < W - 4; x += 4) {
      const p = y * W + x;
      if (!visited[p]) {
        const idx = p * 4;
        const r = d[idx];
        const g = d[idx + 1];
        const b = d[idx + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (min > 238 && max - min <= 5) {
          pushSeed(x, y);
        }
      }
    }
  }

  // Flood fill background
  while (qHead < qTail) {
    const p = queue[qHead++];
    const idx = p * 4;
    const r = d[idx];
    const g = d[idx + 1];
    const b = d[idx + 2];
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    // Smooth feathering at object edges
    if (luma > 236) {
      d[idx + 3] = 0;
    } else {
      d[idx + 3] = Math.round(((236 - luma) / 12) * 255);
    }

    const x = p % W;
    const y = (p / W) | 0;
    if (x > 0) {
      const np = p - 1;
      if (!visited[np] && isBgCandidate(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (x < W - 1) {
      const np = p + 1;
      if (!visited[np] && isBgCandidate(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (y > 0) {
      const np = p - W;
      if (!visited[np] && isBgCandidate(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
    if (y < H - 1) {
      const np = p + W;
      if (!visited[np] && isBgCandidate(np * 4)) {
        visited[np] = 1;
        queue[qTail++] = np;
      }
    }
  }

  // Softly feather 1px boundary neighbors for anti-aliased edges
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const p = y * W + x;
      if (!visited[p]) {
        const nZero = visited[p - 1] + visited[p + 1] + visited[p - W] + visited[p + W];
        if (nZero >= 2) {
          const idx = p * 4;
          const luma = d[idx] * 0.299 + d[idx + 1] * 0.587 + d[idx + 2] * 0.114;
          if (luma > 210) d[idx + 3] = Math.min(d[idx + 3], 135);
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : srcUrl), 'image/png');
  });
}


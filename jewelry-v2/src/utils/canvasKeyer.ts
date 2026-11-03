/**
 * Single-Image Studio Background Keyer, Auto-Framer & Specular Facet Detector:
 * Automatically converts any single jewelry image with a white studio backdrop
 * into a smooth transparent PNG, trims excessive empty margin, and locates the
 * brightest diamond/gold specular facet coordinates for real-time 3D sparkle glints!
 */
export interface SparklePoint {
  x: number; // 0..1 relative to cropped image width
  y: number; // 0..1 relative to cropped image height
  phase: number;
  size: number;
}

export interface KeyedImageResult {
  url: string;
  aspectRatio: number;
  sparkles: SparklePoint[];
}

const keyedCache = new Map<string, Promise<KeyedImageResult>>();

export function keySingleImageToTransparent(
  srcUrl: string,
  isStageBust = false
): Promise<KeyedImageResult> {
  const cacheKey = `${srcUrl}::${isStageBust ? 'stage' : 'piece'}`;
  const existing = keyedCache.get(cacheKey);
  if (existing) return existing;

  const defaultSparkles: SparklePoint[] = [
    { x: 0.48, y: 0.42, phase: 0, size: 1.1 },
    { x: 0.54, y: 0.49, phase: 1.4, size: 0.9 },
    { x: 0.43, y: 0.52, phase: 2.8, size: 1.0 },
    { x: 0.51, y: 0.36, phase: 4.1, size: 0.85 }
  ];

  const promise = (async (): Promise<KeyedImageResult> => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = srcUrl;
      await img.decode();

      const W = img.naturalWidth || 800;
      const H = img.naturalHeight || 800;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return { url: srcUrl, aspectRatio: isStageBust ? 0.42 : 0.85, sparkles: defaultSparkles };

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
        const a = d[idx + 3];
        if (a < 16) return true;
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

      // Seed all 4 outer borders
      for (let x = 0; x < W; x++) {
        pushSeed(x, 0);
        pushSeed(x, H - 1);
      }
      for (let y = 0; y < H; y++) {
        pushSeed(0, y);
        pushSeed(W - 1, y);
      }

      // Seed interior pure neutral white holes (inside ring bands, necklace loops, watch bracelets)
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
            if (min > 240 && max - min <= 5) {
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

      // Find non-transparent bounding box
      let minX = W;
      let maxX = 0;
      let minY = H;
      let maxY = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const alpha = d[(y * W + x) * 4 + 3];
          if (alpha > 20) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX <= minX || maxY <= minY) {
        return { url: srcUrl, aspectRatio: isStageBust ? 0.42 : 0.85, sparkles: defaultSparkles };
      }

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const padX = Math.round(cropW * 0.04);
      const padY = Math.round(cropH * 0.04);

      const finalW = cropW + padX * 2;
      const finalH = cropH + padY * 2;

      // Detect high-contrast specular diamond/metal facet points inside the jewelry
      const candidates: { x: number; y: number; score: number }[] = [];
      const step = Math.max(6, Math.floor(Math.min(cropW, cropH) / 36));
      for (let y = minY + step; y < maxY - step; y += step) {
        for (let x = minX + step; x < maxX - step; x += step) {
          const idx = (y * W + x) * 4;
          const a = d[idx + 3];
          if (a < 230) continue;
          const r = d[idx];
          const g = d[idx + 1];
          const b = d[idx + 2];
          const luma = r * 0.299 + g * 0.587 + b * 0.114;

          // Look for bright facet highlights surrounded by deeper gemstone/metal contrast
          const nIdx = ((y + step) * W + (x + step)) * 4;
          const nLuma = d[nIdx] * 0.299 + d[nIdx + 1] * 0.587 + d[nIdx + 2] * 0.114;
          const contrast = Math.abs(luma - nLuma);

          if (luma > 205 && contrast > 26 && d[nIdx + 3] > 200) {
            candidates.push({
              x: (x - minX + padX) / finalW,
              y: (y - minY + padY) / finalH,
              score: luma + contrast * 1.5
            });
          }
        }
      }

      candidates.sort((a, b) => b.score - a.score);
      const sparkles: SparklePoint[] = [];
      for (const c of candidates) {
        if (sparkles.length >= 6) break;
        const tooClose = sparkles.some((s) => Math.hypot(s.x - c.x, s.y - c.y) < 0.12);
        if (!tooClose) {
          sparkles.push({
            x: c.x,
            y: c.y,
            phase: sparkles.length * 1.15,
            size: 0.85 + (sparkles.length % 3) * 0.22
          });
        }
      }

      const finalSparkles = sparkles.length >= 3 ? sparkles : defaultSparkles;

      const outCanvas = document.createElement('canvas');
      outCanvas.width = finalW;
      outCanvas.height = finalH;
      const outCtx = outCanvas.getContext('2d');
      if (!outCtx) return { url: srcUrl, aspectRatio: isStageBust ? 0.42 : 0.85, sparkles: finalSparkles };

      outCtx.drawImage(canvas, minX, minY, cropW, cropH, padX, padY, cropW, cropH);

      const rawRatio = finalW / finalH;
      const aspectRatio = isStageBust
        ? Math.min(0.46, Math.max(0.32, rawRatio * 0.45))
        : rawRatio;

      return new Promise((resolve) => {
        outCanvas.toBlob((blob) => {
          resolve({
            url: blob ? URL.createObjectURL(blob) : srcUrl,
            aspectRatio,
            sparkles: finalSparkles
          });
        }, 'image/png');
      });
    } catch (_) {
      return { url: srcUrl, aspectRatio: isStageBust ? 0.42 : 0.85, sparkles: defaultSparkles };
    }
  })();

  keyedCache.set(cacheKey, promise);
  return promise;
}

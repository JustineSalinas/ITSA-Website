import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function sliceLogo() {
  const srcPath = 'C:/Users/User/.gemini/antigravity-ide/brain/437f305a-d377-4d02-8871-3ebe45c5da51/.user_uploaded/media_1790680986016.png';
  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Anti-aliased alpha extraction
  const cleanData = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const diff = Math.max(255 - r, 255 - g, 255 - b);

    if (diff > 35) {
      cleanData[i * 4] = r;
      cleanData[i * 4 + 1] = g;
      cleanData[i * 4 + 2] = b;
      cleanData[i * 4 + 3] = 255;
    } else if (diff > 5) {
      const factor = (diff - 5) / 30;
      const alpha = Math.round(factor * 255);
      const unmix = (c) => Math.max(0, Math.min(255, Math.round((c - (1 - factor) * 255) / factor)));
      cleanData[i * 4] = unmix(r);
      cleanData[i * 4 + 1] = unmix(g);
      cleanData[i * 4 + 2] = unmix(b);
      cleanData[i * 4 + 3] = alpha;
    } else {
      cleanData[i * 4] = 255;
      cleanData[i * 4 + 1] = 255;
      cleanData[i * 4 + 2] = 255;
      cleanData[i * 4 + 3] = 0;
    }
  }

  // Find connected components
  const isFg = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    return cleanData[(y * width + x) * 4 + 3] > 40;
  };

  const visited = new Uint8Array(width * height);
  const letters = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (!isFg(x, y) || visited[idx]) continue;

      const queue = [x, y];
      visited[idx] = 1;
      const pixels = [];
      let minX = x, maxX = x, minY = y, maxY = y;
      let head = 0;

      while(head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];
        pixels.push(cy * width + cx);
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        const neighbors = [
          [cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1],
          [cx+1, cy+1], [cx-1, cy-1], [cx+1, cy-1], [cx-1, cy+1]
        ];
        for (const [nx, ny] of neighbors) {
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const nidx = ny * width + nx;
            if (isFg(nx, ny) && !visited[nidx]) {
              visited[nidx] = 1;
              queue.push(nx, ny);
            }
          }
        }
      }

      if (pixels.length > 500) {
        let sumX = 0, sumY = 0;
        for (const p of pixels) {
          sumX += (p % width);
          sumY += Math.floor(p / width);
        }
        letters.push({
          pixels: new Set(pixels),
          minX, maxX, minY, maxY,
          width: maxX - minX + 1,
          height: maxY - minY + 1,
          centerX: sumX / pixels.length,
          centerY: sumY / pixels.length
        });
      }
    }
  }

  // Sort: I (top-left), T (top-right), S (bottom-left), A (bottom-right)
  letters.sort((a, b) => {
    const aTop = a.centerY < height / 2;
    const bTop = b.centerY < height / 2;
    if (aTop !== bTop) return aTop ? -1 : 1;
    return a.centerX - b.centerX;
  });

  const names = ['i', 't', 's', 'a'];

  // Let's create high-res (2x = 644 x 568) for crisp rendering
  const SCALE = 2;
  const targetW = width * SCALE;
  const targetH = height * SCALE;

  // 1. Full logo
  await sharp(cleanData, { raw: { width, height, channels: 4 } })
    .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile('public/itsa-logo.png');

  console.log('Saved public/itsa-logo.png');

  // 2. Full-canvas layer images for each letter (same viewBox, perfectly registered)
  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    const name = names[i];
    const letterBuffer = Buffer.alloc(width * height * 4);

    for (const p of l.pixels) {
      letterBuffer[p * 4] = cleanData[p * 4];
      letterBuffer[p * 4 + 1] = cleanData[p * 4 + 1];
      letterBuffer[p * 4 + 2] = cleanData[p * 4 + 2];
      letterBuffer[p * 4 + 3] = cleanData[p * 4 + 3];
    }

    // Also include any semi-transparent edge pixels belonging to this letter
    for (let y = Math.max(0, l.minY - 2); y <= Math.min(height - 1, l.maxY + 2); y++) {
      for (let x = Math.max(0, l.minX - 2); x <= Math.min(width - 1, l.maxX + 2); x++) {
        const p = y * width + x;
        if (!l.pixels.has(p) && cleanData[p * 4 + 3] > 0) {
          // Check if closest pixel in 2px neighborhood is in this letter
          let belongs = false;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              if (l.pixels.has((y + dy) * width + (x + dx))) {
                belongs = true;
                break;
              }
            }
            if (belongs) break;
          }
          if (belongs) {
            letterBuffer[p * 4] = cleanData[p * 4];
            letterBuffer[p * 4 + 1] = cleanData[p * 4 + 1];
            letterBuffer[p * 4 + 2] = cleanData[p * 4 + 2];
            letterBuffer[p * 4 + 3] = cleanData[p * 4 + 3];
          }
        }
      }
    }

    await sharp(letterBuffer, { raw: { width, height, channels: 4 } })
      .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(`public/itsa-letter-${name}.png`);

    console.log(`Saved public/itsa-letter-${name}.png`);

    // Also save cropped version with tight bounding box
    const pad = 4;
    const cropX = Math.max(0, l.minX - pad);
    const cropY = Math.max(0, l.minY - pad);
    const cropW = Math.min(width - cropX, l.width + pad * 2);
    const cropH = Math.min(height - cropY, l.height + pad * 2);

    await sharp(letterBuffer, { raw: { width, height, channels: 4 } })
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .resize(cropW * SCALE, cropH * SCALE, { kernel: sharp.kernel.lanczos3 })
      .png()
      .toFile(`public/itsa-blob-${name}.png`);

    console.log(`Saved public/itsa-blob-${name}.png`);
  }
}

sliceLogo().catch(console.error);

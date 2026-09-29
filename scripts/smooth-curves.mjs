import fs from 'fs';
import sharp from 'sharp';

// Function to parse SVG path into commands
// For cubic beziers: M x y, C cp1x cp1y cp2x cp2y x y, L x y, Z
function samplePath(d, steps = 150) {
  // Simple path parser for standard M...C...Z paths
  const tokens = d.trim().match(/([a-df-z]|[-+]?[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?)/gi);
  if (!tokens) return [];

  const points = [];
  let currX = 0, currY = 0;
  let startX = 0, startY = 0;
  let i = 0;

  function cubicPoint(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  }

  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === 'M') {
      currX = parseFloat(tokens[i++]);
      currY = parseFloat(tokens[i++]);
      startX = currX;
      startY = currY;
      points.push({ x: currX, y: currY });
    } else if (cmd === 'C') {
      const cp1x = parseFloat(tokens[i++]);
      const cp1y = parseFloat(tokens[i++]);
      const cp2x = parseFloat(tokens[i++]);
      const cp2y = parseFloat(tokens[i++]);
      const endX = parseFloat(tokens[i++]);
      const endY = parseFloat(tokens[i++]);

      // Subdivide bezier
      const numSub = 8;
      for (let s = 1; s <= numSub; s++) {
        const t = s / numSub;
        points.push({
          x: cubicPoint(currX, cp1x, cp2x, endX, t),
          y: cubicPoint(currY, cp1y, cp2y, endY, t)
        });
      }
      currX = endX;
      currY = endY;
    } else if (cmd === 'L') {
      currX = parseFloat(tokens[i++]);
      currY = parseFloat(tokens[i++]);
      points.push({ x: currX, y: currY });
    } else if (cmd === 'Z' || cmd === 'z') {
      currX = startX;
      currY = startY;
    }
  }
  return points;
}

// Resample points evenly along arc length
function resamplePoints(points, targetCount = 60) {
  if (points.length < 2) return points;
  let totalLen = 0;
  const dists = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i-1].x;
    const dy = points[i].y - points[i-1].y;
    totalLen += Math.hypot(dx, dy);
    dists.push(totalLen);
  }

  const resampled = [];
  const step = totalLen / targetCount;
  let currIdx = 0;

  for (let k = 0; k < targetCount; k++) {
    const targetDist = k * step;
    while (currIdx < dists.length - 1 && dists[currIdx + 1] < targetDist) {
      currIdx++;
    }
    const d0 = dists[currIdx];
    const d1 = dists[currIdx + 1] || totalLen;
    const span = d1 - d0;
    const t = span > 0 ? (targetDist - d0) / span : 0;
    const p0 = points[currIdx];
    const p1 = points[currIdx + 1] || points[0];
    resampled.push({
      x: p0.x + t * (p1.x - p0.x),
      y: p0.y + t * (p1.y - p0.y)
    });
  }
  return resampled;
}

// Smooth closed loop of points
function smoothClosedLoop(points, iterations = 3) {
  let pts = [...points];
  const N = pts.length;
  for (let it = 0; it < iterations; it++) {
    const next = [];
    for (let i = 0; i < N; i++) {
      const pPrev2 = pts[(i - 2 + N) % N];
      const pPrev = pts[(i - 1 + N) % N];
      const pCurr = pts[i];
      const pNext = pts[(i + 1) % N];
      const pNext2 = pts[(i + 2) % N];
      next.push({
        x: (pPrev2.x + 2 * pPrev.x + 4 * pCurr.x + 2 * pNext.x + pNext2.x) / 10,
        y: (pPrev2.y + 2 * pPrev.y + 4 * pCurr.y + 2 * pNext.y + pNext2.y) / 10
      });
    }
    pts = next;
  }
  return pts;
}

// Convert smoothed points into smooth cubic Bezier path (Centripetal / Catmull-Rom to Bezier)
function pointsToSmoothPath(pts) {
  const N = pts.length;
  if (N < 3) return '';

  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % N];
    const p3 = pts[(i + 2) % N];

    // Catmull-Rom tangent to cubic bezier control points
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  d += 'Z';
  return d;
}

export function smoothPathString(d, targetCount = 50, iterations = 3) {
  const rawPts = samplePath(d);
  if (rawPts.length < 5) return d;
  const resampled = resamplePoints(rawPts, targetCount);
  const smoothed = smoothClosedLoop(resampled, iterations);
  return pointsToSmoothPath(smoothed);
}

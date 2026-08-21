import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const defaultTargets = [
  "bell-hq.png",
  "conversation-shield-hq.png",
  "document-rules-hq.png",
  "evacuation-hq.png",
  "explosion-hq.png",
  "fire-hq.png",
  "gear-hq.png",
  "network-shield-hq.png",
  "pollution-hq.png",
  "shield-check-hq.png",
  "toxic-cloud-hq.png",
  "unknown-hq.png",
];

const targets = process.argv.slice(2).length ? process.argv.slice(2) : defaultTargets;

const iconDirectory = path.resolve("public/icons/nuclear");

function median(values) {
  const ordered = [...values].sort((a, b) => a - b);
  return ordered[Math.floor(ordered.length / 2)];
}

function colorDistance(pixel, background) {
  return Math.hypot(pixel[0] - background[0], pixel[1] - background[1], pixel[2] - background[2]);
}

function isBackgroundLike(pixel, background, relaxed = false) {
  const lightness = (pixel[0] + pixel[1] + pixel[2]) / 3;
  const spread = Math.max(pixel[0], pixel[1], pixel[2]) - Math.min(pixel[0], pixel[1], pixel[2]);
  const distance = colorDistance(pixel, background);
  return lightness >= (relaxed ? 194 : 215) && spread <= (relaxed ? 34 : 24) && distance <= (relaxed ? 82 : 56);
}

async function removeBackground(filename) {
  const inputPath = path.join(iconDirectory, filename);
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixelCount = width * height;
  const border = [];

  for (let x = 0; x < width; x += 1) {
    for (const y of [0, 1, height - 2, height - 1]) border.push((y * width + x) * channels);
  }
  for (let y = 2; y < height - 2; y += 1) {
    for (const x of [0, 1, width - 2, width - 1]) border.push((y * width + x) * channels);
  }

  const background = [0, 1, 2].map((channel) => median(border.map((offset) => data[offset + channel])));
  const transparent = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0;
  let tail = 0;

  function enqueue(index) {
    if (transparent[index]) return;
    const offset = index * channels;
    const pixel = [data[offset], data[offset + 1], data[offset + 2]];
    if (!isBackgroundLike(pixel, background, true)) return;
    transparent[index] = 1;
    queue[tail++] = index;
  }

  for (let x = 0; x < width; x += 1) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    const y = Math.floor(index / width);
    if (x > 0) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (y > 0) enqueue(index - width);
    if (y + 1 < height) enqueue(index + width);
  }

  if (filename === "gear-hq.png") {
    const center = Math.floor(height / 2) * width + Math.floor(width / 2);
    enqueue(center);
    while (head < tail) {
      const index = queue[head++];
      const x = index % width;
      const y = Math.floor(index / width);
      if (x > 0) enqueue(index - 1);
      if (x + 1 < width) enqueue(index + 1);
      if (y > 0) enqueue(index - width);
      if (y + 1 < height) enqueue(index + width);
    }
  }

  for (let index = 0; index < pixelCount; index += 1) {
    const offset = index * channels;
    if (transparent[index]) {
      data[offset + 3] = 0;
      continue;
    }

    const x = index % width;
    const y = Math.floor(index / width);
    const touchesTransparent =
      (x > 0 && transparent[index - 1]) ||
      (x + 1 < width && transparent[index + 1]) ||
      (y > 0 && transparent[index - width]) ||
      (y + 1 < height && transparent[index + width]);

    if (!touchesTransparent) continue;
    const pixel = [data[offset], data[offset + 1], data[offset + 2]];
    if (!isBackgroundLike(pixel, background)) continue;
    const distance = colorDistance(pixel, background);
    data[offset + 3] = Math.min(255, Math.max(0, Math.round(((distance - 10) / 46) * 255)));
  }

  if (filename === "radiation-hq.png") {
    const visited = new Uint8Array(pixelCount);
    const components = [];
    for (let start = 0; start < pixelCount; start += 1) {
      if (visited[start] || data[start * channels + 3] === 0) continue;
      const component = [];
      const pending = [start];
      visited[start] = 1;
      while (pending.length) {
        const index = pending.pop();
        component.push(index);
        const x = index % width;
        const y = Math.floor(index / width);
        for (const neighbor of [x > 0 ? index - 1 : -1, x + 1 < width ? index + 1 : -1, y > 0 ? index - width : -1, y + 1 < height ? index + width : -1]) {
          if (neighbor < 0 || visited[neighbor] || data[neighbor * channels + 3] === 0) continue;
          visited[neighbor] = 1;
          pending.push(neighbor);
        }
      }
      components.push(component);
    }
    components.sort((a, b) => b.length - a.length);
    for (const component of components.slice(1)) {
      for (const index of component) data[index * channels + 3] = 0;
    }
  }

  await sharp(data, { raw: { width, height, channels } }).png({ compressionLevel: 9 }).toFile(`${inputPath}.tmp.png`);
  await fs.rename(`${inputPath}.tmp.png`, inputPath);
  return { filename, width, height, background, transparentPixels: transparent.reduce((sum, value) => sum + value, 0) };
}

const results = [];
for (const target of targets) results.push(await removeBackground(target));
console.log(JSON.stringify(results, null, 2));

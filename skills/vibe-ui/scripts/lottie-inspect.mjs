#!/usr/bin/env node
// Inspect Lottie (.json) and dotLottie (.lottie) files against the asset contract in
// references/lottie-and-vector-animation.md.
//   node lottie-inspect.mjs <file> [...] [--budget=icon|state|hero|overlay]
// Prints JSON: size, timing, segments, feature use, cheapest compatible lottie-web build, and warnings.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const BUDGETS_KB = { icon: 15, state: 30, hero: 80, overlay: 60 };
const args = process.argv.slice(2);
const budgetName = (args.find((arg) => arg.startsWith('--budget=')) || '--budget=state').split('=')[1];
const budgetKb = BUDGETS_KB[budgetName] ?? BUDGETS_KB.state;
const files = args.filter((arg) => !arg.startsWith('--'));

if (!files.length) {
  console.error('Usage: node lottie-inspect.mjs <file.json|file.lottie> [...] [--budget=icon|state|hero|overlay]');
  process.exit(1);
}

// Minimal zip reader for .lottie archives (stored or deflated entries).
function unzip(buffer) {
  const entries = {};
  let eocd = buffer.length - 22;
  while (eocd >= 0 && buffer.readUInt32LE(eocd) !== 0x06054b50) eocd -= 1;
  if (eocd < 0) throw new Error('not a zip archive');
  let offset = buffer.readUInt32LE(eocd + 16);
  const count = buffer.readUInt16LE(eocd + 10);
  for (let i = 0; i < count; i += 1) {
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString('utf8', offset + 46, offset + 46 + nameLength);
    const localStart = localOffset + 30 + buffer.readUInt16LE(localOffset + 26) + buffer.readUInt16LE(localOffset + 28);
    const raw = buffer.subarray(localStart, localStart + compressedSize);
    entries[name] = method === 0 ? raw : zlib.inflateRawSync(raw);
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function inspectAnimation(label, text, fileBytes) {
  const data = JSON.parse(text);
  const stats = {
    layers: 0, shapeItems: 0, masks: 0, mattes: 0, precomps: (data.assets || []).filter((asset) => asset.layers).length,
    expressions: 0, effects: 0, blurs: 0, textLayers: 0, imageLayers: 0, threeD: 0, mergePaths: 0, repeaters: 0, gradients: 0,
  };
  const embeddedImages = [];
  const externalImages = [];

  const walkValue = (value) => {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(walkValue); return; }
    if (typeof value.x === 'string' && ('k' in value || 'a' in value)) stats.expressions += 1;
    for (const key of Object.keys(value)) walkValue(value[key]);
  };
  const walkShapes = (items = []) => {
    for (const item of items) {
      stats.shapeItems += 1;
      if (item.ty === 'mm') stats.mergePaths += 1;
      if (item.ty === 'rp') stats.repeaters += 1;
      if (item.ty === 'gf' || item.ty === 'gs') stats.gradients += 1;
      if (item.ty === 'gr') walkShapes(item.it);
    }
  };
  const walkLayers = (layers = []) => {
    for (const layer of layers) {
      stats.layers += 1;
      if (layer.ddd === 1) stats.threeD += 1;
      if (layer.ty === 5) stats.textLayers += 1;
      if (layer.ty === 2) stats.imageLayers += 1;
      for (const effect of layer.ef || []) {
        if (effect.ty === 29) stats.blurs += 1; else stats.effects += 1;
      }
      if (layer.masksProperties?.length) stats.masks += layer.masksProperties.length;
      if (layer.tt) stats.mattes += 1;
      walkShapes(layer.shapes);
      walkValue(layer.ks);
      walkValue(layer.shapes);
    }
  };
  walkLayers(data.layers);
  for (const asset of data.assets || []) {
    if (asset.layers) walkLayers(asset.layers);
    else if (typeof asset.p === 'string') {
      if (asset.p.startsWith('data:')) embeddedImages.push({ id: asset.id, kb: +(asset.p.length * 0.75 / 1024).toFixed(1) });
      else externalImages.push(`${asset.u || ''}${asset.p}`);
    }
  }

  const gzipKb = +(zlib.gzipSync(Buffer.from(text)).length / 1024).toFixed(1);
  const fps = data.fr;
  const segments = Object.fromEntries((data.markers || []).map((m) => [m.cm, [m.tm, m.tm + (m.dr || 0)]]));
  const warnings = [];
  if (gzipKb > budgetKb) warnings.push(`gzip ${gzipKb} KB exceeds the ${budgetName} budget of ${budgetKb} KB`);
  if (stats.expressions) warnings.push(`${stats.expressions} expression(s): needs the full lottie_svg build, or bake them to keyframes`);
  if (stats.blurs) warnings.push(`${stats.blurs} Gaussian blur(s): render only in the full lottie_svg build (SVG filters); keep them off large, constantly moving areas`);
  if (stats.effects) warnings.push(`${stats.effects} After Effects effect(s): lottie-web ignores most of them; verify the render`);
  if (stats.mergePaths) warnings.push(`${stats.mergePaths} merge path(s): not rendered by lottie-web; flatten them in the source`);
  if (stats.textLayers) warnings.push(`${stats.textLayers} text layer(s): need font loading and do not localise; prefer shapes or HTML text`);
  if (embeddedImages.length) warnings.push(`${embeddedImages.length} embedded raster image(s) (${embeddedImages.reduce((s, i) => s + i.kb, 0).toFixed(1)} KB): use vectors or a real <img>`);
  if (externalImages.length) warnings.push(`${externalImages.length} external image reference(s): they must be deployed alongside the JSON`);
  if (stats.threeD) warnings.push(`${stats.threeD} 3D layer(s): limited support in lottie-web; verify the render`);
  if (!Object.keys(segments).length) warnings.push('no markers: add named segments (e.g. in, idle, on, off) so UI code never hard-codes frames');
  if (fps > 60) warnings.push(`${fps} fps: 60 is enough for UI; higher rates add keyframes without visible gain`);

  return {
    file: label,
    bytes: fileBytes ?? Buffer.byteLength(text),
    gzipKb,
    size: [data.w, data.h],
    fps,
    frames: [data.ip, data.op],
    seconds: +((data.op - data.ip) / fps).toFixed(2),
    segments,
    stats,
    player: stats.expressions || stats.blurs ? 'lottie-web/build/player/lottie_svg' : 'lottie-web/build/player/lottie_light',
    warnings,
  };
}

const reports = [];
for (const file of files) {
  try {
    const buffer = fs.readFileSync(file);
    if (path.extname(file).toLowerCase() === '.lottie') {
      const entries = unzip(buffer);
      const manifest = entries['manifest.json'] ? JSON.parse(entries['manifest.json'].toString('utf8')) : null;
      for (const [name, content] of Object.entries(entries)) {
        if (/^(a|animations)\/.+\.json$/.test(name)) reports.push(inspectAnimation(`${file}#${name}`, content.toString('utf8')));
      }
      reports.push({
        file, bytes: buffer.length, container: 'dotLottie',
        stateMachines: manifest?.stateMachines?.map((sm) => sm.id) || [],
        themes: manifest?.themes?.map((theme) => theme.id) || [],
        player: '@lottiefiles/dotlottie-web (needed for state machines/themes); the inner JSON also plays in lottie-web',
      });
    } else {
      reports.push(inspectAnimation(file, buffer.toString('utf8'), buffer.length));
    }
  } catch (error) {
    reports.push({ file, error: error.message });
  }
}

console.log(JSON.stringify({ budget: { name: budgetName, gzipKb: budgetKb }, reports }, null, 2));

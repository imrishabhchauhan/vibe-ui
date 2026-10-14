'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repo = path.join(__dirname, '..');
const inspector = path.join(repo, 'skills', 'vibe-ui', 'scripts', 'lottie-inspect.mjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-ui-lottie-'));

const base = { v: '5.12.0', fr: 60, ip: 0, op: 120, w: 240, h: 240, assets: [] };
const shapeLayer = (extra = {}) => ({
  ty: 4, ind: 1, ip: 0, op: 120, st: 0,
  ks: { o: { a: 0, k: 100 }, p: { a: 0, k: [120, 120, 0] } },
  shapes: [{ ty: 'gr', it: [{ ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } }, { ty: 'fl', c: { a: 0, k: [1, 0, 0, 1] } }] }],
  ...extra,
});

try {
  const clean = path.join(temp, 'clean.json');
  fs.writeFileSync(clean, JSON.stringify({ ...base, layers: [shapeLayer()], markers: [{ cm: 'in', tm: 0, dr: 60 }, { cm: 'idle', tm: 60, dr: 60 }] }));

  const risky = path.join(temp, 'risky.json');
  const expressionLayer = shapeLayer({ ks: { o: { a: 0, k: 100, x: 'loopOut()' }, p: { a: 0, k: [0, 0, 0] } }, ef: [{ ty: 5 }] });
  fs.writeFileSync(risky, JSON.stringify({
    ...base,
    layers: [expressionLayer, { ty: 5, ind: 2, ks: {} }, shapeLayer({ shapes: [{ ty: 'mm', mm: 1 }] })],
    assets: [{ id: 'img', p: `data:image/png;base64,${'A'.repeat(4000)}` }],
  }));

  const result = spawnSync(process.execPath, [inspector, clean, risky], { encoding: 'utf8' });
  assert.strictEqual(result.status, 0, result.stderr);
  const [cleanReport, riskyReport] = JSON.parse(result.stdout).reports;

  assert.deepStrictEqual(cleanReport.segments, { in: [0, 60], idle: [60, 120] });
  assert.strictEqual(cleanReport.player, 'lottie-web/build/player/lottie_light');
  assert.deepStrictEqual(cleanReport.warnings, []);

  assert.strictEqual(riskyReport.player, 'lottie-web/build/player/lottie_svg');
  for (const signal of ['expression', 'effect', 'merge path', 'text layer', 'embedded raster', 'no markers']) {
    assert.ok(riskyReport.warnings.some((warning) => warning.includes(signal)), `Expected a "${signal}" warning`);
  }

  console.log('Lottie inspector tests passed.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

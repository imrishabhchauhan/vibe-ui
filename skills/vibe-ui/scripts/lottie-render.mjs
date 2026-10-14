#!/usr/bin/env node
// Render frames of a Lottie file to one PNG contact sheet with headless Chrome. Works anywhere (local, CI, cloud agent):
// no server, no LottieFiles account, no browser window. Uses Chrome's own --screenshot mode (no extra npm packages).
//
//   node lottie-render.mjs anim.json --frames 0,30,60,90 [--size 240] [--cols 4] [--bg #ffffff] [--out sheet.png]
//   node lottie-render.mjs anim.json --segments            # one frame at the start, middle and end of every marker
//   node lottie-render.mjs anim.json --frames 0..120:20    # range with step
//
// Chrome is found via $CHROME_PATH, common install paths, or Playwright/Puppeteer caches. In a fresh cloud box:
//   npx playwright install chromium     (then rerun; the script finds it)
// The lottie-web player is read from ./node_modules/lottie-web if present, otherwise from $LOTTIE_PLAYER (a file path),
// otherwise fetched once from jsDelivr.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--') && /\.json$/i.test(a));
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : dflt; };
if (!file) { console.error('Usage: node lottie-render.mjs <anim.json> --frames 0,30,60 | --segments [--size 240] [--cols 4] [--bg #fff] [--out sheet.png]'); process.exit(1); }

const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const size = +opt('size', 240);
let frames = [];
const fr = opt('frames', null);
if (fr) {
  for (const part of fr.split(',')) {
    const m = part.match(/^(\d+)\.\.(\d+)(?::(\d+))?$/);
    if (m) for (let f = +m[1]; f <= +m[2]; f += +(m[3] || 10)) frames.push(f);
    else frames.push(+part);
  }
} else if (args.includes('--segments') && data.markers?.length) {
  for (const m of data.markers) { const a = m.tm, b = m.tm + (m.dr || 0); frames.push(a, Math.round((a + b) / 2), Math.max(a, b - 1)); }
} else {
  const n = 6; for (let i = 0; i < n; i++) frames.push(Math.round(data.ip + (data.op - 1 - data.ip) * i / (n - 1)));
}
frames = [...new Set(frames)];
const cols = +opt('cols', Math.min(frames.length, 6));
const bg = opt('bg', '#ffffff');
const out = path.resolve(opt('out', file.replace(/\.json$/i, '.sheet.png')));
const label = (f) => { const m = (data.markers || []).find((k) => f >= k.tm && f < k.tm + (k.dr || 0)); return m ? `${m.cm} · f${f}` : `f${f}`; };

function findChrome() {
  const c = [process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  for (const cache of [path.join(os.homedir(), '.cache', 'ms-playwright'), path.join(os.homedir(), 'AppData', 'Local', 'ms-playwright'),
    path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright'), path.join(os.homedir(), '.cache', 'puppeteer', 'chrome')]) {
    if (!fs.existsSync(cache)) continue;
    for (const d of fs.readdirSync(cache)) for (const rel of ['chrome-linux/chrome', 'chrome-linux64/chrome', 'chrome-win/chrome.exe', 'chrome-win64/chrome.exe',
      'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-headless-shell-linux64/chrome-headless-shell']) c.push(path.join(cache, d, rel));
  }
  return c.find((p) => p && fs.existsSync(p));
}

async function player() {
  const local = [process.env.LOTTIE_PLAYER, path.resolve('node_modules/lottie-web/build/player/lottie_svg.min.js')].find((p) => p && fs.existsSync(p));
  if (local) return fs.readFileSync(local, 'utf8');
  const res = await fetch('https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_svg.min.js');
  if (!res.ok) throw new Error('Could not load lottie-web; set LOTTIE_PLAYER to a local lottie_svg.min.js');
  return res.text();
}

const chrome = findChrome();
if (!chrome) { console.error('Chrome not found. Set CHROME_PATH or run: npx playwright install chromium'); process.exit(2); }

const ratio = data.h / data.w;
const cellW = size, cellH = Math.round(size * ratio), labelH = 18;
const rows = Math.ceil(frames.length / cols);
const W = cols * cellW, H = rows * (cellH + labelH);
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;background:${bg}}#g{display:grid;grid-template-columns:repeat(${cols},${cellW}px)}
.c{width:${cellW}px}.l{height:${labelH}px;font:11px/18px monospace;color:#555;padding-left:4px;background:#fff}.a{width:${cellW}px;height:${cellH}px}
</style><script>${await player()}</script></head><body><div id="g"></div><script>
const data=${JSON.stringify(data)};const frames=${JSON.stringify(frames)};const labels=${JSON.stringify(frames.map(label))};
frames.forEach((f,i)=>{const c=document.createElement('div');c.className='c';c.innerHTML='<div class="l">'+labels[i]+'</div><div class="a"></div>';
document.getElementById('g').appendChild(c);const a=lottie.loadAnimation({container:c.querySelector('.a'),renderer:'svg',loop:false,autoplay:false,
animationData:JSON.parse(JSON.stringify(data)),rendererSettings:{preserveAspectRatio:'xMidYMid meet'}});a.addEventListener('DOMLoaded',()=>a.goToAndStop(f,true));});
</script></body></html>`;
const tmp = path.join(os.tmpdir(), `lottie-render-${process.pid}.html`);
fs.writeFileSync(tmp, html);
const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-sandbox', `--window-size=${W},${H}`,
  '--virtual-time-budget=4000', `--screenshot=${out}`, 'file:///' + tmp.replace(/\\/g, '/')], { encoding: 'utf8', timeout: 60000 });
fs.rmSync(tmp, { force: true });
if (!fs.existsSync(out)) { console.error('Render failed:', r.stderr?.slice(-600)); process.exit(3); }
console.log(JSON.stringify({ out, frames, size: [W, H], chrome }, null, 1));

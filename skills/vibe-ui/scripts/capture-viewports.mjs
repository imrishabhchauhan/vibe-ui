#!/usr/bin/env node

// Captures a page at the Vibe UI device matrix and reports automatic layout signals.
// Usage: node capture-viewports.mjs <url> [--out <dir>] [--only desktop,mobile,tablet,wide] [--wait <ms>]
// Needs Playwright (the "playwright" or "@playwright/test" package) and a Chromium browser.

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const MATRIX = [
  { group: 'desktop', priority: 1, width: 1440, height: 900, scale: 1 },
  { group: 'desktop', priority: 1, width: 1366, height: 768, scale: 1 },
  { group: 'desktop', priority: 1, width: 1280, height: 800, scale: 1 },
  { group: 'mobile', priority: 1, width: 390, height: 844, scale: 3, touch: true },
  { group: 'mobile', priority: 1, width: 360, height: 800, scale: 3, touch: true },
  { group: 'mobile', priority: 1, width: 430, height: 932, scale: 3, touch: true },
  { group: 'tablet', priority: 2, width: 768, height: 1024, scale: 2, touch: true },
  { group: 'tablet', priority: 2, width: 820, height: 1180, scale: 2, touch: true },
  { group: 'tablet', priority: 2, width: 1024, height: 768, scale: 2, touch: true },
  { group: 'wide', priority: 3, width: 1920, height: 1080, scale: 1 },
];

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const optionIndexes = new Set(['--out', '--only', '--wait'].map((n) => args.indexOf(n)).filter((i) => i !== -1).map((i) => i + 1));
const target = args.find((arg, i) => !arg.startsWith('--') && !optionIndexes.has(i));

if (!target || args.includes('--help')) {
  console.log('Usage: node capture-viewports.mjs <url> [--out <dir>] [--only desktop,mobile,tablet,wide] [--wait <ms>]');
  process.exit(args.includes('--help') ? 0 : 1);
}

const only = option('--only', null)?.split(',').map((s) => s.trim());
const outDir = path.resolve(option('--out', path.join('.vibe-ui', 'evidence', new Date().toISOString().slice(0, 10))));
const waitMs = Number(option('--wait', '800'));
const url = /^[a-z]+:\/\//i.test(target) ? target : pathToFileURL(path.resolve(target)).href;

async function loadPlaywright() {
  const require = createRequire(path.join(process.cwd(), 'noop.js'));
  for (const name of ['playwright', '@playwright/test', 'playwright-core']) {
    try {
      const resolved = require.resolve(name);
      const mod = await import(pathToFileURL(resolved).href);
      return mod.chromium ? mod : mod.default;
    } catch {
      // try the next package name
    }
  }
  return null;
}

const playwright = await loadPlaywright();
if (!playwright?.chromium) {
  console.error('Playwright was not found from this project. Install it (npm i -D playwright) or run from a folder that has it. Then run this script again.');
  process.exit(2);
}

fs.mkdirSync(outDir, { recursive: true });
const browser = await playwright.chromium.launch();
const results = [];

for (const device of MATRIX.filter((d) => !only || only.includes(d.group))) {
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    deviceScaleFactor: device.scale,
    hasTouch: Boolean(device.touch),
    isMobile: device.group === 'mobile',
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 200)); });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(waitMs);

  const signals = await page.evaluate(({ touch }) => {
    const vw = document.documentElement.clientWidth;
    const visible = (el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0;
    };
    const label = (el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}` : ''}`;
    const all = [...document.querySelectorAll('body *')].filter(visible);
    const overflowing = all.filter((el) => el.getBoundingClientRect().right > vw + 1).slice(0, 10).map(label);
    const textNodes = all.filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
    const tinyText = textNodes.filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12).slice(0, 10).map(label);
    const heavyText = textNodes.filter((el) => Number(getComputedStyle(el).fontWeight) >= 700).length;
    const largestText = Math.max(0, ...textNodes.map((el) => parseFloat(getComputedStyle(el).fontSize)));
    const interactive = all.filter((el) => el.matches('a[href], button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    const smallTargets = touch
      ? interactive.filter((el) => { const r = el.getBoundingClientRect(); return r.width < 44 || r.height < 44; }).slice(0, 10).map(label)
      : [];
    return {
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: vw,
      horizontalScroll: document.documentElement.scrollWidth > vw + 1,
      overflowing,
      tinyText,
      heavyTextElements: heavyText,
      largestTextPx: largestText,
      smallTouchTargets: smallTargets,
      pageHeight: document.documentElement.scrollHeight,
    };
  }, { touch: Boolean(device.touch) });

  const file = path.join(outDir, `${device.group}-${device.width}x${device.height}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await context.close();

  const flags = [];
  if (device.group === 'mobile' && signals.viewportWidth > device.width + 1) {
    flags.push(`HARD FAIL: page lays out at ${signals.viewportWidth}px on a ${device.width}px phone (missing or wrong viewport meta tag)`);
  } else if (signals.horizontalScroll || signals.scrollWidth > device.width + 1) {
    flags.push('HARD FAIL: horizontal scroll');
  }
  if (signals.tinyText.length) flags.push('text under 12px');
  if (signals.smallTouchTargets.length) flags.push('touch targets under 44px');
  if (signals.heavyTextElements) flags.push(`${signals.heavyTextElements} elements at weight 700+`);
  if (signals.largestTextPx > 36) flags.push(`largest text ${signals.largestTextPx}px`);
  if (consoleErrors.length) flags.push(`${consoleErrors.length} console errors`);
  results.push({ ...device, screenshot: path.relative(process.cwd(), file), flags, signals, consoleErrors: consoleErrors.slice(0, 5) });
}

await browser.close();
console.log(JSON.stringify({
  url,
  evidence: path.relative(process.cwd(), outDir),
  disclaimer: 'Automatic signals are candidates. Open every screenshot and judge it yourself before reporting.',
  results,
}, null, 2));
process.exitCode = results.some((r) => r.flags.some((f) => f.startsWith('HARD FAIL'))) ? 3 : 0;

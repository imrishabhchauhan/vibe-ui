#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const rootArg = args.find((arg) => !arg.startsWith('--'));
const root = path.resolve(rootArg || process.cwd());
const changedOnly = args.includes('--changed');
const ignored = new Set(['.git', '.next', 'node_modules', 'dist', 'build', 'coverage', '.turbo']);
const extensions = new Set(['.css', '.scss', '.sass', '.less', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte']);
const maxFindings = 200;

const checks = [
  { id: 'transition-all', re: /transition(?:-property)?\s*:\s*all\b|\btransition-all\b/g, note: 'Candidate broad transition; verify and list exact properties.' },
  { id: 'outline-none', re: /outline\s*:\s*(?:none|0)\b|\b(?:focus:)?outline-none\b/g, note: 'Candidate missing focus indicator; verify a visible replacement exists.' },
  { id: 'clickable-div', re: /<(?:div|span)[^>]*\bonClick\s*=/g, note: 'Candidate non-native control; inspect role and keyboard behaviour.' },
  { id: 'positive-tabindex', re: /tabIndex\s*=\s*[{"']?[1-9]/g, note: 'Positive tabindex can break natural focus order.' },
  { id: 'blocked-zoom', re: /(?:user-scalable\s*=\s*no|maximum-scale\s*=\s*1)/gi, note: 'Viewport may block zoom.' },
  { id: 'fixed-text-height', re: /\b(?:h|height)-\[(?:[1-9]\d*)px\]|height\s*:\s*(?:[1-9]\d*)px/g, note: 'Fixed height candidate; verify text, errors, zoom, and localisation do not clip.' },
  { id: 'tiny-text', re: /\btext-\[(?:[1-9]|1[01])px\]\b|font-size\s*:\s*(?:[1-9]|1[01])px/g, note: 'Tiny text candidate; verify role, contrast, and readability.' },
  { id: 'hardcoded-colour', re: /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|hsl|oklch)\(/g, note: 'Raw colour candidate; verify it belongs in the project token system.' },
  { id: 'tailwind-palette-colour', re: /\b(?:bg|text|border|ring|outline|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|[1-9]00|950)\b/g, note: 'Tailwind palette candidate; prefer a semantic token unless colour itself is content or the exception is documented.' },
  { id: 'raw-img', re: /<img\b/g, note: 'Raw image candidate; verify optimisation, dimensions, loading, and framework image conventions.' },
  { id: 'forced-mount', re: /\b(?:forceMount|keepMounted)\b/g, note: 'Forced-mount candidate; verify hidden panels do not eagerly run heavy rendering, requests, observers, or subscriptions.' },
  { id: 'near-black-fill', re: /\bbg-(?:black|(?:gray|zinc|neutral|slate|stone)-(?:900|950))\b|background(?:-color)?\s*:\s*#(?:000|000000|0a0a0a|111|111111|171717|18181b|1a1a1a)\b/gi, note: 'Near-black fill candidate; on a light product UI do not use it for primary buttons. Use the brand accent.' },
  { id: 'oversized-text', re: /\btext-(?:5xl|6xl|7xl|8xl|9xl)\b|\btext-\[(?:3[3-9]|[4-9]\d)px\]|font-size\s*:\s*(?:3[3-9]|[4-9]\d)px/g, note: 'Oversized text candidate; dashboards rarely need text above 32px (page title 20 to 24px, KPI 22 to 28px).' },
  { id: 'heavy-weight', re: /\bfont-(?:bold|extrabold|black)\b|font-weight\s*:\s*(?:[7-9]00|bold|bolder)\b/g, note: 'Heavy weight candidate; product UI rarely needs more than 500 for titles and 600 for KPI values.' },
  { id: 'heavy-backdrop', re: /\bbackdrop-blur-(?:md|lg|xl|2xl|3xl)\b|backdrop-filter\s*:\s*blur\(\s*(?:[5-9]|\d{2,})px|\bbg-black\/(?:[6-9]\d|100)\b/g, note: 'Heavy backdrop candidate; dialogs should keep context visible (light dim, no blur or 2 to 4px).' },
  { id: 'dark-by-default', re: /<html[^>]*class(?:Name)?=["'{][^"'}]*\bdark\b|defaultTheme\s*=\s*["']dark["']|forcedTheme\s*=\s*["']dark["']/g, note: 'Dark-by-default candidate; confirm the owner wants dark as the default look.' },
  { id: 'physical-direction', re: /\b(?:margin|padding|border)-(?:left|right)\b|\b(?:ml|mr|pl|pr)-/g, note: 'Physical direction candidate; verify RTL/localisation requirements.' },
];

const fileChecks = [
  { id: 'effect-fetch', re: /\buseEffect\s*\([\s\S]{0,1200}?\bfetch\s*\(/g, note: 'Effect-based fetch candidate; inspect dependencies, duplicate requests, cancellation, caching, and stale responses.' },
  { id: 'nested-interactive', re: /<(button|a)\b[^>]*>(?:(?!<\/\1>)[\s\S]){0,1200}?<(?:button|a)\b/g, note: 'Nested interactive candidate; inspect rendered DOM, primitive composition, focus targets, and hydration output.' },
];

function walk(dir, output = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && ignored.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignored.has(entry.name)) walk(absolute, output);
    } else if (extensions.has(path.extname(entry.name))) {
      output.push(absolute);
    }
  }
  return output;
}

function changedFiles() {
  const commands = [
    ['diff', '--name-only', '--diff-filter=ACMR', 'HEAD'],
    ['ls-files', '--others', '--exclude-standard'],
  ];
  const relative = new Set();
  for (const command of commands) {
    const result = spawnSync('git', ['-C', root, ...command], { encoding: 'utf8' });
    if (result.status !== 0) {
      throw new Error(`Unable to inspect changed files: ${result.stderr.trim() || command.join(' ')}`);
    }
    for (const file of result.stdout.split(/\r?\n/).filter(Boolean)) relative.add(file);
  }
  return [...relative]
    .map((file) => path.resolve(root, file))
    .filter((file) => file.startsWith(`${root}${path.sep}`) && fs.existsSync(file) && extensions.has(path.extname(file)));
}

function addFinding(findings, check, file, line, excerpt) {
  findings.push({
    check: check.id,
    file: path.relative(root, file).replaceAll('\\', '/'),
    line,
    excerpt: excerpt.trim().replace(/\s+/g, ' ').slice(0, 220),
    note: check.note,
  });
}

const findings = [];
const files = changedOnly ? changedFiles() : walk(root);
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    for (const check of checks) {
      check.re.lastIndex = 0;
      if (check.re.test(lines[index])) {
        addFinding(findings, check, file, index + 1, lines[index]);
        if (findings.length >= maxFindings) break;
      }
    }
    if (findings.length >= maxFindings) break;
  }
  for (const check of fileChecks) {
    check.re.lastIndex = 0;
    for (const match of content.matchAll(check.re)) {
      const line = content.slice(0, match.index).split(/\r?\n/).length;
      addFinding(findings, check, file, line, match[0]);
      if (findings.length >= maxFindings) break;
    }
    if (findings.length >= maxFindings) break;
  }
  if (findings.length >= maxFindings) break;
}

console.log(JSON.stringify({
  root,
  scope: changedOnly ? 'changed-files' : 'all-supported-files',
  disclaimer: 'Heuristic candidates only. Confirm in source and rendered UI before reporting or editing.',
  capped: findings.length >= maxFindings,
  findings,
}, null, 2));


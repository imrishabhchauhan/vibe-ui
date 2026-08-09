#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());
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
  { id: 'physical-direction', re: /\b(?:margin|padding|border)-(?:left|right)\b|\b(?:ml|mr|pl|pr)-/g, note: 'Physical direction candidate; verify RTL/localisation requirements.' },
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

const findings = [];
for (const file of walk(root)) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    for (const check of checks) {
      check.re.lastIndex = 0;
      if (check.re.test(lines[index])) {
        findings.push({
          check: check.id,
          file: path.relative(root, file).replaceAll('\\', '/'),
          line: index + 1,
          excerpt: lines[index].trim().slice(0, 220),
          note: check.note,
        });
        if (findings.length >= maxFindings) break;
      }
    }
    if (findings.length >= maxFindings) break;
  }
  if (findings.length >= maxFindings) break;
}

console.log(JSON.stringify({
  root,
  disclaimer: 'Heuristic candidates only. Confirm in source and rendered UI before reporting or editing.',
  capped: findings.length >= maxFindings,
  findings,
}, null, 2));


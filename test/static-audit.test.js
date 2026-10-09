'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repo = path.join(__dirname, '..');
const auditor = path.join(repo, 'skills', 'vibe-ui', 'scripts', 'audit-static.mjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-ui-static-audit-'));

function runGit(args) {
  const result = spawnSync('git', args, { cwd: temp, encoding: 'utf8' });
  assert.strictEqual(result.status, 0, result.stderr);
}

try {
  fs.writeFileSync(path.join(temp, 'fixture.tsx'), `
    import { useEffect } from 'react';
    export function Fixture() {
      useEffect(() => { fetch('/api/settings'); }, []);
      return <div className="bg-amber-50 text-rose-600 transition-all">
        <button className="bg-black text-white">Save</button>
        <h1 className="text-6xl">Overview</h1>
        <img src="/hero.png" />
        <button><a href="/settings">Settings</a></button>
        <Tabs.Panel keepMounted />
      </div>;
    }
  `, 'utf8');
  fs.writeFileSync(path.join(temp, 'semantic.tsx'), 'export const Safe = () => <div className="bg-surface text-foreground border-border" />;', 'utf8');

  const result = spawnSync(process.execPath, [auditor, temp], { encoding: 'utf8' });
  assert.strictEqual(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  const ids = new Set(report.findings.map((finding) => finding.check));

  for (const expected of ['tailwind-palette-colour', 'transition-all', 'raw-img', 'forced-mount', 'effect-fetch', 'nested-interactive', 'near-black-fill', 'oversized-text']) {
    assert.ok(ids.has(expected), `Expected ${expected} finding`);
  }
  assert.ok(!report.findings.some((finding) => finding.file === 'semantic.tsx' && finding.check === 'tailwind-palette-colour'));
  assert.strictEqual(report.scope, 'all-supported-files');

  runGit(['init']);
  runGit(['config', 'user.name', 'Vibe UI Test']);
  runGit(['config', 'user.email', 'test@example.com']);
  runGit(['add', '.']);
  runGit(['commit', '-m', 'fixture baseline']);
  fs.appendFileSync(path.join(temp, 'fixture.tsx'), '\nexport const Changed = () => <div className="border-blue-500" />;\n', 'utf8');

  const changedResult = spawnSync(process.execPath, [auditor, temp, '--changed'], { encoding: 'utf8' });
  assert.strictEqual(changedResult.status, 0, changedResult.stderr);
  const changedReport = JSON.parse(changedResult.stdout);
  assert.strictEqual(changedReport.scope, 'changed-files');
  assert.ok(changedReport.findings.some((finding) => finding.file === 'fixture.tsx' && finding.check === 'tailwind-palette-colour'));
  assert.ok(!changedReport.findings.some((finding) => finding.file === 'semantic.tsx'));

  console.log('Static audit heuristic tests passed.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}

#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const packageRoot = path.join(__dirname, '..');
const sourceSkill = path.join(packageRoot, 'skills', 'vibe-ui');
const projectRoot = process.cwd();
const memoryDir = path.join(projectRoot, '.vibe-ui');
const startMarker = '<!-- vibe-ui:start -->';
const endMarker = '<!-- vibe-ui:end -->';

const pointer = [
  '### Vibe UI',
  '',
  'For interface design, UI/UX audits, accessibility, responsive behaviour, visual polish,',
  'forms, onboarding, design systems, colour, typography, spacing, hierarchy, or motion,',
  'read and follow `.agents/skills/vibe-ui/SKILL.md`.',
  '',
  'Use the project\'s `.vibe-ui/` folder for engagement state and evidence; never write',
  'project findings into the installed skill directory.',
].join('\n');

function exists(target) {
  return fs.existsSync(target);
}

function targets() {
  const candidates = [
    { label: 'Agent Skills standard', dir: path.join(projectRoot, '.agents', 'skills', 'vibe-ui'), always: true },
    { label: 'Claude Code', dir: path.join(projectRoot, '.claude', 'skills', 'vibe-ui'), detect: ['.claude', 'CLAUDE.md'] },
    { label: 'Cursor', dir: path.join(projectRoot, '.cursor', 'skills', 'vibe-ui'), detect: ['.cursor'] },
    { label: 'Windsurf', dir: path.join(projectRoot, '.windsurf', 'skills', 'vibe-ui'), detect: ['.windsurf', '.windsurfrules'] },
    { label: 'Kiro', dir: path.join(projectRoot, '.kiro', 'skills', 'vibe-ui'), detect: ['.kiro'] },
    { label: 'GitHub/Copilot project skills', dir: path.join(projectRoot, '.github', 'skills', 'vibe-ui'), detect: ['.github'] },
  ];
  return candidates.filter((item) => item.always || item.detect.some((relative) => exists(path.join(projectRoot, relative))) || exists(item.dir));
}

function copySkill(destination) {
  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(sourceSkill, destination, { recursive: true, force: true });
}

function upsertPointer() {
  const file = path.join(projectRoot, 'AGENTS.md');
  const block = `${startMarker}\n${pointer}\n${endMarker}`;
  if (!exists(file)) {
    fs.writeFileSync(file, `${block}\n`, 'utf8');
    return 'created';
  }
  const current = fs.readFileSync(file, 'utf8');
  const next = current.includes(startMarker)
    ? current.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'm'), block)
    : `${current}${current.endsWith('\n') ? '\n' : '\n\n'}${block}\n`;
  fs.writeFileSync(file, next, 'utf8');
  return current.includes(startMarker) ? 'updated' : 'appended';
}

function removePointer() {
  const file = path.join(projectRoot, 'AGENTS.md');
  if (!exists(file)) return false;
  const current = fs.readFileSync(file, 'utf8');
  if (!current.includes(startMarker)) return false;
  const next = current.replace(new RegExp(`\\n?${startMarker}[\\s\\S]*?${endMarker}\\n?`, 'm'), '\n');
  if (next.trim()) fs.writeFileSync(file, next.replace(/^\n+/, ''), 'utf8');
  else fs.rmSync(file);
  return true;
}

function writeIfMissing(file, content) {
  if (exists(file)) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  return true;
}

function scaffoldMemory() {
  const today = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(path.join(memoryDir, 'evidence'), { recursive: true });
  fs.mkdirSync(path.join(memoryDir, 'reports'), { recursive: true });
  writeIfMissing(path.join(memoryDir, 'TASTE.md'), `# Taste ledger\n\nLast updated: ${today}\n\nOwner design feedback, written as numbered, testable rules. Read before every design task; update after every review. See the Vibe UI taste-memory module.\n\n## Active rules\n\n## Liked references (what exactly)\n\n## Rejected (and why)\n\n## Retired\n`);
  writeIfMissing(path.join(memoryDir, 'PROJECT.md'), `# Vibe UI Project Context\n\nLast verified: ${today}\n\n## Audience and jobs\n\n## Supported platforms and viewports\n\n## Design system and conventions\n\n## Research and analytics\n`);
  writeIfMissing(path.join(memoryDir, 'STATE.md'), '# Current Vibe UI Engagement\n\nMode: idle\nScope: none\n\n## Checklist\n\n## Evidence\n\n## Decisions\n');
}

function hasTransitions() {
  const roots = ['.agents', '.claude', '.cursor', '.windsurf', '.kiro', '.github'];
  return roots.some((root) => exists(path.join(projectRoot, root, 'skills', 'transitions-dev', 'SKILL.md')));
}

function installTransitions() {
  if (hasTransitions()) {
    console.log('i Transitions.dev skill already installed.');
    return true;
  }
  console.log('i Installing the free Transitions.dev agent skill (no Pro assets)...');
  const npxArgs = ['--yes', 'skills', 'add', 'Jakubantalik/transitions.dev', '--skill', 'transitions-dev', '--yes', '--copy'];
  const result = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec || 'C:\\Windows\\System32\\cmd.exe', ['/d', '/s', '/c', `npx ${npxArgs.join(' ')}`], { cwd: projectRoot, stdio: 'inherit' })
    : spawnSync('npx', npxArgs, { cwd: projectRoot, stdio: 'inherit' });
  if (result.status !== 0) {
    console.warn('! Vibe UI installed, but the optional Transitions.dev install failed.');
    if (result.error) console.warn(`  ${result.error.message}`);
    console.warn('  Retry: npx skills add Jakubantalik/transitions.dev --skill transitions-dev --yes --copy');
    return false;
  }
  return true;
}

function init(args) {
  if (!exists(path.join(sourceSkill, 'SKILL.md'))) throw new Error('Packaged skill bundle is missing.');
  console.log('Vibe UI — installing into this project\n');
  for (const target of targets()) {
    const wasInstalled = exists(path.join(target.dir, 'SKILL.md'));
    copySkill(target.dir);
    console.log(`✓ ${target.label}: ${path.relative(projectRoot, target.dir)} (${wasInstalled ? 'refreshed' : 'installed'})`);
  }
  console.log(`✓ AGENTS.md fallback pointer: ${upsertPointer()}`);
  scaffoldMemory();
  console.log('✓ Project context: .vibe-ui/');
  if (!args.includes('--skip-transitions')) installTransitions();
  else console.log('i Skipped optional Transitions.dev installation.');
  console.log('\nDone. Ask your agent: "Use Vibe UI to audit and improve this interface."');
}

function update(args) {
  const installed = targets().filter((target) => exists(path.join(target.dir, 'SKILL.md')));
  if (!installed.length) {
    console.error('Vibe UI is not installed in this project. Run `vibe-ui init`.');
    process.exitCode = 1;
    return;
  }
  for (const target of installed) {
    copySkill(target.dir);
    console.log(`✓ Refreshed ${path.relative(projectRoot, target.dir)}`);
  }
  upsertPointer();
  console.log('i .vibe-ui/ project context was not changed.');
  if (!args.includes('--skip-transitions') && !hasTransitions()) installTransitions();
}

function status() {
  console.log('Vibe UI — project status\n');
  for (const target of targets()) {
    console.log(`${exists(path.join(target.dir, 'SKILL.md')) ? '✓' : '✗'} ${target.label}: ${path.relative(projectRoot, target.dir)}`);
  }
  console.log(`${exists(memoryDir) ? '✓' : '✗'} Project context: .vibe-ui/`);
  console.log(`${hasTransitions() ? '✓' : 'i'} Free Transitions.dev companion: ${hasTransitions() ? 'installed' : 'not detected'}`);
}

function remove(args) {
  for (const target of targets()) {
    if (!exists(target.dir)) continue;
    fs.rmSync(target.dir, { recursive: true, force: true });
    console.log(`✓ Removed ${path.relative(projectRoot, target.dir)}`);
  }
  if (removePointer()) console.log('✓ Removed Vibe UI block from AGENTS.md');
  if (args.includes('--purge-memory') && exists(memoryDir)) {
    fs.rmSync(memoryDir, { recursive: true, force: true });
    console.log('✓ Removed .vibe-ui/ project context');
  } else if (exists(memoryDir)) {
    console.log('i Kept .vibe-ui/ project context. Use --purge-memory to remove it.');
  }
  console.log('i The Transitions.dev skill was kept because other workflows may use it.');
}

function help() {
  console.log(`Vibe UI CLI

Usage:
  vibe-ui init [--skip-transitions]
  vibe-ui status
  vibe-ui update [--skip-transitions]
  vibe-ui remove [--purge-memory]

The default init also installs the free Transitions.dev agent skill using its
official skills CLI command. It never installs transitions-pro or Pro assets.`);
}

const [, , command, ...args] = process.argv;

try {
  if (command === 'init') init(args);
  else if (command === 'status') status();
  else if (command === 'update') update(args);
  else if (command === 'remove' || command === 'uninstall') remove(args);
  else if (!command || ['help', '--help', '-h'].includes(command)) help();
  else {
    console.error(`Unknown command: ${command}\n`);
    help();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Vibe UI failed: ${error.message}`);
  process.exitCode = 1;
}

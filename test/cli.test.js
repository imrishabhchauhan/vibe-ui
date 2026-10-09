'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const repo = path.join(__dirname, '..');
const cli = path.join(repo, 'bin', 'cli.js');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vibe-ui-test-'));

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd: temp, encoding: 'utf8' });
  assert.strictEqual(result.status, 0, `${args.join(' ')} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

try {
  fs.writeFileSync(path.join(temp, 'AGENTS.md'), '# Existing project rules\n', 'utf8');
  fs.mkdirSync(path.join(temp, '.cursor'), { recursive: true });

  run(['init', '--skip-transitions']);
  assert.ok(fs.existsSync(path.join(temp, '.agents', 'skills', 'vibe-ui', 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(temp, '.cursor', 'skills', 'vibe-ui', 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(temp, '.vibe-ui', 'PROJECT.md')));
  assert.ok(fs.existsSync(path.join(temp, '.vibe-ui', 'TASTE.md')));
  assert.match(fs.readFileSync(path.join(temp, 'AGENTS.md'), 'utf8'), /Existing project rules/);
  assert.strictEqual((fs.readFileSync(path.join(temp, 'AGENTS.md'), 'utf8').match(/<!-- vibe-ui:start -->/g) || []).length, 1);

  run(['init', '--skip-transitions']);
  assert.strictEqual((fs.readFileSync(path.join(temp, 'AGENTS.md'), 'utf8').match(/<!-- vibe-ui:start -->/g) || []).length, 1);
  assert.match(run(['status']), /Agent Skills standard/);
  run(['update', '--skip-transitions']);

  run(['remove']);
  assert.ok(!fs.existsSync(path.join(temp, '.agents', 'skills', 'vibe-ui')));
  assert.ok(fs.existsSync(path.join(temp, '.vibe-ui')));
  assert.match(fs.readFileSync(path.join(temp, 'AGENTS.md'), 'utf8'), /Existing project rules/);

  run(['init', '--skip-transitions']);
  run(['remove', '--purge-memory']);
  assert.ok(!fs.existsSync(path.join(temp, '.vibe-ui')));

  console.log('CLI lifecycle tests passed.');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}


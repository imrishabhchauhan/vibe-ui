'use strict';

const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const skillRoot = path.join(__dirname, '..', 'skills', 'vibe-ui');
const skillFile = path.join(skillRoot, 'SKILL.md');
const content = fs.readFileSync(skillFile, 'utf8');

assert.match(content, /^---\r?\nname: vibe-ui\r?\ndescription:/);
assert.ok(!/\bTODO\b/.test(content), 'SKILL.md contains TODO markers');
assert.ok(content.split(/\r?\n/).length < 500, 'SKILL.md must stay under 500 lines');

const references = [...content.matchAll(/\]\((references\/[^)]+\.md)\)/g)].map((match) => match[1]);
assert.ok(new Set(references).size >= 27, 'Expected all progressive-disclosure reference modules');
for (const relative of references) {
  assert.ok(fs.existsSync(path.join(skillRoot, relative)), `Missing reference: ${relative}`);
}

for (const required of ['agents/openai.yaml', 'scripts/detect-project.mjs', 'scripts/audit-static.mjs', 'scripts/check-colour.mjs']) {
  assert.ok(fs.existsSync(path.join(skillRoot, required)), `Missing required resource: ${required}`);
}

for (const requiredRule of [
  'code-only, visually unverified',
  'context-dependencies-and-performance.md',
  'cognitive-load-and-information-architecture.md',
  'connected-surfaces.md',
  'data-tables-and-controls.md',
  'component-libraries-and-mcp.md',
  'dashboards-and-kpis.md',
  'mobile-first',
  'dashboard-craft.md',
  'anti-patterns.md',
  'taste-memory.md',
  'scorecard.md',
  '.vibe-ui/TASTE.md',
  'check-colour.mjs',
  'fix-playbook.md',
  'onboarding-and-activation.md',
  'dialogs-and-overlays.md',
  'detail-pages-and-editing.md',
]) {
  assert.ok(content.includes(requiredRule), `Missing operating rule: ${requiredRule}`);
}

assert.ok(/\baudit\b[\s\S]*\bimprove\b/.test(content), 'SKILL.md must define the audit and improve modes');
assert.ok(!/-\s*`build`:|-\s*`validate`:/.test(content), 'SKILL.md must not reintroduce separate build/validate mode list entries');

console.log(`Skill package validation passed (${new Set(references).size} reference modules).`);

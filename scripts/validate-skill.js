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
assert.ok(new Set(references).size >= 14, 'Expected all progressive-disclosure reference modules');
for (const relative of references) {
  assert.ok(fs.existsSync(path.join(skillRoot, relative)), `Missing reference: ${relative}`);
}

for (const required of ['agents/openai.yaml', 'scripts/detect-project.mjs', 'scripts/audit-static.mjs']) {
  assert.ok(fs.existsSync(path.join(skillRoot, required)), `Missing required resource: ${required}`);
}

console.log(`Skill package validation passed (${new Set(references).size} reference modules).`);

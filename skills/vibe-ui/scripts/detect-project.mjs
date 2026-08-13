#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || process.cwd());

function exists(relative) {
  return fs.existsSync(path.join(root, relative));
}

function readJson(relative) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
  } catch {
    return null;
  }
}

const pkg = readJson('package.json') || {};
const dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const has = (name) => Object.prototype.hasOwnProperty.call(dependencies, name);

const componentsJson = readJson('components.json');

function registryNamespaces(config) {
  if (!config) return [];
  const namespaces = new Set();
  const registries = config.registries || {};
  for (const key of Object.keys(registries)) {
    if (key.startsWith('@')) namespaces.add(key);
  }
  // Older/simple configs sometimes reference a registry only through an alias URL or preset name.
  const raw = JSON.stringify(config);
  for (const match of raw.matchAll(/@([a-z0-9-]+)\/[a-z0-9-{}]+/gi)) {
    namespaces.add(`@${match[1]}`);
  }
  return [...namespaces];
}

const registries = registryNamespaces(componentsJson);
const knownRegistries = {
  reui: registries.includes('@reui') || Object.keys(dependencies).some((name) => name.includes('reui')),
};

const result = {
  root,
  packageManager: exists('pnpm-lock.yaml') ? 'pnpm' : exists('yarn.lock') ? 'yarn' : exists('bun.lockb') || exists('bun.lock') ? 'bun' : exists('package-lock.json') ? 'npm' : null,
  framework: has('next') ? 'next' : has('react') ? 'react' : has('vue') ? 'vue' : has('svelte') || has('@sveltejs/kit') ? 'svelte' : null,
  versions: {
    next: dependencies.next || null,
    react: dependencies.react || null,
    tailwindcss: dependencies.tailwindcss || null,
  },
  routing: exists('app') || exists('src/app') ? 'next-app-router-likely' : exists('pages') || exists('src/pages') ? 'pages-router-likely' : null,
  styling: {
    tailwind: has('tailwindcss') || exists('tailwind.config.js') || exists('tailwind.config.ts'),
    cssModules: false,
    styledComponents: has('styled-components'),
    emotion: has('@emotion/react'),
  },
  components: {
    shadcn: exists('components.json'),
    shadcnStyle: componentsJson?.style || null,
    shadcnAliases: componentsJson?.aliases || null,
    registries,
    reui: knownRegistries.reui,
    radix: Object.keys(dependencies).some((name) => name.startsWith('@radix-ui/')),
    baseUi: has('@base-ui-components/react'),
    motion: has('motion') || has('framer-motion'),
  },
  validation: {
    playwright: has('@playwright/test') || exists('playwright.config.ts') || exists('playwright.config.js'),
    storybook: Object.keys(dependencies).some((name) => name.startsWith('@storybook/')) || exists('.storybook'),
    axe: Object.keys(dependencies).some((name) => name.includes('axe')),
    vitest: has('vitest'),
    jest: has('jest'),
  },
  scripts: pkg.scripts || {},
  instructions: ['AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'CODING_STANDARDS.md'].filter(exists),
  skillCompanions: {
    transitionsDev: [
      '.agents/skills/transitions-dev/SKILL.md',
      '.claude/skills/transitions-dev/SKILL.md',
      '.cursor/skills/transitions-dev/SKILL.md',
    ].some(exists),
    vibePerformance: exists('.agents/skills/vibe-performance/SKILL.md'),
  },
};

console.log(JSON.stringify(result, null, 2));


#!/usr/bin/env node
/**
 * Gera lotes JSON para upload via GitHub API (push_files / gh api).
 * Uso: node scripts/github-push-batches.mjs [tamanho-do-lote]
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const batchSize = Number(process.argv[2]) || 25;
const root = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
const paths = execSync('git ls-files', { cwd: root, encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

const outDir = join(root, '.github-push-batches');
mkdirSync(outDir, { recursive: true });

const batches = [];
let current = [];

for (const path of paths) {
  const full = join(root, path);
  let content;
  try {
    content = readFileSync(full, 'utf8');
  } catch {
    content = readFileSync(full).toString('base64');
    console.warn(`skip binary (use git push): ${path}`);
    continue;
  }
  current.push({ path, content });
  if (current.length >= batchSize) {
    batches.push(current);
    current = [];
  }
}
if (current.length) batches.push(current);

batches.forEach((files, i) => {
  const file = join(outDir, `batch-${i + 1}.json`);
  writeFileSync(file, JSON.stringify({ files, message: `Add batch ${i + 1}/${batches.length}` }));
  console.log(file, files.length, 'files');
});

console.log(`\n${batches.length} batches, ${paths.length} tracked files`);

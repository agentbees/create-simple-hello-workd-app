import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);

test('default entry point links a favicon and mounts the app', async () => {
  const html = await readFile(new URL('index.html', root), 'utf8');
  assert.match(html, /<link[^>]+rel="icon"[^>]+href="\/favicon\.svg"/);
  assert.match(html, /<script type="module" src="\/src\/main\.js"><\/script>/);
});

test('app renders the Hello World heading', async () => {
  const source = await readFile(new URL('src/main.js', root), 'utf8');
  assert.match(source, /<h1[^>]*>Hello World<\/h1>/);
});

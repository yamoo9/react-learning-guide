import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_URL = resolve(__dirname, '../db', './posts.json');
const OPTIONS = { encoding: 'utf-8' };

export async function readStoredPosts() {
  const rawFileContent = await fs.readFile(DATA_URL, OPTIONS);
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

export async function writeStoredPosts(posts = []) {
  return await fs.writeFile(DATA_URL, JSON.stringify({ posts: posts }));
}

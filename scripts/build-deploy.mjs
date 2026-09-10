/**
 * 构建收尾：把 dist 产物落到仓库根。
 * GitHub Pages 从仓库根发布，而 Vite 产物是哈希命名的，所以每次构建都必须
 * 重新落地一次并清掉上一版哈希文件 —— 少做这步线上就一直是旧版本。
 */
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, cpSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

// Vite 按入口文件名输出，改回 index.html
const emitted = join(dist, 'index.source.html');
if (existsSync(emitted)) renameSync(emitted, join(dist, 'index.html'));
if (!existsSync(join(dist, 'index.html'))) {
  console.error('✗ dist/index.html 不存在，构建似乎没有成功');
  process.exit(1);
}

// 清掉仓库根上一版哈希产物，否则会一直堆积
const rootAssets = join(root, 'assets');
if (existsSync(rootAssets)) {
  for (const f of readdirSync(rootAssets)) {
    if (/^index-[\w-]+\.(js|css)$/.test(f)) rmSync(join(rootAssets, f));
  }
}

// dist/* → 仓库根
for (const name of readdirSync(dist)) {
  cpSync(join(dist, name), join(root, name), { recursive: true });
}

const { build } = JSON.parse(readFileSync(join(root, 'version.json'), 'utf8'));
console.log(`✓ 已落地到仓库根（版本 ${build}），可直接提交推送`);

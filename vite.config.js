import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// 构建入口是 index.source.html 而不是 index.html：仓库根的 index.html 永远是构建产物
// （GitHub Pages 从根目录发布），源码版 HTML 单独放一个文件，两者不会再互相覆盖。
const SOURCE_HTML = fileURLToPath(new URL('./index.source.html', import.meta.url));

/** 每次构建生成一个新版本号，注入 html 并写成 version.json，供前端检测更新 */
const BUILD_ID = Date.now().toString(36);

function buildVersionPlugin() {
  return {
    name: 'build-version',

    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace('<head>', `<head>\n    <script>window.__BUILD__=${JSON.stringify(BUILD_ID)}</script>`),
    },

    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ build: BUILD_ID }),
      });
    },

    // 开发服务器默认找 /index.html，这里改指向源码版
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query] = req.url.split('?');
        if (path === '/' || path === '/index.html') {
          req.url = '/index.source.html' + (query ? '?' + query : '');
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [buildVersionPlugin()],
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG'], // 社团logo合集 中的大写扩展名图片
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: SOURCE_HTML,
      // 不写死的话 chunk 名会跟着入口叫 index.source-*.js
      output: { entryFileNames: 'assets/index-[hash].js' },
    },
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import { glob } from 'glob';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';

function prettierBuild() {
  return {
    name: 'prettier-build',
    hooks: {
      'astro:build:done': async () => {
        console.log('Formatting HTML files with Prettier...');

        try {
          const distPath = path.resolve('./dist');
          const htmlFiles = await glob('**/*.html', { cwd: distPath });

          for (const file of htmlFiles) {
            const filePath = path.join(distPath, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const formatted = await prettier.format(content, {
              parser: 'html',
            });
            fs.writeFileSync(filePath, formatted);
          }

          console.log(`✓ Formatted ${htmlFiles.length} HTML file(s) successfully!`);
        } catch (error) {
          console.error('Error formatting files:', error);
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  compressHTML: false,
  integrations: [prettierBuild()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      emptyOutDir: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          entryFileNames: 'astro/[name].js',
          chunkFileNames: 'astro/[name].js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names?.[0] || '';
            if (fileName.endsWith('.css')) {
              return 'css/style.css';
            }
            if (fileName.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) {
              return 'images/[name].[ext]';
            }
            if (fileName.match(/\.(woff|woff2|ttf|eot)$/)) {
              return 'fonts/[name].[ext]';
            }
            return '[name].[ext]';
          },
        },
      },
    },
  },
});

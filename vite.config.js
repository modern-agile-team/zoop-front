import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, existsSync } from 'node:fs';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';

const ReactCompilerConfig = {
  logger: {
    logEvent: (filename, event) => {
      if (['CompileError', 'PipelineError'].includes(event.kind)) {
        if (event.detail?.severity !== 'Todo') {
          console.log(`[${filename}]\n ${JSON.stringify(event, null, 2)}`);
        }
      }
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const appPort = 3000;
  const isServe = command === 'serve';

  let httpsOption = false;
  if (isServe) {
    const candidates = [
      { key: './.ssl/private.key', cert: './.ssl/public.key' },
      { key: './.ssl/private.pem', cert: './.ssl/public.pem' },
    ];
    const pair = candidates.find(
      ({ key, cert }) => existsSync(key) && existsSync(cert)
    );
    if (pair) {
      httpsOption = {
        key: readFileSync(pair.key),
        cert: readFileSync(pair.cert),
      };
    } else {
      httpsOption = true;
    }
  }

  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),
      tailwindcss(),
    ],
    // 환경 변수 설정
    envPrefix: 'VITE_',
    envDir: './',
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@tanstack/react-query'],
      exclude: [],
      force: true,
    },
    server: isServe
      ? {
          port: appPort,
          host: 'local.zoop.co.kr',
          https: httpsOption,
        }
      : undefined,
    preview: {
      port: appPort,
    },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      rollupOptions: {
        external: ['styled-components'],
        output: {
          chunkFileNames: 'static/[name]-[hash].js',
          entryFileNames: 'static/[name]-[hash].js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendors';
            }
          },
        },
      },
    },
  };
});

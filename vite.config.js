import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';

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
  const root = resolve('.');
  const defaultKey = resolve(root, '.ssl/localhost.key');
  const defaultCert = resolve(root, '.ssl/localhost.crt');
  const keyPath = process.env.VITE_SSL_KEY_PATH || defaultKey;
  const certPath = process.env.VITE_SSL_CERT_PATH || defaultCert;

  const isServe = command === 'serve';
  let httpsOption = isServe ? true : false;
  if (isServe && existsSync(keyPath) && existsSync(certPath)) {
    httpsOption = {
      key: readFileSync(keyPath),
      cert: readFileSync(certPath),
    };
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
    server: {
      port: appPort,
      https: httpsOption,
    },
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
              if (id.includes('@remember-web')) {
                return 'vendor-remember-web';
              }
              return 'vendors';
            }
          },
        },
      },
    },
  };
});

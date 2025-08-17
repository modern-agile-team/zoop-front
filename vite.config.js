import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tailwindcss(),
  ],
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
});

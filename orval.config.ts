import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: 'src/lib/orval/api/spec.json',
      converterOptions: true,
    },
    output: {
      target: 'src/lib/orval/api/_generated',
      mode: 'split',
      override: {
        mutator: {
          path: 'src/shared/service/api/client/index.ts',
          name: 'orvalInstance',
        },
        enumGenerationType: 'union',
      },
    },
  },
  socket: {
    input: {
      target: 'src/lib/orval/socket/spec.json',
      converterOptions: true,
    },
    output: {
      target: 'src/lib/orval/socket/_generated',
      mode: 'split',
      override: {
        mutator: {
          path: 'src/shared/service/socket/client/index.ts',
          name: 'orvalInstance',
        },
        enumGenerationType: 'union',
      },
    },
  },
});

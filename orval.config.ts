import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: 'src/api/spec/index.json',
      converterOptions: true,
    },
    output: {
      target: 'src/api/_generated',
      mode: 'split',
      override: {
        mutator: {
          path: 'src/api/httpClient/index.ts',
          name: 'orvalInstance',
        },
        enumGenerationType: 'union',
      },
    },
  },
});

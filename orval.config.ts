import { defineConfig } from 'orval';

export default defineConfig({
  backend: {
    input: {
      target: 'src/lib/orval/spec.json',
      converterOptions: true,
      filters: {
        mode: 'exclude',
        tags: ['quiz', 'quiz-image'],
      },
    },
    output: {
      target: 'src/lib/orval/_generated',
      mode: 'split',
      override: {
        mutator: {
          path: 'src/shared/service/api/client/index.ts',
          name: 'orvalInstance',
        },
        enumGenerationType: 'const',
      },
    },
  },
});

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'vite.config.ts',
      '**/_generated/**',
      '**/.pnp.cjs',
      '**/.pnp.loader.mjs',
    ],
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['tsconfig.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'react-compiler': reactCompiler,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'import/prefer-default-export': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal'],
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '../**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: './**',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: './*.constant',
              group: 'sibling',
            },
            {
              pattern: './*.styles',
              group: 'sibling',
              position: 'after',
            },
            {
              pattern: './*.css',
              group: 'index',
              position: 'after',
            },
            {
              pattern: 'assets/**',
              group: 'index',
              position: 'after',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['draft'] },
      ],
    },
  }
);

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import responsiveStylesNaming from './eslint-rules/responsive-styles-naming.mjs';

// Import order configuration
const importOrder = ({ ruleSeverities = 'error' } = {}) => [
  ruleSeverities,
  {
    groups: [
      // 그룹간 require/import 순서
      ['builtin', 'external'],
      ['internal'],
      ['parent', 'sibling', 'index'],
    ],
    pathGroups: [
      {
        pattern: '@/**',
        // @로 시작하는 alias 경로 처리
        group: 'internal',
        position: 'after',
      },
      {
        pattern: '@',
        group: 'external',
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
        pattern: './*.scss',
        group: 'index',
        position: 'after',
      },
      {
        pattern: 'assets/**',
        group: 'index',
        position: 'after',
      },
    ],
    alphabetize: {
      order: 'asc',
      // 그룹 내에 알파벳 순 정렬
      caseInsensitive: true,
      // 대소문자 구분없음
    },
    'newlines-between': 'always',
    // 그룹 간에 개행 강제
  },
];

// Common naming convention rules
const commonBaseRules = [
  {
    selector: 'default',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'import',
    format: ['camelCase', 'PascalCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'enumMember',
    format: ['UPPER_CASE'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'method',
    format: ['camelCase', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'typeLike',
    format: ['PascalCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'variable',
    format: ['camelCase', 'UPPER_CASE', 'PascalCase', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'parameter',
    format: ['camelCase', 'PascalCase', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'classProperty',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'classProperty',
    modifiers: ['private'],
    format: ['camelCase', 'UPPER_CASE'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'objectLiteralProperty',
    format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'typeProperty',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'function',
    format: ['camelCase', 'PascalCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: [
      'classProperty',
      'objectLiteralProperty',
      'typeProperty',
      'classMethod',
      'objectLiteralMethod',
      'typeMethod',
      'accessor',
      'enumMember',
    ],
    format: null,
    modifiers: ['requiresQuotes'],
  },
];

export default tseslint.config(
  {
    ignores: [
      // Build outputs
      'dist',
      'build',
      '.next',

      // Dependencies
      'node_modules',
      '.yarn',
      '.pnp.cjs',
      '.pnp.loader.mjs',

      // Configuration files
      'vite.config.ts',
      '*.config.js',
      '*.config.ts',

      // Generated files
      '**/_generated/**',
      '**/generated/**',
      'routeTree.gen.ts',
      '**/*.gen.ts',
      '**/*.gen.js',

      // Cache and temp files
      '.cache',
      'tmp',
      'temp',
      '.tmp',

      // IDE and editor files
      '.vscode',
      '.idea',
      '*.swp',
      '*.swo',
      '*~',

      // OS files
      '.DS_Store',
      'Thumbs.db',

      // Logs
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // Package manager files
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',

      // Coverage and testing
      'coverage',
      '.nyc_output',

      // Misc
      '.env.local',
      '.env.*.local',
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
      'unused-imports': unusedImports,
      custom: {
        rules: {
          'responsive-styles-naming': responsiveStylesNaming,
        },
      },
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
      '@typescript-eslint/no-unused-vars': 'off', // unused-imports가 대신 처리
      '@typescript-eslint/naming-convention': ['error', ...commonBaseRules],

      // 커스텀 룰: getResponsiveClasses 결과 변수는 Styles로 끝나야 함
      'custom/responsive-styles-naming': 'error',

      // Import 관련 규칙들
      /**
       * require() / import 문의 순서에 대한 규칙을 강제합니다
       * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
       */
      'import/order': importOrder(),

      /**
       * 파일을 내보낼 때, default export가 있는지 확인하는 규칙입니다
       * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
       */
      'import/prefer-default-export': 'off',

      /**
       * 이름이 지정된 default export를 금지합니다
       * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md
       */
      'import/no-named-as-default': 'off',

      /**
       * 이름이 지정된 default export의 멤버 접근을 금지합니다
       * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md
       */
      'import/no-named-as-default-member': 'off',

      /**
       * 사용하지 않는 import를 금지합니다
       * @see https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-imports.md
       */
      'unused-imports/no-unused-imports': 'error',

      /**
       * 사용하지 않는 변수를 금지합니다 (unused-imports가 처리)
       * @see https://github.com/sweepline/eslint-plugin-unused-imports/blob/master/docs/rules/no-unused-vars.md
       */
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * import로 로드할 때 지정된 모듈을 금지합니다
       * @see https://eslint.org/docs/latest/rules/no-restricted-imports
       */
      'no-restricted-imports': [
        'error',
        {
          name: 'lodash',
          message:
            'lodash는 CommonJS로 작성되어 있어 트리쉐이킹이 되지 않아 번들 사이즈를 크게 합니다. lodash/* 형식으로 import 해주세요.',
        },
      ],

      // 기타 규칙들
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': [
        'error',
        { props: true, ignorePropertyModificationsFor: ['draft'] },
      ],
    },
    settings: {
      'import/external-module-folders': ['.yarn'],
    },
  }
);

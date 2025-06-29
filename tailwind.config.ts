import { type Config } from 'tailwindcss';

const spacingValues = [
  0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 44, 48, 52, 56, 64, 72, 80,
];

const config: Config = {
  content: ['./src/**/*'],
  theme: {
    extend: {
      spacing: () => {
        const spacing: Record<number, string> = {};
        spacingValues.forEach((value) => {
          spacing[value] = `${value}px`;
        });
        return spacing;
      },
      colors: {
        myOwnColor: 'black',
        primary: {
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        secondary: {
          100: '#FFF7ED',
          200: '#FFEDD5',
          300: '#FED7AA',
          400: '#FDBA74',
          500: '#FB923C',
          600: '#F97316',
          700: '#EA580C',
          800: '#C2410C',
          900: '#9A3412',
        },
        contents: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        bg: {
          100: '#FFFDF9',
          200: '#FDF9F3',
          300: '#F8F6F2',
          400: '#ECEAE5',
          500: '#DCD9D1',
          600: '#BAB7B0',
          700: '#9B9891',
          800: '#6F6D68',
          900: '#44423E',
        },
      },
      fontSize: {
        'title-1': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'title-2': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'title-3': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'title-4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        'title-5': ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],

        'body-1': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'body-2': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-3': ['0.9375rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        'body-4': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-5': ['0.8125rem', { lineHeight: '1.125rem', fontWeight: '400' }],

        'caption-1': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'caption-2': [
          '0.8125rem',
          { lineHeight: '1.125rem', fontWeight: '400' },
        ],
        'caption-3': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        'caption-4': [
          '0.6875rem',
          { lineHeight: '0.875rem', fontWeight: '400' },
        ],
        'caption-5': ['0.625rem', { lineHeight: '0.75rem', fontWeight: '400' }],
      },
      borderRadius: () => {
        const borderRadius: Record<number, string> = {};
        spacingValues.forEach((value) => {
          borderRadius[value] = `${value}px`;
        });
        return borderRadius;
      },
    },
  },
  plugins: [],
};

export default config;

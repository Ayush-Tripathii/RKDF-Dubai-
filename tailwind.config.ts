import type { Config } from 'tailwindcss';

// Every colour is a CSS custom property declared once in src/styles/tokens.css.
// No hex values in component files — use these token names.
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './content/**/*.ts'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      parchment: token('parchment'),
      white: token('white'),
      stone: token('stone'),
      primary: token('primary'),
      'primary-deep': token('primary-deep'),
      ink: token('ink'),
      'ink-55': token('ink-55'),
      accent: token('accent'),
      'accent-deep': token('accent-deep'),
      'accent-ink': token('accent-ink'),
      'accent-light': token('accent-light'),
      rule: token('rule'),
      focus: token('focus'),
      error: token('error'),
    },
    fontFamily: {
      serif: ['var(--font-serif)'],
      sans: ['var(--font-sans)'],
    },
    borderRadius: { none: '0', sm: '2px', DEFAULT: '2px', md: '4px', full: '9999px' },
    extend: {
      maxWidth: { content: '1320px', measure: '66ch' },
      transitionDuration: { 150: '150ms', 200: '200ms', 400: '400ms', 500: '500ms' },
    },
  },
  safelist: [{ pattern: /^bg-(parchment|white|stone|primary|primary-deep|ink|ink-55|accent|accent-deep|accent-ink|accent-light|rule|focus|error)$/ }],
  plugins: [],
} satisfies Config;

/** Documentation data for /styleguide. Values mirror src/styles/tokens.css. */

export const palette = [
  { name: 'Parchment', token: 'parchment', hex: '#FAF8F3', use: 'Default page background' },
  { name: 'White', token: 'white', hex: '#FFFFFF', use: 'Cards, tables, panels' },
  { name: 'Stone', token: 'stone', hex: '#F1EDE4', use: 'Alternating section bands' },
  { name: 'Primary', token: 'primary', hex: '#10263F', use: 'Headings, nav; navy fields only in footer, hero scrim, primary buttons' },
  { name: 'Primary Deep', token: 'primary-deep', hex: '#0A1B2E', use: 'Primary button hover' },
  { name: 'Ink', token: 'ink', hex: '#1C2B3A', use: 'Body text' },
  { name: 'Ink-55', token: 'ink-55', hex: '#5B6A79', use: 'Secondary text, captions, metadata' },
  { name: 'Accent', token: 'accent', hex: '#A8873D', use: 'Rules and ornament only — fails 4.5:1 as text' },
  { name: 'Accent Deep', token: 'accent-deep', hex: '#8A6D2B', use: 'Hover states, icons' },
  { name: 'Accent Ink', token: 'accent-ink', hex: '#7A5F22', use: 'Small gold text (eyebrows) on any light ground' },
  { name: 'Accent Light', token: 'accent-light', hex: '#C9AB66', use: 'Gold text on the navy footer only' },
  { name: 'Rule', token: 'rule', hex: '#E1DACB', use: '1px hairlines' },
  { name: 'Focus', token: 'focus', hex: '#1B6EF3', use: 'Keyboard focus ring only' },
  { name: 'Error', token: 'error', hex: '#A32E24', use: 'Form validation only' },
] as const;

export const contrast = [
  { pair: 'Ink on Parchment', ratio: '13.9:1', pass: true },
  { pair: 'Ink-55 on Parchment', ratio: '5.2:1', pass: true },
  { pair: 'Ink-55 on Stone', ratio: '4.7:1', pass: true },
  { pair: 'Accent on Parchment (text)', ratio: '3.9:1', pass: false, note: 'Not used for text. Rules and ornament only.' },
  { pair: 'Accent Deep on Parchment', ratio: '4.6:1', pass: true },
  { pair: 'Accent Deep on Stone', ratio: '4.2:1', pass: false, note: 'Why Accent Ink exists.' },
  { pair: 'Accent Ink on Stone', ratio: '5.2:1', pass: true },
  { pair: 'Accent Light on Primary (footer)', ratio: '6.8:1', pass: true },
  { pair: 'White on pure-white image under 50% navy scrim', ratio: '3.4:1', pass: false, note: 'Brief value. Page-header scrim raised to 64%.' },
  { pair: 'White on pure-white image under 64% navy scrim', ratio: '4.6:1', pass: true },
  { pair: 'White on pure-white image under 66% hero text-zone scrim', ratio: '4.9:1', pass: true },
];

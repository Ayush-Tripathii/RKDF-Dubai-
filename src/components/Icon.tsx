/** Thin line icons, 1.25px stroke, currentColor. Decorative unless given a label. */
const paths: Record<string, string> = {
  book: 'M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5c-.8 0-1.5.6-1.5 1.4V5.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5.6 1.5 1.4V5.5zM11 4c.6.5 1.4.5 2 0',
  door: 'M6 20V4.8c0-.4.3-.8.8-.8h10.4c.4 0 .8.4.8.8V20M4 20h16M14.5 12.5v.5',
  ledger: 'M6 3.5h12c.3 0 .5.2.5.5v16c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V4c0-.3.2-.5.5-.5zM9 8h6M9 11.5h6M9 15h3.5',
  laurel: 'M12 20c-3.5-2-6-5.4-6-9.5M12 20c3.5-2 6-5.4 6-9.5M7.2 14.5c-1.5 0-2.7-.6-3.2-1.6 1-.6 2.4-.6 3.6 0M6.2 10.8C5 10.2 4.3 9 4.4 7.8c1.1 0 2.3.7 2.8 1.8M16.8 14.5c1.5 0 2.7-.6 3.2-1.6-1-.6-2.4-.6-3.6 0M17.8 10.8c1.2-.6 1.9-1.8 1.8-3-1.1 0-2.3.7-2.8 1.8M12 4.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3z',
  pin: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11zM12 12.3a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z',
  mail: 'M3.5 6.5h17v11h-17zM3.5 6.5l8.5 6.5 8.5-6.5',
  search: 'M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.2 15.2L20 20',
  menu: 'M3.5 7h17M3.5 12h17M3.5 17h17',
  close: 'M5.5 5.5l13 13M18.5 5.5l-13 13',
  chevronDown: 'M6 9.5l6 6 6-6',
  chevronLeft: 'M14.5 6l-6 6 6 6',
  chevronRight: 'M9.5 6l6 6-6 6',
  arrowRight: 'M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  phone: 'M7.5 3.5h3l1.5 4-2 1.2a10 10 0 004.8 4.8l1.2-2 4 1.5v3c0 .8-.7 1.5-1.5 1.5C10.6 17.5 6 12.9 6 5c0-.8.7-1.5 1.5-1.5z',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  download: 'M12 4v11M7 10.5l5 5 5-5M5 19.5h14',
  external: 'M14 4.5h5.5V10M19.5 4.5L11 13M17.5 13.5v5c0 .6-.4 1-1 1h-11c-.6 0-1-.4-1-1v-11c0-.6.4-1 1-1h5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  calendar: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4',
};

const filled: Record<string, string> = {
  whatsapp: 'M12 2.5A9.5 9.5 0 003.8 16.8L2.5 21.5l4.8-1.3A9.5 9.5 0 1012 2.5zm0 17.3c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.8 7.8 0 1112 19.8zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 01-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2z',
  facebook: 'M13.4 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.7v3h2.6V21h3.1z',
  x: 'M17.5 3.5h2.9l-6.3 7.2 7.4 9.8h-5.8l-4.5-5.9-5.2 5.9H3.1l6.7-7.7L2.7 3.5h5.9l4.1 5.4 4.8-5.4zm-1 15.3h1.6L7.6 5.1H5.9l10.6 13.7z',
  instagram: 'M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm4.9-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.4-1.3 3.6-3.7 3.7-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.4-.1-3.6-1.3-3.7-3.7-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.4 1.3-3.6 3.7-3.7.9-.1 1.2-.1 3.6-.1zM12 3c-2.4 0-2.8 0-3.7.1-3.3.2-5 1.9-5.2 5.2C3 9.2 3 9.6 3 12s0 2.8.1 3.7c.2 3.3 1.9 5 5.2 5.2.9.1 1.3.1 3.7.1s2.8 0 3.7-.1c3.3-.2 5-1.9 5.2-5.2.1-.9.1-1.3.1-3.7s0-2.8-.1-3.7c-.2-3.3-1.9-5-5.2-5.2C14.8 3 14.4 3 12 3z',
  linkedin: 'M6.9 8.9H3.8V20h3.1V8.9zM5.3 4a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM20.2 13.6c0-3-1.6-4.9-4.3-4.9-1.5 0-2.4.8-2.8 1.5V8.9h-3V20h3.1v-5.8c0-1.5.5-2.7 2-2.7s1.8 1.3 1.8 2.8V20h3.2v-6.4z',
  youtube: 'M21.1 7.6a2.5 2.5 0 00-1.8-1.8C17.8 5.4 12 5.4 12 5.4s-5.8 0-7.3.4a2.5 2.5 0 00-1.8 1.8C2.5 9.1 2.5 12 2.5 12s0 2.9.4 4.4c.2.9.9 1.5 1.8 1.8 1.5.4 7.3.4 7.3.4s5.8 0 7.3-.4a2.5 2.5 0 001.8-1.8c.4-1.5.4-4.4.4-4.4s0-2.9-.4-4.4zM10.1 14.8V9.2l4.8 2.8-4.8 2.8z',
};

export type IconName = keyof typeof paths | keyof typeof filled;

export function Icon({ name, size = 20, label, className = '' }: { name: IconName | string; size?: number; label?: string; className?: string }) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  if (filled[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} focusable="false" {...a11y}>
        <path d={filled[name]} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" className={className} focusable="false" {...a11y}>
      <path d={paths[name] ?? ''} />
    </svg>
  );
}

/** Small line-drawn seal motif used on accreditation cards. Ornament only. */
export function SealMotif({ className = '' }: { className?: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth={1} className={className} aria-hidden="true" focusable="false">
      <circle cx="22" cy="22" r="20.5" />
      <circle cx="22" cy="22" r="16.5" strokeDasharray="1.5 2.2" />
      <circle cx="22" cy="22" r="12.5" />
      <path d="M22 14.5l2 4.2 4.6.6-3.3 3.2.8 4.5-4.1-2.2-4.1 2.2.8-4.5-3.3-3.2 4.6-.6z" />
    </svg>
  );
}

/**
 * LogoSlot — the crest position.
 *
 * No crest file has been supplied, so this renders the typographic lockup only:
 * "RKDF" in the display serif (600, 0.06em), a 1px gold rule, and
 * "UNIVERSITY DUBAI" in 11px uppercase (0.22em).
 *
 * TO INSTALL THE REAL CREST: place the supplied file at /public/brand/crest.svg
 * (unaltered — no recolouring, outlining or effects) and set CREST_SRC below.
 * The slot is a fixed 56×56 box (40px minimum display height respected),
 * so the header layout does not shift. Clear space equal to the crest height
 * is provided by the surrounding lockup padding. Only reverse to white on the
 * navy footer if the file is a solid single-colour mark (set CREST_REVERSIBLE).
 */
import { useT } from '@/lib/locale';

export const CREST_SRC: string | null = null; // e.g. '/brand/crest.svg'
export const CREST_REVERSIBLE = false;

export function LogoSlot({ size = 56, onDark = false }: { size?: number; onDark?: boolean }) {
  const t = useT();
  if (CREST_SRC && (!onDark || CREST_REVERSIBLE)) {
    return (
      <img
        src={CREST_SRC}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, ...(onDark ? { filter: 'brightness(0) invert(1)' } : {}) }}
      />
    );
  }
  return (
    <span
      className={`flex flex-col items-center justify-center ${onDark ? 'text-white' : 'text-primary'}`}
      style={{ minHeight: Math.max(size, 40) }}
      aria-hidden="true"
    >
      <span className="font-serif font-semibold leading-none" style={{ fontSize: size * 0.42, letterSpacing: '0.06em', fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {t.lockup.mark}
      </span>
      <span className={`my-[5px] block h-px w-full ${onDark ? 'bg-accent-light' : 'bg-accent'}`} />
      <span className="font-sans font-semibold uppercase leading-none" style={{ fontSize: Math.max(size * 0.13, 7), letterSpacing: '0.22em' }}>
        {t.lockup.sub}
      </span>
    </span>
  );
}

/** Header lockup: crest · 1px vertical gold rule · two-line text. */
export function HeaderLockup({ compact = false }: { compact?: boolean }) {
  const t = useT();
  return (
    <span className="flex items-center gap-4">
      <LogoSlot size={compact ? 44 : 56} />
      <span className="hidden h-10 w-px bg-accent sm:block" aria-hidden="true" />
      <span className="hidden flex-col sm:flex">
        <span className="font-serif text-[18px] leading-tight text-primary">{t.lockup.line1}</span>
        <span className="mt-1 text-[10px] uppercase leading-none tracking-[0.2em] text-ink-55">{t.lockup.line2}</span>
      </span>
    </span>
  );
}

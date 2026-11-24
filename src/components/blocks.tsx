/**
 * Content blocks: SectionMasthead, Section, StatRow, QuoteBlock, PortraitCard,
 * SchoolCard, ProgrammeCard, NewsCard, EventPanel, PartnerWall, StepSequence.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { L, useLocale, useT, formatDate, dateParts } from '@/lib/locale';
import { Picture, Portrait } from './ImageFrame';
import { Icon } from './Icon';
import { formatStat, type Stat } from '@content/stats';
import { programmeCount, type School } from '@content/schools';
import { formatAED, levelLabel, intakeLabel, type Programme } from '@content/programmes';
import type { NewsItem } from '@content/news';
import type { EventItem } from '@content/events';
import type { PortraitKey } from '@content/media';

/* ── Reveal helper: spreads the entrance-motion attributes. ── */
export const reveal = (i = 0) => ({ 'data-reveal': '', style: { '--i': i } as React.CSSProperties });

/* ── Section band ── (literal class names so Tailwind keeps them) */
const bandClass = { parchment: 'band-parchment', stone: 'band-stone', white: 'band-white' } as const;
export function Section({ band = 'parchment', id, children, className = '', labelledBy }: { band?: 'parchment' | 'stone' | 'white'; id?: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section ${bandClass[band]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/* ── SectionMasthead: eyebrow · H2 · 48px gold rule · optional standfirst. The spine of the site. ── */
export function SectionMasthead({ eyebrow, title, standfirst, id, align = 'center', as: H = 'h2' }: { eyebrow?: string; title: string; standfirst?: ReactNode; id?: string; align?: 'center' | 'start'; as?: 'h1' | 'h2' }) {
  const center = align === 'center';
  return (
    <header className={`mb-14 lg:mb-16 ${center ? 'mx-auto text-center' : ''}`} {...reveal()}>
      {eyebrow && <p className="t-eyebrow mb-4">{eyebrow}</p>}
      <H id={id} className="t-h2 text-primary">{title}</H>
      <span className={`gold-rule mt-6 ${center ? 'mx-auto' : ''}`} aria-hidden="true" />
      {standfirst && <div className={`t-body mt-6 text-ink-55 ${center ? 'mx-auto max-w-[60ch]' : 'max-w-[60ch]'}`}>{standfirst}</div>}
    </header>
  );
}

/* ── Count-up numeral. Server HTML holds the real value; animation runs once on view. ── */
function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(stat.value);
  useEffect(() => {
    if (!inView || reduce) return;
    const from = Math.round(stat.value * 0.6);
    setN(from);
    const c = animate(from, stat.value, { duration: 1.2, ease: 'easeOut', onUpdate: setN });
    return () => c.stop();
  }, [inView, reduce, stat.value]);
  return (
    <span ref={ref} className="t-num">
      <span aria-hidden="true">{formatStat(stat, n)}</span>
      <span className="sr-only">{formatStat(stat)}</span>
    </span>
  );
}

/* ── StatRow: serif numerals, 11px labels, 1px vertical Rule dividers. No boxes, no icons. ── */
export function StatRow({ stats, footnote, cols }: { stats: Stat[]; footnote?: string; cols?: number }) {
  const locale = useLocale();
  const n = cols ?? stats.length;
  const lgCols = n === 6 ? 'lg:grid-cols-6' : n === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <div>
      <dl className={`grid grid-cols-2 md:grid-cols-3 ${lgCols} border-y border-rule`}>
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col-reverse items-center justify-start border-rule px-4 py-8 text-center [&:not(:last-child)]:border-e max-md:[&:nth-child(2n)]:border-e-0 max-md:[&:nth-child(n+3)]:border-t md:max-lg:[&:nth-child(3n)]:border-e-0 md:max-lg:[&:nth-child(n+4)]:border-t" {...reveal(i)}>
            <dt className="t-label mt-3 flex min-h-[2.9em] max-w-[24ch] items-start justify-center">{locale === 'ar' ? s.labelAr : s.label}</dt>
            <dd className="whitespace-nowrap font-serif text-[2.25rem] leading-none text-primary lg:text-[3.5rem]" dir="ltr">
              <CountUp stat={s} />
            </dd>
          </div>
        ))}
      </dl>
      {footnote && <p className="t-small mt-5 text-center">{footnote}</p>}
    </div>
  );
}

/* ── QuoteBlock: centred serif italic, flanked by 48px gold rules. ── */
export function QuoteBlock({ quote, name, role, initials, portrait }: { quote: string; name: string; role?: string; initials?: string; portrait?: PortraitKey }) {
  return (
    <figure className="mx-auto max-w-[52rem] text-center" {...reveal()}>
      {(initials || portrait) && (
        <div className="mb-8 flex justify-center">
          <Portrait portrait={portrait} initials={initials} size={88} alt={portrait ? undefined : `Portrait of ${name} — photograph to follow`} />
        </div>
      )}
      <span className="gold-rule mx-auto" aria-hidden="true" />
      <blockquote className="t-quote my-8 text-primary">
        <p>“{quote}”</p>
      </blockquote>
      <span className="gold-rule mx-auto" aria-hidden="true" />
      <figcaption className="mt-6 text-[13px] text-ink-55">
        <span className="font-semibold text-ink">{name}</span>
        {role && <span> · {role}</span>}
      </figcaption>
    </figure>
  );
}

/* ── PortraitCard: leader / appointment card. ── */
export function PortraitCard({ name, role, detail, initials, to, portrait }: { name: string; role: string; detail?: string; initials: string; to?: string; portrait?: PortraitKey }) {
  const body = (
    <>
      <Portrait portrait={portrait} initials={initials} size={112} alt={`Portrait of ${name} — photograph to follow`} />
      <h3 className="t-h3 mt-6">{name}</h3>
      <p className="t-eyebrow mt-2">{role}</p>
      {detail && <p className="t-small mt-3">{detail}</p>}
    </>
  );
  return to ? (
    <L to={to} className="card card-link flex h-full flex-col items-center p-8 text-center">{body}</L>
  ) : (
    <div className="card flex h-full flex-col items-center p-8 text-center">{body}</div>
  );
}

/* ── SchoolCard ── */
export function SchoolCard({ school, index = 0 }: { school: School; index?: number }) {
  const t = useT();
  return (
    <article className="card card-link group relative flex h-full flex-col" {...reveal(index % 3)}>
      <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
        <Picture name={school.image} sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="block h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="t-eyebrow mb-3">
          <span className="t-num">{programmeCount(school.slug)}</span> {t.home.schools.programmes}
        </p>
        <h3 className="font-serif text-[1.375rem] leading-snug text-primary">{school.name}</h3>
        <p className="t-small mt-3 flex-1">{school.description}</p>
        <L to={`/academics/${school.slug}`} className="link-tertiary mt-6 self-start after:content-[''] before:absolute before:inset-0 before:content-['']">
          {t.common.explore} <span className="arrow" aria-hidden="true">→</span>
          <span className="sr-only">: {school.name}</span>
        </L>
      </div>
    </article>
  );
}

/* ── ProgrammeCard (used for related programmes). ── */
export function ProgrammeCard({ p }: { p: Programme }) {
  return (
    <article className="card card-link relative flex h-full flex-col">
      <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
        <Picture name={p.image} sizes="(min-width: 1024px) 400px, 100vw" className="block h-full w-full" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="t-eyebrow mb-2">{levelLabel[p.level]} · {p.durationLabel}</p>
        <h3 className="font-serif text-[1.25rem] leading-snug text-primary">
          <L to={`/programmes/${p.slug}`} className="before:absolute before:inset-0 before:content-['']">{p.title}</L>
        </h3>
        <p className="t-small mt-3 flex-1">{p.summary}</p>
        <p className="mt-5 border-t border-rule pt-4 text-[14px] text-ink">
          <span className="t-num font-semibold">{formatAED(p.tuition)}</span>{' '}
          <span className="text-ink-55">{p.tuitionBasis === 'annual' ? 'per year' : 'total'} · {intakeLabel(p.intakes)}</span>
        </p>
      </div>
    </article>
  );
}

/* ── NewsCard ── */
export function NewsCard({ item, variant = 'compact' }: { item: NewsItem; variant?: 'featured' | 'compact' | 'grid' }) {
  const locale = useLocale();
  const meta = (
    <p className="t-label">
      <time dateTime={item.date}>{formatDate(item.date, locale)}</time> <span aria-hidden="true">·</span> <span className="text-accent-ink">{item.category}</span>
    </p>
  );
  if (variant === 'featured') {
    return (
      <article className="group relative">
        <div className="overflow-hidden border border-rule" style={{ aspectRatio: '16 / 9' }}>
          <Picture name={item.image} sizes="(min-width: 1024px) 860px, 100vw" className="block h-full w-full" />
        </div>
        <div className="mt-6">
          {meta}
          <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-primary">
            <L to={`/news/${item.slug}`} className="before:absolute before:inset-0 before:content-[''] hover:underline hover:decoration-accent hover:underline-offset-4">{item.title}</L>
          </h3>
          <p className="t-body mt-3 max-w-[60ch] text-ink-55">{item.standfirst}</p>
        </div>
      </article>
    );
  }
  if (variant === 'grid') {
    return (
      <article className="card card-link relative flex h-full flex-col">
        <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
          <Picture name={item.image} sizes="(min-width: 1024px) 400px, 100vw" className="block h-full w-full" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {meta}
          <h3 className="mt-3 font-serif text-[1.25rem] leading-snug text-primary">
            <L to={`/news/${item.slug}`} className="before:absolute before:inset-0 before:content-['']">{item.title}</L>
          </h3>
          <p className="t-small mt-3">{item.standfirst}</p>
        </div>
      </article>
    );
  }
  return (
    <article className="relative py-6">
      {meta}
      <h3 className="mt-2 font-serif text-[1.25rem] leading-snug text-primary">
        <L to={`/news/${item.slug}`} className="before:absolute before:inset-0 before:content-[''] hover:underline hover:decoration-accent hover:underline-offset-4">{item.title}</L>
      </h3>
    </article>
  );
}

/* ── EventPanel ── */
export function EventPanel({ events, heading, allLink }: { events: EventItem[]; heading: string; allLink?: { label: string; to: string } }) {
  const locale = useLocale();
  const t = useT();
  return (
    <aside className="border border-rule bg-white p-7" aria-labelledby="events-heading">
      <h3 id="events-heading" className="t-eyebrow">{heading}</h3>
      <ul className="mt-4">
        {events.map((e) => {
          const d = dateParts(e.date, locale);
          return (
            <li key={e.slug} className="flex gap-5 border-b border-rule py-6 last:border-b-0">
              <time dateTime={e.date} className="flex w-14 shrink-0 flex-col items-center border-e border-rule pe-5 text-center">
                <span className="font-serif text-[2rem] leading-none text-primary t-num">{d.day}</span>
                <span className="t-label mt-1">{d.month}</span>
              </time>
              <div>
                <p className="font-serif text-[1.125rem] leading-snug text-primary">{e.title}</p>
                <p className="t-small mt-1"><span className="t-num" dir="ltr">{e.start}–{e.end}</span> GST · {e.format}</p>
                <L to={`/events#${e.slug}`} className="link-tertiary mt-3 text-[14px]">
                  {t.common.rsvp} <span className="arrow" aria-hidden="true">→</span><span className="sr-only">: {e.title}, {formatDate(e.date, locale)}</span>
                </L>
              </div>
            </li>
          );
        })}
      </ul>
      {allLink && (
        <L to={allLink.to} className="link-tertiary mt-2 text-[14px]">
          {allLink.label} <span className="arrow" aria-hidden="true">→</span>
        </L>
      )}
    </aside>
  );
}

/* ── PartnerWall: names only, 14px uppercase, quiet 4×3 grid, 1px rules. ── */
export function PartnerWall({ names, label }: { names: string[]; label: string }) {
  return (
    <div>
      <h3 className="t-label mb-6 text-center">{label}</h3>
      <ul className="grid grid-cols-2 border-s border-t border-rule md:grid-cols-3 lg:grid-cols-4">
        {names.map((n) => (
          <li key={n} className="flex min-h-[88px] items-center justify-center border-b border-e border-rule px-4 py-6 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-55 lg:text-[14px]">
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── StepSequence: horizontal steps connected by a 1px Rule with Accent nodes. ── */
export function StepSequence({ steps, details }: { steps: string[]; details?: string[] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
      <span className="absolute inset-x-[10%] top-[7px] hidden h-px bg-rule md:block" aria-hidden="true" />
      {steps.map((s, i) => (
        <li key={s} className="relative flex gap-5 md:flex-col md:items-center md:gap-0 md:text-center" {...reveal(i)}>
          <span className="relative z-[1] mt-[2px] block h-[15px] w-[15px] shrink-0 rounded-full border border-accent bg-parchment md:mt-0" aria-hidden="true">
            <span className="absolute inset-[4px] rounded-full bg-accent" />
          </span>
          <div className="md:mt-6">
            <p className="font-serif text-[1.25rem] text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 font-serif text-[1.125rem] leading-snug text-primary">{s}</p>
            {details?.[i] && <p className="t-small mt-2">{details[i]}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── KeyValue list used in panels. ── */
export function KeyFacts({ items }: { items: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="divide-y divide-rule">
      {items.map((i) => (
        <div key={i.k} className="flex justify-between gap-6 py-3 text-[15px]">
          <dt className="text-ink-55">{i.k}</dt>
          <dd className="text-end font-semibold text-primary">{i.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TertiaryLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <L to={to} className="link-tertiary">
      {children} <span className="arrow" aria-hidden="true">→</span>
    </L>
  );
}

export function NumberedItems({ items }: { items: { h: string; p: string }[] }) {
  return (
    <ol className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <li key={it.h} className="border-t border-rule pb-12 pt-10" {...reveal(i % 3)}>
          <p className="font-serif text-[2rem] leading-none text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="t-h3 mt-5">{it.h}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-ink">{it.p}</p>
        </li>
      ))}
    </ol>
  );
}

export { Icon };

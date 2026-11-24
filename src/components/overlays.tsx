/** EnquiryModal, SearchOverlay and persistent actions (mobile sticky bar, desktop WhatsApp). */
import { useMemo, useRef, useState } from 'react';
import { L, useT } from '@/lib/locale';
import { useFocusTrap, useUI } from '@/lib/ui';
import { fmt } from '@content/i18n';
import { dubai } from '@content/site';
import { searchIndex, type SearchEntry } from '@/lib/searchIndex';
import { EnquiryForm } from './forms';
import { Icon } from './Icon';

/* ── EnquiryModal: Parchment panel, 1px Rule, no shadow, keyboard-trapped. ── */
export function EnquiryModal() {
  const t = useT().enquiry;
  const { enquiryOpen, closeEnquiry, enquiryProgramme } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, enquiryOpen, closeEnquiry);
  if (!enquiryOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-primary/40 p-0 sm:p-8" onMouseDown={(e) => { if (e.target === e.currentTarget) closeEnquiry(); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="enq-title" aria-describedby="enq-intro" className="relative min-h-full w-full max-w-[640px] border border-rule bg-parchment p-6 sm:my-8 sm:min-h-0 sm:p-10">
        <button type="button" onClick={closeEnquiry} className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center text-primary hover:text-accent-deep" aria-label={t.close}>
          <Icon name="close" size={22} />
        </button>
        <p className="t-eyebrow">RKDF University Dubai</p>
        <h2 id="enq-title" className="t-h2 mt-3 text-[2rem]">{t.title}</h2>
        <span className="gold-rule mt-5" aria-hidden="true" />
        <p id="enq-intro" className="mt-5 text-[16px] text-ink-55">{t.intro}</p>
        <div className="mt-8">
          <EnquiryForm programme={enquiryProgramme} onDone={closeEnquiry} />
        </div>
      </div>
    </div>
  );
}

/* ── SearchOverlay: programmes, pages, news and people. ── */
export function SearchOverlay() {
  const t = useT().search;
  const { searchOpen, closeSearch } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState('');
  useFocusTrap(ref, searchOpen, () => { closeSearch(); setQ(''); });

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const terms = s.split(/\s+/);
    return searchIndex
      .map((e) => {
        const hay = `${e.title} ${e.text} ${e.keywords ?? ''}`.toLowerCase();
        if (!terms.every((x) => hay.includes(x))) return null;
        const score = (e.title.toLowerCase().includes(s) ? 10 : 0) + (e.title.toLowerCase().startsWith(s) ? 5 : 0);
        return { e, score };
      })
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)
      .slice(0, 24)
      .map((x) => x!.e);
  }, [q]);

  if (!searchOpen) return null;
  const groups = (['programme', 'page', 'news', 'staff'] as SearchEntry['type'][]).map((g) => ({ g, items: results.filter((r) => r.type === g) })).filter((x) => x.items.length);
  const close = () => { closeSearch(); setQ(''); };

  return (
    <div ref={ref} role="dialog" aria-modal="true" aria-label={t.label} className="fixed inset-0 z-[70] overflow-y-auto bg-parchment">
      <div className="container-page max-w-[960px] py-8 lg:py-16">
        <div className="flex items-center justify-between">
          <p className="t-eyebrow">{t.label}</p>
          <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center text-primary" aria-label={t.close}>
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="mt-6 flex items-center gap-4 border-b border-primary pb-3">
          <Icon name="search" size={26} className="shrink-0 text-ink-55" />
          <label htmlFor="site-search" className="sr-only">{t.label}</label>
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.placeholder}
            autoComplete="off"
            className="w-full bg-transparent font-serif text-[1.5rem] text-primary placeholder:text-ink-55 focus-visible:outline-none lg:text-[2rem]"
          />
        </div>
        <p className="sr-only" role="status" aria-live="polite">{q.trim().length >= 2 ? fmt(t.results, { n: results.length }) : ''}</p>
        <div className="mt-10">
          {q.trim().length < 2 && <p className="t-small">{t.hint}</p>}
          {q.trim().length >= 2 && results.length === 0 && <p className="text-[16px] text-ink-55">{fmt(t.none, { q })}</p>}
          {groups.map(({ g, items }) => (
            <section key={g} className="mb-10" aria-labelledby={`sg-${g}`}>
              <h2 id={`sg-${g}`} className="t-eyebrow mb-3">{t.groups[g]}</h2>
              <ul className="border-t border-rule">
                {items.map((r) => (
                  <li key={r.to + r.title} className="border-b border-rule">
                    <L to={r.to} onClick={close} className="block py-4 transition-colors duration-150 hover:bg-white">
                      <span className="block font-serif text-[1.125rem] text-primary">{r.title}</span>
                      <span className="mt-1 block text-[14px] text-ink-55">{r.text}</span>
                    </L>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile sticky bar + desktop floating WhatsApp. ── */
export function PersistentActions() {
  const t = useT().sticky;
  const { openEnquiry } = useUI();
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-rule bg-parchment lg:hidden">
        <button type="button" onClick={() => openEnquiry()} className="flex min-h-[56px] flex-col items-center justify-center gap-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-primary">
          <Icon name="mail" size={18} />{t.enquire}
        </button>
        <a href={dubai.whatsappHref} rel="noopener noreferrer" className="flex min-h-[56px] flex-col items-center justify-center gap-1 border-x border-rule text-[12px] font-semibold uppercase tracking-[0.08em] text-primary" aria-label={t.whatsappLabel}>
          <Icon name="whatsapp" size={18} />{t.whatsapp}
        </a>
        <L to="/apply" className="flex min-h-[56px] flex-col items-center justify-center gap-1 bg-primary text-[12px] font-semibold uppercase tracking-[0.08em] text-white">
          <Icon name="arrowRight" size={18} className="arrow" />{t.apply}
        </L>
      </div>
      <a
        href={dubai.whatsappHref}
        rel="noopener noreferrer"
        aria-label={t.whatsappLabel}
        className="fixed bottom-8 end-8 z-30 hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-colors duration-150 hover:bg-primary-deep lg:flex"
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </>
  );
}

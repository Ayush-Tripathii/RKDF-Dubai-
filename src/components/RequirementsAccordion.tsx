import { useId, useState, type ReactNode } from 'react';
import { useT } from '@/lib/locale';
import { curricula, englishSummary } from '@content/requirements';

/** Generic disclosure accordion: buttons with aria-expanded / aria-controls. */
export function Accordion({ items, serif = false }: { items: { id: string; title: string; content: ReactNode }[]; serif?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();
  return (
    <div className="border-t border-rule">
      {items.map((it) => {
        const isOpen = open === it.id;
        const btn = `${base}-${it.id}-btn`;
        const panel = `${base}-${it.id}-panel`;
        return (
          <div key={it.id} className="border-b border-rule">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : it.id)}
                className={`flex w-full items-center justify-between gap-4 py-5 text-start transition-colors duration-150 hover:text-accent-deep ${serif ? 'font-serif text-[1.25rem] text-primary' : 'text-[16px] font-semibold text-primary'}`}
              >
                <span>{it.title}</span>
                <span className="relative block h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-accent" />
                  <span className={`absolute inset-y-0 left-1/2 w-px bg-accent transition-transform duration-200 ${isOpen ? 'scale-y-0' : ''}`} />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} hidden={!isOpen} className="pb-6">
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Entry requirements, one row per curriculum. */
export function RequirementsAccordion() {
  const t = useT();
  return (
    <Accordion
      items={curricula.map((c) => ({
        id: c.id,
        title: c.name,
        content: (
          <dl className="grid gap-3 text-[15px]">
            <div><dt className="t-label">Undergraduate</dt><dd className="mt-1 text-ink">{c.ug}</dd></div>
            <div><dt className="t-label">Foundation Year</dt><dd className="mt-1 text-ink">{c.foundation}</dd></div>
            <div><dt className="t-label">{t.home.admissions.english}</dt><dd className="mt-1 text-ink t-num">{englishSummary}</dd></div>
            <div><dt className="sr-only">Notes</dt><dd className="t-small">{c.notes}</dd></div>
          </dl>
        ),
      }))}
    />
  );
}

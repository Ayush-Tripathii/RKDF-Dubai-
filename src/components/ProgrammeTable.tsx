/**
 * ProgrammeTable — a real, accessible, filterable, sortable <table>.
 * Filters are plain <select>s; sort buttons live inside <th> with aria-sort;
 * the result count is announced through a polite live region.
 * Kept LTR inside RTL pages, as numeric data.
 */
import { useMemo, useState } from 'react';
import { L, useT } from '@/lib/locale';
import { fmt } from '@content/i18n';
import { programmes as all, levelLabel, type Programme } from '@content/programmes';
import { schools } from '@content/schools';

type SortKey = 'title' | 'level' | 'durationMonths' | 'tuition';
type Dir = 'ascending' | 'descending';

const levelOrder = { FD: 0, UG: 1, PG: 2 } as const;

export function ProgrammeTable({ idPrefix = 'pt' }: { idPrefix?: string }) {
  const t = useT().table;
  const [level, setLevel] = useState('');
  const [school, setSchool] = useState('');
  const [intake, setIntake] = useState('');
  const [duration, setDuration] = useState('');
  const [fee, setFee] = useState('');
  const [sort, setSort] = useState<{ key: SortKey; dir: Dir } | null>(null);

  const rows = useMemo(() => {
    let r = all.filter((p) =>
      (!level || p.level === level) &&
      (!school || p.school === school) &&
      (!intake || p.intakes.includes(intake as 'Jan' | 'Sep')) &&
      (!duration || (duration === 'short' ? p.durationMonths < 24 : duration === 'mid' ? p.durationMonths >= 24 && p.durationMonths <= 36 : p.durationMonths === 48)) &&
      (!fee || (fee === 'low' ? p.tuition < 55000 : fee === 'mid' ? p.tuition >= 55000 && p.tuition <= 65000 : p.tuition > 65000)),
    );
    if (sort) {
      const m = sort.dir === 'ascending' ? 1 : -1;
      r = [...r].sort((a, b) => {
        const va = sort.key === 'level' ? levelOrder[a.level] : a[sort.key];
        const vb = sort.key === 'level' ? levelOrder[b.level] : b[sort.key];
        return (typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number)) * m;
      });
    }
    return r;
  }, [level, school, intake, duration, fee, sort]);

  const anyFilter = level || school || intake || duration || fee;
  const clear = () => { setLevel(''); setSchool(''); setIntake(''); setDuration(''); setFee(''); };

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 'ascending' ? 'descending' : 'ascending' } : { key, dir: 'ascending' }));

  const th = (k: SortKey, label: string, num = false) => {
    const active = sort?.key === k;
    return (
      <th key={k} scope="col" aria-sort={active ? sort!.dir : 'none'} className={num ? 'num' : ''}>
        <button type="button" onClick={() => toggleSort(k)} className={`inline-flex items-center gap-2 uppercase tracking-[0.08em] ${num ? 'flex-row-reverse' : ''}`}>
          <span>{label}</span>
          <svg width="9" height="12" viewBox="0 0 9 12" aria-hidden="true" className="shrink-0">
            <path d="M4.5 1L8 5H1z" fill="currentColor" opacity={active && sort!.dir === 'ascending' ? 1 : 0.3} />
            <path d="M4.5 11L1 7h7z" fill="currentColor" opacity={active && sort!.dir === 'descending' ? 1 : 0.3} />
          </svg>
          <span className="sr-only">{fmt(t.sortBy, { c: label })}</span>
        </button>
      </th>
    );
  };

  const filter = (id: string, label: string, value: string, onChange: (v: string) => void, options: [string, string][]) => (
    <div key={id}>
      <label htmlFor={`${idPrefix}-${id}`} className="field-label">{label}</label>
      <select id={`${idPrefix}-${id}`} className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{t.all}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <fieldset className="mb-8">
        <legend className="sr-only">{t.filters}</legend>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {filter('level', t.level, level, setLevel, [['UG', t.ug], ['PG', t.pg], ['FD', t.fd]])}
          {filter('school', t.school, school, setSchool, schools.map((s) => [s.slug, s.short]))}
          {filter('intake', t.intake, intake, setIntake, [['Jan', t.january], ['Sep', t.september]])}
          {filter('duration', t.duration, duration, setDuration, [['short', t.months], ['mid', t.upTo3], ['long', t.four]])}
          {filter('fee', t.fee, fee, setFee, [['low', t.under55], ['mid', t.r55to65], ['high', t.over65]])}
        </div>
      </fieldset>

      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-[14px] text-ink-55" role="status" aria-live="polite">
          {fmt(t.showing, { n: rows.length, total: all.length })}
        </p>
        {anyFilter ? (
          <button type="button" onClick={clear} className="link-tertiary text-[14px]">{t.clear}</button>
        ) : null}
      </div>

      <div className="overflow-x-auto border-x border-rule" tabIndex={0} role="region" aria-labelledby={`${idPrefix}-caption`} dir="ltr">
        <table className="table-rk min-w-[760px]" style={{ borderInline: 0 }}>
          <caption id={`${idPrefix}-caption`} className="sr-only">{t.caption}</caption>
          <thead>
            <tr>
              {th('title', t.programme)}
              {th('level', t.level)}
              {th('durationMonths', t.duration)}
              <th scope="col">{t.intake}</th>
              {th('tuition', t.tuition, true)}
              <th scope="col"><span className="sr-only">{t.view}</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p: Programme) => (
              <tr key={p.slug} className="transition-colors duration-150 hover:bg-parchment">
                <th scope="row" className="!font-normal">
                  <L to={`/programmes/${p.slug}`} className="font-serif text-[16px] text-primary hover:underline hover:decoration-accent hover:underline-offset-4">{p.title}</L>
                </th>
                <td>{levelLabel[p.level]}</td>
                <td className="t-num whitespace-nowrap">{p.durationLabel}</td>
                <td className="whitespace-nowrap">{p.intakes.join(' / ')}</td>
                <td className="num">
                  {p.tuition.toLocaleString('en-US')}
                  {p.tuitionBasis === 'total' && <span className="ms-1 text-ink-55">total</span>}
                </td>
                <td className="whitespace-nowrap text-end">
                  <L to={`/programmes/${p.slug}`} className="link-tertiary text-[13px]">
                    {t.view}<span className="sr-only"> {p.title}</span> <span aria-hidden="true">→</span>
                  </L>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="py-10 text-center text-ink-55">{t.empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="t-small mt-4">{t.totalNote}</p>
    </div>
  );
}

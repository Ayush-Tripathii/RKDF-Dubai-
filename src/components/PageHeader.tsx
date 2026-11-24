/**
 * PageShell = Seo + PageHeader (320px band, scrimmed photograph, breadcrumbs, H1,
 * standfirst) + optional sticky InPageNav. Every route except home uses it.
 */
import { useEffect, useState, type ReactNode } from 'react';
import { L, useLocale, useT, localizePath } from '@/lib/locale';
import { Seo, type SeoProps } from '@/lib/head';
import { SITE_URL } from '@content/site';
import type { MediaKey } from '@content/media';
import { Picture } from './ImageFrame';

export interface Crumb { label: string; to?: string }

export function PageHeader({ title, standfirst, image, crumbs }: { title: string; standfirst?: string; image: MediaKey; crumbs: Crumb[] }) {
  const t = useT();
  return (
    <div className="relative isolate flex min-h-[320px] items-end overflow-hidden bg-primary">
      <div className="absolute inset-0 -z-10">
        <Picture name={image} priority sizes="100vw" alt="" className="block h-full w-full" />
        <div className="absolute inset-0" style={{ background: 'var(--scrim-header)' }} aria-hidden="true" />
      </div>
      <div className="container-page pb-12 pt-16">
        <nav aria-label={t.common.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/90">
            <li><L to="/" className="hover:text-white hover:underline hover:underline-offset-4">{t.common.home}</L></li>
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span aria-hidden="true" className="arrow text-accent-light">›</span>
                {c.to && i < crumbs.length - 1 ? (
                  <L to={c.to} className="hover:text-white hover:underline hover:underline-offset-4">{c.label}</L>
                ) : (
                  <span aria-current="page">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="t-h1 mt-5 max-w-[22ch] text-white" style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)' }}>{title}</h1>
        {standfirst && <p className="mt-4 max-w-[60ch] text-[18px] leading-relaxed text-white/90">{standfirst}</p>}
      </div>
    </div>
  );
}

/** Sticky in-page navigation with an Accent underline on the active section. */
export function InPageNav({ items }: { items: { id: string; label: string }[] }) {
  const t = useT();
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-140px 0px -60% 0px' },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav aria-label={t.common.onThisPage} className="sticky top-16 z-20 border-b border-rule bg-parchment lg:top-[60px]">
      <div className="container-page">
        <ul className="-mb-px flex h-14 items-stretch gap-7 overflow-x-auto whitespace-nowrap text-[14px]">
          {items.map((i) => (
            <li key={i.id} className="flex">
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? 'location' : undefined}
                className={`flex items-center border-b transition-colors duration-150 ${active === i.id ? 'border-accent font-semibold text-primary' : 'border-transparent text-ink-55 hover:text-primary'}`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function PageShell({ title, standfirst, image, crumbs, seo, nav, children }: { title: string; standfirst?: string; image: MediaKey; crumbs: Crumb[]; seo: Omit<SeoProps, 'title'> & { title?: string }; nav?: { id: string; label: string }[]; children: ReactNode }) {
  const locale = useLocale();
  const t = useT();
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: t.common.home, to: '/' }, ...crumbs].map((c, i, arr) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to || i < arr.length - 1 ? { item: SITE_URL + localizePath(c.to ?? '/', locale) } : {}),
    })),
  };
  return (
    <>
      <Seo {...seo} title={seo.title ?? title} jsonLd={[breadcrumbLd, ...(seo.jsonLd ?? [])]} />
      <PageHeader title={title} standfirst={standfirst} image={image} crumbs={crumbs} />
      {nav && <InPageNav items={nav} />}
      {children}
    </>
  );
}

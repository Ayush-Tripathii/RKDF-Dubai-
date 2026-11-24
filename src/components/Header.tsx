/**
 * AnnouncementBar, UtilityNav, MainNav, MegaMenu and the mobile menu panel.
 *
 * The sticky header sits in a constant-height wrapper so condensing on scroll
 * (84px → 60px, utility row dropped, Accent bottom rule) never shifts content.
 */
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { L, LNav, useLocale, useT, basePath, localizePath } from '@/lib/locale';
import { store, useFocusTrap, useUI } from '@/lib/ui';
import { parent } from '@content/site';
import type { MediaKey } from '@content/media';
import { HeaderLockup } from './LogoSlot';
import { Picture } from './ImageFrame';
import { Icon } from './Icon';

type MenuKey = 'about' | 'academics' | 'admissions';

/* ── AnnouncementBar ── */
export function AnnouncementBar() {
  const t = useT().announcement;
  const [hidden, setHidden] = useState(false);
  useEffect(() => { if (store.get('rk-announce-2027-01') === '1') setHidden(true); }, []);
  if (hidden) return null;
  return (
    <div className="bg-primary text-white" role="region" aria-label="Announcement">
      <div className="container-page relative flex min-h-[40px] items-center justify-center py-2 pe-12 text-center text-[13px] leading-snug">
        <p>
          {t.text}{' '}
          <L to="/apply" className="ms-2 whitespace-nowrap font-semibold underline decoration-accent-light underline-offset-4 hover:decoration-white">
            {t.cta} <span className="arrow" aria-hidden="true">→</span>
          </L>
        </p>
        <button
          type="button"
          onClick={() => { store.set('rk-announce-2027-01', '1'); setHidden(true); }}
          className="absolute end-[var(--page-margin)] top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/85 hover:text-white"
          aria-label={t.dismiss}
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Language switch: same page, other locale; choice persisted. ── */
function LangSwitch({ className = '' }: { className?: string }) {
  const t = useT().utility;
  const locale = useLocale();
  const { pathname, hash } = useLocation();
  const other = locale === 'en' ? 'ar' : 'en';
  const href = localizePath(basePath(pathname), other) + hash;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span aria-current="true" className="font-semibold text-primary">{t.current}</span>
      <span aria-hidden="true" className="text-rule">|</span>
      <a
        href={href}
        hrefLang={other}
        lang={other}
        onClick={() => store.set('rk-locale', other)}
        className="hover:text-primary"
        aria-label={t.switchLabel}
      >
        {t.switchTo}
      </a>
    </span>
  );
}

/* ── UtilityNav ── */
function UtilityNav() {
  const t = useT().utility;
  const { openSearch } = useUI();
  return (
    <nav aria-label={t.label} className="h-full">
      <ul className="flex h-full items-center justify-end gap-6 text-[12px] text-ink-55">
        <li><a href={parent.portal} rel="noopener noreferrer" className="hover:text-primary">{t.portal}</a></li>
        <li><L to="/contact#directory" className="hover:text-primary">{t.staff}</L></li>
        <li><L to="/global#alumni" className="hover:text-primary">{t.alumni}</L></li>
        <li><L to="/about/campus#library" className="hover:text-primary">{t.library}</L></li>
        <li><LangSwitch /></li>
        <li>
          <button type="button" onClick={openSearch} className="flex h-9 w-9 items-center justify-center hover:text-primary" aria-label={t.search}>
            <Icon name="search" size={17} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

/* ── MegaMenu panel ── */
function MegaMenu({ id, menu, labelledBy, onLinkClick }: { id: string; menu: ReturnType<typeof useT>['menus']['about']; labelledBy: string; onLinkClick: () => void }) {
  return (
    <div id={id} aria-labelledby={labelledBy} className="absolute inset-x-0 top-full border-b border-t border-rule bg-parchment">
      <div className="container-page grid grid-cols-12 gap-10 py-12">
        {menu.columns.map((col) => (
          <div key={col.heading} className="col-span-3">
            <p className="t-eyebrow mb-5">{col.heading}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <L to={l.to} onClick={onLinkClick} className="font-serif text-[1.125rem] leading-snug text-primary transition-colors duration-150 hover:text-accent-deep">
                    {l.label}
                  </L>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-3">
          <L to={menu.feature.to} onClick={onLinkClick} className="card card-link group block">
            <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
              <Picture name={menu.feature.image as MediaKey} sizes="320px" className="block h-full w-full" />
            </div>
            <div className="p-5">
              <p className="font-serif text-[1.0625rem] leading-snug text-primary">{menu.feature.title}</p>
              <p className="mt-2 text-[13px] leading-snug text-ink-55">{menu.feature.text}</p>
            </div>
          </L>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile menu: full-screen Parchment panel. ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const { openEnquiry } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<MenuKey | null>(null);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;
  const sections: MenuKey[] = ['about', 'academics', 'admissions'];
  const plain = [
    { label: t.nav.research, to: '/research' },
    { label: t.nav.studentLife, to: '/student-life' },
    { label: t.nav.careers, to: '/careers' },
    { label: t.nav.news, to: '/news' },
  ];
  return (
    <div ref={ref} id="mobile-menu" role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-[60] flex flex-col bg-parchment lg:hidden">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-rule px-5">
        <L to="/" onClick={onClose} aria-label={t.siteName}><HeaderLockup compact /></L>
        <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center text-primary" aria-label={t.nav.close}>
          <Icon name="close" size={22} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-5 pb-8" aria-label={t.nav.label}>
        <ul>
          {sections.map((k) => {
            const isOpen = section === k;
            return (
              <li key={k} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`m-${k}`}
                  onClick={() => setSection(isOpen ? null : k)}
                  className="flex w-full items-center justify-between py-5 text-start font-serif text-[1.5rem] text-primary"
                >
                  {t.nav[k]}
                  <Icon name={isOpen ? 'minus' : 'plus'} className="text-accent" />
                </button>
                <div id={`m-${k}`} hidden={!isOpen} className="pb-6">
                  {t.menus[k].columns.map((c) => (
                    <div key={c.heading} className="mb-5">
                      <p className="t-eyebrow mb-3">{c.heading}</p>
                      <ul className="space-y-3">
                        {c.links.map((l) => (
                          <li key={l.to}><L to={l.to} onClick={onClose} className="text-[16px] text-ink">{l.label}</L></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
          {plain.map((p) => (
            <li key={p.to} className="border-b border-rule">
              <L to={p.to} onClick={onClose} className="block py-5 font-serif text-[1.5rem] text-primary">{p.label}</L>
            </li>
          ))}
        </ul>
        <ul className="mt-8 grid grid-cols-2 gap-4 text-[14px] text-ink-55">
          <li><a href={parent.portal} rel="noopener noreferrer">{t.utility.portal}</a></li>
          <li><L to="/contact#directory" onClick={onClose}>{t.utility.staff}</L></li>
          <li><L to="/global#alumni" onClick={onClose}>{t.utility.alumni}</L></li>
          <li><L to="/about/campus#library" onClick={onClose}>{t.utility.library}</L></li>
          <li><LangSwitch /></li>
        </ul>
      </nav>
      <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-rule bg-parchment p-4">
        <button type="button" className="btn btn-secondary" onClick={() => { onClose(); openEnquiry(); }}>{t.nav.enquire}</button>
        <L to="/apply" onClick={onClose} className="btn btn-primary">{t.nav.apply}</L>
      </div>
    </div>
  );
}

/* ── Header (UtilityNav + MainNav + MegaMenu) ── */
export function Header() {
  const t = useT();
  const { pathname } = useLocation();
  const { openEnquiry, openSearch } = useUI();
  const [condensed, setCondensed] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number>();
  const openTimer = useRef<number>();
  const navRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setCondensed((c) => (c ? window.scrollY > 60 : window.scrollY > 120));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenu(null); setMobile(false); }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { triggers.current[menu]?.focus(); setMenu(null); }
    };
    const onClick = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick); };
  }, [menu]);

  const hoverOpen = (k: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setMenu(k), menu ? 0 : 120);
  };
  const hoverClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 180);
  };

  const section = basePath(pathname).split('/')[1] ?? '';
  const isActive = (k: string) =>
    ({ about: ['about', 'global'], academics: ['academics', 'programmes'], admissions: ['admissions', 'apply'], research: ['research'], 'student-life': ['student-life'], careers: ['careers'], news: ['news', 'events'] } as Record<string, string[]>)[k]?.includes(section);

  const megaItems: MenuKey[] = ['about', 'academics', 'admissions'];
  const links = [
    { k: 'research', label: t.nav.research, to: '/research' },
    { k: 'student-life', label: t.nav.studentLife, to: '/student-life' },
    { k: 'careers', label: t.nav.careers, to: '/careers' },
    { k: 'news', label: t.nav.news, to: '/news' },
  ];
  const itemClass = (active: boolean) =>
    `relative flex h-full items-center whitespace-nowrap px-[2px] text-[14px] font-semibold tracking-[0.02em] text-primary transition-colors duration-150 hover:text-accent-deep after:absolute after:inset-x-0 after:bottom-0 after:h-px after:transition-colors after:duration-150 ${active ? 'after:bg-accent' : 'after:bg-transparent'}`;

  return (
    <>
      {/* Constant-height wrapper: no layout shift when the header condenses. */}
      <div className="pointer-events-none sticky top-0 z-40 h-16 lg:h-[120px]">
        <header className="pointer-events-auto relative" ref={navRef} onMouseLeave={hoverClose}>
          <div className={`hidden overflow-hidden bg-stone transition-[height] duration-200 lg:block ${condensed ? 'h-0' : 'h-9'}`}>
            <div className="container-page h-9"><UtilityNav /></div>
          </div>
          <div className={`border-b bg-parchment transition-[height,border-color] duration-200 ${condensed ? 'border-accent lg:h-[60px]' : 'border-rule lg:h-[84px]'} h-16`}>
            <div className="container-page flex h-full items-center justify-between gap-6">
              <L to="/" className="shrink-0" aria-label={`${t.siteName} — ${t.common.home}`}>
                <HeaderLockup compact={condensed} />
              </L>

              <nav aria-label={t.nav.label} className="hidden h-full lg:block">
                <ul className="flex h-full items-center gap-5 xl:gap-7">
                  {megaItems.map((k) => (
                    <li key={k} className="h-full" onMouseEnter={() => hoverOpen(k)}>
                      <button
                        ref={(el) => { triggers.current[k] = el; }}
                        id={`mega-${k}-btn`}
                        type="button"
                        aria-expanded={menu === k}
                        aria-controls={`mega-${k}`}
                        onClick={() => setMenu(menu === k ? null : k)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowDown') {
                            e.preventDefault();
                            setMenu(k);
                            requestAnimationFrame(() => document.querySelector<HTMLElement>(`#mega-${k} a`)?.focus());
                          }
                        }}
                        className={`${itemClass(!!isActive(k) || menu === k)} gap-1`}
                      >
                        {t.nav[k]}
                        <Icon name="chevronDown" size={14} className={`transition-transform duration-200 ${menu === k ? 'rotate-180' : ''}`} />
                      </button>
                      {menu === k && <MegaMenu id={`mega-${k}`} labelledBy={`mega-${k}-btn`} menu={t.menus[k]} onLinkClick={() => setMenu(null)} />}
                    </li>
                  ))}
                  {links.map((l) => (
                    <li key={l.k} className="h-full" onMouseEnter={() => setMenu(null)}>
                      <LNav to={l.to} className={itemClass(!!isActive(l.k))}>{l.label}</LNav>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="hidden items-center gap-3 lg:flex">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEnquiry()}>{t.nav.enquire}</button>
                <L to="/apply" className="btn btn-primary btn-sm">{t.nav.apply}</L>
              </div>

              <div className="flex items-center gap-1 lg:hidden">
                <button type="button" onClick={openSearch} className="flex h-11 w-11 items-center justify-center text-primary" aria-label={t.utility.search}>
                  <Icon name="search" size={21} />
                </button>
                <button type="button" onClick={() => setMobile(true)} className="flex h-11 w-11 items-center justify-center text-primary" aria-label={t.nav.open} aria-expanded={mobile} aria-controls="mobile-menu">
                  <Icon name="menu" size={22} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  );
}

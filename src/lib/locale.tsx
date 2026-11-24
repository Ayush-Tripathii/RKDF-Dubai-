import { createContext, useContext, forwardRef, type ReactNode, type AnchorHTMLAttributes } from 'react';
import { Link, NavLink, useLocation, type NavLinkProps } from 'react-router-dom';
import { strings, type Locale, type Dict } from '@content/i18n';

const LocaleContext = createContext<Locale>('en');

export function localeFromPath(pathname: string): Locale {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
}

/** Strip the locale prefix: '/ar/about' → '/about'. */
export function basePath(pathname: string): string {
  if (pathname === '/ar') return '/';
  if (pathname.startsWith('/ar/')) return pathname.slice(3) || '/';
  return pathname;
}

export function localizePath(to: string, locale: Locale): string {
  if (/^(https?:|mailto:|tel:)/.test(to)) return to;
  if (locale === 'en') return to;
  if (to === '/') return '/ar';
  if (to.startsWith('/#')) return `/ar${to.slice(1)}`;
  return `/ar${to}`;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <LocaleContext.Provider value={localeFromPath(pathname)}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
export const useT = (): Dict => strings[useContext(LocaleContext)];

type LProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children?: ReactNode };

/** Locale-aware internal link. External URLs render as plain anchors. */
export const L = forwardRef<HTMLAnchorElement, LProps>(function L({ to, children, ...rest }, ref) {
  const locale = useLocale();
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const external = to.startsWith('http');
    return (
      <a ref={ref} href={to} {...(external ? { rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} to={localizePath(to, locale)} {...rest}>
      {children}
    </Link>
  );
});

export function LNav({ to, ...rest }: NavLinkProps & { to: string }) {
  const locale = useLocale();
  return <NavLink to={localizePath(to, locale)} {...rest} />;
}

const dateFmt: Record<Locale, Intl.DateTimeFormatOptions> = {
  en: { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' },
  ar: { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' },
};
const tag = (l: Locale) => (l === 'ar' ? 'ar-AE-u-nu-latn' : 'en-GB');

export const formatDate = (iso: string, l: Locale, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(tag(l), opts ?? dateFmt[l]).format(new Date(`${iso}T00:00:00Z`));

export const dateParts = (iso: string, l: Locale) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return {
    day: new Intl.DateTimeFormat(tag(l), { day: '2-digit', timeZone: 'UTC' }).format(d),
    month: new Intl.DateTimeFormat(tag(l), { month: 'short', timeZone: 'UTC' }).format(d),
    year: new Intl.DateTimeFormat(tag(l), { year: 'numeric', timeZone: 'UTC' }).format(d),
    weekday: new Intl.DateTimeFormat(tag(l), { weekday: 'long', timeZone: 'UTC' }).format(d),
  };
};

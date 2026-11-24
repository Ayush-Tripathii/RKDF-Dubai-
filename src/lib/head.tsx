import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '@content/site';
import { basePath, localeFromPath, localizePath } from './locale';

export interface HeadData {
  title: string;
  description: string;
  canonical: string;
  alternates: { hreflang: string; href: string }[];
  ogImage: string;
  ogType: string;
  jsonLd: object[];
  lang: string;
  dir: 'ltr' | 'rtl';
  noindex?: boolean;
}

/** Server-side collector; on the client this context is null. */
export const HeadCollector = createContext<{ data?: HeadData } | null>(null);

export interface SeoProps {
  title: string;
  description: string;
  ogImage?: string; // path under /og/
  ogType?: 'website' | 'article';
  jsonLd?: object[];
  noindex?: boolean;
}

const TITLE_SUFFIX = 'RKDF University Dubai';

export function useHeadData(p: SeoProps): HeadData {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const base = basePath(pathname);
  const title = p.title === TITLE_SUFFIX ? p.title : `${p.title} | ${TITLE_SUFFIX}`;
  return {
    title,
    description: p.description,
    canonical: SITE_URL + localizePath(base, locale),
    alternates: [
      { hreflang: 'en', href: SITE_URL + base },
      { hreflang: 'ar', href: SITE_URL + localizePath(base, 'ar') },
      { hreflang: 'x-default', href: SITE_URL + base },
    ],
    ogImage: SITE_URL + (p.ogImage ?? '/og/default.png'),
    ogType: p.ogType ?? 'website',
    jsonLd: p.jsonLd ?? [],
    lang: locale,
    dir: locale === 'ar' ? 'rtl' : 'ltr',
    noindex: p.noindex,
  };
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Per-route <head>. Collected during prerender; applied imperatively on client navigation. */
export function Seo(props: SeoProps) {
  const data = useHeadData(props);
  const collector = useContext(HeadCollector);
  if (collector) collector.data = data;

  useEffect(() => {
    document.title = data.title;
    document.documentElement.lang = data.lang;
    document.documentElement.dir = data.dir;
    setMeta('name', 'description', data.description);
    setMeta('property', 'og:title', data.title);
    setMeta('property', 'og:description', data.description);
    setMeta('property', 'og:url', data.canonical);
    setMeta('property', 'og:image', data.ogImage);
    setMeta('property', 'og:type', data.ogType);
    setMeta('name', 'twitter:title', data.title);
    setMeta('name', 'twitter:description', data.description);
    setMeta('name', 'twitter:image', data.ogImage);
    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.rel = 'canonical';
      document.head.appendChild(canon);
    }
    canon.href = data.canonical;
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    data.alternates.forEach((a) => {
      const l = document.createElement('link');
      l.rel = 'alternate';
      l.hreflang = a.hreflang;
      l.href = a.href;
      document.head.appendChild(l);
    });
    document.head.querySelectorAll('script[data-ld]').forEach((n) => n.remove());
    data.jsonLd.forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.ld = '';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [data.title, data.canonical, data.description, data.ogImage, data.lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

/** Serialise head data to HTML (used by the prerenderer). */
export function renderHead(d: HeadData): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const lines = [
    `<title>${esc(d.title)}</title>`,
    `<meta name="description" content="${esc(d.description)}">`,
    `<link rel="canonical" href="${d.canonical}">`,
    ...d.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`),
    `<meta property="og:site_name" content="RKDF University Dubai">`,
    `<meta property="og:title" content="${esc(d.title)}">`,
    `<meta property="og:description" content="${esc(d.description)}">`,
    `<meta property="og:url" content="${d.canonical}">`,
    `<meta property="og:type" content="${d.ogType}">`,
    `<meta property="og:image" content="${d.ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:locale" content="${d.lang === 'ar' ? 'ar_AE' : 'en_GB'}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(d.title)}">`,
    `<meta name="twitter:description" content="${esc(d.description)}">`,
    `<meta name="twitter:image" content="${d.ogImage}">`,
    ...(d.noindex ? ['<meta name="robots" content="noindex">'] : []),
    ...d.jsonLd.map((o) => `<script type="application/ld+json" data-ld>${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ];
  return lines.join('\n    ');
}

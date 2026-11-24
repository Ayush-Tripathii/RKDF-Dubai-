import { useParams } from 'react-router-dom';
import { useT, useLocale, formatDate, dateParts, L } from '@/lib/locale';
import { useUI } from '@/lib/ui';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, NewsCard, TertiaryLink, reveal } from '@/components/blocks';
import { ImageFrame } from '@/components/ImageFrame';
import NotFound from './NotFound';
import { sortedNews, getNews } from '@content/news';
import { upcomingEvents, events as allEvents } from '@content/events';
import { SITE_URL, dubai } from '@content/site';

export function News() {
  const p = useT().pages.news;
  const items = sortedNews();
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="campusBrick" crumbs={[{ label: 'News' }]}
      seo={{ description: 'News from RKDF University Dubai: campus, admissions, research and partnership announcements.', ogImage: '/og/news.png' }}>
      <Section band="parchment">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n, i) => <div key={n.slug} {...reveal(i % 3)}><NewsCard item={n} variant="grid" /></div>)}
        </div>
        <div className="mt-12 text-center"><TertiaryLink to="/events">Upcoming events</TertiaryLink></div>
      </Section>
    </PageShell>
  );
}

export function NewsArticle() {
  const { slug = '' } = useParams();
  const n = getNews(slug);
  const locale = useLocale();
  if (!n) return <NotFound />;
  const more = sortedNews().filter((x) => x.slug !== n.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org', '@type': 'NewsArticle',
    headline: n.title, description: n.standfirst, datePublished: n.date, dateModified: n.date,
    image: [`${SITE_URL}/images/${n.image}-1280.webp`],
    author: { '@type': 'Organization', name: 'RKDF University Dubai' },
    publisher: { '@type': 'Organization', name: 'RKDF University Dubai', logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/default.png` } },
    mainEntityOfPage: `${SITE_URL}/news/${n.slug}`,
  };
  return (
    <PageShell title={n.title} standfirst={n.standfirst} image={n.image} crumbs={[{ label: 'News', to: '/news' }, { label: n.category }]}
      seo={{ title: n.title, description: n.standfirst, ogType: 'article', jsonLd: [ld] }}>
      <Section band="parchment">
        <article className="mx-auto max-w-[46rem]">
          <p className="t-label"><time dateTime={n.date}>{formatDate(n.date, locale)}</time> · <span className="text-accent-ink">{n.category}</span></p>
          <ImageFrame name={n.image} className="mt-8" ratio="16 / 9" sizes="(min-width: 768px) 736px, 100vw" />
          <div className="prose-rk mt-10 text-[18px]">
            {n.body.map((b, i) => <p key={i}>{b}</p>)}
          </div>
          <p className="t-small mt-10 border-t border-rule pt-6">Media enquiries: <a href={`mailto:${dubai.emailRegistrar}`} className="underline decoration-accent underline-offset-4">{dubai.emailRegistrar}</a></p>
        </article>
      </Section>
      <Section band="stone">
        <SectionMasthead eyebrow="News" title="More from the university" />
        <div className="grid gap-6 md:grid-cols-3">{more.map((m) => <NewsCard key={m.slug} item={m} variant="grid" />)}</div>
      </Section>
    </PageShell>
  );
}

export function Events() {
  const p = useT().pages.events;
  const locale = useLocale();
  const { openEnquiry } = useUI();
  const list = upcomingEvents();
  const shown = list.length ? list : allEvents;
  const ld = shown.map((e) => ({
    '@context': 'https://schema.org', '@type': 'Event',
    name: `${e.title} — RKDF University Dubai`, description: e.description,
    startDate: `${e.date}T${e.start}:00+04:00`, endDate: `${e.date}T${e.end}:00+04:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: e.format === 'Online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    location: e.format === 'Online'
      ? { '@type': 'VirtualLocation', url: `${SITE_URL}/events#${e.slug}` }
      : { '@type': 'Place', name: 'RKDF University Dubai', address: { '@type': 'PostalAddress', streetAddress: 'Block 11, Dubai International Academic City', addressLocality: 'Dubai', addressCountry: 'AE' } },
    organizer: { '@type': 'Organization', name: 'RKDF University Dubai', url: SITE_URL },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'AED', availability: 'https://schema.org/InStock', url: `${SITE_URL}/events#${e.slug}` },
  }));
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="lectureTheatre" crumbs={[{ label: 'Events' }]}
      seo={{ description: 'Open days and online information sessions at RKDF University Dubai, December 2026 and January 2027.', jsonLd: ld }}>
      <Section band="parchment">
        <ul className="mx-auto max-w-[60rem] border-t border-rule">
          {shown.map((e) => {
            const d = dateParts(e.date, locale);
            return (
              <li key={e.slug} id={e.slug} className="grid gap-6 border-b border-rule py-10 md:grid-cols-[120px_1fr_auto] md:items-start" {...reveal()}>
                <time dateTime={e.date} className="flex flex-col">
                  <span className="font-serif text-[3rem] leading-none text-primary t-num">{d.day}</span>
                  <span className="t-label mt-2">{d.month} {d.year}</span>
                </time>
                <div>
                  <p className="t-eyebrow">{e.format}</p>
                  <h2 className="t-h3 mt-2">{e.title}</h2>
                  <p className="t-small mt-1">{d.weekday} · <span className="t-num" dir="ltr">{e.start}–{e.end}</span> GST · {e.location}</p>
                  <p className="mt-3 max-w-[60ch] text-[16px] text-ink">{e.description}</p>
                </div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => openEnquiry()}>
                  Register<span className="sr-only">: {e.title}, {formatDate(e.date, locale)}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="t-small mt-8 text-center">Prefer an individual visit? <L to="/visit" className="underline decoration-accent underline-offset-4">Book a campus visit</L>.</p>
      </Section>
    </PageShell>
  );
}

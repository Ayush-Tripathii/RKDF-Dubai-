import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { L, useT } from '@/lib/locale';
import { Seo } from '@/lib/head';
import { useUI } from '@/lib/ui';
import { Picture, ImageFrame } from '@/components/ImageFrame';
import { Icon, SealMotif } from '@/components/Icon';
import {
  Section, SectionMasthead, StatRow, QuoteBlock, SchoolCard, NewsCard, EventPanel, PartnerWall,
  StepSequence, NumberedItems, TertiaryLink, reveal,
} from '@/components/blocks';
import { ProgrammeTable } from '@/components/ProgrammeTable';
import { RequirementsAccordion } from '@/components/RequirementsAccordion';
import { VoicesCarousel } from '@/components/VoicesCarousel';
import { VisitForm } from '@/components/forms';
import { MapEmbed, ContactBlock } from '@/components/MapEmbed';
import { glance, research as researchStats, outcomes } from '@content/stats';
import { schools } from '@content/schools';
import { regulators } from '@content/accreditation';
import { costOfLiving } from '@content/fees';
import { centres } from '@content/research';
import { partners } from '@content/people';
import { sortedNews } from '@content/news';
import { upcomingEvents } from '@content/events';
import { parent, dubai, SITE_URL } from '@content/site';

function Hero() {
  const t = useT().home.hero;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.03]);
  return (
    <section className="relative isolate flex h-[88vh] min-h-[560px] items-end overflow-hidden bg-primary" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0 -z-10 origin-center" style={{ scale }}>
        <Picture name="hero" priority sizes="100vw" className="block h-full w-full" />
      </motion.div>
      <div className="absolute inset-0 -z-10" style={{ background: 'var(--scrim-hero)' }} aria-hidden="true" />
      <div className="container-page pb-28 lg:pb-32">
        <div className="max-w-[60rem]">
          <p className="t-eyebrow" style={{ color: 'rgb(var(--c-accent-light))' }}>{t.eyebrow}</p>
          <h1 id="hero-title" className="t-h1 mt-5 text-white">
            {t.h1.map((line, i) => <span key={i} className="block">{line}</span>)}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/90 lg:text-[19px]">{t.standfirst}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <L to="/apply" className="btn btn-white">{t.primary}</L>
            <L to="/downloads" className="btn btn-outline-white">{t.secondary}</L>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  const q = useT().home.quick;
  return (
    <div className="container-page relative z-10 -mt-12">
      <nav aria-label={q.label} className="border border-rule bg-white">
        <ul className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-6">
          {q.items.map((it) => (
            <li key={it.to} className="bg-white">
              <L to={it.to} className="flex h-full min-h-[104px] flex-col items-center justify-center gap-3 px-3 py-6 text-center text-primary transition-colors duration-150 hover:bg-stone">
                <Icon name={it.icon} size={24} className="text-accent-deep" />
                <span className="text-[13px] font-semibold uppercase tracking-[0.1em]">{it.label}</span>
              </L>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const h = t.home;
  const { openEnquiry } = useUI();
  const news = sortedNews();
  const [featured, ...rest] = news;
  const events = upcomingEvents();

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: 'RKDF University Dubai',
    url: SITE_URL,
    logo: `${SITE_URL}/og/default.png`,
    description: 'The Dubai campus of RKDF University, Bhopal: seven schools and thirty-eight programmes in Dubai International Academic City.',
    telephone: '+97144286100',
    email: dubai.emailAdmissions,
    address: { '@type': 'PostalAddress', streetAddress: 'Block 11, Dubai International Academic City, Al Ruwayyah 2', addressLocality: 'Dubai', postOfficeBoxNumber: '345219', addressCountry: 'AE' },
    geo: { '@type': 'GeoCoordinates', latitude: dubai.geo.lat, longitude: dubai.geo.lng },
    sameAs: [parent.social.facebook, parent.social.twitter, parent.social.instagram, dubai.social.linkedin, dubai.social.youtube],
    parentOrganization: {
      '@type': 'CollegeOrUniversity', name: 'RKDF University', url: parent.website,
      address: { '@type': 'PostalAddress', streetAddress: 'Airport Bypass Road, Gandhi Nagar', addressLocality: 'Bhopal', addressRegion: 'Madhya Pradesh', postalCode: '462033', addressCountry: 'IN' },
      parentOrganization: { '@type': 'Organization', name: 'Ram Krishna Dharmarth Foundation' },
    },
  };

  return (
    <>
      <Seo
        title="RKDF University Dubai"
        description="RKDF University Dubai, a campus of NAAC-accredited RKDF University, Bhopal, opens in Dubai International Academic City in January 2027 with seven schools and 38 programmes."
        ogImage="/og/home.png"
        jsonLd={[orgLd]}
      />
      <Hero />
      <QuickLinks />

      {/* 01 · At a glance — Parchment */}
      <Section band="parchment" labelledBy="glance-h">
        <SectionMasthead id="glance-h" eyebrow={h.glance.eyebrow} title={h.glance.h2} />
        <StatRow stats={glance} footnote={t.common.projected} />
      </Section>

      {/* 02 · Heritage — Stone */}
      <Section band="stone" labelledBy="heritage-h">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7" {...reveal()}>
            <p className="t-eyebrow">{h.heritage.eyebrow}</p>
            <h2 id="heritage-h" className="t-h2 mt-4">{h.heritage.h2}</h2>
            <span className="gold-rule mt-6" aria-hidden="true" />
            <div className="prose-rk mt-8">
              {h.heritage.p.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="mt-8"><TertiaryLink to="/about/heritage">{h.heritage.link}</TertiaryLink></div>
          </div>
          <div className="lg:col-span-5" {...reveal(1)}>
            <ImageFrame name="libraryShelves" ratio="4 / 5" caption={h.heritage.caption} sizes="(min-width: 1024px) 520px, 100vw" />
          </div>
        </div>
        <div className="mt-24">
          <QuoteBlock quote={parent.chancellorQuote} name={h.heritage.quoteBy} role={h.heritage.quoteRole} initials="SK" />
        </div>
      </Section>

      {/* 03 · Accreditation — Parchment */}
      <Section band="parchment" labelledBy="accr-h">
        <SectionMasthead id="accr-h" eyebrow={h.accreditation.eyebrow} title={h.accreditation.h2} />
        <div className="grid gap-6 md:grid-cols-3">
          {regulators.map((r, i) => (
            <article key={r.id} className="card flex flex-col p-8" {...reveal(i)}>
              <SealMotif className="text-accent" />
              <h3 className="t-h3 mt-6">{r.name}</h3>
              <p className="mt-1 text-[14px] text-ink-55">{r.full}</p>
              <p className="mt-5 border-y border-rule py-3 text-[14px] font-semibold text-primary">{r.status}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-ink">{r.summary}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 bg-stone px-8 py-7 md:flex-row md:items-center" {...reveal()}>
          <div>
            <p className="font-serif text-[1.25rem] text-primary">{h.accreditation.stripQ}</p>
            <p className="t-small mt-1">{h.accreditation.stripText}</p>
          </div>
          <TertiaryLink to="/about/accreditation">{h.accreditation.stripLink}</TertiaryLink>
        </div>
      </Section>

      {/* 04 · Schools — Stone */}
      <Section band="stone" labelledBy="schools-h">
        <SectionMasthead id="schools-h" eyebrow={h.schools.eyebrow} title={h.schools.h2} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((s, i) => <SchoolCard key={s.slug} school={s} index={i} />)}
          <div className="flex flex-col items-center justify-center border border-rule p-10 text-center md:col-span-2 lg:col-span-2" {...reveal(1)}>
            <p className="t-eyebrow">{t.pages.programmes.title}</p>
            <p className="mt-4 max-w-[34ch] font-serif text-[1.5rem] leading-snug text-primary">{t.pages.academics.standfirst}</p>
            <span className="gold-rule mx-auto mt-6" aria-hidden="true" />
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              <TertiaryLink to="/academics">{h.schools.allLink}</TertiaryLink>
              <TertiaryLink to="/programmes">{h.finder.link}</TertiaryLink>
            </div>
          </div>
        </div>
      </Section>

      {/* 05 · Programme finder — Parchment */}
      <Section band="parchment" labelledBy="finder-h">
        <SectionMasthead id="finder-h" eyebrow={h.finder.eyebrow} title={h.finder.h2} />
        <ProgrammeTable idPrefix="home-pt" />
        <div className="mt-10 text-center"><TertiaryLink to="/programmes">{h.finder.link}</TertiaryLink></div>
      </Section>

      {/* 06 · Why — Stone */}
      <Section band="stone" labelledBy="why-h">
        <SectionMasthead id="why-h" eyebrow={h.why.eyebrow} title={h.why.h2} />
        <NumberedItems items={h.why.items.map((x) => ({ h: x.h, p: x.p }))} />
      </Section>

      {/* 07 · Admissions — Parchment */}
      <Section band="parchment" labelledBy="adm-h">
        <SectionMasthead id="adm-h" eyebrow={h.admissions.eyebrow} title={h.admissions.h2} />
        <StepSequence steps={h.admissions.steps} />
        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" {...reveal()}>
            <div className="border border-rule bg-white p-8">
              <h3 className="t-eyebrow">{h.admissions.datesHeading}</h3>
              <dl className="mt-4">
                {h.admissions.dates.map((d) => (
                  <div key={d.label} className="border-b border-rule py-5 last:border-b-0">
                    <dt className="font-serif text-[1.25rem] text-primary">{d.label}</dt>
                    <dd className="mt-1 text-[15px] text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="lg:col-span-7" {...reveal(1)}>
            <h3 className="t-eyebrow mb-4">{h.admissions.reqHeading}</h3>
            <RequirementsAccordion />
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <L to="/apply" className="btn btn-primary">{h.admissions.primary}</L>
          <button type="button" className="btn btn-secondary" onClick={() => openEnquiry()}>{h.admissions.secondary}</button>
        </div>
      </Section>

      {/* 08 · Campus & city — Stone */}
      <Section band="stone" labelledBy="campus-h">
        <SectionMasthead id="campus-h" eyebrow={h.campus.eyebrow} title={h.campus.h2} />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7" {...reveal()}>
            <ImageFrame name="campusWalk" ratio="4 / 3" caption={h.campus.captions[0]} sizes="(min-width: 1024px) 760px, 100vw" />
          </div>
          <div className="grid gap-6 lg:col-span-5">
            <div {...reveal(1)}><ImageFrame name="libraryGlass" ratio="16 / 9" caption={h.campus.captions[1]} sizes="(min-width: 1024px) 540px, 100vw" /></div>
            <div {...reveal(2)}><ImageFrame name="dubaiSkyline" ratio="16 / 9" caption={h.campus.captions[2]} sizes="(min-width: 1024px) 540px, 100vw" /></div>
          </div>
        </div>
        <div className="mt-12 border border-rule bg-white" {...reveal()}>
          <h3 className="sr-only">{h.campus.costHeading}</h3>
          <dl className="grid grid-cols-2 gap-px bg-rule lg:grid-cols-4">
            {costOfLiving.map((c) => (
              <div key={c.item} className="flex flex-col-reverse bg-white p-7 text-center">
                <dt className="t-label mt-2">{c.item} · {c.per}</dt>
                <dd className="font-serif text-[1.5rem] text-primary t-num" dir="ltr">{c.amount}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-[16px] text-ink">{h.campus.line}</p>
        <div className="mt-6 text-center"><TertiaryLink to="/student-life">{h.campus.link}</TertiaryLink></div>
      </Section>

      {/* 09 · Research — Parchment */}
      <Section band="parchment" labelledBy="research-h">
        <SectionMasthead id="research-h" eyebrow={h.research.eyebrow} title={h.research.h2} standfirst={h.research.standfirst} />
        <div className="grid gap-6 md:grid-cols-2">
          {centres.map((c, i) => (
            <article key={c.slug} className="card card-link relative flex flex-col p-8 lg:p-10" {...reveal(i % 2)}>
              <h3 className="font-serif text-[1.5rem] leading-snug text-primary">{c.name}</h3>
              <span className="gold-rule mt-5" aria-hidden="true" />
              <ul className="mt-6 flex-1 space-y-2 text-[15px] text-ink">
                {c.themes.map((th) => <li key={th} className="flex gap-3"><span className="mt-[0.8em] block h-px w-2 shrink-0 bg-accent" aria-hidden="true" />{th}</li>)}
              </ul>
              <L to={`/research/${c.slug}`} className="link-tertiary mt-8 self-start before:absolute before:inset-0 before:content-['']">
                {h.research.link} <span className="arrow" aria-hidden="true">→</span><span className="sr-only">: {c.name}</span>
              </L>
            </article>
          ))}
        </div>
        <div className="mt-16"><StatRow stats={researchStats} /></div>
      </Section>

      {/* 10 · Outcomes — Stone */}
      <Section band="stone" labelledBy="outcomes-h">
        <SectionMasthead id="outcomes-h" eyebrow={h.outcomes.eyebrow} title={h.outcomes.h2} />
        <StatRow stats={outcomes} />
        <div className="mt-20"><PartnerWall names={partners} label={h.outcomes.partners} /></div>
        <div className="mt-10 text-center"><TertiaryLink to="/careers">{h.outcomes.link}</TertiaryLink></div>
      </Section>

      {/* 11 · Voices — Parchment */}
      <Section band="parchment" labelledBy="voices-h">
        <SectionMasthead id="voices-h" eyebrow={h.voices.eyebrow} title={h.voices.h2} />
        <VoicesCarousel />
      </Section>

      {/* 12 · News & events — Stone */}
      <Section band="stone" labelledBy="news-h">
        <SectionMasthead id="news-h" eyebrow={h.news.eyebrow} title={h.news.h2} />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8" {...reveal()}>
            {featured && <NewsCard item={featured} variant="featured" />}
            <div className="mt-8 divide-y divide-rule border-t border-rule">
              {rest.slice(0, 3).map((n) => <NewsCard key={n.slug} item={n} />)}
            </div>
            <div className="mt-6"><TertiaryLink to="/news">{h.news.allNews}</TertiaryLink></div>
          </div>
          <div className="lg:col-span-4" {...reveal(1)}>
            <EventPanel events={events} heading={h.news.events} allLink={{ label: h.news.allEvents, to: '/events' }} />
          </div>
        </div>
      </Section>

      {/* 13 · Visit — Parchment */}
      <Section band="parchment" labelledBy="visit-h">
        <SectionMasthead id="visit-h" eyebrow={h.visit.eyebrow} title={h.visit.h2} />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="border border-rule bg-white p-8 lg:p-10" {...reveal()}>
            <VisitForm />
          </div>
          <div {...reveal(1)}>
            <MapEmbed />
            <ContactBlock />
          </div>
        </div>
      </Section>

      {/* Closing */}
      <section className="relative isolate flex h-[420px] items-center justify-center overflow-hidden text-center" aria-labelledby="closing-h">
        <div className="absolute inset-0 -z-10"><Picture name="campusLawn" sizes="100vw" alt="" className="block h-full w-full" /></div>
        <div className="absolute inset-0 -z-10" style={{ background: 'var(--scrim-closing)' }} aria-hidden="true" />
        <div className="container-page">
          <h2 id="closing-h" className="t-h2 text-white">{h.closing.h2}</h2>
          <span className="mx-auto mt-6 block h-px w-12 bg-accent" aria-hidden="true" />
          <p className="mx-auto mt-6 max-w-[56ch] text-[17px] text-white/90">{h.closing.text}</p>
          <L to="/apply" className="btn btn-white mt-8">{h.closing.cta}</L>
          <p className="mt-5 text-[13px] text-white/90">{h.closing.deadline}</p>
        </div>
      </section>
    </>
  );
}

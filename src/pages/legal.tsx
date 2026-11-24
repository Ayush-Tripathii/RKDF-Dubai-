import { useT, L } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section } from '@/components/blocks';
import { Prose } from './about';
import { dubai, parent } from '@content/site';
import { schools } from '@content/schools';
import { programmes } from '@content/programmes';
import { centres } from '@content/research';
import { sortedNews } from '@content/news';

const updated = '23 November 2026';

export function Privacy() {
  const p = useT().pages.privacy;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryAisle" crumbs={[{ label: p.title }]}
      seo={{ description: 'How RKDF University Dubai collects, uses, stores and protects the personal data of applicants, students and visitors.' }}>
      <Section band="parchment">
        <Prose title="Privacy notice" eyebrow={`Last updated ${updated}`}>
          <p>RKDF University Dubai (“the University”), a campus of RKDF University established by the {parent.legalBody}, is responsible for the personal data described in this notice. We process personal data in accordance with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data and applicable Dubai regulations.</p>
          <h3>What we collect</h3>
          <ul>
            <li>Information you give us in enquiry, visit, contact and application forms: your name, contact details, nationality, education history and programme of interest.</li>
            <li>Documents you upload in support of an application.</li>
            <li>Basic technical information needed to deliver this website securely.</li>
          </ul>
          <h3>How we use it</h3>
          <ul>
            <li>To respond to your enquiry and assess your application.</li>
            <li>To sponsor your student visa, if you accept an offer.</li>
            <li>To send you information you have asked for, such as our newsletter. You may unsubscribe at any time.</li>
          </ul>
          <h3>Sharing</h3>
          <p>We share personal data only where necessary: with UAE government authorities for visa and regulatory purposes, with RKDF University, Bhopal for academic administration, and with service providers bound by contract. We do not sell personal data.</p>
          <h3>Cookies and storage</h3>
          <p>This website uses your browser’s local storage only to remember your language choice and whether you have dismissed the announcement bar. It does not use advertising or tracking cookies.</p>
          <h3>Your rights</h3>
          <p>You may ask to access, correct or delete your personal data, or object to its processing. Write to the Data Protection Officer at <a href={`mailto:${dubai.emailRegistrar}`}>{dubai.emailRegistrar}</a>.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Terms() {
  const p = useT().pages.terms;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="lawLibrary" crumbs={[{ label: p.title }]}
      seo={{ description: 'Terms of use for the RKDF University Dubai website.' }}>
      <Section band="parchment">
        <Prose title="Terms of use" eyebrow={`Last updated ${updated}`}>
          <p>This website is operated by RKDF University Dubai on behalf of the {parent.legalBody}. By using it you agree to these terms.</p>
          <h3>Information on this website</h3>
          <p>We take care to keep information accurate and up to date. Programme details, fees and dates may change; the terms of your offer letter and the University’s regulations take precedence over this website.</p>
          <h3>Intellectual property</h3>
          <p>Text, design and the RKDF name and marks are the property of the {parent.legalBodyShort} or its licensors. Photography is used under licence.</p>
          <h3>Links</h3>
          <p>We are not responsible for the content of external websites linked from this site.</p>
          <h3>Governing law</h3>
          <p>These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Accessibility() {
  const p = useT().pages.accessibility;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryGlass" crumbs={[{ label: p.title }]}
      seo={{ description: 'The accessibility statement for the RKDF University Dubai website, which aims to meet WCAG 2.2 level AA.' }}>
      <Section band="parchment">
        <Prose title="Accessibility statement" eyebrow={`Last updated ${updated}`}>
          <p>RKDF University Dubai is committed to making this website usable by as many people as possible. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.</p>
          <h3>What we have done</h3>
          <ul>
            <li>Every page can be used with a keyboard alone, with a visible focus indicator and a skip link to the main content.</li>
            <li>Menus, the programme table, accordions, the testimonial carousel, dialogs and search are operable by keyboard and announced to screen readers.</li>
            <li>Text colours meet a contrast ratio of at least 4.5:1, including text over photography.</li>
            <li>Images have text alternatives; tables use proper headers.</li>
            <li>The site is available in English and Arabic, with full right-to-left layout in Arabic.</li>
            <li>Motion is minimal and is switched off if you have asked your device to reduce motion.</li>
          </ul>
          <h3>Known limitations</h3>
          <ul>
            <li>The embedded map is provided by OpenStreetMap; the address and directions are also given in text.</li>
            <li>Some long-form pages are currently available in English only within the Arabic version of the site.</li>
          </ul>
          <h3>Feedback</h3>
          <p>If you find a problem, please tell us at <a href={`mailto:${dubai.emailRegistrar}`}>{dubai.emailRegistrar}</a> or call <span dir="ltr">{dubai.phone}</span>. We aim to reply within five working days.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Sitemap() {
  const t = useT();
  const pg = t.pages;
  const groups: { h: string; links: { label: string; to: string }[] }[] = [
    { h: 'The University', links: [
      { label: pg.about.title, to: '/about' }, { label: pg.chancellor.title, to: '/about/chancellor' }, { label: pg.viceChancellor.title, to: '/about/vice-chancellor' },
      { label: pg.leadership.title, to: '/about/leadership' }, { label: pg.accreditation.title, to: '/about/accreditation' }, { label: pg.campus.title, to: '/about/campus' },
      { label: pg.heritage.title, to: '/about/heritage' }, { label: pg.global.title, to: '/global' },
    ] },
    { h: 'Academics', links: [{ label: pg.academics.title, to: '/academics' }, ...schools.map((s) => ({ label: s.name, to: `/academics/${s.slug}` }))] },
    { h: 'Programmes', links: [{ label: pg.programmes.title, to: '/programmes' }, ...programmes.map((x) => ({ label: x.title, to: `/programmes/${x.slug}` }))] },
    { h: 'Admissions', links: [
      { label: pg.admissions.title, to: '/admissions' }, { label: pg.entryRequirements.title, to: '/admissions/entry-requirements' }, { label: pg.tuition.title, to: '/admissions/tuition-and-fees' },
      { label: pg.scholarships.title, to: '/admissions/scholarships' }, { label: pg.howToApply.title, to: '/admissions/how-to-apply' }, { label: pg.international.title, to: '/admissions/international' },
      { label: pg.agents.title, to: '/admissions/agents' }, { label: pg.apply.title, to: '/apply' },
    ] },
    { h: 'Student Life', links: [
      { label: pg.studentLife.title, to: '/student-life' }, { label: pg.accommodation.title, to: '/student-life/accommodation' },
      { label: pg.societies.title, to: '/student-life/societies' }, { label: pg.support.title, to: '/student-life/support' },
    ] },
    { h: 'Research & Careers', links: [{ label: pg.research.title, to: '/research' }, ...centres.map((c) => ({ label: c.name, to: `/research/${c.slug}` })), { label: pg.careers.title, to: '/careers' }] },
    { h: 'News & Events', links: [{ label: pg.news.title, to: '/news' }, ...sortedNews().map((n) => ({ label: n.title, to: `/news/${n.slug}` })), { label: pg.events.title, to: '/events' }] },
    { h: 'Contact & Information', links: [
      { label: pg.visit.title, to: '/visit' }, { label: pg.contact.title, to: '/contact' }, { label: pg.downloads.title, to: '/downloads' },
      { label: pg.privacy.title, to: '/privacy' }, { label: pg.terms.title, to: '/terms' }, { label: pg.accessibility.title, to: '/accessibility' }, { label: pg.styleguide.title, to: '/styleguide' },
    ] },
  ];
  return (
    <PageShell title={pg.sitemap.title} standfirst={pg.sitemap.standfirst} image="libraryAisle" crumbs={[{ label: pg.sitemap.title }]}
      seo={{ description: 'Every page on the RKDF University Dubai website.' }}>
      <Section band="parchment">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <nav key={g.h} aria-label={g.h}>
              <h2 className="t-eyebrow mb-4">{g.h}</h2>
              <ul className="space-y-2 border-t border-rule pt-4 text-[15px]">
                {g.links.map((l) => <li key={l.to}><L to={l.to} className="text-primary hover:underline hover:decoration-accent hover:underline-offset-4">{l.label}</L></li>)}
              </ul>
            </nav>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

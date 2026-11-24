import type { ReactNode } from 'react';
import { useT, L } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, StatRow, QuoteBlock, PortraitCard, KeyFacts, TertiaryLink, reveal } from '@/components/blocks';
import { ImageFrame, Picture, Portrait } from '@/components/ImageFrame';
import { SealMotif } from '@/components/Icon';
import { Accordion } from '@/components/RequirementsAccordion';
import { MapEmbed, ContactBlock } from '@/components/MapEmbed';
import { parent, dubai } from '@content/site';
import { glance, facts } from '@content/stats';
import { chancellor, viceChancellor, foundingVc, governance, governanceBodies, type Leader } from '@content/staff';
import { regulators, attestationFaq } from '@content/accreditation';
import { schools } from '@content/schools';
import type { MediaKey } from '@content/media';

const aboutCrumb = { label: 'About', to: '/about' };

/** Two-column prose block with a sticky heading. */
export function Prose({ id, eyebrow, title, children, aside }: { id?: string; eyebrow?: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div id={id} className="grid gap-10 lg:grid-cols-12 lg:gap-16" {...reveal()}>
      <div className="lg:col-span-4">
        {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
        <h2 className="t-h2 mt-3">{title}</h2>
        <span className="gold-rule mt-6" aria-hidden="true" />
        {aside && <div className="mt-8">{aside}</div>}
      </div>
      <div className="prose-rk lg:col-span-8">{children}</div>
    </div>
  );
}

export function LinkCard({ to, title, text, image }: { to: string; title: string; text: string; image?: MediaKey }) {
  return (
    <article className="card card-link relative flex h-full flex-col">
      {image && (
        <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
          <Picture name={image} sizes="(min-width: 1024px) 400px, 100vw" className="block h-full w-full" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-[1.375rem] leading-snug text-primary">
          <L to={to} className="before:absolute before:inset-0 before:content-['']">{title}</L>
        </h3>
        <p className="t-small mt-3 flex-1">{text}</p>
        <span className="link-tertiary mt-6 self-start" aria-hidden="true">Read more <span className="arrow">→</span></span>
      </div>
    </article>
  );
}

export function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x) => <li key={x} className="bg-white px-5 py-4 text-[15px] text-ink">{x}</li>)}
    </ul>
  );
}

export function DraftNote({ show }: { show: boolean }) {
  if (!show) return null;
  return <p className="t-small mt-10 border-t border-rule pt-4 italic">This message is in draft and awaiting approval before publication.</p>;
}

/* ── /about ── */
export function About() {
  const t = useT();
  const p = t.pages.about;
  return (
    <PageShell
      title={p.title} standfirst={p.standfirst} image="campusQuad" crumbs={[{ label: 'About' }]}
      seo={{ description: 'RKDF University Dubai is the UAE campus of RKDF University, Bhopal — seven schools, 38 programmes and a research culture built over three decades.', ogImage: '/og/about.png' }}
      nav={[{ id: 'overview', label: 'Overview' }, { id: 'glance', label: 'At a glance' }, { id: 'principles', label: 'Principles' }, { id: 'explore', label: 'Explore' }]}
    >
      <Section band="parchment">
        <Prose id="overview" eyebrow="The University" title="A campus of RKDF University, Bhopal" aside={
          <div className="border border-rule bg-white p-6">
            <KeyFacts items={[
              { k: 'Parent body', v: parent.legalBodyShort },
              { k: 'Home campus', v: 'Bhopal, India' },
              { k: 'Dubai campus', v: 'Block 11, DIAC' },
              { k: 'Opening', v: dubai.opening },
              { k: 'Intakes', v: dubai.intakes },
            ]} />
          </div>
        }>
          <p>RKDF University Dubai is the United Arab Emirates campus of RKDF University, a private state university in Madhya Pradesh, India, established by the Ram Krishna Dharmarth Foundation. The university is accredited by NAAC and recognised by the UGC, and teaches across seventeen faculties at its home campus on Airport Bypass Road, Bhopal.</p>
          <p>The Dubai campus opens in January 2027 in Block 11, Dubai International Academic City. It brings seven schools and thirty-eight programmes — from a foundation year to master’s degrees — to a city that already educates students from almost every nation on earth.</p>
          <p>The campus is governed by the same academic regulations and quality-assurance processes as the home campus. Students can spend a semester in Bhopal without additional tuition, and the research centres in Dubai extend programmes already under way in India.</p>
          <p>We publish every fee in dirhams before you apply, teach core modules in groups of under thirty, and build a paid placement into every undergraduate degree. These are commitments, and we expect to be held to them.</p>
        </Prose>
      </Section>
      <Section band="stone" id="glance">
        <SectionMasthead eyebrow="At a glance" title="The university in figures" />
        <StatRow stats={glance} footnote={t.common.projected} />
      </Section>
      <Section band="parchment" id="principles">
        <SectionMasthead eyebrow="Our principles" title="Education Glorifies Nation" standfirst="The motto of RKDF University has always been meant practically: a university proves its worth in the lives of its graduates and the communities they serve." />
        <div className="grid gap-x-12 md:grid-cols-3">
          {[
            { h: 'Rigour', p: 'The same regulations, examinations and quality assurance as the home campus — no lighter version for an overseas campus.' },
            { h: 'Access', p: 'Published fees, five scholarship schemes, and a foundation year for students whose preparation has not yet matched their ability.' },
            { h: 'Usefulness', p: 'Research that begins with a real constraint, and degrees that include real work with real organisations.' },
          ].map((x, i) => (
            <div key={x.h} className="border-t border-rule pb-10 pt-8" {...reveal(i)}>
              <h3 className="t-h3">{x.h}</h3>
              <p className="mt-3 text-[16px] text-ink">{x.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band="stone" id="explore">
        <SectionMasthead eyebrow="Explore" title="About the university" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LinkCard to="/about/chancellor" title="Chancellor’s message" text="Dr. Sadhna Kapoor on why RKDF University has come to Dubai." image="libraryCurved" />
          <LinkCard to="/about/vice-chancellor" title="Vice-Chancellor’s message" text="Prof. Vijay K. Agrawal on teaching, research and standards." image="labGlass" />
          <LinkCard to="/about/leadership" title="Leadership & governance" text="The people and bodies responsible for the university." image="studentsNotes" />
          <LinkCard to="/about/accreditation" title="Accreditation & licensing" text="KHDA, MoHESR/CAA and the home campus’s NAAC accreditation." image="libraryGlass" />
          <LinkCard to="/about/campus" title="The Dubai campus" text="Block 11, Dubai International Academic City." image="hero" />
          <LinkCard to="/about/heritage" title="Our Bhopal heritage" text="The institution behind RKDF University Dubai." image="libraryShelves" />
        </div>
      </Section>
    </PageShell>
  );
}

/* ── Leader message template ── */
function LeaderPage({ leader, pageKey, image, description }: { leader: Leader; pageKey: 'chancellor' | 'viceChancellor'; image: MediaKey; description: string }) {
  const t = useT();
  const p = t.pages[pageKey];
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image={image} crumbs={[aboutCrumb, { label: p.title }]} seo={{ description }}>
      <Section band="parchment">
        <div className="mx-auto max-w-[46rem]">
          <div className="flex flex-col items-center text-center" {...reveal()}>
            <Portrait initials={leader.initials} size={200} alt={`Portrait of ${leader.name} — official photograph to follow`} />
            <h2 className="t-h2 mt-10">{leader.name}</h2>
            <p className="t-eyebrow mt-3">{leader.title}, {leader.institution}</p>
            {leader.postNominals && <p className="mt-4 text-[15px] text-ink">{leader.postNominals}</p>}
            {leader.qualifications && <p className="t-small">{leader.qualifications}</p>}
            <span className="gold-rule mx-auto mt-8" aria-hidden="true" />
          </div>
          <div className="mt-12 space-y-6 font-serif text-[1.25rem] leading-[1.75] text-ink" {...reveal(1)}>
            {leader.message?.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <p className="mt-10 font-serif text-[1.125rem] italic text-primary">{leader.name}</p>
          <p className="t-small">{leader.title}, {leader.institution}</p>
          {leader.honours && (
            <div className="mt-12 border-t border-rule pt-8">
              <h3 className="t-eyebrow">Honours</h3>
              <ul className="mt-4 space-y-2 text-[15px] text-ink">{leader.honours.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          )}
          <DraftNote show={leader.draft} />
          <div className="mt-12 flex flex-wrap gap-8">
            <TertiaryLink to="/about/leadership">Leadership & governance</TertiaryLink>
            <TertiaryLink to="/about/heritage">Our Bhopal heritage</TertiaryLink>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

export const Chancellor = () => (
  <LeaderPage leader={chancellor} pageKey="chancellor" image="libraryCurved" description="A message from Dr. Sadhna Kapoor, Chancellor of RKDF University, on the founding of RKDF University Dubai." />
);
export const ViceChancellor = () => (
  <LeaderPage leader={viceChancellor} pageKey="viceChancellor" image="labGlass" description="A message from Prof. Vijay K. Agrawal, Vice-Chancellor of RKDF University, on teaching, research and standards at RKDF University Dubai." />
);

/* ── /about/leadership ── */
export function Leadership() {
  const p = useT().pages.leadership;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsNotes" crumbs={[aboutCrumb, { label: p.title }]}
      seo={{ description: 'The leadership and governance of RKDF University Dubai, including the Chancellor and Vice-Chancellor of RKDF University.' }}
      nav={[{ id: 'leaders', label: 'University leadership' }, { id: 'dubai', label: 'Dubai campus' }, { id: 'governance', label: 'Governance' }]}
    >
      <Section band="parchment" id="leaders">
        <SectionMasthead eyebrow="University leadership" title="RKDF University" />
        <div className="mx-auto grid max-w-[56rem] gap-6 md:grid-cols-2">
          <PortraitCard name={chancellor.name} role={chancellor.title} detail={`${chancellor.institution}. ${chancellor.honours?.[0]}.`} initials={chancellor.initials} to="/about/chancellor" />
          <PortraitCard name={viceChancellor.name} role={viceChancellor.title} detail={`${viceChancellor.postNominals}, ${viceChancellor.qualifications}.`} initials={viceChancellor.initials} to="/about/vice-chancellor" />
        </div>
      </Section>
      <Section band="stone" id="dubai">
        <SectionMasthead eyebrow="RKDF University Dubai" title="Dubai campus leadership" standfirst="Senior appointments for the Dubai campus are being made now. Names will be published here as each appointment is confirmed." />
        <div className="mx-auto max-w-[28rem]">
          <PortraitCard name={foundingVc.name} role={foundingVc.title} detail="Appointment to be announced." initials={foundingVc.initials} />
        </div>
        <div className="mt-14 overflow-x-auto" tabIndex={0} role="region" aria-label="Senior appointments">
          <table className="table-rk">
            <caption className="sr-only">Senior appointments at RKDF University Dubai</caption>
            <thead><tr><th scope="col">Role</th><th scope="col">Office</th><th scope="col">Status</th><th scope="col">Contact</th></tr></thead>
            <tbody>
              {governance.map((g) => (
                <tr key={g.role}>
                  <th scope="row">{g.role}</th><td>{g.unit}</td><td>{g.status}</td>
                  <td>{g.email ? <a className="underline decoration-accent underline-offset-4" href={`mailto:${g.email}`}>{g.email}</a> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section band="parchment" id="governance">
        <SectionMasthead eyebrow="Governance" title="How the university is governed" />
        <dl className="mx-auto max-w-[56rem] border-t border-rule">
          {governanceBodies.map((b) => (
            <div key={b.name} className="grid gap-2 border-b border-rule py-7 md:grid-cols-3 md:gap-10" {...reveal()}>
              <dt className="font-serif text-[1.25rem] text-primary">{b.name}</dt>
              <dd className="text-[16px] text-ink md:col-span-2">{b.text}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </PageShell>
  );
}

/* ── /about/accreditation ── */
export function Accreditation() {
  const p = useT().pages.accreditation;
  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: attestationFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryGlass" crumbs={[aboutCrumb, { label: 'Accreditation' }]}
      seo={{ description: 'How RKDF University Dubai is regulated by KHDA and MoHESR/CAA, what licensure means for degree attestation, and the full list of RKDF University approvals.', ogImage: '/og/accreditation.png', jsonLd: [faqLd] }}
      nav={[{ id: 'regulators', label: 'Regulators' }, { id: 'attestation', label: 'Attestation' }, { id: 'verify', label: 'How to verify' }, { id: 'home-campus', label: 'Home-campus approvals' }]}
    >
      <Section band="parchment" id="regulators">
        <SectionMasthead eyebrow="Who regulates us" title="Three layers of accountability" standfirst="RKDF University Dubai answers to the Government of Dubai, to the federal Ministry of Higher Education and Scientific Research, and to the academic regulations of its home university in India." />
        <div className="space-y-6">
          {regulators.map((r, i) => (
            <article key={r.id} className="card grid gap-8 p-8 lg:grid-cols-12 lg:p-10" {...reveal(i)}>
              <div className="lg:col-span-4">
                <SealMotif className="text-accent" />
                <h3 className="t-h3 mt-5">{r.name}</h3>
                <p className="t-small mt-1">{r.full}</p>
                <p className="mt-5 border-y border-rule py-3 text-[14px] font-semibold text-primary">{r.status}</p>
              </div>
              <div className="prose-rk lg:col-span-8">
                <p><strong className="font-semibold text-primary">{r.summary}</strong></p>
                {r.detail.map((d, k) => <p key={k}>{d}</p>)}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section band="stone" id="attestation">
        <SectionMasthead eyebrow="Your degree" title="Attestation, equivalency and employment" />
        <div className="mx-auto max-w-[52rem]">
          <Accordion serif items={attestationFaq.map((f, i) => ({ id: `faq-${i}`, title: f.q, content: <p className="max-w-[66ch] text-[16px] text-ink">{f.a}</p> }))} />
        </div>
      </Section>
      <Section band="parchment" id="verify">
        <Prose eyebrow="Independent checks" title="How to verify our status">
          <p>You should never rely on a university’s own description of its status. Each of our regulators publishes the information you need to check it independently.</p>
          <ul>{regulators.map((r) => <li key={r.id}><strong>{r.name}.</strong> {r.verify}</li>)}</ul>
          <p>If anything you find differs from what is published on this page, please tell us at <a href={`mailto:${dubai.emailRegistrar}`}>{dubai.emailRegistrar}</a> and we will correct it.</p>
        </Prose>
      </Section>
      <Section band="stone" id="home-campus">
        <SectionMasthead eyebrow="RKDF University, Bhopal" title="Home-campus accreditations and approvals" standfirst="The complete list of accreditations, approvals and memberships held by RKDF University at its home campus." />
        <TagList items={parent.accreditations} />
        <h3 className="t-eyebrow mb-4 mt-14 text-center">Recognition</h3>
        <TagList items={parent.recognition} />
      </Section>
    </PageShell>
  );
}

/* ── /about/campus ── */
export function Campus() {
  const p = useT().pages.campus;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="hero" crumbs={[aboutCrumb, { label: p.title }]}
      seo={{ description: 'The RKDF University Dubai campus in Block 11, Dubai International Academic City: 22 laboratories and studios, library, study spaces and student facilities.', ogImage: '/og/campus.png' }}
      nav={[{ id: 'building', label: 'The building' }, { id: 'labs', label: 'Laboratories' }, { id: 'library', label: 'Library' }, { id: 'location', label: 'Location' }]}
    >
      <Section band="parchment" id="building">
        <Prose eyebrow="Block 11" title="A purpose-fitted academic building" aside={<ImageFrame name="glassFacade" ratio="4 / 5" caption="Contemporary academic architecture in Dubai International Academic City." />}>
          <p>RKDF University Dubai occupies Block 11 in Dubai International Academic City (DIAC), the district in Al Ruwayyah 2 that is home to a large community of international universities.</p>
          <p>The building has been fitted out for teaching at seminar scale. It houses seven schools, {facts.laboratories} laboratories and studios, a library and learning commons, a moot courtroom, design studios, student services, prayer rooms and a café.</p>
          <p>DIAC’s shared facilities — sports grounds, student residences and food courts — are within walking distance, and the campus is served by bus links to the Dubai Metro.</p>
        </Prose>
      </Section>
      <Section band="stone" id="labs">
        <SectionMasthead eyebrow="Teaching spaces" title={`${facts.laboratories} laboratories and studios`} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schools.flatMap((s) => s.facilities.slice(0, 1).map((f) => ({ ...f, school: s.short, image: s.image }))).concat([
            { name: 'Learning commons', text: 'Group rooms, quiet study and 24-hour access during examinations.', school: 'All schools', image: 'libraryGlass' as MediaKey },
            { name: 'Moot courtroom', text: 'A full-scale courtroom for advocacy training and public lectures.', school: 'Law & Public Policy', image: 'lawLibrary' as MediaKey },
          ]).map((f, i) => (
            <article key={f.name} className="card" {...reveal(i % 3)}>
              <div className="overflow-hidden" style={{ aspectRatio: '3 / 2' }}><Picture name={f.image} sizes="400px" className="block h-full w-full" /></div>
              <div className="p-6">
                <p className="t-eyebrow">{f.school}</p>
                <h3 className="mt-2 font-serif text-[1.25rem] text-primary">{f.name}</h3>
                <p className="t-small mt-2">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section band="parchment" id="library">
        <Prose eyebrow="Library" title="Library and learning commons" aside={<ImageFrame name="libraryCurved" ratio="4 / 3" caption="Print and electronic collections serve all seven schools." />}>
          <p>The library holds print collections for every school and provides access to major electronic journal and database collections. Students also have remote access to the digital resources of RKDF University, Bhopal, including the peer-reviewed journal Shodh Sangam.</p>
          <p>Opening hours: Sunday–Thursday 08:00–22:00, Saturday 10:00–18:00. The learning commons is open 24 hours a day during examination periods.</p>
          <p>Librarians run sessions on research skills, referencing and academic integrity throughout the year.</p>
        </Prose>
      </Section>
      <Section band="stone" id="location">
        <SectionMasthead eyebrow="Location" title="Finding the campus" />
        <div className="grid gap-10 lg:grid-cols-2">
          <MapEmbed />
          <div>
            <ContactBlock />
            <div className="prose-rk mt-10">
              <h3>Getting here</h3>
              <ul>
                <li>By car: from Emirates Road (E611), exit at Dubai International Academic City. Visitor parking is available outside Block 11.</li>
                <li>By public transport: take the Dubai Metro to a connecting station and transfer to the RTA bus serving DIAC.</li>
                <li>From Dubai International Airport: approximately 30 minutes by taxi, outside peak hours.</li>
              </ul>
            </div>
            <div className="mt-6"><TertiaryLink to="/visit">Book a campus visit</TertiaryLink></div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

/* ── /about/heritage ── */
export function Heritage() {
  const p = useT().pages.heritage;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryShelves" crumbs={[aboutCrumb, { label: p.title }]}
      seo={{ description: 'RKDF University, Bhopal: the Ram Krishna Dharmarth Foundation, seventeen faculties, NAAC accreditation, and research including the CSIR partnership and solar carbon capture.', ogImage: '/og/heritage.png' }}
      nav={[{ id: 'foundation', label: 'The Foundation' }, { id: 'faculties', label: 'Seventeen faculties' }, { id: 'research', label: 'Research' }, { id: 'recognition', label: 'Recognition' }]}
    >
      <Section band="parchment" id="foundation">
        <Prose eyebrow="Ram Krishna Dharmarth Foundation" title="The institution behind the campus" aside={
          <div className="border border-rule bg-white p-6">
            <KeyFacts items={[
              { k: 'Legal body', v: parent.legalBodyShort },
              { k: 'Status', v: 'Private state university' },
              { k: 'State', v: 'Madhya Pradesh' },
              { k: 'Chancellor', v: parent.chancellor },
              { k: 'Vice-Chancellor', v: parent.viceChancellor },
            ]} />
          </div>
        }>
          <p>RKDF University is a private state university in Madhya Pradesh, India, established by the Ram Krishna Dharmarth Foundation (RKDF). Its campus is on Airport Bypass Road, Gandhi Nagar, Bhopal.</p>
          <p>The university is accredited by the National Assessment and Accreditation Council (NAAC) and recognised by the University Grants Commission (UGC). Its professional programmes hold approvals from the relevant Indian statutory councils, including AICTE, the Pharmacy Council of India, the Bar Council of India and the Council of Architecture.</p>
          <p>Its motto is <em>Education Glorifies Nation</em>.</p>
          <p>Students and staff of the home campus use the university’s ERP portal at <a href={parent.portal} rel="noopener noreferrer">{parent.portalLabel}</a>, and the university’s website is <a href={parent.website} rel="noopener noreferrer">{parent.websiteLabel}</a>.</p>
        </Prose>
        <div className="mt-24"><QuoteBlock quote={parent.chancellorQuote} name={parent.chancellor} role="Chancellor, RKDF University" initials="SK" /></div>
      </Section>
      <Section band="stone" id="faculties">
        <SectionMasthead eyebrow="Home campus" title="Seventeen faculties" standfirst="RKDF University teaches across seventeen faculties in Bhopal, with doctoral supervision in every one." />
        <TagList items={parent.faculties} />
      </Section>
      <Section band="parchment" id="research">
        <SectionMasthead eyebrow="Research credentials" title="Research that begins with a real constraint" />
        <ol className="mx-auto max-w-[56rem] border-t border-rule">
          {parent.research.map((r, i) => (
            <li key={r} className="flex gap-6 border-b border-rule py-6" {...reveal()}>
              <span className="font-serif text-[1.5rem] leading-none text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[16px] text-ink">{r}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center"><TertiaryLink to="/research">Research at RKDF University Dubai</TertiaryLink></div>
      </Section>
      <Section band="stone" id="recognition">
        <SectionMasthead eyebrow="Recognition" title="Awards and achievements" />
        <TagList items={parent.recognition} />
        <h3 className="t-eyebrow mb-4 mt-14 text-center">Accreditations and approvals</h3>
        <TagList items={parent.accreditations} />
      </Section>
    </PageShell>
  );
}

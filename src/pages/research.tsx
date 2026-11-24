import { useParams } from 'react-router-dom';
import { useT, L } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, StatRow, PartnerWall, QuoteBlock, TertiaryLink, reveal } from '@/components/blocks';
import { ImageFrame } from '@/components/ImageFrame';
import { Prose } from './about';
import NotFound from './NotFound';
import { centres, getCentre } from '@content/research';
import { research as researchStats, outcomes } from '@content/stats';
import { partners, testimonials } from '@content/people';
import { parent } from '@content/site';

export function Research() {
  const t = useT();
  const p = t.pages.research;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="solar" crumbs={[{ label: 'Research' }]}
      seo={{ description: 'Research at RKDF University Dubai: four centres in Gulf AI, desert construction, carbon capture and public health in hot climates, building on RKDF University’s research.', ogImage: '/og/research.png' }}
      nav={[{ id: 'centres', label: 'Research centres' }, { id: 'inherited', label: 'From Bhopal' }, { id: 'figures', label: 'In figures' }]}
    >
      <Section band="parchment" id="centres">
        <SectionMasthead eyebrow={t.home.research.eyebrow} title={t.home.research.h2} standfirst={t.home.research.standfirst} />
        <div className="grid gap-6 md:grid-cols-2">
          {centres.map((c, i) => (
            <article key={c.slug} className="card card-link relative flex flex-col" {...reveal(i % 2)}>
              <div className="overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                <ImageFrame name={c.image} frame={false} ratio="16 / 9" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h2 className="font-serif text-[1.5rem] leading-snug text-primary">
                  <L to={`/research/${c.slug}`} className="before:absolute before:inset-0 before:content-['']">{c.name}</L>
                </h2>
                <p className="t-small mt-3">{c.summary}</p>
                <ul className="mt-5 flex-1 space-y-2 text-[15px] text-ink">
                  {c.themes.map((th) => <li key={th} className="flex gap-3"><span className="mt-[0.8em] block h-px w-2 shrink-0 bg-accent" aria-hidden="true" />{th}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section band="stone" id="inherited">
        <SectionMasthead eyebrow="RKDF University, Bhopal" title="The programme we inherit" />
        <ol className="mx-auto max-w-[56rem] border-t border-rule">
          {parent.research.map((r, i) => (
            <li key={r} className="flex gap-6 border-b border-rule py-6" {...reveal()}>
              <span className="font-serif text-[1.5rem] leading-none text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[16px] text-ink">{r}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section band="parchment" id="figures">
        <SectionMasthead eyebrow="In figures" title="Research at RKDF Dubai" />
        <StatRow stats={researchStats} footnote="Projected for the 2027/28 academic year, including joint projects with the home campus." />
      </Section>
    </PageShell>
  );
}

export function CentrePage() {
  const { centre = '' } = useParams();
  const c = getCentre(centre);
  if (!c) return <NotFound />;
  const others = centres.filter((x) => x.slug !== c.slug);
  return (
    <PageShell title={c.name} standfirst={c.summary} image={c.image} crumbs={[{ label: 'Research', to: '/research' }, { label: c.short }]}
      seo={{ description: `${c.name} at RKDF University Dubai: ${c.themes.join(', ')}.` }}
      nav={[{ id: 'overview', label: 'Overview' }, { id: 'projects', label: 'Projects' }, { id: 'facilities', label: 'Facilities' }, { id: 'other', label: 'Other centres' }]}
    >
      <Section band="parchment" id="overview">
        <Prose eyebrow="Research centre" title={c.short} aside={
          <ul className="space-y-2 text-[15px] text-ink">
            {c.themes.map((th) => <li key={th} className="flex gap-3"><span className="mt-[0.8em] block h-px w-2 shrink-0 bg-accent" aria-hidden="true" />{th}</li>)}
          </ul>
        }>
          {c.overview.map((o, i) => <p key={i}>{o}</p>)}
          <p>The centre works with the {c.schools.join(' and the ')}.</p>
        </Prose>
      </Section>
      <Section band="stone" id="projects">
        <SectionMasthead eyebrow="Projects" title="Current and planned work" />
        <div className="grid gap-6 md:grid-cols-3">
          {c.projects.map((pr, i) => (
            <article key={pr.title} className="card p-8" {...reveal(i)}>
              <p className="font-serif text-[1.25rem] text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="t-h3 mt-3">{pr.title}</h3>
              <p className="mt-3 text-[15px] text-ink">{pr.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section band="parchment" id="facilities">
        <Prose eyebrow="Facilities" title="Equipment and spaces" aside={<ImageFrame name={c.image} ratio="4 / 3" />}>
          <ul>{c.facilities.map((f) => <li key={f}>{f}</li>)}</ul>
          <p>Doctoral and postdoctoral enquiries are welcome. Ph.D. supervision is offered under the regulations of RKDF University, which supervises doctoral research across all its faculties.</p>
        </Prose>
      </Section>
      <Section band="stone" id="other">
        <SectionMasthead eyebrow="Research" title="Other centres" />
        <ul className="mx-auto grid max-w-[60rem] gap-px border border-rule bg-rule md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="bg-white">
              <L to={`/research/${o.slug}`} className="block p-7 transition-colors duration-150 hover:bg-parchment">
                <span className="font-serif text-[1.125rem] text-primary">{o.name}</span>
                <span className="t-small mt-2 block">{o.themes.join(' · ')}</span>
              </L>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}

export function Careers() {
  const t = useT();
  const p = t.pages.careers;
  const q = testimonials[1];
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="sharedDesk" crumbs={[{ label: 'Careers' }]}
      seo={{ description: 'Careers and outcomes at RKDF University Dubai: a paid twelve-week placement in every undergraduate degree, 310 partner organisations, and two years of support after graduation.', ogImage: '/og/careers.png' }}
      nav={[{ id: 'outcomes', label: 'Outcomes' }, { id: 'placements', label: 'Placements' }, { id: 'partners', label: 'Partners' }, { id: 'employers', label: 'For employers' }]}
    >
      <Section band="parchment" id="outcomes">
        <SectionMasthead eyebrow={t.home.outcomes.eyebrow} title={t.home.outcomes.h2} />
        <StatRow stats={outcomes} footnote="Projected outcomes, based on graduate outcomes at the home campus and partner commitments." />
      </Section>
      <Section band="stone" id="placements">
        <Prose eyebrow="Placements" title="A paid placement in every degree">
          <p>Every undergraduate degree includes a paid twelve-week placement, usually in the summer before the final year. The careers team finds and vets placement hosts, prepares students through workshops and mock interviews, and visits every student during the placement.</p>
          <p>Placements are assessed, and count towards the degree. Many students are offered graduate roles by their placement host.</p>
          <h3>Two years of support</h3>
          <p>Graduates keep full access to the careers service — appointments, vacancies and events — for two years after graduation.</p>
        </Prose>
        <div className="mt-20"><QuoteBlock quote={q.quote} name={q.name} role={`${q.programme} · ${q.country}`} portrait={q.portrait} /></div>
      </Section>
      <Section band="parchment" id="partners">
        <SectionMasthead eyebrow="Partners" title="Placement and employer partners" />
        <PartnerWall names={partners} label={t.home.outcomes.partners} />
      </Section>
      <Section band="stone" id="employers">
        <Prose eyebrow="For employers" title="Host a placement student">
          <p>Organisations of every size host RKDF Dubai students. Hosting a placement is a low-risk way to meet strong graduates early, and our careers team handles the administration.</p>
          <p><L to="/contact">Contact the careers team</L></p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Global() {
  const p = useT().pages.global;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryStacks" crumbs={[{ label: 'Global network' }]}
      seo={{ description: 'RKDF University Dubai and the home campus in Bhopal: a semester in Bhopal with no additional tuition, transfer between campuses and the RKDF alumni network.' }}
      nav={[{ id: 'bhopal', label: 'The Bhopal campus' }, { id: 'semester', label: 'A semester in Bhopal' }, { id: 'transfer', label: 'Transfer' }, { id: 'alumni', label: 'Alumni' }]}
    >
      <Section band="parchment" id="bhopal">
        <Prose eyebrow="Home campus" title="RKDF University, Bhopal" aside={<ImageFrame name="libraryStacks" ratio="4 / 5" caption="Collections that serve seventeen faculties at the home campus." />}>
          <p>RKDF University’s home campus is on Airport Bypass Road, Gandhi Nagar, Bhopal, in Madhya Pradesh, India. It teaches across seventeen faculties and is accredited by NAAC and recognised by the UGC.</p>
          <p>Visit the home campus website at <a href={parent.website} rel="noopener noreferrer">{parent.websiteLabel}</a>.</p>
          <p><L to="/about/heritage">Our Bhopal heritage</L></p>
        </Prose>
      </Section>
      <Section band="stone" id="semester">
        <Prose eyebrow="Exchange" title="A semester in Bhopal">
          <p>Every RKDF Dubai undergraduate may spend one semester at the home campus without additional tuition. Modules are matched in advance, so the semester counts fully towards the degree, and students are examined under the same regulations.</p>
          <p>Students pay their own travel and accommodation; university hostel places are available in Bhopal at modest cost. The International Student Office helps with visas and preparation.</p>
          <p>Students from Bhopal may also spend a semester in Dubai, subject to visa requirements.</p>
        </Prose>
      </Section>
      <Section band="parchment" id="transfer">
        <Prose eyebrow="Transfer" title="Transferring between campuses">
          <p>Because both campuses teach under the same academic regulations, students may apply to transfer between Dubai and Bhopal at the end of an academic year, subject to the programme being offered at both campuses and to the fees applicable at the receiving campus.</p>
        </Prose>
      </Section>
      <Section band="stone" id="alumni">
        <Prose eyebrow="Alumni" title="The RKDF alumni network">
          <p>RKDF graduates work across India, the Gulf and beyond — including an alumnus who contributed to India’s Chandrayaan-3 mission. Dubai graduates join the same network.</p>
          <p>The children and siblings of graduates of any RKDF institution are eligible for the <L to="/admissions/scholarships">RKDF Alumni Family Scholarship</L>.</p>
        </Prose>
        <div className="mt-10 text-center"><TertiaryLink to="/contact">Contact the alumni office</TertiaryLink></div>
      </Section>
    </PageShell>
  );
}

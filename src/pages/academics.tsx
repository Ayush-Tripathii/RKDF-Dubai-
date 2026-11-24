import { useParams } from 'react-router-dom';
import { useT, L } from '@/lib/locale';
import { useUI } from '@/lib/ui';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, SchoolCard, ProgrammeCard, KeyFacts, StepSequence, TertiaryLink, reveal } from '@/components/blocks';
import { ImageFrame, Portrait } from '@/components/ImageFrame';
import { ProgrammeTable } from '@/components/ProgrammeTable';
import { Prose } from './about';
import NotFound from './NotFound';
import { schools, getSchool, schoolProgrammes, programmeCount, totalProgrammes } from '@content/schools';
import { getProgramme, programmes, formatAED, intakeLabel, levelLabel } from '@content/programmes';
import { curricula, english, postgraduate } from '@content/requirements';
import { otherFees, scholarships } from '@content/fees';
import { centres } from '@content/research';
import { SITE_URL, keyDates } from '@content/site';

/* ── /academics ── */
export function Academics() {
  const p = useT().pages.academics;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="lectureTheatre" crumbs={[{ label: 'Academics' }]}
      seo={{ description: `The seven schools of RKDF University Dubai, offering ${totalProgrammes} programmes in computing, business, engineering, health, law, design and foundation study.`, ogImage: '/og/academics.png' }}>
      <Section band="parchment">
        <SectionMasthead eyebrow="Academic schools" title="Seven schools. Thirty-eight programmes." standfirst="Each school builds on a corresponding faculty at RKDF University, Bhopal, and is taught under the same academic regulations." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schools.map((s, i) => <SchoolCard key={s.slug} school={s} index={i} />)}
        </div>
      </Section>
      <Section band="stone">
        <SectionMasthead eyebrow="Programme count" title="How the programmes divide" />
        <div className="mx-auto max-w-[48rem] overflow-x-auto" tabIndex={0} role="region" aria-label="Programmes by school" dir="ltr">
          <table className="table-rk">
            <caption className="sr-only">Number of programmes in each school</caption>
            <thead><tr><th scope="col">School</th><th scope="col" className="num">Programmes</th></tr></thead>
            <tbody>
              {schools.map((s) => (
                <tr key={s.slug}><th scope="row"><L to={`/academics/${s.slug}`} className="hover:underline hover:decoration-accent hover:underline-offset-4">{s.name}</L></th><td className="num">{programmeCount(s.slug)}</td></tr>
              ))}
              <tr><th scope="row">Total</th><td className="num font-semibold">{totalProgrammes}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10 text-center"><TertiaryLink to="/programmes">Open the programme finder</TertiaryLink></div>
      </Section>
    </PageShell>
  );
}

/* ── /academics/:school ── */
export function SchoolPage() {
  const { school: slug = '' } = useParams();
  const s = getSchool(slug);
  const { openEnquiry } = useUI();
  if (!s) return <NotFound />;
  const { flagship, additional } = schoolProgrammes(s.slug);
  const relatedCentres = centres.filter((c) => c.schools.includes(s.name));
  return (
    <PageShell title={s.name} standfirst={s.description} image={s.image} crumbs={[{ label: 'Academics', to: '/academics' }, { label: s.short }]}
      seo={{ description: `${s.name} at RKDF University Dubai: ${programmeCount(s.slug)} programmes. ${s.description}` }}
      nav={[{ id: 'overview', label: 'Overview' }, { id: 'dean', label: 'Dean’s message' }, { id: 'programmes', label: 'Programmes' }, { id: 'facilities', label: 'Facilities' }, { id: 'research', label: 'Research' }, { id: 'faculty', label: 'Faculty' }]}
    >
      <Section band="parchment" id="overview">
        <Prose eyebrow="Overview" title={s.short} aside={<p className="font-serif text-[3.5rem] leading-none text-primary t-num">{programmeCount(s.slug)}<span className="t-label mt-3 block">Programmes</span></p>}>
          {s.overview.map((o, i) => <p key={i}>{o}</p>)}
        </Prose>
      </Section>
      <Section band="stone" id="dean">
        <div className="mx-auto grid max-w-[60rem] items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14" {...reveal()}>
          <Portrait initials="D" size={160} alt="Portrait of the founding dean — appointment to be announced" />
          <div>
            <p className="t-eyebrow">From the founding dean</p>
            <div className="mt-6 space-y-5 font-serif text-[1.25rem] leading-[1.7] text-ink">
              {s.deanMessage.map((m, i) => <p key={i}>{m}</p>)}
            </div>
            <span className="gold-rule mt-8" aria-hidden="true" />
            <p className="mt-4 font-semibold text-primary">Founding Dean, {s.name}</p>
            <p className="t-small">Appointment to be announced.</p>
          </div>
        </div>
      </Section>
      <Section band="parchment" id="programmes">
        <SectionMasthead eyebrow="Programmes" title={`${programmeCount(s.slug)} programmes`} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {flagship.map((p) => <ProgrammeCard key={p.slug} p={p} />)}
        </div>
        {additional.length > 0 && (
          <div className="mt-14">
            <h3 className="t-eyebrow mb-4">Also in this school</h3>
            <ul className="border-t border-rule">
              {additional.map((a) => (
                <li key={a.title} className="flex flex-col justify-between gap-1 border-b border-rule py-4 sm:flex-row sm:items-center">
                  <span className="font-serif text-[1.125rem] text-primary">{a.title}</span>
                  <span className="t-small">{levelLabel[a.level]} · Full details in the September 2027 prospectus</span>
                </li>
              ))}
            </ul>
            <button type="button" className="link-tertiary mt-6" onClick={() => openEnquiry()}>Ask about these programmes</button>
          </div>
        )}
      </Section>
      <Section band="stone" id="facilities">
        <SectionMasthead eyebrow="Facilities" title="Where you will learn" />
        <div className="grid gap-x-12 md:grid-cols-3">
          {s.facilities.map((f, i) => (
            <div key={f.name} className="border-t border-rule pb-8 pt-8" {...reveal(i)}>
              <h3 className="t-h3">{f.name}</h3>
              <p className="mt-3 text-[16px] text-ink">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band="parchment" id="research">
        <Prose eyebrow="Research" title="Research activity">
          <p>Academic staff in the {s.short} school are active in the following areas:</p>
          <ul>{s.research.map((r) => <li key={r}>{r}</li>)}</ul>
          {relatedCentres.length > 0 && (
            <p>The school works with {relatedCentres.map((c, i) => (
              <span key={c.slug}>{i > 0 && ' and '}<L to={`/research/${c.slug}`}>{c.name}</L></span>
            ))}.</p>
          )}
        </Prose>
      </Section>
      <Section band="stone" id="faculty">
        <SectionMasthead eyebrow="Faculty" title="Founding academic appointments" standfirst="Appointments are being made now. Names, qualifications and research profiles will be published here as each is confirmed." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {s.faculty.map((f, i) => (
            <div key={i} className="card flex flex-col items-center p-7 text-center" {...reveal(i % 4)}>
              <Portrait initials={f.role.split(' ').map((w) => w[0]).join('').slice(0, 2)} size={96} alt={`${f.role} of ${f.area} — appointment to be announced`} />
              <p className="mt-5 font-serif text-[1.125rem] text-primary">{f.role}</p>
              <p className="t-eyebrow mt-1">{f.area}</p>
              <p className="t-small mt-3">Appointment to be announced</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

/* ── /programmes ── */
export function Programmes() {
  const p = useT().pages.programmes;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsLibrary" crumbs={[{ label: 'Programmes' }]}
      seo={{ description: 'Find a programme at RKDF University Dubai. Filter fifteen flagship programmes by level, school, intake, duration and annual tuition in dirhams.', ogImage: '/og/programmes.png' }}>
      <Section band="parchment">
        <SectionMasthead eyebrow="Find your programme" title="Fifteen programmes, openly priced" standfirst={`Our fifteen flagship programmes for 2027 are listed below with full fees. All ${totalProgrammes} programmes are listed on the school pages.`} />
        <ProgrammeTable idPrefix="pf" />
      </Section>
      <Section band="stone">
        <SectionMasthead eyebrow="Before you apply" title="Entry requirements and fees" />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { to: '/admissions/entry-requirements', h: 'Entry requirements', p: 'Minimum requirements for six curricula, and English language requirements.' },
            { to: '/admissions/tuition-and-fees', h: 'Tuition & fees', p: 'The full fee schedule in dirhams, with payment plans and other costs.' },
            { to: '/admissions/scholarships', h: 'Scholarships', p: 'Five schemes, from 10% of tuition to full tuition.' },
          ].map((c, i) => (
            <div key={c.to} className="card card-link relative p-8" {...reveal(i)}>
              <h3 className="t-h3"><L to={c.to} className="before:absolute before:inset-0 before:content-['']">{c.h}</L></h3>
              <p className="t-small mt-3">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}

/* ── /programmes/:slug — programme detail template ── */
export function ProgrammeDetail() {
  const { slug = '' } = useParams();
  const p = getProgramme(slug);
  const { openEnquiry } = useUI();
  if (!p) return <NotFound />;
  const school = getSchool(p.school)!;
  const related = p.related.map(getProgramme).filter(Boolean) as typeof programmes;
  const years = p.durationMonths / 12;
  const isPG = p.level === 'PG';
  const tuitionLine = p.tuitionBasis === 'annual' ? `${formatAED(p.tuition)} per year` : `${formatAED(p.tuition)} for the full programme`;
  const totalEstimate = p.tuitionBasis === 'annual' ? p.tuition * years : p.tuition;

  const courseLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.title,
    description: p.summary,
    courseCode: p.code,
    educationalCredentialAwarded: p.award,
    provider: { '@type': 'CollegeOrUniversity', name: 'RKDF University Dubai', sameAs: SITE_URL },
    offers: { '@type': 'Offer', category: 'Paid', price: p.tuition, priceCurrency: 'AED' },
    hasCourseInstance: p.intakes.map((i) => ({
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      startDate: i === 'Jan' ? '2027-01-10' : '2027-09-12',
      location: 'Block 11, Dubai International Academic City, Dubai, UAE',
      courseWorkload: `P${p.durationMonths}M`,
    })),
  };

  const rail = (
    <div className="border border-rule bg-white p-7">
      <p className="t-eyebrow">Key facts</p>
      <div className="mt-3">
        <KeyFacts items={[
          { k: 'Award', v: p.award },
          { k: 'Duration', v: p.durationLabel },
          { k: 'Intake', v: intakeLabel(p.intakes) },
          { k: 'Study mode', v: p.mode },
          { k: 'Tuition', v: <span className="t-num">{tuitionLine}</span> },
          { k: 'School', v: <L to={`/academics/${school.slug}`} className="underline decoration-accent underline-offset-4">{school.short}</L> },
          { k: 'Programme code', v: <span className="t-num">{p.code}</span> },
        ]} />
      </div>
      <div className="mt-6 grid gap-3">
        <L to={`/apply?programme=${p.slug}`} className="btn btn-primary w-full">Apply</L>
        <button type="button" className="btn btn-secondary w-full" onClick={() => openEnquiry(p.slug)}>Enquire</button>
      </div>
    </div>
  );

  return (
    <PageShell title={p.title} standfirst={p.summary} image={p.image} crumbs={[{ label: 'Programmes', to: '/programmes' }, { label: p.title }]}
      seo={{ description: `${p.title} at RKDF University Dubai: ${p.durationLabel}, ${intakeLabel(p.intakes)} intake, ${tuitionLine}. ${p.summary}`, jsonLd: [courseLd] }}
      nav={[{ id: 'overview', label: 'Overview' }, { id: 'study', label: 'What you will study' }, { id: 'entry', label: 'Entry requirements' }, { id: 'fees', label: 'Fees & funding' }, { id: 'careers', label: 'Careers' }, { id: 'apply', label: 'How to apply' }]}
    >
      <div className="band-parchment">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24 [&>*]:min-w-0">
          <div className="lg:hidden">{rail}</div>
          <div className="space-y-24 lg:col-span-8">
            <section id="overview" aria-labelledby="ov-h">
              <p className="t-eyebrow">{levelLabel[p.level]} · {school.name}</p>
              <h2 id="ov-h" className="t-h2 mt-3">Overview</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              <div className="prose-rk mt-8">{p.overview.map((o, i) => <p key={i}>{o}</p>)}</div>
              <ImageFrame name={p.image} className="mt-10" caption={school.description} sizes="(min-width: 1024px) 820px, 100vw" />
            </section>

            <section id="study" aria-labelledby="st-h">
              <h2 id="st-h" className="t-h2">What you will study</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              <p className="t-small mt-6 max-w-[60ch]">Module titles are indicative and may change as the curriculum is reviewed. Core modules are taught in groups of under thirty.</p>
              <div className="mt-10 grid gap-px border border-rule bg-rule md:grid-cols-2">
                {p.structure.map((y) => (
                  <div key={y.label} className="bg-white p-7">
                    <h3 className="font-serif text-[1.25rem] text-primary">{y.label}</h3>
                    <ul className="mt-4 space-y-2 text-[15px] text-ink">
                      {y.modules.map((m) => <li key={m} className="flex gap-3"><span className="mt-[0.8em] block h-px w-2 shrink-0 bg-accent" aria-hidden="true" />{m}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="entry" aria-labelledby="en-h">
              <h2 id="en-h" className="t-h2">Entry requirements</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              {isPG ? (
                <ul className="prose-rk mt-8">{postgraduate.map((x) => <li key={x}>{x}</li>)}</ul>
              ) : (
                <div className="mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="Entry requirements by curriculum" dir="ltr">
                  <table className="table-rk">
                    <caption className="sr-only">Minimum entry requirements for {p.title} by curriculum</caption>
                    <thead><tr><th scope="col">Curriculum</th><th scope="col">{p.level === 'FD' ? 'Foundation Year' : 'Direct entry'}</th><th scope="col">Notes</th></tr></thead>
                    <tbody>
                      {curricula.map((c) => (
                        <tr key={c.id}><th scope="row">{c.name}</th><td>{p.level === 'FD' ? c.foundation : c.ug}</td><td className="text-ink-55">{c.notes}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <h3 className="t-h3 mt-10">English language</h3>
              <ul className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                {english.map((e) => (
                  <li key={e.test} className="bg-white p-5">
                    <p className="t-label">{e.test}</p>
                    <p className="mt-2 font-serif text-[1.5rem] text-primary t-num">{e.score}</p>
                    <p className="t-small">{e.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6"><TertiaryLink to="/admissions/entry-requirements">Full entry requirements</TertiaryLink></div>
            </section>

            <section id="fees" aria-labelledby="fe-h">
              <h2 id="fe-h" className="t-h2">Fees and funding</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                <div className="bg-white p-7">
                  <p className="t-label">Tuition</p>
                  <p className="mt-2 font-serif text-[2.25rem] leading-none text-primary t-num">{formatAED(p.tuition)}</p>
                  <p className="t-small mt-2">{p.tuitionBasis === 'annual' ? 'per year, fixed for the length of your programme' : 'for the full programme'}</p>
                </div>
                <div className="bg-white p-7">
                  <p className="t-label">Total tuition</p>
                  <p className="mt-2 font-serif text-[2.25rem] leading-none text-primary t-num">{formatAED(totalEstimate)}</p>
                  <p className="t-small mt-2">over {p.durationLabel}, before any scholarship</p>
                </div>
              </div>
              <div className="mt-8 overflow-x-auto" tabIndex={0} role="region" aria-label="Other fees" dir="ltr">
                <table className="table-rk">
                  <caption className="sr-only">Other fees</caption>
                  <thead><tr><th scope="col">Item</th><th scope="col" className="num">Amount</th><th scope="col">Note</th></tr></thead>
                  <tbody>{otherFees.slice(0, 4).map((f) => <tr key={f.item}><th scope="row" className="!font-normal">{f.item}</th><td className="num">{f.amount}</td><td className="text-ink-55">{f.note}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="mt-6 text-[16px] text-ink">You may be eligible for one of our {scholarships.length} scholarship schemes, worth between 10% of tuition and full tuition.</p>
              <div className="mt-4 flex flex-wrap gap-8">
                <TertiaryLink to="/admissions/scholarships">Scholarships</TertiaryLink>
                <TertiaryLink to="/admissions/tuition-and-fees">Full fee schedule</TertiaryLink>
              </div>
            </section>

            <section id="careers" aria-labelledby="ca-h">
              <h2 id="ca-h" className="t-h2">Careers and typical destinations</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                {p.careers.map((c) => <li key={c} className="bg-white px-6 py-5 font-serif text-[1.125rem] text-primary">{c}</li>)}
              </ul>
              {!isPG && p.level !== 'FD' && <p className="mt-6 max-w-[66ch] text-[16px] text-ink">Every undergraduate completes a paid twelve-week placement with one of our partner organisations, and receives careers support for two years after graduating.</p>}
              <div className="mt-6"><TertiaryLink to="/careers">Careers and outcomes</TertiaryLink></div>
            </section>

            <section id="apply" aria-labelledby="ap-h">
              <h2 id="ap-h" className="t-h2">How to apply</h2>
              <span className="gold-rule mt-6" aria-hidden="true" />
              <div className="mt-10"><StepSequence steps={['Choose your programme', 'Submit your application', 'Assessment & interview', 'Receive your offer', 'Enrol and arrive']} /></div>
              <p className="mt-10 text-[16px] text-ink">Applications for January 2027 close on <time dateTime={keyDates.jan2027Close}>18 December 2026</time>. Applications for September 2027 open on <time dateTime={keyDates.sep2027Open}>5 January 2027</time>.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <L to={`/apply?programme=${p.slug}`} className="btn btn-primary">Apply for this programme</L>
                <button type="button" className="btn btn-secondary" onClick={() => openEnquiry(p.slug)}>Speak to an admissions counsellor</button>
              </div>
            </section>
          </div>
          <aside className="hidden lg:col-span-4 lg:block" aria-label="Programme summary">
            <div className="sticky top-[140px]">{rail}</div>
          </aside>
        </div>
      </div>
      <Section band="stone">
        <SectionMasthead eyebrow="Related programmes" title="You might also consider" />
        <div className="grid gap-6 md:grid-cols-3">{related.map((r) => <ProgrammeCard key={r.slug} p={r} />)}</div>
      </Section>
    </PageShell>
  );
}

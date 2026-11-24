import { useT, L } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, QuoteBlock, TertiaryLink, reveal } from '@/components/blocks';
import { ImageFrame } from '@/components/ImageFrame';
import { Prose, LinkCard } from './about';
import { costOfLiving } from '@content/fees';
import { facts } from '@content/stats';
import { testimonials } from '@content/people';
import { dubai } from '@content/site';

const slCrumb = { label: 'Student Life', to: '/student-life' };

export function StudentLife() {
  const p = useT().pages.studentLife;
  const q = testimonials[0];
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsLaptops" crumbs={[{ label: 'Student Life' }]}
      seo={{ description: 'Student life at RKDF University Dubai: accommodation, 31 societies, sport, faith facilities, wellbeing and support in Dubai International Academic City.', ogImage: '/og/student-life.png' }}>
      <Section band="parchment">
        <Prose eyebrow="Student life" title="A small campus in a very large city" aside={<ImageFrame name="studentsLibrary" ratio="4 / 5" caption="Seminar-scale teaching means students know each other — and their tutors." />}>
          <p>RKDF University Dubai is deliberately small. With core modules taught in groups of under thirty, students get to know their tutors and each other quickly.</p>
          <p>Around the campus is Dubai International Academic City, a district of international universities with shared sports grounds, residences and cafés. Beyond it is one of the world’s most international cities — {facts.societies} student societies are a way into it, not a substitute for it.</p>
          <p>Student visas are sponsored by the university — one year, renewable. On campus there are prayer rooms, 24-hour study spaces during examinations, and a wellbeing service open to every student.</p>
        </Prose>
      </Section>
      <Section band="stone">
        <SectionMasthead eyebrow="Explore" title="Living and studying in Dubai" />
        <div className="grid gap-6 md:grid-cols-3">
          <LinkCard to="/student-life/accommodation" title="Accommodation" text="Shared housing, studios and what they cost." image="whiteFacade" />
          <LinkCard to="/student-life/societies" title="Societies, sport & faith" text={`${facts.societies} societies, ${facts.sportsFacilities} sports facilities and prayer rooms.`} image="studentsSeminar" />
          <LinkCard to="/student-life/support" title="Support & wellbeing" text="Counselling, accessibility and academic support." image="libraryGlass" />
        </div>
      </Section>
      <Section band="parchment">
        <QuoteBlock quote={q.quote} name={q.name} role={`${q.programme} · ${q.country}`} portrait={q.portrait} />
      </Section>
    </PageShell>
  );
}

export function Accommodation() {
  const p = useT().pages.accommodation;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="whiteFacade" crumbs={[slCrumb, { label: p.title }]}
      seo={{ description: 'Student accommodation near RKDF University Dubai: shared housing from AED 2,800 a month, studios from AED 4,500, and living costs in Dubai.' }}
      nav={[{ id: 'options', label: 'Options' }, { id: 'costs', label: 'Costs' }, { id: 'help', label: 'Help finding housing' }]}
    >
      <Section band="parchment" id="options">
        <SectionMasthead eyebrow="Where to live" title="Housing options" />
        <div className="grid gap-x-12 md:grid-cols-3">
          {[
            { h: 'Shared housing', p: 'A private bedroom in a shared apartment with other students, usually within a short bus ride of campus. AED 2,800–4,200 a month.' },
            { h: 'Studio apartments', p: 'Self-contained studios in nearby communities for students who prefer to live alone. AED 4,500–6,500 a month.' },
            { h: 'Living with family', p: 'Many students live with family in Dubai or Sharjah. The campus is reachable by car and public transport from most of the city.' },
          ].map((x, i) => (
            <div key={x.h} className="border-t border-rule pb-10 pt-8" {...reveal(i)}>
              <h3 className="t-h3">{x.h}</h3>
              <p className="mt-3 text-[16px] text-ink">{x.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band="stone" id="costs">
        <SectionMasthead eyebrow="Costs" title="Typical monthly costs" />
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Typical costs" dir="ltr">
          <table className="table-rk mx-auto max-w-[48rem]">
            <caption className="sr-only">Typical living costs in Dubai</caption>
            <thead><tr><th scope="col">Item</th><th scope="col" className="num">Cost</th><th scope="col">Basis</th></tr></thead>
            <tbody>{costOfLiving.map((c) => <tr key={c.item}><th scope="row">{c.item}</th><td className="num">{c.amount}</td><td>{c.per}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="t-small mx-auto mt-4 max-w-[48rem]">Rents usually exclude utilities (electricity, water and cooling), which typically add AED 300–600 a month in shared housing.</p>
      </Section>
      <Section band="parchment" id="help">
        <Prose eyebrow="Support" title="Help finding housing">
          <p>Our accommodation team maintains a list of vetted housing providers near Dubai International Academic City and can help you arrange housing before you travel.</p>
          <p>Write to <a href={`mailto:${dubai.emailAdmissions}`}>{dubai.emailAdmissions}</a> once you have accepted your offer.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Societies() {
  const p = useT().pages.societies;
  const groups = [
    { h: 'Academic & professional', items: ['AI & Data Society', 'Engineering Society', 'Law & Moot Society', 'Finance & Investment Society', 'Design Collective', 'Health Sciences Society'] },
    { h: 'Culture & community', items: ['South Asian Society', 'Arab Cultural Society', 'African Students’ Union', 'Debating Society', 'Film Society', 'Volunteering & Outreach'] },
    { h: 'Sport', items: ['Cricket', 'Football', 'Basketball', 'Badminton', 'Running Club', 'Chess'] },
  ];
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsSeminar" crumbs={[slCrumb, { label: p.title }]}
      seo={{ description: 'Thirty-one student societies, four sports facilities and prayer rooms at RKDF University Dubai.' }}
      nav={[{ id: 'societies', label: 'Societies' }, { id: 'sport', label: 'Sport' }, { id: 'faith', label: 'Faith' }]}
    >
      <Section band="parchment" id="societies">
        <SectionMasthead eyebrow="Societies" title={`${facts.societies} student societies`} standfirst="Societies are run by students, funded by the Student Council, and open to everyone. Any five students can propose a new one." />
        <div className="grid gap-x-12 md:grid-cols-3">
          {groups.map((g, i) => (
            <div key={g.h} className="border-t border-rule pb-10 pt-8" {...reveal(i)}>
              <h3 className="t-h3">{g.h}</h3>
              <ul className="mt-4 space-y-2 text-[16px] text-ink">{g.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="t-small text-center">A selection of the societies planned for the first year.</p>
      </Section>
      <Section band="stone" id="sport">
        <Prose eyebrow="Sport" title="Four sports facilities">
          <p>Students have access to four sports facilities: a multi-purpose indoor hall, a fitness suite on campus, and shared outdoor pitches and courts in Dubai International Academic City.</p>
          <p>Teams compete in inter-university leagues in Dubai, and the Student Council runs a programme of recreational sport each semester.</p>
        </Prose>
      </Section>
      <Section band="parchment" id="faith">
        <Prose eyebrow="Faith" title="Faith and reflection">
          <p>The campus has separate prayer rooms for men and women, with ablution facilities, and a quiet room open to students of all faiths and none.</p>
          <p>Timetables respect Friday prayers, and the academic calendar accounts for Ramadan, Eid and Diwali.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

export function Support() {
  const p = useT().pages.support;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryGlass" crumbs={[slCrumb, { label: p.title }]}
      seo={{ description: 'Wellbeing, counselling, accessibility and academic support for students at RKDF University Dubai.' }}
      nav={[{ id: 'wellbeing', label: 'Wellbeing' }, { id: 'accessibility', label: 'Accessibility' }, { id: 'academic', label: 'Academic support' }, { id: 'health', label: 'Health' }]}
    >
      <Section band="parchment" id="wellbeing">
        <Prose eyebrow="Wellbeing" title="Counselling and wellbeing">
          <p>Every student can see a qualified counsellor, confidentially and free of charge. Appointments are available in English, Arabic and Hindi, in person or online.</p>
          <p>The wellbeing team also runs workshops on managing stress, sleep and study, and on settling into life in a new country.</p>
          <p>If you are in immediate danger, call 999 (police) or 998 (ambulance) in the UAE.</p>
        </Prose>
      </Section>
      <Section band="stone" id="accessibility">
        <Prose eyebrow="Accessibility" title="Disability and accessibility">
          <p>Students with a disability, a long-term health condition or a specific learning difference can arrange an individual support plan. This might include extra time in examinations, accessible formats for course materials, note-taking support or adjustments to teaching spaces.</p>
          <p>The Block 11 building has step-free access throughout, accessible toilets on every floor, and hearing loops in the main teaching rooms.</p>
          <p>Please tell us about your needs when you apply, or at any time afterwards — the earlier we know, the more we can prepare.</p>
        </Prose>
      </Section>
      <Section band="parchment" id="academic">
        <Prose eyebrow="Academic support" title="Help with your studies">
          <ul>
            <li>Personal tutors for every student, meeting at least twice a semester.</li>
            <li>A study skills centre for writing, mathematics and study planning.</li>
            <li>Library sessions on research skills and academic integrity.</li>
            <li>Peer mentoring from students in later years.</li>
          </ul>
        </Prose>
      </Section>
      <Section band="stone" id="health">
        <Prose eyebrow="Health" title="Health services">
          <p>A nurse is available on campus during teaching hours. All students are covered by health insurance, which gives access to clinics and hospitals across Dubai.</p>
          <p><L to="/admissions/international#insurance">Student health insurance</L></p>
        </Prose>
        <div className="mt-10 text-center"><TertiaryLink to="/contact">Contact student services</TertiaryLink></div>
      </Section>
    </PageShell>
  );
}

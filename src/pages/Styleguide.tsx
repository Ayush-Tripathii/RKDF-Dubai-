import { useT } from '@/lib/locale';
import { useUI } from '@/lib/ui';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, StatRow, QuoteBlock, PortraitCard, SchoolCard, ProgrammeCard, NewsCard, EventPanel, PartnerWall, StepSequence, TertiaryLink } from '@/components/blocks';
import { ImageFrame } from '@/components/ImageFrame';
import { LogoSlot, HeaderLockup } from '@/components/LogoSlot';
import { ProgrammeTable } from '@/components/ProgrammeTable';
import { RequirementsAccordion } from '@/components/RequirementsAccordion';
import { VoicesCarousel } from '@/components/VoicesCarousel';
import { Field, SelectField, CheckField, SuccessState, useForm } from '@/components/forms';
import { Icon, SealMotif } from '@/components/Icon';
import { palette, contrast } from '@content/styleguide';
import { glance } from '@content/stats';
import { schools } from '@content/schools';
import { programmes } from '@content/programmes';
import { sortedNews } from '@content/news';
import { events } from '@content/events';
import { partners } from '@content/people';

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="border-t border-rule py-16">
      <h2 className="t-eyebrow mb-8">{title}</h2>
      {children}
    </div>
  );
}

function FormStates() {
  const f = useForm({ a: '', b: 'not-an-email', c: '', d: false }, { b: () => 'Please enter a valid email address.' });
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field f={f} name="a" label="Default field" hint="Hint text in Ink-55." />
      <div onFocus={() => f.blur('b')}><Field f={f} name="b" label="Error state (focus to show)" required /></div>
      <SelectField f={f} name="c" label="Select" options={[{ value: '1', label: 'Option one' }]} />
      <CheckField f={f} name="d" label="Checkbox with label" />
      <label className="block"><span className="field-label">Disabled</span><input className="field-input" disabled value="Disabled input" readOnly /></label>
    </div>
  );
}

export default function Styleguide() {
  const p = useT().pages.styleguide;
  const { openEnquiry, openSearch } = useUI();
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="drafting" crumbs={[{ label: p.title }]}
      seo={{ description: 'Internal design reference for the RKDF University Dubai website.', noindex: true }}
      nav={[{ id: 'identity', label: 'Identity' }, { id: 'colour', label: 'Colour' }, { id: 'type', label: 'Type' }, { id: 'masthead', label: 'Masthead' }, { id: 'buttons', label: 'Buttons' }, { id: 'components', label: 'Components' }, { id: 'forms', label: 'Forms' }, { id: 'a11y', label: 'Accessibility' }]}
    >
      <Section band="parchment">
        <Block id="identity" title="Identity — LogoSlot">
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            <div className="flex items-center justify-center bg-parchment p-12"><LogoSlot size={96} /></div>
            <div className="flex items-center justify-center bg-parchment p-12"><HeaderLockup /></div>
            <div className="flex items-center justify-center bg-primary p-12"><LogoSlot size={96} onDark /></div>
          </div>
          <p className="t-small mt-4 max-w-[70ch]">No crest has been supplied, so the typographic lockup is shown. Install the crest by setting <code>CREST_SRC</code> in <code>src/components/LogoSlot.tsx</code>. Clear space equals the crest height; minimum display 40px.</p>
        </Block>

        <Block id="colour" title="Colour">
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {palette.map((c) => (
              <li key={c.token} className="bg-white">
                <div className={`h-24 border-b border-rule bg-${c.token}`} />
                <div className="p-4">
                  <p className="font-semibold text-primary">{c.name}</p>
                  <p className="t-num text-[13px] text-ink-55">{c.hex} · --c-{c.token}</p>
                  <p className="t-small mt-1">{c.use}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="t-small mt-4">Navy is permitted in three places only: the footer, the scrim over photography, and solid primary buttons. Gold is a hairline and a small-caps colour — never a fill.</p>
        </Block>

        <Block id="type" title="Typography">
          <div className="space-y-8">
            <div><p className="t-label mb-2">H1 · Source Serif 4 400 · clamp(2.5rem, 5vw, 4.25rem) / 1.08</p><p className="t-h1 text-primary">A university built on conviction</p></div>
            <div><p className="t-label mb-2">H2 · clamp(1.875rem, 3vw, 2.75rem) / 1.15</p><p className="t-h2 text-primary">Seven schools. Thirty-eight programmes.</p></div>
            <div><p className="t-label mb-2">H3 · 1.375rem / 1.3 / 600</p><p className="t-h3 text-primary">A semester in Bhopal</p></div>
            <div><p className="t-label mb-2">Quote · 1.75rem italic</p><p className="t-quote text-primary">“Education Glorifies Nation.”</p></div>
            <div><p className="t-label mb-2">Body · Inter 17px / 1.7 · 66ch measure</p><p className="t-body measure">RKDF University Dubai is the United Arab Emirates campus of RKDF University, a private state university in Madhya Pradesh, India, established by the Ram Krishna Dharmarth Foundation.</p></div>
            <div><p className="t-label mb-2">Small · 14px Ink-55</p><p className="t-small">Projected figures for the 2027/28 academic year.</p></div>
            <div><p className="t-label mb-2">Eyebrow · 11px / 0.2em / 600 / Accent Ink</p><p className="t-eyebrow">The University at a Glance</p></div>
            <div lang="ar" dir="rtl"><p className="t-label mb-2">Arabic · Noto Kufi Arabic / IBM Plex Sans Arabic · line-height 1.9 · no tracking</p><p className="font-serif text-[2rem] text-primary" style={{ fontFamily: "'Noto Kufi Arabic', serif" }}>من بوبال إلى دبي</p><p style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif", lineHeight: 1.9 }}>تحمل جامعة RKDF إرثها في بوبال إلى دبي — سبع كليات، وثمانية وثلاثون برنامجًا.</p></div>
          </div>
        </Block>

        <Block id="masthead" title="Section masthead — the spine of the site">
          <div className="bg-stone py-16"><SectionMasthead eyebrow="Eyebrow" title="Centred H2 heading" standfirst="An optional standfirst of up to sixty characters per line, centred beneath a 48px gold rule." /></div>
        </Block>

        <Block id="buttons" title="Buttons and links">
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn btn-primary">Primary</button>
            <button type="button" className="btn btn-secondary">Secondary</button>
            <button type="button" className="btn btn-primary" disabled>Disabled</button>
            <button type="button" className="btn btn-primary btn-sm">Small</button>
            <TertiaryLink to="/styleguide">Tertiary link</TertiaryLink>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 bg-primary p-8">
            <button type="button" className="btn btn-white">White fill (on photography)</button>
            <button type="button" className="btn btn-outline-white">White outline</button>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-primary">
            {['book', 'door', 'ledger', 'laurel', 'pin', 'mail', 'search', 'phone', 'clock', 'calendar', 'download', 'whatsapp'].map((n) => <Icon key={n} name={n} size={24} label={n} />)}
            <SealMotif className="text-accent" />
          </div>
          <div className="mt-6 flex gap-4">
            <button type="button" className="btn btn-secondary" onClick={() => openEnquiry()}>Open enquiry modal</button>
            <button type="button" className="btn btn-secondary" onClick={openSearch}>Open search overlay</button>
          </div>
        </Block>

        <Block id="components" title="Components">
          <h3 className="t-label mb-4">StatRow</h3>
          <StatRow stats={glance} footnote="Footnote in 14px Ink-55." />
          <h3 className="t-label mb-4 mt-16">SchoolCard · ProgrammeCard · NewsCard (hover: border to Accent)</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <SchoolCard school={schools[0]} />
            <ProgrammeCard p={programmes[0]} />
            <NewsCard item={sortedNews()[0]} variant="grid" />
          </div>
          <h3 className="t-label mb-4 mt-16">PortraitCard · EventPanel</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <PortraitCard name="Dr. Sadhna Kapoor" role="Chancellor" initials="SK" to="/about/chancellor" />
            <PortraitCard name="Appointment to be announced" role="Founding Dean" initials="D" />
            <EventPanel events={events} heading="Upcoming events" />
          </div>
          <h3 className="t-label mb-4 mt-16">QuoteBlock</h3>
          <QuoteBlock quote="Every fee on one page, in dirhams, before I applied." name="Ananya Pillai" role="BBA Business Administration" portrait="ananya" />
          <h3 className="t-label mb-4 mt-16">Carousel</h3>
          <VoicesCarousel />
          <h3 className="t-label mb-4 mt-16">StepSequence</h3>
          <StepSequence steps={['Choose', 'Submit', 'Assess', 'Offer', 'Arrive']} />
          <h3 className="t-label mb-4 mt-16">RequirementsAccordion</h3>
          <div className="max-w-[48rem]"><RequirementsAccordion /></div>
          <h3 className="t-label mb-4 mt-16">ImageFrame</h3>
          <div className="grid gap-6 md:grid-cols-2"><ImageFrame name="libraryCurved" caption="Serif italic caption, 13px." /><ImageFrame name="hero" frame={false} caption="Unframed variant." /></div>
          <h3 className="t-label mb-4 mt-16">PartnerWall</h3>
          <PartnerWall names={partners} label="Partners" />
          <h3 className="t-label mb-4 mt-16">ProgrammeTable</h3>
          <ProgrammeTable idPrefix="sg-pt" />
        </Block>

        <Block id="forms" title="Forms">
          <FormStates />
          <div className="mt-10 border border-rule bg-white p-8"><SuccessState title="Success state" text="A real success state is shown after every form submission." /></div>
        </Block>

        <Block id="a11y" title="Accessibility — measured contrast">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Contrast measurements">
            <table className="table-rk">
              <caption className="sr-only">Measured colour contrast ratios</caption>
              <thead><tr><th scope="col">Pair</th><th scope="col" className="num">Ratio</th><th scope="col">WCAG AA (4.5:1)</th><th scope="col">Note</th></tr></thead>
              <tbody>{contrast.map((c) => <tr key={c.pair}><th scope="row">{c.pair}</th><td className="num">{c.ratio}</td><td>{c.pass ? 'Pass' : 'Fail'}</td><td className="text-ink-55">{c.note ?? ''}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="t-small mt-4 max-w-[70ch]">Scrim ratios are worst-case: white text over a pure-white region of the photograph. The brief’s 55%/50%/60% scrim values were raised to 66–78% (hero text zone), 64% (page header) and 66% (closing band) to clear 4.5:1.</p>
        </Block>
      </Section>
    </PageShell>
  );
}

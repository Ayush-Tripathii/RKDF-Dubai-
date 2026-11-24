import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useT, L } from '@/lib/locale';
import { useUI } from '@/lib/ui';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, StepSequence, TertiaryLink, KeyFacts, reveal } from '@/components/blocks';
import { ImageFrame } from '@/components/ImageFrame';
import { Accordion } from '@/components/RequirementsAccordion';
import { Field, SelectField, CheckField, ErrorSummary, SuccessState, useForm, submitTo, EMAIL_RE, PHONE_RE, countryCodes } from '@/components/forms';
import { Prose, LinkCard } from './about';
import { curricula, english, postgraduate, documents } from '@content/requirements';
import { otherFees, paymentTerms, scholarships, costOfLiving } from '@content/fees';
import { programmes, formatAED, levelLabel } from '@content/programmes';
import { schools } from '@content/schools';
import { dubai } from '@content/site';

const admCrumb = { label: 'Admissions', to: '/admissions' };

const admissionsFaq = [
  { q: 'When can I start?', a: 'There are two intakes each year, in January and September. The first intake begins in January 2027; applications close on 18 December 2026.' },
  { q: 'Is there an application fee?', a: 'The application fee is AED 500 and is waived for applicants who attend an Open Day.' },
  { q: 'Do I need to take an English test?', a: 'Yes, unless you have studied in English for your final two years of school in a recognised English-medium curriculum. We accept IELTS 6.0, TOEFL iBT 72 and EmSAT English 1250.' },
  { q: 'Will the university sponsor my student visa?', a: 'Yes. The university sponsors a one-year renewable student visa for every full-time international student who accepts an offer and pays the enrolment deposit.' },
  { q: 'Can I pay tuition in instalments?', a: 'Yes. Tuition can be paid in two instalments per year or in ten interest-free monthly payments.' },
  { q: 'How quickly will I receive a decision?', a: 'Most applicants receive a decision within ten working days of submitting a complete application.' },
];

/* ── /admissions ── */
export function Admissions() {
  const t = useT();
  const p = t.pages.admissions;
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: admissionsFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsLaptops" crumbs={[{ label: 'Admissions' }]}
      seo={{ description: 'Apply to RKDF University Dubai for January or September 2027: entry requirements, fees in dirhams, scholarships, visas and how to apply.', ogImage: '/og/admissions.png', jsonLd: [faqLd] }}
      nav={[{ id: 'steps', label: 'Five steps' }, { id: 'dates', label: 'Key dates' }, { id: 'guides', label: 'Guides' }, { id: 'faq', label: 'Questions' }]}
    >
      <Section band="parchment" id="steps">
        <SectionMasthead eyebrow="Admissions" title={t.home.admissions.h2} />
        <StepSequence steps={t.home.admissions.steps} details={['Use the programme finder to compare programmes and fees.', 'Apply online in about twenty minutes, with your documents.', 'Some programmes include a short interview or portfolio review.', 'Most decisions are made within ten working days.', 'Pay your deposit; we sponsor your student visa.']} />
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          <L to="/apply" className="btn btn-primary">{t.home.admissions.primary}</L>
          <L to="/admissions/how-to-apply" className="btn btn-secondary">How to apply</L>
        </div>
      </Section>
      <Section band="stone" id="dates">
        <SectionMasthead eyebrow="Key dates" title="2027 intakes" />
        <div className="mx-auto grid max-w-[56rem] gap-6 md:grid-cols-2">
          {[
            { h: 'January 2027', rows: [['Applications close', '18 December 2026'], ['Open Day', '12 December 2026'], ['Teaching begins', '10 January 2027']] },
            { h: 'September 2027', rows: [['Applications open', '5 January 2027'], ['Open Day', '17 January 2027'], ['Teaching begins', '12 September 2027']] },
          ].map((c, i) => (
            <div key={c.h} className="border border-rule bg-white p-8" {...reveal(i)}>
              <h3 className="t-h3">{c.h} intake</h3>
              <div className="mt-4"><KeyFacts items={c.rows.map(([k, v]) => ({ k, v }))} /></div>
            </div>
          ))}
        </div>
      </Section>
      <Section band="parchment" id="guides">
        <SectionMasthead eyebrow="Guides" title="Everything you need to apply" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <LinkCard to="/admissions/entry-requirements" title="Entry requirements" text="By curriculum, with English language requirements." />
          <LinkCard to="/admissions/tuition-and-fees" title="Tuition & fees" text="Every fee in dirhams, with payment plans." />
          <LinkCard to="/admissions/scholarships" title="Scholarships" text="Five schemes, from 10% to full tuition." />
          <LinkCard to="/admissions/how-to-apply" title="How to apply" text="Five steps and a document checklist." />
          <LinkCard to="/admissions/international" title="International students" text="Visas, residency, attestation and arrival." />
          <LinkCard to="/admissions/agents" title="Education partners" text="Working with authorised representatives." />
        </div>
      </Section>
      <Section band="stone" id="faq">
        <SectionMasthead eyebrow="Questions" title="Frequently asked questions" />
        <div className="mx-auto max-w-[52rem]">
          <Accordion serif items={admissionsFaq.map((f, i) => ({ id: `a${i}`, title: f.q, content: <p className="max-w-[66ch] text-[16px] text-ink">{f.a}</p> }))} />
        </div>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/entry-requirements ── */
export function EntryRequirements() {
  const p = useT().pages.entryRequirements;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="writing" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'Entry requirements for RKDF University Dubai: CBSE/ICSE 65%, IB 26 points, A-Level BCC, American GPA 2.8, WAEC five credits, UAE MoE 70%; IELTS 6.0.' }}
      nav={[{ id: 'undergraduate', label: 'Undergraduate' }, { id: 'english', label: 'English language' }, { id: 'postgraduate', label: 'Postgraduate' }]}
    >
      <Section band="parchment" id="undergraduate">
        <SectionMasthead eyebrow="Undergraduate and foundation" title="Requirements by curriculum" standfirst="These are minimum requirements. Meeting them does not guarantee an offer, and some programmes set subject-specific requirements." />
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Entry requirements by curriculum" dir="ltr">
          <table className="table-rk min-w-[720px]">
            <caption className="sr-only">Minimum entry requirements by curriculum</caption>
            <thead><tr><th scope="col">Curriculum</th><th scope="col">Undergraduate (direct entry)</th><th scope="col">Foundation Year</th><th scope="col">Notes</th></tr></thead>
            <tbody>{curricula.map((c) => <tr key={c.id}><th scope="row">{c.name}</th><td>{c.ug}</td><td>{c.foundation}</td><td className="text-ink-55">{c.notes}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="t-small mt-4">Studying another curriculum? Contact admissions at <a className="underline decoration-accent underline-offset-4" href={`mailto:${dubai.emailAdmissions}`}>{dubai.emailAdmissions}</a> for an individual assessment.</p>
      </Section>
      <Section band="stone" id="english">
        <SectionMasthead eyebrow="English language" title="English language requirements" />
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="English language requirements" dir="ltr">
          <table className="table-rk mx-auto max-w-[48rem]">
            <caption className="sr-only">Accepted English language tests and minimum scores</caption>
            <thead><tr><th scope="col">Test</th><th scope="col" className="num">Minimum score</th><th scope="col">Detail</th></tr></thead>
            <tbody>{english.map((e) => <tr key={e.test}><th scope="row">{e.test}</th><td className="num">{e.score}</td><td>{e.detail}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-[16px] text-ink">Applicants who do not yet meet the English requirement may take our twelve-week Pre-sessional English course, or the Foundation Year.</p>
      </Section>
      <Section band="parchment" id="postgraduate">
        <Prose eyebrow="Postgraduate" title="Master’s programmes">
          <ul>{postgraduate.map((x) => <li key={x}>{x}</li>)}</ul>
        </Prose>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/tuition-and-fees ── */
export function Tuition() {
  const p = useT().pages.tuition;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryAisle" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'The full 2027/28 tuition fee schedule for RKDF University Dubai, in UAE dirhams, with other fees, payment plans and living costs.', ogImage: '/og/fees.png' }}
      nav={[{ id: 'tuition', label: 'Tuition' }, { id: 'other', label: 'Other fees' }, { id: 'payment', label: 'Payment' }, { id: 'living', label: 'Living costs' }]}
    >
      <Section band="parchment" id="tuition">
        <SectionMasthead eyebrow="2027/28" title="Tuition by programme" standfirst="Every fee, in dirhams, before you apply. Your annual tuition is fixed at the rate published when you enrol." />
        {schools.map((s) => {
          const rows = programmes.filter((x) => x.school === s.slug);
          return (
            <div key={s.slug} className="mb-12">
              <h3 className="t-h3 mb-4">{s.name}</h3>
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={`Fees: ${s.name}`} dir="ltr">
                <table className="table-rk min-w-[640px]">
                  <caption className="sr-only">Tuition fees for {s.name}</caption>
                  <thead><tr><th scope="col">Programme</th><th scope="col">Level</th><th scope="col">Duration</th><th scope="col" className="num">Tuition (AED)</th><th scope="col">Basis</th></tr></thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.slug}>
                        <th scope="row"><L to={`/programmes/${r.slug}`} className="hover:underline hover:decoration-accent hover:underline-offset-4">{r.title}</L></th>
                        <td>{levelLabel[r.level]}</td><td className="t-num">{r.durationLabel}</td>
                        <td className="num">{r.tuition.toLocaleString('en-US')}</td>
                        <td>{r.tuitionBasis === 'annual' ? 'Per year' : 'Full programme'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </Section>
      <Section band="stone" id="other">
        <SectionMasthead eyebrow="Other fees" title="Everything else you will pay" />
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Other fees" dir="ltr">
          <table className="table-rk mx-auto max-w-[56rem]">
            <caption className="sr-only">Other fees</caption>
            <thead><tr><th scope="col">Item</th><th scope="col" className="num">Amount</th><th scope="col">Note</th></tr></thead>
            <tbody>{otherFees.map((f) => <tr key={f.item}><th scope="row">{f.item}</th><td className="num">{f.amount}</td><td>{f.note}</td></tr>)}</tbody>
          </table>
        </div>
      </Section>
      <Section band="parchment" id="payment">
        <Prose eyebrow="Payment" title="Payment terms">
          <ul>{paymentTerms.map((x) => <li key={x}>{x}</li>)}</ul>
          <p>Refunds are governed by our <L to="/downloads">refund and withdrawal policy</L>.</p>
        </Prose>
      </Section>
      <Section band="stone" id="living">
        <SectionMasthead eyebrow="Living costs" title="Typical monthly costs in Dubai" />
        <dl className="grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
          {costOfLiving.map((c) => (
            <div key={c.item} className="flex flex-col-reverse bg-white p-7 text-center">
              <dt className="t-label mt-2">{c.item} · {c.per}</dt>
              <dd className="font-serif text-[1.5rem] text-primary t-num" dir="ltr">{c.amount}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 text-center"><TertiaryLink to="/student-life/accommodation">Accommodation in detail</TertiaryLink></div>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/scholarships ── */
export function Scholarships() {
  const p = useT().pages.scholarships;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryCurved" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'Scholarships at RKDF University Dubai: Chancellor’s Merit 25%, Early Decision 10%, Sibling 15%, RKDF Alumni Family 10%, and the Dr. Sadhna Kapoor Women in STEM Award.', ogImage: '/og/scholarships.png' }}>
      <Section band="parchment">
        <SectionMasthead eyebrow="Funding" title="Five scholarship schemes" standfirst="Scholarships are deducted from tuition. Unless stated otherwise, a student may hold one scholarship at a time — whichever is of greatest value." />
        <div className="space-y-6">
          {scholarships.map((s, i) => (
            <article key={s.name} className="card grid gap-6 p-8 md:grid-cols-12 lg:p-10" {...reveal(i % 2)}>
              <div className="md:col-span-4">
                <p className="font-serif text-[2rem] leading-none text-primary t-num">{s.value}</p>
              </div>
              <div className="md:col-span-8">
                <h3 className="t-h3">{s.name}</h3>
                <p className="mt-3 text-[16px] text-ink">{s.eligibility}</p>
                <p className="t-small mt-3"><span className="font-semibold text-ink">How to apply:</span> {s.how}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <L to="/apply" className="btn btn-primary">Begin your application</L>
          <L to="/downloads" className="btn btn-secondary">Scholarship form</L>
        </div>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/how-to-apply ── */
export function HowToApply() {
  const t = useT();
  const p = t.pages.howToApply;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="sharedDesk" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'How to apply to RKDF University Dubai in five steps, with a complete checklist of the documents you will need.' }}
      nav={[{ id: 'steps', label: 'Five steps' }, { id: 'documents', label: 'Documents' }, { id: 'after', label: 'After you apply' }]}
    >
      <Section band="parchment" id="steps">
        <SectionMasthead eyebrow="Five steps" title="From choosing to arriving" />
        <ol className="mx-auto max-w-[56rem] border-t border-rule">
          {[
            ['Choose your programme', 'Compare programmes, fees and entry requirements in the programme finder. If you are unsure, an admissions counsellor can help.'],
            ['Submit your application', 'Complete the online application and upload your documents. It takes about twenty minutes. The application fee is AED 500, waived for Open Day attendees.'],
            ['Assessment & interview', 'We review every application individually. Some programmes include a short interview, portfolio review or admissions test.'],
            ['Receive your offer', 'Most decisions are made within ten working days. Offers may be unconditional or conditional on final results or English scores.'],
            ['Enrol and arrive', 'Accept your offer, pay the enrolment deposit and send the documents needed for your student visa. Orientation begins a week before teaching.'],
          ].map(([h, d], i) => (
            <li key={h} className="grid gap-4 border-b border-rule py-8 md:grid-cols-[80px_1fr]" {...reveal()}>
              <span className="font-serif text-[2rem] leading-none text-accent-ink t-num">{String(i + 1).padStart(2, '0')}</span>
              <div><h3 className="t-h3">{h}</h3><p className="mt-2 max-w-[66ch] text-[16px] text-ink">{d}</p></div>
            </li>
          ))}
        </ol>
      </Section>
      <Section band="stone" id="documents">
        <SectionMasthead eyebrow="Checklist" title="Documents you will need" />
        <ul className="mx-auto grid max-w-[56rem] gap-px border border-rule bg-rule md:grid-cols-2">
          {documents.map((d) => (
            <li key={d} className="flex gap-4 bg-white p-5 text-[15px] text-ink">
              <span className="mt-[2px] block h-4 w-4 shrink-0 border border-accent" aria-hidden="true" />{d}
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center"><TertiaryLink to="/downloads">Download the checklist</TertiaryLink></div>
      </Section>
      <Section band="parchment" id="after">
        <Prose eyebrow="After you apply" title="What happens next">
          <p>You will receive an email confirming your application within one working day, with a link to track its progress. If anything is missing, we will tell you exactly what and how to send it.</p>
          <p>International students should read our guide to <L to="/admissions/international">visas, residency and attestation</L> as soon as they receive an offer, as document attestation can take several weeks.</p>
        </Prose>
        <div className="mt-12 text-center"><L to="/apply" className="btn btn-primary">{t.home.admissions.primary}</L></div>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/international ── */
export function International() {
  const p = useT().pages.international;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="dubaiSkyline" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'Student visas, UAE residency, document attestation and arrival in Dubai for international students at RKDF University Dubai.', ogImage: '/og/international.png' }}
      nav={[{ id: 'visa', label: 'Student visa' }, { id: 'attestation', label: 'Attestation' }, { id: 'arrival', label: 'Arrival' }, { id: 'insurance', label: 'Health insurance' }]}
    >
      <Section band="parchment" id="visa">
        <Prose eyebrow="Student visa" title="Your student visa and residency" aside={<ImageFrame name="dubaiMarina" ratio="4 / 5" caption="Dubai is home to residents from more than 200 nationalities." />}>
          <p>The university sponsors a student residence visa for every full-time international student. The visa is valid for one year and is renewable for the length of your programme, subject to satisfactory attendance and progress.</p>
          <h3>The process</h3>
          <ul>
            <li>Accept your offer and pay the enrolment deposit.</li>
            <li>Send a passport copy, photograph and your attested educational certificates to the International Student Office.</li>
            <li>We apply for your entry permit, which is usually issued within two to three weeks.</li>
            <li>After arrival you complete a medical fitness test and Emirates ID biometrics, arranged by the university.</li>
            <li>Your residence visa is issued electronically, linked to your Emirates ID.</li>
          </ul>
          <p>The visa processing fee is AED 3,500 per year, including the medical test and Emirates ID.</p>
        </Prose>
      </Section>
      <Section band="stone" id="attestation">
        <Prose eyebrow="Attestation" title="Attesting your school certificates">
          <p>UAE regulations require secondary school certificates obtained outside the UAE to be attested before enrolment. Attestation normally involves the education authority and foreign ministry of the issuing country, followed by the UAE embassy in that country, and finally the UAE Ministry of Foreign Affairs.</p>
          <p>Certificates from UAE schools require an equivalency certificate from the Ministry of Education, which your school can usually arrange.</p>
          <p>Attestation can take several weeks. Please begin as soon as you receive your offer. Our International Student Office can advise on the requirements for your country.</p>
        </Prose>
      </Section>
      <Section band="parchment" id="arrival">
        <Prose eyebrow="Arrival" title="Arriving in Dubai">
          <ul>
            <li>Airport collection from Dubai International Airport is available, free of charge, for students arriving in the week before orientation.</li>
            <li>Orientation runs for one week before teaching begins and includes campus tours, library and IT induction, and sessions on living in Dubai.</li>
            <li>Our accommodation team can help you find housing before you travel.</li>
          </ul>
          <p><L to="/student-life/accommodation">Accommodation and costs</L></p>
        </Prose>
      </Section>
      <Section band="stone" id="insurance">
        <Prose eyebrow="Health insurance" title="Health insurance">
          <p>Health insurance is mandatory for all residents of Dubai. The university’s student health insurance plan costs AED 1,800 per year. Students with existing cover that meets Dubai Health Authority requirements may apply for an exemption.</p>
        </Prose>
      </Section>
    </PageShell>
  );
}

/* ── /admissions/agents ── */
export function Agents() {
  const p = useT().pages.agents;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsNotes" crumbs={[admCrumb, { label: p.title }]}
      seo={{ description: 'How RKDF University Dubai works with authorised education partners, how to verify an agent, and how organisations can apply to become one.' }}>
      <Section band="parchment">
        <Prose eyebrow="Education partners" title="Working with representatives">
          <p>You can apply directly to RKDF University Dubai at no cost beyond the published application fee. You do not need an agent.</p>
          <p>Some students prefer to work with an education counsellor in their home country. We work only with authorised partners who have signed our code of practice and been trained by our admissions team.</p>
          <h3>Before you use an agent</h3>
          <ul>
            <li>Ask for their authorisation certificate and check it with us at <a href={`mailto:${dubai.emailAdmissions}`}>{dubai.emailAdmissions}</a>.</li>
            <li>Authorised partners may not charge you for an application to RKDF University Dubai.</li>
            <li>All fees are paid directly to the university. Never pay tuition to an agent.</li>
            <li>Every offer is issued by the university directly to you, by email.</li>
          </ul>
          <h3>Becoming a partner</h3>
          <p>Organisations interested in representing the university should write to admissions with details of their registration, track record and the markets they serve.</p>
        </Prose>
        <p className="t-small mt-10 text-center">A list of authorised partners will be published here once the first agreements are signed.</p>
      </Section>
    </PageShell>
  );
}

/* ── /apply — three-step application ── */
export function Apply() {
  const t = useT();
  const p = t.pages.apply;
  const fm = t.forms;
  const { openEnquiry } = useUI();
  const [params] = useSearchParams();
  const pre = params.get('programme') ?? '';
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  const f = useForm(
    { programme: programmes.some((x) => x.slug === pre) ? pre : '', intake: '', first: '', last: '', email: '', cc: '+971', phone: '', dob: '', nationality: '', curriculum: '', result: '', englishTest: '', englishScore: '', statement: '', declaration: false },
    {
      programme: (v) => (v ? null : fm.errRequired),
      intake: (v) => (v ? null : fm.errRequired),
      first: (v) => (String(v).trim() ? null : fm.errRequired),
      last: (v) => (String(v).trim() ? null : fm.errRequired),
      email: (v) => (EMAIL_RE.test(String(v).trim()) ? null : fm.errEmail),
      phone: (v) => (PHONE_RE.test(String(v).trim()) ? null : fm.errPhone),
      dob: (v) => (v ? null : fm.errRequired),
      nationality: (v) => (String(v).trim() ? null : fm.errRequired),
      curriculum: (v) => (v ? null : fm.errRequired),
      result: (v) => (String(v).trim() ? null : fm.errRequired),
      englishTest: (v) => (v ? null : fm.errRequired),
      statement: (v) => (String(v).trim().length >= 50 ? null : 'Please write at least 50 characters.'),
      declaration: (v) => (v ? null : 'Please confirm the declaration.'),
    },
  );

  const stepFields = [['programme', 'intake'], ['first', 'last', 'email', 'phone', 'dob', 'nationality'], ['curriculum', 'result', 'englishTest', 'statement', 'declaration']];
  const stepNames = ['Programme', 'About you', 'Education & statement'];

  const next = async (e: FormEvent) => {
    e.preventDefault();
    const errs = f.validateAll(stepFields[step]);
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    if (step < 2) { setStep(step + 1); requestAnimationFrame(() => heading.current?.focus()); return; }
    setSending(true);
    await submitTo('/api/apply', f.values);
    setSending(false);
    setDone(true);
  };
  const stepErrors = Object.fromEntries(Object.entries(f.errors).filter(([k]) => stepFields[step].includes(k)));
  const prog = programmes.find((x) => x.slug === f.values.programme);

  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="studentsLibrary" crumbs={[{ label: 'Admissions', to: '/admissions' }, { label: p.title }]}
      seo={{ description: 'Apply to RKDF University Dubai for the January or September 2027 intake. Applications for January 2027 close on 18 December 2026.', ogImage: '/og/apply.png' }}>
      <Section band="parchment">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="border border-rule bg-white p-6 sm:p-10">
              {done ? (
                <SuccessState title="Application received" text={`Thank you, ${f.values.first}. Your application has been received. We have sent a confirmation to ${f.values.email} with your application reference and a checklist of the documents to upload.`} action={<L to="/" className="btn btn-primary">Return to the home page</L>} />
              ) : (
                <form onSubmit={next} noValidate>
                  <ol className="mb-10 grid grid-cols-3 gap-2" aria-label="Application progress">
                    {stepNames.map((s, i) => (
                      <li key={s} className={`border-t-2 pt-3 text-[13px] ${i <= step ? 'border-accent text-primary' : 'border-rule text-ink-55'}`} aria-current={i === step ? 'step' : undefined}>
                        <span className="t-num font-semibold">{i + 1}.</span> {s}
                      </li>
                    ))}
                  </ol>
                  <h2 ref={heading} tabIndex={-1} className="t-h3 mb-6 focus:outline-none">Step {step + 1} of 3: {stepNames[step]}</h2>
                  <div className="grid gap-5">
                    <ErrorSummary errors={stepErrors} refEl={summary} />
                    {step === 0 && (
                      <>
                        <SelectField f={f} name="programme" label={fm.programme} required options={programmes.map((x) => ({ value: x.slug, label: `${x.title} — ${formatAED(x.tuition)}${x.tuitionBasis === 'total' ? ' total' : ' per year'}` }))} />
                        <SelectField f={f} name="intake" label={fm.intake} required options={(prog?.intakes ?? ['Jan', 'Sep']).map((i) => i === 'Jan' ? { value: '2027-01', label: 'January 2027' } : { value: '2027-09', label: 'September 2027' })} />
                      </>
                    )}
                    {step === 1 && (
                      <>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field f={f} name="first" label="First name" required autoComplete="given-name" />
                          <Field f={f} name="last" label="Family name" required autoComplete="family-name" />
                        </div>
                        <Field f={f} name="email" label={fm.email} type="email" required autoComplete="email" />
                        <div>
                          <span className="field-label" id="ap-phone">{fm.phone} <span aria-hidden="true" className="text-accent-ink">*</span></span>
                          <div className="grid grid-cols-[150px_1fr] gap-3" role="group" aria-labelledby="ap-phone" dir="ltr">
                            <div>
                              <label htmlFor="ap-cc" className="sr-only">{fm.countryCode}</label>
                              <select id="ap-cc" className="field-input" value={String(f.values.cc)} onChange={(e) => f.set('cc', e.target.value)}>
                                {countryCodes.map(([v, l]) => <option key={l} value={v}>{l}</option>)}
                              </select>
                            </div>
                            <Field f={f} name="phone" label={fm.phone} type="tel" required autoComplete="tel-national" />
                          </div>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field f={f} name="dob" label="Date of birth" type="date" required autoComplete="bday" />
                          <Field f={f} name="nationality" label={fm.nationality} required autoComplete="country-name" />
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <SelectField f={f} name="curriculum" label={fm.curriculum} required options={[...curricula.map((c) => ({ value: c.id, label: c.name })), { value: 'degree', label: 'Bachelor’s degree (postgraduate applicants)' }, { value: 'other', label: fm.other }]} />
                        <Field f={f} name="result" label="Final or predicted result" required hint="For example: 82% aggregate, 31 IB points, ABB, GPA 3.4, or a 2:1 degree." />
                        <div className="grid gap-5 sm:grid-cols-2">
                          <SelectField f={f} name="englishTest" label="English language test" required options={[{ value: 'ielts', label: 'IELTS Academic' }, { value: 'toefl', label: 'TOEFL iBT' }, { value: 'emsat', label: 'EmSAT English' }, { value: 'pending', label: 'Not yet taken' }, { value: 'exempt', label: 'Exempt (English-medium study)' }]} />
                          <Field f={f} name="englishScore" label="Score (optional)" />
                        </div>
                        <Field f={f} name="statement" label="Personal statement" type="textarea" required hint="Why this programme, and why RKDF University Dubai? You can upload a full statement after submitting." />
                        <CheckField f={f} name="declaration" label="I confirm that the information I have given is complete and accurate, and I agree to the processing of my data as described in the privacy notice." />
                      </>
                    )}
                  </div>
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
                    {step > 0 ? <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button> : <span />}
                    <button type="submit" className="btn btn-primary" disabled={sending}>{step < 2 ? 'Continue' : sending ? fm.sending : 'Submit application'}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="border border-rule bg-white p-7">
              <p className="t-eyebrow">Your application</p>
              {prog ? (
                <div className="mt-4">
                  <p className="font-serif text-[1.25rem] text-primary">{prog.title}</p>
                  <p className="t-small mt-1">{levelLabel[prog.level]} · {prog.durationLabel}</p>
                  <p className="mt-3 text-[15px] font-semibold text-primary t-num">{formatAED(prog.tuition)} <span className="font-normal text-ink-55">{prog.tuitionBasis === 'annual' ? 'per year' : 'total'}</span></p>
                </div>
              ) : <p className="t-small mt-4">Choose a programme to see its fees here.</p>}
              <div className="mt-6 border-t border-rule pt-6">
                <KeyFacts items={[{ k: 'January 2027', v: 'Closes 18 Dec 2026' }, { k: 'September 2027', v: 'Opens 5 Jan 2027' }, { k: 'Application fee', v: 'AED 500' }]} />
              </div>
              <button type="button" className="link-tertiary mt-6" onClick={() => openEnquiry()}>Questions? Speak to a counsellor</button>
            </div>
            <ul className="mt-6 space-y-3 text-[14px]">
              <li><L to="/admissions/entry-requirements" className="underline decoration-accent underline-offset-4">Entry requirements</L></li>
              <li><L to="/admissions/how-to-apply#documents" className="underline decoration-accent underline-offset-4">Document checklist</L></li>
              <li><L to="/admissions/scholarships" className="underline decoration-accent underline-offset-4">Scholarships</L></li>
            </ul>
          </aside>
        </div>
      </Section>
    </PageShell>
  );
}

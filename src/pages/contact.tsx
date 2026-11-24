import { useT } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section, SectionMasthead, reveal } from '@/components/blocks';
import { VisitForm, ContactForm } from '@/components/forms';
import { MapEmbed, ContactBlock } from '@/components/MapEmbed';
import { Icon } from '@/components/Icon';
import { directory } from '@content/staff';
import { downloads } from '@content/people';
import { dubai } from '@content/site';

export function Visit() {
  const p = useT().pages.visit;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="campusWalk" crumbs={[{ label: p.title }]}
      seo={{ description: 'Book a guided visit to RKDF University Dubai at Block 11, Dubai International Academic City, Sunday to Thursday.', ogImage: '/og/visit.png' }}>
      <Section band="parchment">
        <SectionMasthead eyebrow="Visit us" title="See the campus for yourself" standfirst="Guided visits run Sunday to Thursday and last about an hour, including a tour of the laboratories and a conversation with an admissions counsellor." />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="border border-rule bg-white p-8 lg:p-10"><VisitForm /></div>
          <div><MapEmbed /><ContactBlock /></div>
        </div>
      </Section>
    </PageShell>
  );
}

export function Contact() {
  const p = useT().pages.contact;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryAisle" crumbs={[{ label: p.title }]}
      seo={{ description: `Contact RKDF University Dubai: ${dubai.phone}, WhatsApp ${dubai.whatsapp}, ${dubai.emailAdmissions}. ${dubai.hours}.`, ogImage: '/og/contact.png' }}
      nav={[{ id: 'write', label: 'Write to us' }, { id: 'directory', label: 'Directory' }, { id: 'find', label: 'Find us' }]}
    >
      <Section band="parchment" id="write">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" {...reveal()}>
            <p className="t-eyebrow">Contact</p>
            <h2 className="t-h2 mt-3">Write to us</h2>
            <span className="gold-rule mt-6" aria-hidden="true" />
            <p className="mt-6 text-[16px] text-ink">We reply to every message within one working day. For urgent admissions questions, call or message us on WhatsApp during office hours.</p>
            <ContactBlock />
          </div>
          <div className="border border-rule bg-white p-8 lg:col-span-7 lg:p-10" {...reveal(1)}><ContactForm /></div>
        </div>
      </Section>
      <Section band="stone" id="directory">
        <SectionMasthead eyebrow="Directory" title="University directory" />
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="University directory" dir="ltr">
          <table className="table-rk mx-auto max-w-[56rem]">
            <caption className="sr-only">University offices and contact details</caption>
            <thead><tr><th scope="col">Office</th><th scope="col">Telephone</th><th scope="col">Email</th></tr></thead>
            <tbody>
              {directory.map((d) => (
                <tr key={d.unit}>
                  <th scope="row">{d.unit}</th>
                  <td className="t-num"><a href={`tel:${d.phone.replace(/\s/g, '')}`}>{d.phone}</a></td>
                  <td><a className="underline decoration-accent underline-offset-4" href={`mailto:${d.email}`}>{d.email}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section band="parchment" id="find">
        <SectionMasthead eyebrow="Find us" title="Block 11, Dubai International Academic City" />
        <div className="mx-auto max-w-[60rem]"><MapEmbed /></div>
      </Section>
    </PageShell>
  );
}

export function Downloads() {
  const p = useT().pages.downloads;
  const groups = Array.from(new Set(downloads.map((d) => d.group)));
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="writing" crumbs={[{ label: p.title }]}
      seo={{ description: 'Download the RKDF University Dubai prospectus, fee schedule, admissions forms and university policies.' }}>
      <Section band="parchment">
        {groups.map((g) => (
          <div key={g} className="mx-auto mb-14 max-w-[56rem]">
            <h2 className="t-eyebrow mb-4">{g}</h2>
            <ul className="border-t border-rule">
              {downloads.filter((d) => d.group === g).map((d) => (
                <li key={d.file} className="border-b border-rule">
                  <a href={d.file} download className="flex items-center justify-between gap-6 py-5 transition-colors duration-150 hover:text-accent-deep">
                    <span className="font-serif text-[1.25rem] text-primary">{d.title}</span>
                    <span className="flex shrink-0 items-center gap-2 text-[13px] text-ink-55">{d.size}<Icon name="download" size={18} /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </PageShell>
  );
}

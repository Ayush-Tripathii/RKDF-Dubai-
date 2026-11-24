/** Footer — the only large navy field on the site. */
import { useState, type FormEvent } from 'react';
import { L, useT } from '@/lib/locale';
import { dubai, parent } from '@content/site';
import { LogoSlot } from './LogoSlot';
import { Icon } from './Icon';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const t = useT().footer;
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setState('error'); return; }
    // TODO(integration): POST to the mailing-list provider.
    setState('done');
  };
  if (state === 'done') return <p className="text-[14px] text-white/85" role="status">{t.newsletterThanks}</p>;
  return (
    <form onSubmit={submit} noValidate className="mt-4">
      <label htmlFor="nl-email" className="sr-only">{t.newsletterLabel}</label>
      <div className="flex items-end gap-4 border-b border-white/40 focus-within:border-white">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
          placeholder={t.newsletterLabel}
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'nl-error' : undefined}
          className="min-h-[44px] w-full bg-transparent py-2 text-[15px] text-white placeholder:text-white/60 focus-visible:outline-none"
        />
        <button type="submit" className="relative shrink-0 pb-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-white after:absolute after:inset-x-0 after:bottom-[-1px] after:h-px after:bg-accent-light hover:text-accent-light">
          {t.newsletterSubmit}
        </button>
      </div>
      {state === 'error' && <p id="nl-error" className="mt-2 text-[13px] text-accent-light">{t.newsletterError}</p>}
    </form>
  );
}

export function Footer() {
  const t = useT();
  const f = t.footer;
  const year = new Date().getFullYear();
  const cols = [f.cols.university, f.cols.academics, f.cols.admissions, f.cols.resources, f.cols.connect];
  const social = [
    { name: 'Facebook', icon: 'facebook', href: parent.social.facebook },
    { name: 'X', icon: 'x', href: parent.social.twitter },
    { name: 'Instagram', icon: 'instagram', href: parent.social.instagram },
    { name: 'LinkedIn', icon: 'linkedin', href: dubai.social.linkedin },
    { name: 'YouTube', icon: 'youtube', href: dubai.social.youtube },
  ];

  return (
    <footer className="on-dark bg-primary text-white">
      <div className="container-page">
        {/* Top band */}
        <div className="grid gap-10 border-b border-white/15 py-16 lg:grid-cols-12 lg:items-center">
          <div className="flex items-center gap-6 lg:col-span-5">
            <div className="p-2"><LogoSlot size={64} onDark /></div>
            <div>
              <p className="font-serif text-[1.375rem] italic leading-snug">{f.motto}</p>
              <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-white/70">RKDF University Dubai</p>
            </div>
          </div>
          <address className="not-italic text-[14px] leading-relaxed text-white/85 lg:col-span-4">
            {dubai.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
          </address>
          <div className="lg:col-span-3">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">{f.newsletterHeading}</h2>
            <p className="mt-2 text-[14px] text-white/85">{f.newsletterText}</p>
            <Newsletter />
          </div>
        </div>

        {/* Link columns + contact */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          {cols.map((c) => (
            <nav key={c.heading} aria-label={c.heading} className="lg:col-span-2">
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">{c.heading}</h2>
              <ul className="mt-5 space-y-3 text-[14px]">
                {c.links.map((l) => (
                  <li key={l.to}><L to={l.to} className="text-white/85 transition-colors duration-150 hover:text-white hover:underline hover:decoration-accent-light hover:underline-offset-4">{l.label}</L></li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-2">
            <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-light">{f.contactHeading}</h2>
            <ul className="mt-5 space-y-3 text-[14px] text-white/85">
              <li><a href={dubai.phoneHref} className="t-num hover:text-white" dir="ltr">{dubai.phone}</a></li>
              <li><a href={dubai.whatsappHref} rel="noopener noreferrer" className="hover:text-white">{f.whatsapp} <span className="t-num" dir="ltr">{dubai.whatsapp}</span></a></li>
              <li><a href={`mailto:${dubai.emailAdmissions}`} className="break-all hover:text-white">{dubai.emailAdmissions}</a></li>
              <li className="t-num">{dubai.hours}</li>
            </ul>
          </div>
        </div>

        {/* Accreditation line */}
        <div className="border-t border-white/15 py-8 text-[13px] leading-relaxed text-white/80">
          <h2 className="sr-only">{f.accreditationHeading}</h2>
          <p>{dubai.khda} · {dubai.mohesr}</p>
          <p className="mt-1">
            {f.campusOf} —{' '}
            <a href={parent.website} rel="noopener noreferrer" className="text-white underline decoration-accent-light underline-offset-4 hover:decoration-white">
              {parent.websiteLabel}
            </a>
          </p>
        </div>

        {/* Social + bottom bar */}
        <div className="flex flex-col gap-6 border-t border-white/15 py-8 md:flex-row md:items-center md:justify-between lg:pe-24">
          <ul className="flex gap-3" aria-label={f.social}>
            {social.map((s) => (
              <li key={s.name}>
                <a href={s.href} rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-150 hover:border-accent-light hover:text-accent-light" aria-label={s.name}>
                  <Icon name={s.icon} size={17} />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 text-[13px] text-white/80 md:flex-row md:items-center md:gap-6">
            <p>© <span className="t-num">{year}</span> {f.copyright}</p>
            <nav aria-label={f.legalLabel}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {f.legal.map((l) => (
                  <li key={l.to}><L to={l.to} className="hover:text-white hover:underline hover:decoration-accent-light hover:underline-offset-4">{l.label}</L></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

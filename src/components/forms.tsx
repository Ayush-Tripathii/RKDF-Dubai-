/**
 * Form primitives with inline validation, plus EnquiryForm, VisitForm, ContactForm.
 * Submissions currently resolve client-side with a real success state;
 * wire `submitTo()` to the CRM endpoint before launch (see CONTENT-TODO.md).
 */
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useT } from '@/lib/locale';
import { fmt } from '@content/i18n';
import { programmes } from '@content/programmes';
import { curricula } from '@content/requirements';
import { Icon } from './Icon';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[0-9\s-]{6,15}$/;

type Values = Record<string, string | boolean>;
type Rules = Record<string, (v: string | boolean, all: Values) => string | null>;

/** Integration point for form submissions. */
export async function submitTo(_endpoint: string, _data: Values): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
}

export function useForm(initial: Values, rules: Rules) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const validate = (name: string, v = values[name], all = values) => rules[name]?.(v, all) ?? null;
  const set = (name: string, v: string | boolean) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (touched[name]) setErrors((e) => { const m = validate(name, v); const n = { ...e }; if (m) n[name] = m; else delete n[name]; return n; });
  };
  const blur = (name: string) => {
    setTouched((s) => ({ ...s, [name]: true }));
    setErrors((e) => { const m = validate(name); const n = { ...e }; if (m) n[name] = m; else delete n[name]; return n; });
  };
  /** Validate all rules, or only `keys` (for multi-step forms). */
  const validateAll = (keys: string[] = Object.keys(rules)) => {
    const errs: Record<string, string> = {};
    keys.forEach((k) => { const m = validate(k); if (m) errs[k] = m; });
    setErrors((prev) => { const n = { ...prev }; keys.forEach((k) => delete n[k]); return { ...n, ...errs }; });
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(keys.map((k) => [k, true])) }));
    return errs;
  };
  const reset = () => { setValues(initial); setErrors({}); setTouched({}); };
  return { values, errors, set, blur, validateAll, reset };
}

type F = ReturnType<typeof useForm>;

export function Field({ f, name, label, type = 'text', required = false, autoComplete, hint, inputMode, autoFocus, min }: { f: F; name: string; label: string; type?: string; required?: boolean; autoComplete?: string; hint?: string; inputMode?: 'tel' | 'email' | 'numeric'; autoFocus?: boolean; min?: string }) {
  const id = useId();
  const err = f.errors[name];
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required ? <span aria-hidden="true" className="text-accent-ink">*</span> : null}
      </label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} rows={5} className="field-input" value={String(f.values[name] ?? '')} onChange={(e) => f.set(name, e.target.value)} onBlur={() => f.blur(name)} aria-invalid={!!err} aria-required={required} aria-describedby={err ? `${id}-err` : hint ? `${id}-hint` : undefined} />
      ) : (
        <input
          id={id} name={name} type={type} className="field-input" autoComplete={autoComplete} inputMode={inputMode} min={min}
          value={String(f.values[name] ?? '')}
          onChange={(e) => f.set(name, e.target.value)}
          onBlur={() => f.blur(name)}
          aria-invalid={!!err}
          aria-required={required}
          aria-describedby={err ? `${id}-err` : hint ? `${id}-hint` : undefined}
          {...(autoFocus ? { 'data-autofocus': '' } : {})}
        />
      )}
      {hint && !err && <p id={`${id}-hint`} className="t-small mt-1">{hint}</p>}
      {err && <p id={`${id}-err`} className="field-error">{err}</p>}
    </div>
  );
}

export function SelectField({ f, name, label, options, required = false }: { f: F; name: string; label: string; options: { value: string; label: string }[]; required?: boolean }) {
  const id = useId();
  const t = useT().forms;
  const err = f.errors[name];
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required ? <span aria-hidden="true" className="text-accent-ink">*</span> : null}
      </label>
      <select id={id} name={name} className="field-input" value={String(f.values[name] ?? '')} onChange={(e) => { f.set(name, e.target.value); }} onBlur={() => f.blur(name)} aria-invalid={!!err} aria-required={required} aria-describedby={err ? `${id}-err` : undefined}>
        <option value="">{t.choose}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {err && <p id={`${id}-err`} className="field-error">{err}</p>}
    </div>
  );
}

export function CheckField({ f, name, label }: { f: F; name: string; label: ReactNode }) {
  const id = useId();
  const err = f.errors[name];
  return (
    <div>
      <div className="flex items-start gap-3">
        <input id={id} type="checkbox" checked={!!f.values[name]} onChange={(e) => { f.set(name, e.target.checked); f.blur(name); }} aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} className="mt-[3px] h-5 w-5 shrink-0 accent-primary" />
        <label htmlFor={id} className="text-[14px] leading-relaxed text-ink">{label}</label>
      </div>
      {err && <p id={`${id}-err`} className="field-error ms-8">{err}</p>}
    </div>
  );
}

export function ErrorSummary({ errors, refEl }: { errors: Record<string, string>; refEl: React.RefObject<HTMLDivElement> }) {
  const t = useT().forms;
  const n = Object.keys(errors).length;
  if (!n) return null;
  return (
    <div ref={refEl} tabIndex={-1} role="alert" className="border border-error bg-white p-4 text-[14px] text-error">
      {fmt(t.errSummary, { n: n === 1 ? t.errOne : fmt(t.errMany, { n }) })}
    </div>
  );
}

export function SuccessState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="py-6 text-center" role="status">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent text-accent-ink"><Icon name="check" size={24} /></span>
      <h3 className="t-h3 mt-6">{title}</h3>
      <span className="gold-rule mx-auto mt-4" aria-hidden="true" />
      <p className="mx-auto mt-4 max-w-[46ch] text-[16px] text-ink">{text}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export const countryCodes = [
  ['+971', 'UAE +971'], ['+91', 'India +91'], ['+92', 'Pakistan +92'], ['+966', 'Saudi Arabia +966'], ['+968', 'Oman +968'],
  ['+974', 'Qatar +974'], ['+973', 'Bahrain +973'], ['+965', 'Kuwait +965'], ['+20', 'Egypt +20'], ['+962', 'Jordan +962'],
  ['+961', 'Lebanon +961'], ['+234', 'Nigeria +234'], ['+254', 'Kenya +254'], ['+880', 'Bangladesh +880'], ['+94', 'Sri Lanka +94'],
  ['+977', 'Nepal +977'], ['+63', 'Philippines +63'], ['+44', 'United Kingdom +44'], ['+1', 'USA / Canada +1'], ['+7', 'Kazakhstan / Russia +7'],
] as const;

/** Enquiry form (used in the modal). */
export function EnquiryForm({ programme, onDone }: { programme?: string; onDone: () => void }) {
  const t = useT();
  const fm = t.forms;
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const summary = useRef<HTMLDivElement>(null);
  const f = useForm(
    { name: '', email: '', cc: '+971', phone: '', nationality: '', curriculum: '', programme: programme ?? '', intake: '', consent: false },
    {
      name: (v) => (String(v).trim().length < 2 ? fm.errName : null),
      email: (v) => (EMAIL_RE.test(String(v).trim()) ? null : fm.errEmail),
      phone: (v) => (PHONE_RE.test(String(v).trim()) ? null : fm.errPhone),
      nationality: (v) => (String(v).trim() ? null : fm.errRequired),
      curriculum: (v) => (v ? null : fm.errRequired),
      programme: (v) => (v ? null : fm.errRequired),
      intake: (v) => (v ? null : fm.errRequired),
      consent: (v) => (v ? null : fm.errConsent),
    },
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = f.validateAll();
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    setStatus('sending');
    await submitTo('/api/enquiry', f.values);
    setStatus('done');
  };
  if (status === 'done') {
    return <SuccessState title={t.enquiry.thanksTitle} text={t.enquiry.thanks} action={<button type="button" className="btn btn-primary" onClick={onDone} data-autofocus>{t.enquiry.done}</button>} />;
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <ErrorSummary errors={f.errors} refEl={summary} />
      <Field f={f} name="name" label={fm.fullName} required autoComplete="name" autoFocus />
      <Field f={f} name="email" label={fm.email} type="email" required autoComplete="email" inputMode="email" />
      <div>
        <span className="field-label" id="phone-group">{fm.phone} <span aria-hidden="true" className="text-accent-ink">*</span></span>
        <div className="grid grid-cols-[150px_1fr] gap-3" role="group" aria-labelledby="phone-group" dir="ltr">
          <div>
            <label htmlFor="enq-cc" className="sr-only">{fm.countryCode}</label>
            <select id="enq-cc" className="field-input" value={String(f.values.cc)} onChange={(e) => f.set('cc', e.target.value)} autoComplete="tel-country-code">
              {countryCodes.map(([v, l]) => <option key={l} value={v}>{l}</option>)}
            </select>
          </div>
          <Field f={f} name="phone" label={fm.phone} type="tel" required autoComplete="tel-national" inputMode="tel" />
        </div>
      </div>
      <Field f={f} name="nationality" label={fm.nationality} required autoComplete="country-name" />
      <SelectField f={f} name="curriculum" label={fm.curriculum} required options={[...curricula.map((c) => ({ value: c.id, label: c.name })), { value: 'other', label: fm.other }]} />
      <SelectField f={f} name="programme" label={fm.programme} required options={[...programmes.map((p) => ({ value: p.slug, label: p.title })), { value: 'undecided', label: fm.undecided }]} />
      <SelectField f={f} name="intake" label={fm.intake} required options={[{ value: '2027-01', label: 'January 2027' }, { value: '2027-09', label: 'September 2027' }, { value: '2028-01', label: 'January 2028' }]} />
      <CheckField f={f} name="consent" label={fm.consent} />
      <div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === 'sending'}>
          {status === 'sending' ? fm.sending : fm.submit}
        </button>
      </div>
    </form>
  );
}

/** Visit booking form. */
export function VisitForm() {
  const t = useT();
  const fm = t.forms;
  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const summary = useRef<HTMLDivElement>(null);
  const f = useForm(
    { name: '', email: '', date: '', time: '', programme: '', party: '2' },
    {
      name: (v) => (String(v).trim().length < 2 ? fm.errName : null),
      email: (v) => (EMAIL_RE.test(String(v).trim()) ? null : fm.errEmail),
      date: (v) => (v ? null : fm.errRequired),
      time: (v) => (v ? null : fm.errRequired),
      programme: (v) => (v ? null : fm.errRequired),
      party: (v) => (v ? null : fm.errRequired),
    },
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = f.validateAll();
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    setStatus('sending');
    await submitTo('/api/visit', f.values);
    setStatus('done');
  };
  if (status === 'done') return <SuccessState title={t.enquiry.thanksTitle} text={fm.visitThanks} />;
  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <ErrorSummary errors={f.errors} refEl={summary} />
      <Field f={f} name="name" label={fm.fullName} required autoComplete="name" />
      <Field f={f} name="email" label={fm.email} type="email" required autoComplete="email" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field f={f} name="date" label={fm.visitDate} type="date" required min={minDate} />
        <SelectField f={f} name="time" label={fm.visitTime} required options={['10:00', '11:30', '13:00', '14:30', '16:00'].map((x) => ({ value: x, label: `${x} GST` }))} />
      </div>
      <SelectField f={f} name="programme" label={fm.programme} required options={[...programmes.map((p) => ({ value: p.slug, label: p.title })), { value: 'undecided', label: fm.undecided }]} />
      <SelectField f={f} name="party" label={fm.partySize} required options={['1', '2', '3', '4', '5', '6'].map((x) => ({ value: x, label: x }))} />
      <div><button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? fm.sending : fm.bookVisit}</button></div>
    </form>
  );
}

/** General contact form. */
export function ContactForm() {
  const t = useT();
  const fm = t.forms;
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const summary = useRef<HTMLDivElement>(null);
  const f = useForm(
    { name: '', email: '', topic: '', message: '', consent: false },
    {
      name: (v) => (String(v).trim().length < 2 ? fm.errName : null),
      email: (v) => (EMAIL_RE.test(String(v).trim()) ? null : fm.errEmail),
      topic: (v) => (v ? null : fm.errRequired),
      message: (v) => (String(v).trim().length < 10 ? fm.errRequired : null),
      consent: (v) => (v ? null : fm.errConsent),
    },
  );
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = f.validateAll();
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return; }
    setStatus('sending');
    await submitTo('/api/contact', f.values);
    setStatus('done');
  };
  if (status === 'done') return <SuccessState title={t.enquiry.thanksTitle} text={fm.contactThanks} />;
  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <ErrorSummary errors={f.errors} refEl={summary} />
      <Field f={f} name="name" label={fm.fullName} required autoComplete="name" />
      <Field f={f} name="email" label={fm.email} type="email" required autoComplete="email" />
      <SelectField f={f} name="topic" label="Topic" required options={[
        { value: 'admissions', label: 'Admissions' }, { value: 'fees', label: 'Fees & scholarships' }, { value: 'visa', label: 'Visas & international' },
        { value: 'partnerships', label: 'Partnerships & employers' }, { value: 'media', label: 'Media' }, { value: 'other', label: fm.other },
      ]} />
      <Field f={f} name="message" label={fm.message} type="textarea" required />
      <CheckField f={f} name="consent" label={fm.consent} />
      <div><button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{status === 'sending' ? fm.sending : fm.sendMessage}</button></div>
    </form>
  );
}

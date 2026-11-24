import { dubai } from '@content/site';
import { useT } from '@/lib/locale';
import { Icon } from './Icon';

/** OpenStreetMap embed of Dubai International Academic City. Space reserved (16:10) — no CLS. */
export function MapEmbed() {
  const { lat, lng } = dubai.geo;
  const bbox = [lng - 0.012, lat - 0.008, lng + 0.012, lat + 0.008].map((n) => n.toFixed(4)).join('%2C');
  return (
    <div className="border border-rule bg-white p-[6px]">
      <div className="relative bg-stone" style={{ aspectRatio: '16 / 10' }}>
        <iframe
          title="Map showing RKDF University Dubai, Block 11, Dubai International Academic City"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
          referrerPolicy="no-referrer"
        />
      </div>
      <p className="px-2 pb-1 pt-2 text-[12px] text-ink-55">
        <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`} rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:text-primary">
          Open a larger map
        </a>{' '}
        · © OpenStreetMap contributors
      </p>
    </div>
  );
}

export function ContactBlock() {
  const t = useT();
  return (
    <address className="mt-8 grid gap-5 not-italic sm:grid-cols-2">
      <div className="flex gap-3">
        <Icon name="pin" className="mt-1 shrink-0 text-accent-deep" />
        <p className="text-[15px] leading-relaxed text-ink">{dubai.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</p>
      </div>
      <ul className="space-y-3 text-[15px] text-ink">
        <li className="flex gap-3"><Icon name="phone" className="shrink-0 text-accent-deep" /><a href={dubai.phoneHref} className="t-num hover:text-primary" dir="ltr">{dubai.phone}</a></li>
        <li className="flex gap-3"><Icon name="whatsapp" className="shrink-0 text-accent-deep" /><a href={dubai.whatsappHref} rel="noopener noreferrer" className="hover:text-primary">{t.footer.whatsapp} <span className="t-num" dir="ltr">{dubai.whatsapp}</span></a></li>
        <li className="flex gap-3"><Icon name="mail" className="shrink-0 text-accent-deep" /><a href={`mailto:${dubai.emailAdmissions}`} className="break-all hover:text-primary">{dubai.emailAdmissions}</a></li>
        <li className="flex gap-3"><Icon name="clock" className="shrink-0 text-accent-deep" /><span className="t-num">{dubai.hours}</span></li>
      </ul>
    </address>
  );
}

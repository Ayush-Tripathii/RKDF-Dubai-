/**
 * Picture / ImageFrame — the only way photography enters the page.
 * Serves AVIF with WebP fallback at 640/1280/2000w, explicit width/height
 * (zero CLS), lazy by default. Swap photography in /content/media.ts.
 */
import { media, mediaDims, imageWidths, portraits, type MediaKey, type PortraitKey } from '@content/media';

interface PictureProps {
  name: MediaKey;
  sizes?: string;
  alt?: string; // override; '' for decorative
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  ratio?: string; // e.g. '3 / 2' — crops with object-fit
}

const srcset = (name: string, ext: string) => imageWidths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');

export function Picture({ name, sizes = '100vw', alt, priority = false, className = '', imgClassName = '', ratio }: PictureProps) {
  const d = mediaDims[name] ?? { width: 2000, height: 1333 };
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, 'webp')} sizes={sizes} />
      <img
        src={`/images/${name}-1280.webp`}
        alt={alt ?? media[name]}
        width={d.width}
        height={d.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        className={`h-full w-full object-cover ${imgClassName}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
      />
    </picture>
  );
}

/** Framed image with optional 1px Rule frame and serif italic caption. No radius. */
export function ImageFrame({ name, caption, frame = true, ratio = '3 / 2', sizes, alt, className = '' }: { name: MediaKey; caption?: string; frame?: boolean; ratio?: string; sizes?: string; alt?: string; className?: string }) {
  return (
    <figure className={className}>
      <div className={frame ? 'border border-rule bg-white p-[6px]' : ''}>
        <div className="overflow-hidden bg-stone" style={{ aspectRatio: ratio }}>
          <Picture name={name} sizes={sizes} alt={alt} className="block h-full w-full" />
        </div>
      </div>
      {caption && <figcaption className="mt-3 font-serif text-[13px] italic leading-snug text-ink-55">{caption}</figcaption>}
    </figure>
  );
}

/** Circular portrait. Uses a photograph when supplied, otherwise a monogram placeholder. */
export function Portrait({ portrait, initials, size = 96, alt }: { portrait?: PortraitKey; initials?: string; size?: number; alt?: string }) {
  if (portrait) {
    return (
      <picture className="block shrink-0 overflow-hidden rounded-full border border-rule bg-stone" style={{ width: size, height: size }}>
        <source type="image/avif" srcSet={`/images/portrait-${portrait}.avif`} />
        <img src={`/images/portrait-${portrait}.webp`} alt={alt ?? portraits[portrait]} width={size} height={size} loading="lazy" className="h-full w-full rounded-full object-cover" />
      </picture>
    );
  }
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full border border-accent bg-stone font-serif text-primary"
      style={{ width: size, height: size, fontSize: size * 0.32, letterSpacing: '0.04em' }}
      role="img"
      aria-label={alt ?? 'Portrait to follow'}
    >
      {initials}
    </span>
  );
}

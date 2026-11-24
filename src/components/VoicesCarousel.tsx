/**
 * Testimonial carousel: one quote at a time, 400ms crossfade, arrows + dots,
 * no auto-advance. Arrow keys move between slides when the region has focus.
 * Mirrored in RTL.
 */
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useT, useLocale } from '@/lib/locale';
import { fmt } from '@content/i18n';
import { testimonials } from '@content/people';
import { Portrait } from './ImageFrame';
import { Icon } from './Icon';

export function VoicesCarousel() {
  const t = useT().home.voices;
  const rtl = useLocale() === 'ar';
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const n = testimonials.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);
  const q = testimonials[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.label}
      className="mx-auto max-w-[52rem] text-center"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
        if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
      }}
    >
      <div className="relative min-h-[380px] sm:min-h-[340px]" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={fmt(t.slide, { n: i + 1, total: n })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <Portrait portrait={q.portrait} size={96} />
            <blockquote className="t-quote mt-8 text-primary" lang="en">
              <p>“{q.quote}”</p>
            </blockquote>
            <figcaption className="mt-6 text-[13px] leading-relaxed text-ink-55">
              <span className="font-semibold text-ink">{q.name}</span> · {q.programme}
              <br />
              {q.country} · {q.year}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-primary transition-colors duration-150 hover:border-accent" aria-label={t.prev}>
          <Icon name={rtl ? 'chevronRight' : 'chevronLeft'} />
        </button>
        <div className="flex items-center gap-1">
          {testimonials.map((x, k) => (
            <button
              key={x.name}
              type="button"
              onClick={() => setI(k)}
              aria-label={fmt(t.goTo, { n: k + 1 })}
              aria-current={k === i ? 'true' : undefined}
              className="flex h-11 w-8 items-center justify-center"
            >
              <span className={`block h-[7px] w-[7px] rounded-full border border-accent transition-colors duration-150 ${k === i ? 'bg-accent' : 'bg-transparent'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-primary transition-colors duration-150 hover:border-accent" aria-label={t.next}>
          <Icon name={rtl ? 'chevronLeft' : 'chevronRight'} />
        </button>
      </div>
    </section>
  );
}

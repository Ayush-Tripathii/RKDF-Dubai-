# RKDF University Dubai — website

React 18 + TypeScript + Tailwind CSS 3 + Framer Motion, built with Vite. Every route in both locales (EN and `/ar`) is prerendered to static HTML.

## Commands

```bash
npm install
npm run dev        # development server
npm run build      # type-check → client → SSR bundle → prerender 134 pages + sitemap.xml + robots.txt
npm run preview    # serve dist/client on http://localhost:4173 (PORT=… to change)
npm run check      # post-build checks: links, href="#", one <h1>, no hex in components, stats in HTML
npm run images     # re-download and convert placeholder photography (AVIF + WebP, 640/1280/2000w)
npm run assets     # regenerate Open Graph images and placeholder PDFs
```

Deploy `dist/client/` to any static host. Configure it to serve `404.html` for unknown paths.

## Where things live

| To change… | Edit |
|---|---|
| Any interface string, nav, homepage copy, page headers (EN + AR) | `content/i18n.ts` |
| Programmes, fees, modules | `content/programmes.ts` |
| Schools (counts are computed and checked at build time) | `content/schools.ts` |
| Leadership, governance, directory | `content/staff.ts` |
| News / events (sorted by date; past events hide automatically) | `content/news.ts`, `content/events.ts` |
| Statistics | `content/stats.ts` |
| Entry requirements, documents | `content/requirements.ts` |
| Other fees, scholarships, living costs | `content/fees.ts` |
| Regulators, attestation FAQ | `content/accreditation.ts` |
| Research centres | `content/research.ts` |
| Partners, testimonials, downloads | `content/people.ts` |
| Photography and alt text | `content/media.ts` + `public/images/` |
| Colours, scrims, fonts | `src/styles/tokens.css` (the only place colour values are declared) |
| The crest | `src/components/LogoSlot.tsx` → `CREST_SRC` |

`CONTENT-TODO.md` lists every invented value that must be replaced before launch.

## Design decisions that depart from the brief, and why

- **Scrim opacity.** The brief's 55% / 50% / 60% scrims measure 3.4:1 against bright areas of a photograph. They were raised (hero text zone 62–82%, page header 64%, closing band 66%) to clear WCAG 4.5:1. The measurements are on `/styleguide`.
- **Two extra gold tokens.** Accent `#A8873D` is 3.9:1 on Parchment, and Accent-Deep is 4.2:1 on Stone, so both fail for small text. `Accent Ink #7A5F22` is used for small gold text on light grounds, and `Accent Light #C9AB66` for gold text on the navy footer. Accent itself is used only for rules and ornament.
- **Error colour.** An `error` token (`#A32E24`) was added for form validation.
- **No invented people.** Deans, faculty and the Dubai Vice-Chancellor appear as role cards ("Appointment to be announced"), with monogram placeholders instead of portraits.

## Alternative hero H1 options

1. *A university built on thirty years of academic conviction.* (current)
2. *Three decades of scholarship, now in Dubai.*
3. *An established university, opening a new chapter in Dubai.*
4. *Rigorous, accessible education — from Bhopal to Dubai.*

## Not yet measured

Lighthouse has not been run in this environment. The build is designed for the brief's targets: hero image preloaded at high priority with AVIF/WebP and explicit dimensions, two weights per typeface self-hosted as WOFF2 with `font-display: swap`, space reserved for every image, statistic and embed, and below-the-fold images lazy-loaded. The single JS bundle is about 185 KB gzipped; code-splitting the routes would be the first optimisation if mobile Performance comes in under 90.

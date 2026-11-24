# CONTENT-TODO — RKDF University Dubai

Every invented or placeholder item on the site is listed here. Each one sits in a typed file under `/content`, so you can change it without touching JSX.

- **REPLACE BEFORE LAUNCH**: the value was invented to make the build complete. Do not publish it until a responsible officer has confirmed or replaced it.
- **VERIFIED — DO NOT CHANGE**: a fact about RKDF University, Bhopal, supplied as verified. Only change it if the home campus formally corrects it.
- **DRAFT — APPROVAL REQUIRED**: text attributed to a real person. That person must approve it before it is published.

---

## Part A — Invented content: REPLACE BEFORE LAUNCH

### Site-wide (header, footer, every page)

| Item | Current value | File |
|---|---|---|
| Canonical domain | `https://www.rkdfdubai.ac.ae` | `content/site.ts` → `SITE_URL` |
| Campus address | Block 11, Dubai International Academic City, Al Ruwayyah 2, Dubai, UAE · PO Box 345219 | `content/site.ts` → `dubai` |
| Map coordinates | 25.1229, 55.4166 (approximate DIAC location) | `content/site.ts` → `dubai.geo` |
| Telephone | +971 4 428 6100 | `content/site.ts` |
| WhatsApp | +971 50 418 7722 | `content/site.ts` |
| Emails | admissions@rkdfdubai.ac.ae · registrar@rkdfdubai.ac.ae | `content/site.ts`, `content/staff.ts` |
| Office hours | Sunday–Thursday, 08:00–17:00 GST | `content/site.ts` |
| KHDA permit | Educational Permit No. DXB-HE-2026-0147 | `content/site.ts`, `content/accreditation.ts` |
| MoHESR / CAA status | Initial Institutional Licensure — in progress | `content/site.ts`, `content/accreditation.ts` |
| LinkedIn URL | linkedin.com/school/rkdf-university-dubai | `content/site.ts` → `dubai.social` |
| YouTube URL | youtube.com/@rkdfuniversitydubai | `content/site.ts` → `dubai.social` |
| Announcement bar | "Applications for the January 2027 intake are now open." | `content/i18n.ts` → `announcement` |
| Founding Vice-Chancellor (Dubai) | `Prof. [[DUBAI_VC_NAME]]`, left as a token on purpose | `content/site.ts`, `content/staff.ts` |
| Crest | Not supplied. A typographic lockup is used instead. | `src/components/LogoSlot.tsx` → `CREST_SRC` |
| Favicon | Typographic "RKDF" mark | `public/favicon.svg` |

### Home page

| Item | Current value | File |
|---|---|---|
| Hero claim "thirty years of academic conviction" / "three decades" | Check that the Foundation's history really supports thirty years | `content/i18n.ts` → `home.hero`, `home.glance` |
| Opening date | January 2027; intakes each January and September | `content/site.ts`, `content/i18n.ts` |
| At-a-glance figures | 2,400 student capacity · 180 academic staff · 46 nationalities · 94% graduate outcomes | `content/stats.ts` → `glance` |
| Programme and school counts | 38 programmes · 7 schools (computed: 7+6+6+5+4+5+5) | `content/schools.ts`, `content/programmes.ts` |
| "Why RKDF Dubai" claims | Semester in Bhopal at no extra tuition; cohorts under 30; paid 12-week placement; fixed tuition; 61% doctorates; 44% industry roles; 2 years of careers support | `content/i18n.ts` → `home.why`, `content/stats.ts` → `facts` |
| Key dates | January 2027 closes 18 Dec 2026; September 2027 opens 5 Jan 2027 | `content/site.ts` → `keyDates`, `content/i18n.ts` |
| Living costs | Shared housing AED 2,800–4,200/mo · studio AED 4,500–6,500/mo · metro AED 350/mo · meal AED 28 | `content/fees.ts` → `costOfLiving` |
| Campus line | Visa sponsorship (one year, renewable) · 31 societies · 4 sports facilities · prayer rooms · 24-hour study | `content/i18n.ts` → `home.campus` |
| Campus captions | "forty-minute metro and bus journey", "Reading rooms open late" | `content/i18n.ts` → `home.campus.captions` |
| Research figures | 22 laboratories · 9 funded projects · 4 research centres · 6 patents filed | `content/stats.ts` → `research` |
| Outcomes figures | 94% in work or study within six months · AED 11,500 median monthly salary · 68% retained by placement host · 310 partner organisations | `content/stats.ts` → `outcomes` |

### Programmes and schools (`/programmes`, `/programmes/[slug]`, `/academics/[school]`)

| Item | File |
|---|---|
| All 15 flagship programmes: titles, awards, durations, intakes, tuition (AED), study modes, UCAS-style codes, summaries, overviews, module lists, careers, related programmes | `content/programmes.ts` → `programmes` |
| The 23 additional programme titles that make up the 38 | `content/programmes.ts` → `additionalProgrammes` |
| Course start dates in the JSON-LD (10 Jan 2027, 12 Sep 2027) | `src/pages/academics.tsx` → `courseLd` |
| All 7 school names, descriptions, overviews, facilities, research areas and planned faculty roles | `content/schools.ts` |
| Founding dean messages, attributed to an unnamed "Founding Dean" | `content/schools.ts` → `deanMessage` |
| Faculty cards (roles only, "Appointment to be announced") | `content/schools.ts` → `faculty` |

**Fee schedule, with every value invented:**

| Programme | Tuition |
|---|---|
| BSc Computer Science (AI) | AED 62,000 per year |
| BSc Cybersecurity | AED 62,000 per year |
| BEng Civil Engineering | AED 58,000 per year |
| BEng Mechatronics | AED 58,000 per year |
| BBA Business Administration | AED 54,000 per year |
| BSc Finance & Financial Technology | AED 56,000 per year |
| LLB Law (UAE & International) | AED 60,000 per year |
| BA Interaction & Communication Design | AED 56,000 per year |
| BSc Biomedical Sciences | AED 64,000 per year |
| BPharm Pharmacy | AED 66,000 per year |
| MSc Data Science | AED 72,000 total |
| MSc Construction Management | AED 68,000 total |
| MBA (Executive) | AED 86,000 total |
| LLM International Commercial Law | AED 70,000 total |
| Foundation Year | AED 38,000 |

### Admissions pages

| Item | File |
|---|---|
| Entry requirements: CBSE/ICSE 65% · IB 26 · A-Level BCC · American GPA 2.8 · WAEC five credits · UAE MoE 70%, plus foundation thresholds and notes | `content/requirements.ts` → `curricula` |
| English requirements: IELTS 6.0 (no band below 5.5) · TOEFL iBT 72 (writing 18) · EmSAT 1250 · LLM IELTS 6.5 | `content/requirements.ts` |
| Postgraduate requirements and document checklist | `content/requirements.ts` |
| Other fees: application AED 500 · deposit AED 5,000 · visa AED 3,500 · insurance AED 1,800 | `content/fees.ts` → `otherFees` |
| Payment terms (two instalments; ten monthly payments; tuition fixed at enrolment) | `content/fees.ts` → `paymentTerms` |
| Scholarships: Chancellor's Merit 25% · Early Decision 10% · Sibling 15% · Alumni Family 10% · Dr. Sadhna Kapoor Women in STEM Award (full tuition), with eligibility text | `content/fees.ts` → `scholarships` |
| Admissions FAQ (decision within 10 working days, and the other answers) | `src/pages/admissions.tsx` → `admissionsFaq` |
| Teaching start dates and Open Day dates on `/admissions` | `src/pages/admissions.tsx` |
| Visa process, attestation steps, airport collection, health insurance | `src/pages/admissions.tsx` → `International` |
| Agent policy | `src/pages/admissions.tsx` → `Agents` |

### Student life

| Item | File |
|---|---|
| Housing options, utilities estimate (AED 300–600) | `src/pages/studentLife.tsx` |
| Society names (a selection of the 31) and sport list | `src/pages/studentLife.tsx` → `Societies` |
| Faith facilities, wellbeing languages, building accessibility features, campus nurse | `src/pages/studentLife.tsx` |

### About pages

| Item | File |
|---|---|
| Campus description, library opening hours, "Getting here" directions | `src/pages/about.tsx` → `Campus` |
| Governance bodies and senior roles (no names) | `content/staff.ts` → `governance`, `governanceBodies` |
| University directory | `content/staff.ts` → `directory` |
| Library and learning-commons details | `src/pages/about.tsx` |

### Research

| Item | File |
|---|---|
| Four Dubai research centres: names, themes, overviews, projects, facilities | `content/research.ts` |

### Careers and outcomes

| Item | File |
|---|---|
| Twelve **fictional** partner organisations: Meridian Gulf Logistics, Nakhla Capital, Orbit Health Group, Falcon Systems, Deira TechWorks, Zahra Energy, Khaleej Build, Arcadia Retail Group, Jumeirah Analytics, Sahab Cloud, Nawras Legal, Emirates Design Collective. Never substitute a real company without a signed agreement. | `content/people.ts` → `partners` |

### Testimonials (all invented people)

| Quote | Attribution | File |
|---|---|---|
| "I came for the Dubai placement year…" | Yusuf Rahman · BSc CS (AI) · Pakistan · 2031 | `content/people.ts` |
| "Thirty students in my cohort…" | Lina Haddad · MBA Executive · Jordan · 2028 | `content/people.ts` |
| "The semester in Bhopal changed…" | Chidi Okonkwo · BEng Civil · Nigeria · 2031 | `content/people.ts` |
| "Every fee on one page…" | Ananya Pillai · BBA · India · 2030 | `content/people.ts` |

The four testimonial portraits are stock photographs of models, not of these people. Replace them with real students who have given consent, or remove the section.

### News and events (`content/news.ts`, `content/events.ts`)

| Date | Item |
|---|---|
| 18 Nov 2026 | Block 11 campus confirmed, opening January 2027 |
| 11 Nov 2026 | January 2027 intake opens across 38 programmes |
| 04 Nov 2026 | Carbon capture programme extends from Bhopal to Dubai |
| 28 Oct 2026 | Placement agreement with Meridian Gulf Logistics (fictional organisation) |
| 15 Oct 2026 | Fit-out begins on 22 teaching laboratories |
| 03 Dec 2026 | Online Information Session, 18:00–19:30 GST |
| 12 Dec 2026 | Open Day, 10:00–15:00 GST |
| 17 Jan 2027 | Open Day, 10:00–15:00 GST |

Past events drop out of the listings automatically.

### Photography (`content/media.ts`, `public/images`)

All 35 photographs and 4 portraits are **licensed Unsplash stock**. None of them shows RKDF University Dubai or RKDF University, Bhopal. In particular:
- The hero, closing band and campus images show campuses in other countries. They need commissioned photography of Block 11 / DIAC.
- The heritage image (`libraryShelves`) is captioned in relation to Bhopal. It needs a real archival photograph of the Bhopal campus.
- Leadership portraits are monogram placeholders. Supply official photographs of Dr. Sadhna Kapoor and Prof. Vijay K. Agrawal.

### Downloads (`public/downloads`, generated by `scripts/make-pdfs.mjs`)

All eight PDFs are text placeholders marked DRAFT: prospectus, fee schedule, document checklist, scholarship form, academic regulations, refund policy, code of conduct, complaints procedure.

### Legal pages

The privacy notice, terms and accessibility statement are working drafts. Legal counsel must review them, including the reference to UAE Federal Decree-Law No. 45 of 2021.

### Integrations not yet connected

- Enquiry, visit, contact, application and newsletter forms run validation and show a real success state, but they do not send data anywhere yet. Connect them to the CRM at `submitTo()` in `src/components/forms.tsx`.
- Open Graph images are generated by `scripts/make-og.mjs` and must be regenerated after the copy changes.

### Arabic translation

`content/i18n.ts` holds the interface, navigation, homepage and every page header in Arabic. That is a working translation, and a professional translator must review it. **Long-form inner-page body copy is in English only at present**, including when it appears on `/ar/...` pages.

---

## Part B — VERIFIED — DO NOT CHANGE

These facts about the home institution were supplied as verified. They live in `content/site.ts` → `parent` and `content/staff.ts`.

| Fact | Value |
|---|---|
| Legal parent body | Ram Krishna Dharmarth Foundation (RKDF) |
| Home institution | RKDF University, Bhopal, Madhya Pradesh, India |
| Status | Private state university, Madhya Pradesh |
| Chancellor | Dr. Sadhna Kapoor |
| Vice-Chancellor | Prof. Vijay K. Agrawal — M.Sc., D.Phil., PGD (Chemistry & Chemical Engineering), Tokyo Institute of Technology, Japan |
| Motto | Education Glorifies Nation |
| Campus | Airport Bypass Road, Gandhi Nagar, Bhopal, MP 462033 |
| Student portal | erplive.rkdf.ac.in |
| Website | rkdf.ac.in |
| Social | facebook.com/rkdfuniversitybhopal · twitter.com/universityRkdf · instagram.com/rkdfuniversitybhopal |
| Accreditations | NAAC accredited · UGC recognised · AICTE approved · PCI (Pharmacy) · NCTE (Education) · COA & NATA (Architecture) · BCI (Law) · INC & MP NRC (Nursing) · NCH (Homeopathy) · NCISM (Ayurveda) · MP Paramedical Council · ICAR accreditation (Agriculture) · SIRO recognition (Research) · AUAP membership · NIRF participant |
| Seventeen faculties | Management · Science · Commerce · Engineering & Technology · Pharmacy · Computer Application · Education · Social Science · Agriculture · Architecture · Law · Homeopathy · Ayurveda · Nursing · Paramedical · Library & Information Sciences · Doctoral Studies |
| Research | MoU with CSIR, New Delhi at IIT Bombay, August 2023 · Solar Integrated Carbon Capture Plant · MPCST projects: AI-Based Smart Agriculture Drone; Precision Farming & Sustainable Agriculture · Shodh Sangam journal · Incubation Centre, patents, Ph.D. supervision |
| Recognition | World Education Leadership Award 2023 — Best Private University · Grand Star Success Award, Academic Union Oxford (to Dr. Sadhna Kapoor) · Dainik Bhaskar Women Achiever's Award 2023 · RKDF alumnus contributed to Chandrayaan-3 |
| Chancellor's quotation | "Education is the prerequisite for the socio-economic development of the nation in general and of people in particular." |

## Part C — DRAFT — APPROVAL REQUIRED

| Item | File | Notes |
|---|---|---|
| Chancellor's message (5 paragraphs) | `content/staff.ts` → `chancellor.message` | Written for this build in Dr. Kapoor's voice. Only the first sentence is her verified quotation. The page shows a "draft, awaiting approval" note until `draft` is set to `false`. |
| Vice-Chancellor's message (5 paragraphs) | `content/staff.ts` → `viceChancellor.message` | Written for this build. Prof. Agrawal must approve it. Same `draft` flag. |
| Scholarship named after Dr. Sadhna Kapoor | `content/fees.ts` | Confirm that the Chancellor has consented to the naming. |

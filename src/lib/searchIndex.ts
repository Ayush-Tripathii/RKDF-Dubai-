/** Client-side search index built from /content — programmes, pages, news and people. */
import { programmes, levelLabel } from '@content/programmes';
import { schools } from '@content/schools';
import { news } from '@content/news';
import { centres } from '@content/research';
import { chancellor, viceChancellor, foundingVc, governance } from '@content/staff';
import { strings } from '@content/i18n';

export interface SearchEntry { type: 'programme' | 'page' | 'news' | 'staff'; title: string; text: string; to: string; keywords?: string; }

const p = strings.en.pages;
const pageRoutes: [keyof typeof p, string, string?][] = [
  ['about', '/about'], ['chancellor', '/about/chancellor'], ['viceChancellor', '/about/vice-chancellor'],
  ['leadership', '/about/leadership', 'governance board council'], ['accreditation', '/about/accreditation', 'KHDA MoHESR CAA NAAC UGC attestation equivalency licensure'],
  ['campus', '/about/campus', 'library laboratories DIAC block 11'], ['heritage', '/about/heritage', 'Bhopal history foundation CSIR Shodh Sangam'],
  ['academics', '/academics', 'schools faculties'], ['programmes', '/programmes', 'courses degrees finder'], ['admissions', '/admissions', 'apply deadline'],
  ['entryRequirements', '/admissions/entry-requirements', 'CBSE ICSE IB A-Level WAEC IELTS TOEFL EmSAT grades'],
  ['tuition', '/admissions/tuition-and-fees', 'fees cost AED dirhams payment'], ['scholarships', '/admissions/scholarships', 'merit funding discount women STEM'],
  ['howToApply', '/admissions/how-to-apply', 'documents checklist steps'], ['international', '/admissions/international', 'visa residency attestation arrival Emirates ID'],
  ['agents', '/admissions/agents', 'representatives counsellors'], ['studentLife', '/student-life'], ['accommodation', '/student-life/accommodation', 'housing rent studio'],
  ['societies', '/student-life/societies', 'clubs sport prayer faith'], ['support', '/student-life/support', 'counselling wellbeing disability accessibility health'],
  ['research', '/research', 'centres innovation patents'], ['careers', '/careers', 'placements employers outcomes salary'],
  ['global', '/global', 'Bhopal exchange transfer alumni'], ['news', '/news'], ['events', '/events', 'open day information session'],
  ['visit', '/visit', 'tour map directions'], ['contact', '/contact', 'phone email whatsapp directory'], ['apply', '/apply', 'application form'],
  ['downloads', '/downloads', 'prospectus pdf policies forms'], ['privacy', '/privacy'], ['terms', '/terms'], ['accessibility', '/accessibility'],
];

export const searchIndex: SearchEntry[] = [
  ...programmes.map((x) => ({ type: 'programme' as const, title: x.title, text: `${levelLabel[x.level]} · ${x.durationLabel} · ${x.summary}`, to: `/programmes/${x.slug}`, keywords: x.careers.join(' ') + ' ' + x.structure.flatMap((s) => s.modules).join(' ') })),
  ...schools.map((s) => ({ type: 'page' as const, title: s.name, text: s.description, to: `/academics/${s.slug}`, keywords: s.research.join(' ') })),
  ...centres.map((c) => ({ type: 'page' as const, title: c.name, text: c.summary, to: `/research/${c.slug}`, keywords: c.themes.join(' ') })),
  ...pageRoutes.map(([k, to, kw]) => ({ type: 'page' as const, title: p[k].title, text: p[k].standfirst, to, keywords: kw })),
  ...news.map((n) => ({ type: 'news' as const, title: n.title, text: `${n.date} · ${n.category}`, to: `/news/${n.slug}`, keywords: n.standfirst })),
  { type: 'staff', title: chancellor.name, text: `${chancellor.title}, ${chancellor.institution}`, to: '/about/chancellor', keywords: 'chancellor sadhna kapoor' },
  { type: 'staff', title: viceChancellor.name, text: `${viceChancellor.title}, ${viceChancellor.institution}`, to: '/about/vice-chancellor', keywords: 'vice-chancellor vijay agrawal' },
  { type: 'staff', title: foundingVc.title, text: 'Appointment to be announced', to: '/about/leadership', keywords: 'vice-chancellor dubai founding' },
  ...governance.map((g) => ({ type: 'staff' as const, title: g.role, text: `${g.unit} · ${g.status}`, to: '/about/leadership', keywords: g.email })),
  ...schools.map((s) => ({ type: 'staff' as const, title: `Dean, ${s.name}`, text: 'Founding appointment to be announced', to: `/academics/${s.slug}#dean`, keywords: 'dean' })),
];

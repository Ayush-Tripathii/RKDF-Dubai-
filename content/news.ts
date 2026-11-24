/**
 * News. ALL ITEMS INVENTED — REPLACE BEFORE LAUNCH.
 * Dates are ISO strings; the site sorts and formats them, so the homepage
 * always shows the most recent items and cannot silently go stale.
 */
import type { MediaKey } from './media';

export interface NewsItem {
  slug: string;
  date: string; // ISO yyyy-mm-dd
  category: 'Campus' | 'Admissions' | 'Research' | 'Partnerships';
  title: string;
  standfirst: string;
  image: MediaKey;
  body: string[];
}

export const news: NewsItem[] = [
  {
    slug: 'block-11-campus-confirmed',
    date: '2026-11-18',
    category: 'Campus',
    title: 'RKDF University Dubai confirms Block 11 campus in Dubai International Academic City, opening January 2027',
    standfirst: 'The university will occupy a purpose-fitted academic building at the heart of Dubai’s higher-education district.',
    image: 'hero',
    body: [
      'RKDF University Dubai has confirmed that its campus will be located in Block 11, Dubai International Academic City, and that it will welcome its first students in January 2027.',
      'The building will house the university’s seven schools, twenty-two teaching laboratories and studios, a library and learning commons, and student services. Dubai International Academic City is home to a large community of international universities, and students will have access to shared sports and residential facilities in the district.',
      'Dubai International Academic City offers students something no single campus can: a community of thousands of students from dozens of countries, within reach of the city’s metro and employment districts.',
      'Prospective students and families are invited to the university’s Open Day on 12 December 2026.',
    ],
  },
  {
    slug: 'january-2027-intake-opens',
    date: '2026-11-11',
    category: 'Admissions',
    title: 'January 2027 intake opens across 38 programmes',
    standfirst: 'Applications are now open for undergraduate, postgraduate and foundation study beginning in January 2027.',
    image: 'studentsLibrary',
    body: [
      'Applications are now open for the university’s first intake, beginning in January 2027. Programmes across all seven schools are accepting applications, with full fees published in dirhams on the university website.',
      'Applications for the January intake close on 18 December 2026. Applicants are encouraged to apply early, as Early Decision applicants are eligible for a 10% tuition scholarship.',
      'The admissions team offers one-to-one consultations in person and online, Sunday to Thursday.',
    ],
  },
  {
    slug: 'carbon-capture-programme-extends-to-dubai',
    date: '2026-11-04',
    category: 'Research',
    title: 'Carbon capture programme extends from Bhopal to Dubai',
    standfirst: 'The Centre for Carbon Capture & Clean Energy will build on the home campus’s solar integrated carbon capture work.',
    image: 'solar',
    body: [
      'RKDF University Dubai’s Centre for Carbon Capture & Clean Energy will extend the technical programme behind the Solar Integrated Carbon Capture Plant at RKDF University, Bhopal.',
      'The Dubai centre will examine how solar-integrated capture performs under Gulf conditions — high ambient temperature, dust and humidity — and how the approach might be applied to industrial sites in the region.',
      'The work builds on the home campus’s wider research relationships, including its memorandum of understanding with CSIR, New Delhi, signed at IIT Bombay in August 2023.',
    ],
  },
  {
    slug: 'placement-agreement-meridian-gulf-logistics',
    date: '2026-10-28',
    category: 'Partnerships',
    title: 'Placement agreement signed with Meridian Gulf Logistics',
    standfirst: 'The agreement will provide paid twelve-week placements for students in computing, business and engineering.',
    image: 'sharedDesk',
    body: [
      'RKDF University Dubai has signed a placement agreement with Meridian Gulf Logistics, which will host undergraduate students for paid twelve-week placements from 2028.',
      'Placements will be offered in data and analytics, operations, and engineering. Every RKDF Dubai undergraduate degree includes a paid placement, supported by the university’s careers team.',
    ],
  },
  {
    slug: 'laboratory-fit-out-begins',
    date: '2026-10-15',
    category: 'Campus',
    title: 'Fit-out begins on 22 teaching laboratories',
    standfirst: 'Work has started on the laboratories and studios that will serve all seven schools.',
    image: 'labEngineer',
    body: [
      'Fit-out has begun on the twenty-two laboratories and studios at the Block 11 campus. They include computing and security laboratories, materials testing and building performance laboratories, wet laboratories for health sciences, a moot courtroom and design studios.',
      'The fit-out is scheduled for completion before the first students arrive in January 2027.',
    ],
  },
];

export const sortedNews = () => [...news].sort((a, b) => b.date.localeCompare(a.date));
export const getNews = (slug: string) => news.find((n) => n.slug === slug);

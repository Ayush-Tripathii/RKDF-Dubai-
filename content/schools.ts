/**
 * The seven schools of RKDF University Dubai. [INVENTED — REPLACE BEFORE LAUNCH]
 * Programme counts are COMPUTED from programmes.ts so they always reconcile:
 * 7 + 6 + 6 + 5 + 4 + 5 + 5 = 38.
 */
import type { MediaKey } from './media';
import { programmes, additionalProgrammes } from './programmes';

export type SchoolSlug =
  | 'computing-ai'
  | 'business-management'
  | 'engineering-built-environment'
  | 'health-life-sciences'
  | 'law-public-policy'
  | 'design-media'
  | 'foundation-pathways';

export interface School {
  slug: SchoolSlug;
  name: string;
  short: string;
  description: string;
  image: MediaKey;
  overview: string[];
  deanMessage: string[];
  facilities: { name: string; text: string }[];
  research: string[];
  faculty: { role: string; area: string }[];
}

export const schools: School[] = [
  {
    slug: 'computing-ai',
    name: 'School of Computing & Artificial Intelligence',
    short: 'Computing & AI',
    description: 'Computer science, security and data, with applied AI at the centre.',
    image: 'studentsCode',
    overview: [
      'The School of Computing & Artificial Intelligence teaches the discipline from first principles — mathematics, algorithms and systems — and then applies it to problems that matter in the Gulf: Arabic language technology, logistics and computer vision.',
      'Its students work closely with the Centre for Gulf AI Applications, and its curriculum draws on the Faculty of Computer Application at the home campus in Bhopal.',
    ],
    deanMessage: [
      'Artificial intelligence is now an ordinary part of professional life. Our task is not to teach students a particular tool, but to give them the mathematics, the engineering judgement and the ethical habits to work responsibly with whatever comes next.',
      'We teach in small groups because programming and reasoning are learned by doing, with someone experienced watching closely. I look forward to welcoming our first students in January 2027.',
    ],
    facilities: [
      { name: 'High-performance computing laboratory', text: 'GPU workstations and a shared compute cluster for machine learning coursework and research.' },
      { name: 'Security laboratory', text: 'An isolated network range for penetration testing, forensics and incident response exercises.' },
      { name: 'Project studios', text: 'Bookable team rooms for group projects, with large displays and whiteboards.' },
    ],
    research: ['Arabic natural language processing', 'Logistics optimisation', 'Applied computer vision', 'Trustworthy and explainable AI'],
    faculty: [
      { role: 'Professor', area: 'Machine Learning' },
      { role: 'Associate Professor', area: 'Natural Language Processing' },
      { role: 'Associate Professor', area: 'Cybersecurity' },
      { role: 'Assistant Professor', area: 'Data Engineering' },
    ],
  },
  {
    slug: 'business-management',
    name: 'School of Business & Management',
    short: 'Business & Management',
    description: 'Management, finance and enterprise, taught through Gulf and South Asian cases.',
    image: 'studentsNotes',
    overview: [
      'The School of Business & Management prepares students for management careers in one of the world’s most international business environments. Teaching is case-based and draws heavily on organisations operating between the Gulf and South Asia.',
      'The School builds on the Faculties of Management and Commerce at RKDF University, Bhopal.',
    ],
    deanMessage: [
      'Dubai is a city built on trade, and our students study business in the middle of it. We bring practitioners into the classroom every week and send students into organisations for a full paid placement.',
      'We also publish every fee before you apply. A business school should practise the transparency it teaches.',
    ],
    facilities: [
      { name: 'Finance laboratory', text: 'Market data terminals and analytics software for finance and FinTech teaching.' },
      { name: 'Case rooms', text: 'Tiered seminar rooms designed for discussion-led case teaching.' },
      { name: 'Enterprise studio', text: 'Space and mentoring for student ventures, linked to the home campus Incubation Centre.' },
    ],
    research: ['Family business and succession', 'Islamic and digital finance', 'Supply-chain resilience', 'Entrepreneurship in emerging markets'],
    faculty: [
      { role: 'Professor', area: 'Strategic Management' },
      { role: 'Associate Professor', area: 'Finance' },
      { role: 'Assistant Professor', area: 'Marketing' },
      { role: 'Professor of Practice', area: 'Entrepreneurship' },
    ],
  },
  {
    slug: 'engineering-built-environment',
    name: 'School of Engineering & the Built Environment',
    short: 'Engineering & Built Environment',
    description: 'Civil, mechatronic and construction engineering for building in extreme heat.',
    image: 'siteSurvey',
    overview: [
      'The School of Engineering & the Built Environment teaches engineering as the disciplined response to real constraints — and few constraints are as demanding as building and operating infrastructure in extreme heat.',
      'Its programmes draw on the Faculties of Engineering & Technology and Architecture at the home campus, and on the Centre for Desert Construction & Materials in Dubai.',
    ],
    deanMessage: [
      'Engineers are judged by what stands up, what keeps working and what it costs the planet to build. We teach the fundamentals thoroughly, and then we test them against the climate outside our own windows.',
      'Many of our students will spend a semester in Bhopal. Seeing engineering practised under very different conditions is one of the most valuable things this university can offer.',
    ],
    facilities: [
      { name: 'Materials testing laboratory', text: 'Compression, tensile and durability testing, including thermal cycling of concrete specimens.' },
      { name: 'Mechatronics workshop', text: 'Fabrication, electronics benches and a robotics test area.' },
      { name: 'Building performance laboratory', text: 'Environmental chambers and sensors for testing passive cooling strategies.' },
    ],
    research: ['Low-carbon concrete', 'Passive cooling', 'Building performance in extreme heat', 'Autonomous inspection systems'],
    faculty: [
      { role: 'Professor', area: 'Structural Engineering' },
      { role: 'Associate Professor', area: 'Construction Materials' },
      { role: 'Associate Professor', area: 'Control & Robotics' },
      { role: 'Assistant Professor', area: 'Construction Management' },
    ],
  },
  {
    slug: 'health-life-sciences',
    name: 'School of Health & Life Sciences',
    short: 'Health & Life Sciences',
    description: 'Biomedical science, pharmacy and public health, grounded in laboratory practice.',
    image: 'labGlass',
    overview: [
      'The School of Health & Life Sciences brings together biomedical science, pharmacy, nursing and public health. Laboratory practice begins in the first semester and continues throughout.',
      'It builds on the home campus’s PCI-approved Faculty of Pharmacy and INC-approved Faculty of Nursing, and works closely with the Centre for Public Health in Hot Climates.',
    ],
    deanMessage: [
      'Health sciences are learned with your hands as much as your head. Our students will spend more time in the laboratory than in the lecture theatre.',
      'We are also asking a question that matters greatly in this region: what does sustained heat do to human health, and what can be done about it?',
    ],
    facilities: [
      { name: 'Teaching laboratories', text: 'Wet laboratories for biochemistry, microbiology and pharmaceutics.' },
      { name: 'Pharmacy practice suite', text: 'A simulated community pharmacy for dispensing and consultation training.' },
      { name: 'Clinical skills room', text: 'Simulation equipment for nursing and allied health teaching.' },
    ],
    research: ['Occupational heat stress', 'Epidemiology of heat-related illness', 'Worker health', 'Pharmaceutical formulation for hot climates'],
    faculty: [
      { role: 'Professor', area: 'Pharmacology' },
      { role: 'Associate Professor', area: 'Biomedical Sciences' },
      { role: 'Associate Professor', area: 'Public Health' },
      { role: 'Assistant Professor', area: 'Pharmacy Practice' },
    ],
  },
  {
    slug: 'law-public-policy',
    name: 'School of Law & Public Policy',
    short: 'Law & Public Policy',
    description: 'UAE, common and international law, with arbitration and policy.',
    image: 'lawLibrary',
    overview: [
      'The School of Law & Public Policy teaches law comparatively: the federal law of the UAE, the common-law courts of the DIFC and ADGM, and the international frameworks that govern trade and dispute resolution.',
      'It builds on the home campus Faculty of Law, approved by the Bar Council of India.',
    ],
    deanMessage: [
      'Lawyers in the Gulf must move between legal systems every day. We train our students to do so carefully and precisely, in both English and Arabic.',
      'Advocacy is learned by practising it. Our students moot from the first year and work with real clients before they graduate.',
    ],
    facilities: [
      { name: 'Moot courtroom', text: 'A full-scale courtroom for moots, mock arbitrations and public lectures.' },
      { name: 'Law library', text: 'Print and electronic collections in UAE, common and international law.' },
      { name: 'Legal clinic', text: 'Supervised advice sessions for the community, run by senior students.' },
    ],
    research: ['International commercial arbitration', 'Comparative contract law', 'Regulation of digital finance', 'Labour and migration law'],
    faculty: [
      { role: 'Professor', area: 'International Commercial Law' },
      { role: 'Associate Professor', area: 'UAE Civil Law' },
      { role: 'Assistant Professor', area: 'Public Policy' },
    ],
  },
  {
    slug: 'design-media',
    name: 'School of Design & Media',
    short: 'Design & Media',
    description: 'Interaction, communication, interior and screen design, bilingual by default.',
    image: 'drafting',
    overview: [
      'The School of Design & Media teaches design as a discipline of clarity and care, in studios of under thirty. Bilingual Arabic–English work is a thread through every programme.',
      'Its students work alongside the School of Computing on interfaces and with the School of Engineering on the design of spaces.',
    ],
    deanMessage: [
      'Good design makes complicated things understandable. That is a skill every organisation needs and few people are taught properly.',
      'Our studios are small on purpose. You will be seen, criticised and helped by people who practise what they teach.',
    ],
    facilities: [
      { name: 'Design studios', text: 'Dedicated desks for every student, with critique walls and print facilities.' },
      { name: 'Media suite', text: 'Editing, sound and colour-grading rooms for screen-based work.' },
      { name: 'Fabrication workshop', text: 'Laser cutting, 3D printing and model-making, shared with Engineering.' },
    ],
    research: ['Bilingual typography', 'Accessible interface design', 'Design for public services', 'Material culture of the Gulf'],
    faculty: [
      { role: 'Professor', area: 'Communication Design' },
      { role: 'Associate Professor', area: 'Interaction Design' },
      { role: 'Assistant Professor', area: 'Interior Design' },
    ],
  },
  {
    slug: 'foundation-pathways',
    name: 'Foundation & Pathways Programme',
    short: 'Foundation & Pathways',
    description: 'Preparation and guaranteed progression to an RKDF Dubai degree.',
    image: 'studentsSeminar',
    overview: [
      'The Foundation & Pathways Programme prepares students whose qualifications do not yet meet direct-entry requirements, and those who need to strengthen their academic English.',
      'Students who complete a pathway at the required level progress directly to a named degree at RKDF University Dubai.',
    ],
    deanMessage: [
      'Talent is evenly distributed; preparation is not. A foundation year exists to close that gap honestly and quickly.',
      'Our students are taught in small groups by teachers who specialise in exactly this transition.',
    ],
    facilities: [
      { name: 'Language centre', text: 'Classrooms and self-study resources for academic English.' },
      { name: 'Study skills centre', text: 'One-to-one support with writing, mathematics and study planning.' },
      { name: 'Shared laboratories', text: 'Stream-specific practical work in the schools’ teaching laboratories.' },
    ],
    research: ['Transition to higher education', 'Academic English for multilingual students', 'Mathematics support'],
    faculty: [
      { role: 'Programme Director', area: 'Foundation Studies' },
      { role: 'Senior Lecturer', area: 'Academic English' },
      { role: 'Lecturer', area: 'Mathematics' },
    ],
  },
];

export const getSchool = (slug: string) => schools.find((s) => s.slug === slug);

export const schoolProgrammes = (slug: SchoolSlug) => ({
  flagship: programmes.filter((p) => p.school === slug),
  additional: additionalProgrammes.filter((p) => p.school === slug),
});

export const programmeCount = (slug: SchoolSlug) => {
  const { flagship, additional } = schoolProgrammes(slug);
  return flagship.length + additional.length;
};

export const totalProgrammes = schools.reduce((n, s) => n + programmeCount(s.slug), 0);

/** Expected counts from the brief. A mismatch throws at build time. */
const expected: Record<SchoolSlug, number> = {
  'computing-ai': 7, 'business-management': 6, 'engineering-built-environment': 6,
  'health-life-sciences': 5, 'law-public-policy': 4, 'design-media': 5, 'foundation-pathways': 5,
};
for (const s of schools) {
  if (programmeCount(s.slug) !== expected[s.slug]) {
    throw new Error(`Programme count mismatch for ${s.slug}: ${programmeCount(s.slug)} ≠ ${expected[s.slug]}`);
  }
}

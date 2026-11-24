/**
 * Programmes. ALL DATA INVENTED — REPLACE BEFORE LAUNCH (see CONTENT-TODO.md).
 * `flagship` programmes (15) have full detail pages and published fees.
 * The remaining programmes complete each school's count to 38 and are listed
 * on school pages without a detail page until their prospectus entries are approved.
 */
import type { MediaKey } from './media';
import type { SchoolSlug } from './schools';

export type Level = 'UG' | 'PG' | 'FD';
export type Intake = 'Jan' | 'Sep';

export interface Programme {
  slug: string;
  title: string;
  award: string;
  level: Level;
  school: SchoolSlug;
  durationLabel: string;
  durationMonths: number;
  intakes: Intake[];
  tuition: number; // AED
  tuitionBasis: 'annual' | 'total';
  code: string; // UCAS-style programme code [INVENTED]
  mode: string;
  image: MediaKey;
  summary: string;
  overview: string[];
  structure: { label: string; modules: string[] }[];
  careers: string[];
  related: string[];
}

export const levelLabel: Record<Level, string> = { UG: 'Undergraduate', PG: 'Postgraduate', FD: 'Foundation' };

export const programmes: Programme[] = [
  {
    slug: 'bsc-computer-science-artificial-intelligence',
    title: 'BSc Computer Science (Artificial Intelligence)',
    award: 'Bachelor of Science (Honours)',
    level: 'UG', school: 'computing-ai', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Jan', 'Sep'], tuition: 62000, tuitionBasis: 'annual', code: 'G4A1',
    mode: 'Full-time, on campus', image: 'studentsCode',
    summary: 'The foundations of computing, with a sustained specialism in machine learning and applied AI.',
    overview: [
      'This degree builds a rigorous foundation in programming, algorithms, mathematics and systems before moving into machine learning, natural language processing and computer vision. Arabic language technology is a recurring case study, reflecting the work of the Centre for Gulf AI Applications.',
      'Every student completes a paid twelve-week placement and may spend a semester at the home campus in Bhopal without additional tuition. The final-year project is supervised one-to-one and is frequently set by a partner organisation.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Programming Fundamentals (Python)', 'Discrete Mathematics', 'Computer Systems', 'Calculus & Linear Algebra', 'Academic & Professional Writing'] },
      { label: 'Year 2', modules: ['Data Structures & Algorithms', 'Probability & Statistics', 'Databases', 'Software Engineering', 'Introduction to Machine Learning'] },
      { label: 'Year 3', modules: ['Deep Learning', 'Natural Language Processing (with Arabic NLP)', 'Computer Vision', 'AI Ethics & Governance', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Reinforcement Learning', 'Distributed Systems', 'Optional semester in Bhopal', 'Individual Research Project'] },
    ],
    careers: ['Machine learning engineer', 'Data scientist', 'Software engineer', 'AI product analyst', 'Postgraduate research'],
    related: ['bsc-cybersecurity', 'msc-data-science', 'beng-mechatronics'],
  },
  {
    slug: 'bsc-cybersecurity',
    title: 'BSc Cybersecurity',
    award: 'Bachelor of Science (Honours)',
    level: 'UG', school: 'computing-ai', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Sep'], tuition: 62000, tuitionBasis: 'annual', code: 'G4C2',
    mode: 'Full-time, on campus', image: 'dataLaptop',
    summary: 'Defensive security, cryptography and digital forensics, taught in a dedicated security laboratory.',
    overview: [
      'Cybersecurity at RKDF Dubai begins with how systems and networks actually work, then teaches students to secure, test and investigate them. Practical work takes place in an isolated laboratory network built for the purpose.',
      'The programme maps to recognised professional certification bodies of knowledge, and the placement year places students inside security operations teams.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Programming Fundamentals', 'Computer Networks', 'Operating Systems', 'Discrete Mathematics', 'Academic & Professional Writing'] },
      { label: 'Year 2', modules: ['Applied Cryptography', 'Secure Software Development', 'Network Security', 'Databases', 'Law & Regulation of Information'] },
      { label: 'Year 3', modules: ['Penetration Testing', 'Digital Forensics', 'Security Operations', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Threat Intelligence', 'Cloud Security', 'Optional semester in Bhopal', 'Individual Research Project'] },
    ],
    careers: ['Security analyst', 'Penetration tester', 'Digital forensics investigator', 'Governance, risk & compliance analyst'],
    related: ['bsc-computer-science-artificial-intelligence', 'msc-data-science', 'llb-law-uae-international'],
  },
  {
    slug: 'beng-civil-engineering',
    title: 'BEng Civil Engineering',
    award: 'Bachelor of Engineering (Honours)',
    level: 'UG', school: 'engineering-built-environment', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Jan', 'Sep'], tuition: 58000, tuitionBasis: 'annual', code: 'H2C1',
    mode: 'Full-time, on campus', image: 'siteSurvey',
    summary: 'Structures, materials and infrastructure, with particular attention to building in extreme heat.',
    overview: [
      'Civil engineering in the Gulf is shaped by heat, salinity and scale. This programme teaches the full discipline — structures, geotechnics, hydraulics and transport — and returns repeatedly to the question of how to build well in a hot climate.',
      'Students work with the Centre for Desert Construction & Materials on low-carbon concrete and passive cooling, and many spend a semester in Bhopal working on infrastructure under very different constraints.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Engineering Mathematics', 'Engineering Mechanics', 'Materials Science', 'Surveying', 'Engineering Drawing & CAD'] },
      { label: 'Year 2', modules: ['Structural Analysis', 'Fluid Mechanics', 'Soil Mechanics', 'Construction Materials (Concrete & Steel)', 'Numerical Methods'] },
      { label: 'Year 3', modules: ['Reinforced Concrete Design', 'Geotechnical Engineering', 'Transport Engineering', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Building in Extreme Heat', 'Water & Environmental Engineering', 'Optional semester in Bhopal', 'Group Design Project'] },
    ],
    careers: ['Structural engineer', 'Site engineer', 'Infrastructure planner', 'Geotechnical engineer'],
    related: ['msc-construction-management', 'beng-mechatronics', 'bsc-computer-science-artificial-intelligence'],
  },
  {
    slug: 'beng-mechatronics',
    title: 'BEng Mechatronics',
    award: 'Bachelor of Engineering (Honours)',
    level: 'UG', school: 'engineering-built-environment', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Sep'], tuition: 58000, tuitionBasis: 'annual', code: 'H7M1',
    mode: 'Full-time, on campus', image: 'labEngineer',
    summary: 'Mechanical design, electronics and control, integrated through robotics and automation projects.',
    overview: [
      'Mechatronics brings together mechanical engineering, electronics and software. Students design, build and control working systems from the first year, culminating in an autonomous robotics project.',
      'The programme connects to the home campus’s MPCST-sponsored work on an AI-based smart agriculture drone, which offers a recurring real-world case study.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Engineering Mathematics', 'Engineering Mechanics', 'Electrical Circuits', 'Programming for Engineers', 'Workshop Practice'] },
      { label: 'Year 2', modules: ['Analogue & Digital Electronics', 'Dynamics', 'Embedded Systems', 'Thermodynamics', 'Signals & Systems'] },
      { label: 'Year 3', modules: ['Control Engineering', 'Sensors & Actuators', 'Robotics', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Autonomous Systems', 'Industrial Automation', 'Optional semester in Bhopal', 'Individual Project'] },
    ],
    careers: ['Robotics engineer', 'Automation engineer', 'Embedded systems engineer', 'Product design engineer'],
    related: ['beng-civil-engineering', 'bsc-computer-science-artificial-intelligence', 'msc-data-science'],
  },
  {
    slug: 'bba-business-administration',
    title: 'BBA Business Administration',
    award: 'Bachelor of Business Administration',
    level: 'UG', school: 'business-management', durationLabel: '3 years', durationMonths: 36,
    intakes: ['Jan', 'Sep'], tuition: 54000, tuitionBasis: 'annual', code: 'N1B1',
    mode: 'Full-time, on campus', image: 'studentsNotes',
    summary: 'A broad, practical grounding in management, with specialist pathways from the second year.',
    overview: [
      'The BBA covers the full range of business disciplines — accounting, marketing, operations, people and strategy — through case work drawn from organisations operating in the Gulf and South Asia.',
      'From the second year students choose a pathway in marketing, operations or entrepreneurship. Every student completes a paid placement and a consultancy project for a real client.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Principles of Management', 'Financial Accounting', 'Microeconomics', 'Business Statistics', 'Business Communication'] },
      { label: 'Year 2', modules: ['Marketing Management', 'Operations Management', 'Organisational Behaviour', 'Business Law (UAE)', 'Pathway module'] },
      { label: 'Year 3', modules: ['Strategic Management', 'Entrepreneurship', 'Placement (12 weeks, paid)', 'Consultancy Project'] },
    ],
    careers: ['Management trainee', 'Business analyst', 'Marketing executive', 'Operations coordinator', 'Founder'],
    related: ['bsc-finance-financial-technology', 'mba-executive', 'llb-law-uae-international'],
  },
  {
    slug: 'bsc-finance-financial-technology',
    title: 'BSc Finance & Financial Technology',
    award: 'Bachelor of Science (Honours)',
    level: 'UG', school: 'business-management', durationLabel: '3 years', durationMonths: 36,
    intakes: ['Sep'], tuition: 56000, tuitionBasis: 'annual', code: 'N3F1',
    mode: 'Full-time, on campus', image: 'dataLaptop',
    summary: 'Corporate finance and markets, taught alongside the data and technology now reshaping them.',
    overview: [
      'Dubai is one of the world’s most active financial technology centres. This degree teaches finance properly — valuation, markets, risk — and pairs it with programming, data analysis and the regulation of digital finance.',
      'Students use market data in a dedicated finance laboratory and complete a paid placement within the financial sector.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Financial Accounting', 'Economics for Finance', 'Quantitative Methods', 'Programming for Finance (Python)'] },
      { label: 'Year 2', modules: ['Corporate Finance', 'Investments & Portfolio Theory', 'Financial Data Analytics', 'Islamic Finance'] },
      { label: 'Year 3', modules: ['Risk Management', 'Digital Payments & Blockchain', 'FinTech Regulation', 'Placement (12 weeks, paid)'] },
    ],
    careers: ['Financial analyst', 'Risk analyst', 'FinTech product associate', 'Investment operations'],
    related: ['bba-business-administration', 'msc-data-science', 'mba-executive'],
  },
  {
    slug: 'llb-law-uae-international',
    title: 'LLB Law (UAE & International)',
    award: 'Bachelor of Laws (Honours)',
    level: 'UG', school: 'law-public-policy', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Sep'], tuition: 60000, tuitionBasis: 'annual', code: 'M1L1',
    mode: 'Full-time, on campus', image: 'lawLibrary',
    summary: 'The law of the UAE alongside the common-law and international frameworks that govern Gulf commerce.',
    overview: [
      'The LLB teaches the foundations of legal reasoning through UAE federal law, the common law of the DIFC and ADGM courts, and public international law. Students learn to work comparatively from the first year.',
      'Moot court, legal clinic work and a placement in a legal or regulatory setting are built into the programme. The home campus’s Faculty of Law is approved by the Bar Council of India.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Legal Method & Reasoning', 'UAE Constitutional Law', 'Law of Contract', 'Legal Writing', 'Legal Arabic I'] },
      { label: 'Year 2', modules: ['Law of Obligations (Civil Code)', 'Criminal Law', 'Common Law in the DIFC & ADGM', 'Public International Law', 'Legal Arabic II'] },
      { label: 'Year 3', modules: ['Commercial Law', 'Employment Law', 'Moot Court', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Arbitration & Dispute Resolution', 'Company Law', 'Optional semester in Bhopal', 'Dissertation'] },
    ],
    careers: ['Legal associate', 'In-house counsel (trainee)', 'Compliance officer', 'Arbitration case manager', 'Further legal study'],
    related: ['llm-international-commercial-law', 'bba-business-administration', 'bsc-cybersecurity'],
  },
  {
    slug: 'ba-interaction-communication-design',
    title: 'BA Interaction & Communication Design',
    award: 'Bachelor of Arts (Honours)',
    level: 'UG', school: 'design-media', durationLabel: '3 years', durationMonths: 36,
    intakes: ['Jan', 'Sep'], tuition: 56000, tuitionBasis: 'annual', code: 'W2I1',
    mode: 'Full-time, on campus', image: 'drafting',
    summary: 'Typography, interface and information design, with bilingual Arabic–English work throughout.',
    overview: [
      'This programme teaches design as a discipline of clarity: typography, layout, information design and the design of digital interfaces. Bilingual Arabic–English typography is a thread through every year.',
      'Students work in studio groups of under thirty, present to visiting practitioners, and complete a placement in a design studio or in-house team.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Drawing & Visual Thinking', 'Typography I (Latin & Arabic)', 'Design History', 'Digital Tools'] },
      { label: 'Year 2', modules: ['Interaction Design', 'Information Design', 'User Research Methods', 'Typography II'] },
      { label: 'Year 3', modules: ['Design Systems', 'Professional Practice', 'Placement (12 weeks, paid)', 'Major Project & Exhibition'] },
    ],
    careers: ['Interaction designer', 'Graphic designer', 'UX researcher', 'Design systems designer'],
    related: ['bsc-computer-science-artificial-intelligence', 'bba-business-administration', 'foundation-year'],
  },
  {
    slug: 'bsc-biomedical-sciences',
    title: 'BSc Biomedical Sciences',
    award: 'Bachelor of Science (Honours)',
    level: 'UG', school: 'health-life-sciences', durationLabel: '3 years', durationMonths: 36,
    intakes: ['Sep'], tuition: 64000, tuitionBasis: 'annual', code: 'B9B1',
    mode: 'Full-time, on campus', image: 'labCells',
    summary: 'The science of human health and disease, taught through extensive laboratory practice.',
    overview: [
      'Biomedical Sciences covers human physiology, biochemistry, microbiology and pathology, with substantial time in teaching laboratories from the first semester.',
      'The programme connects to the Centre for Public Health in Hot Climates, and final-year projects may address heat-related illness and occupational health.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Cell Biology', 'Human Anatomy & Physiology', 'Biochemistry', 'Laboratory Skills', 'Statistics for Life Sciences'] },
      { label: 'Year 2', modules: ['Microbiology', 'Immunology', 'Molecular Genetics', 'Pharmacology'] },
      { label: 'Year 3', modules: ['Pathology', 'Clinical Biochemistry', 'Placement (12 weeks, paid)', 'Research Project'] },
    ],
    careers: ['Laboratory scientist', 'Clinical research associate', 'Public health officer', 'Graduate medicine (further study)'],
    related: ['bpharm-pharmacy', 'msc-data-science', 'foundation-year'],
  },
  {
    slug: 'bpharm-pharmacy',
    title: 'BPharm Pharmacy',
    award: 'Bachelor of Pharmacy',
    level: 'UG', school: 'health-life-sciences', durationLabel: '4 years', durationMonths: 48,
    intakes: ['Sep'], tuition: 66000, tuitionBasis: 'annual', code: 'B2P1',
    mode: 'Full-time, on campus', image: 'labGlass',
    summary: 'Pharmaceutical science and practice, building on the home campus’s PCI-approved Faculty of Pharmacy.',
    overview: [
      'The BPharm covers pharmaceutics, pharmacology, medicinal chemistry and pharmacy practice. It is designed with the professional licensing pathway in the UAE in mind.',
      'It builds on the curriculum of the Faculty of Pharmacy at RKDF University, Bhopal, which is approved by the Pharmacy Council of India.',
    ],
    structure: [
      { label: 'Year 1', modules: ['Human Anatomy & Physiology', 'Pharmaceutical Chemistry', 'Pharmaceutics I', 'Biochemistry'] },
      { label: 'Year 2', modules: ['Pharmacology I', 'Medicinal Chemistry', 'Pharmaceutical Microbiology', 'Pharmaceutics II'] },
      { label: 'Year 3', modules: ['Pharmacology II', 'Pharmacognosy', 'Pharmaceutical Analysis', 'Placement (12 weeks, paid)'] },
      { label: 'Year 4', modules: ['Clinical Pharmacy', 'Pharmacy Law & Ethics (UAE)', 'Optional semester in Bhopal', 'Research Project'] },
    ],
    careers: ['Community pharmacist', 'Hospital pharmacist', 'Regulatory affairs associate', 'Pharmaceutical industry'],
    related: ['bsc-biomedical-sciences', 'foundation-year', 'mba-executive'],
  },
  {
    slug: 'msc-data-science',
    title: 'MSc Data Science',
    award: 'Master of Science',
    level: 'PG', school: 'computing-ai', durationLabel: '18 months', durationMonths: 18,
    intakes: ['Jan', 'Sep'], tuition: 72000, tuitionBasis: 'total', code: 'G5D1',
    mode: 'Full-time or part-time, on campus', image: 'dataLaptop',
    summary: 'Statistical modelling, machine learning and data engineering for graduates from any quantitative discipline.',
    overview: [
      'The MSc Data Science is designed for graduates in engineering, science, economics and related fields who want to work with data professionally. It combines statistical rigour with practical engineering.',
      'The final six months are given to an industry-sponsored project, often hosted by one of the university’s placement partners.',
    ],
    structure: [
      { label: 'Term 1', modules: ['Statistical Modelling', 'Programming for Data Science', 'Data Management & SQL'] },
      { label: 'Term 2', modules: ['Machine Learning', 'Data Engineering & Pipelines', 'Research Methods'] },
      { label: 'Term 3', modules: ['Deep Learning', 'Responsible Data Science', 'Optional: Arabic Language Technology'] },
      { label: 'Project', modules: ['Industry-sponsored Dissertation (6 months)'] },
    ],
    careers: ['Data scientist', 'Machine learning engineer', 'Analytics lead', 'Doctoral research'],
    related: ['bsc-computer-science-artificial-intelligence', 'mba-executive', 'msc-construction-management'],
  },
  {
    slug: 'msc-construction-management',
    title: 'MSc Construction Management',
    award: 'Master of Science',
    level: 'PG', school: 'engineering-built-environment', durationLabel: '12 months', durationMonths: 12,
    intakes: ['Sep'], tuition: 68000, tuitionBasis: 'total', code: 'K2C1',
    mode: 'Full-time, on campus', image: 'construction',
    summary: 'Project, cost and contract management for large construction programmes in the Gulf.',
    overview: [
      'This programme prepares engineers, architects and surveyors to lead construction projects. It covers planning, cost control, procurement, contracts and sustainability.',
      'Case studies draw on large Gulf developments, and the dissertation is usually completed with a contractor or consultancy.',
    ],
    structure: [
      { label: 'Term 1', modules: ['Project Planning & Control', 'Construction Law & Contracts', 'Cost Management'] },
      { label: 'Term 2', modules: ['Sustainable Construction', 'Digital Construction (BIM)', 'Leadership & Risk'] },
      { label: 'Term 3', modules: ['Dissertation'] },
    ],
    careers: ['Project manager', 'Construction manager', 'Cost consultant', 'Contracts manager'],
    related: ['beng-civil-engineering', 'mba-executive', 'llm-international-commercial-law'],
  },
  {
    slug: 'mba-executive',
    title: 'MBA (Executive)',
    award: 'Master of Business Administration',
    level: 'PG', school: 'business-management', durationLabel: '12 months', durationMonths: 12,
    intakes: ['Jan', 'Sep'], tuition: 86000, tuitionBasis: 'total', code: 'N2M1',
    mode: 'Weekend and evening, on campus', image: 'classLaptops',
    summary: 'A demanding, practitioner-led MBA for managers with at least five years’ experience.',
    overview: [
      'The Executive MBA is taught on weekends and weekday evenings so that participants can continue in their roles. Cohorts are small, and every participant brings substantial professional experience.',
      'The programme ends with a strategic project addressed to a real problem in the participant’s own organisation.',
    ],
    structure: [
      { label: 'Term 1', modules: ['Leading Organisations', 'Financial Decision-Making', 'Economics of the Gulf & South Asia'] },
      { label: 'Term 2', modules: ['Strategy', 'Marketing in Practice', 'Operations & Supply Chains'] },
      { label: 'Term 3', modules: ['Digital Transformation', 'Governance & Ethics', 'Strategic Project'] },
    ],
    careers: ['Senior management', 'General management', 'Consulting', 'Entrepreneurship'],
    related: ['bba-business-administration', 'msc-data-science', 'llm-international-commercial-law'],
  },
  {
    slug: 'llm-international-commercial-law',
    title: 'LLM International Commercial Law',
    award: 'Master of Laws',
    level: 'PG', school: 'law-public-policy', durationLabel: '12 months', durationMonths: 12,
    intakes: ['Sep'], tuition: 70000, tuitionBasis: 'total', code: 'M2L1',
    mode: 'Full-time, on campus', image: 'lawLibrary',
    summary: 'Cross-border contracts, trade, finance and arbitration, taught comparatively.',
    overview: [
      'The LLM is for law graduates and practitioners who work, or wish to work, on cross-border transactions and disputes. It is taught comparatively across civil-law, common-law and Sharia-influenced systems.',
      'Students complete a dissertation on a question of current commercial practice.',
    ],
    structure: [
      { label: 'Term 1', modules: ['International Sale of Goods', 'Comparative Contract Law', 'Legal Research Methods'] },
      { label: 'Term 2', modules: ['International Commercial Arbitration', 'Banking & Finance Law', 'International Trade Law'] },
      { label: 'Term 3', modules: ['Dissertation'] },
    ],
    careers: ['Commercial lawyer', 'Arbitration practitioner', 'In-house counsel', 'Regulatory adviser'],
    related: ['llb-law-uae-international', 'mba-executive', 'msc-construction-management'],
  },
  {
    slug: 'foundation-year',
    title: 'Foundation Year',
    award: 'Foundation Certificate',
    level: 'FD', school: 'foundation-pathways', durationLabel: '1 year', durationMonths: 12,
    intakes: ['Jan', 'Sep'], tuition: 38000, tuitionBasis: 'annual', code: 'F0F1',
    mode: 'Full-time, on campus', image: 'studentsSeminar',
    summary: 'A year of academic preparation leading to guaranteed progression to a named degree.',
    overview: [
      'The Foundation Year prepares students whose school qualifications do not yet meet direct-entry requirements. It combines academic English, study skills, mathematics and subject preparation in a chosen stream.',
      'Students who pass at the required level progress directly to the first year of a named undergraduate degree.',
    ],
    structure: [
      { label: 'Semester 1', modules: ['Academic English I', 'Study & Research Skills', 'Mathematics', 'Stream module I'] },
      { label: 'Semester 2', modules: ['Academic English II', 'Critical Thinking', 'Stream module II', 'Extended Project'] },
    ],
    careers: ['Progression to any RKDF Dubai undergraduate degree, subject to stream and grades'],
    related: ['bba-business-administration', 'bsc-computer-science-artificial-intelligence', 'bsc-biomedical-sciences'],
  },
];

/** Additional programmes listed on school pages (no detail page yet). [INVENTED] */
export const additionalProgrammes: { title: string; level: Level; school: SchoolSlug }[] = [
  { title: 'BSc Software Engineering', level: 'UG', school: 'computing-ai' },
  { title: 'BSc Data Science & Analytics', level: 'UG', school: 'computing-ai' },
  { title: 'MSc Artificial Intelligence', level: 'PG', school: 'computing-ai' },
  { title: 'MSc Cybersecurity', level: 'PG', school: 'computing-ai' },
  { title: 'BSc Accounting & Finance', level: 'UG', school: 'business-management' },
  { title: 'BSc Logistics & Supply Chain Management', level: 'UG', school: 'business-management' },
  { title: 'MSc International Business', level: 'PG', school: 'business-management' },
  { title: 'BEng Electrical & Electronic Engineering', level: 'UG', school: 'engineering-built-environment' },
  { title: 'BSc Architectural Technology', level: 'UG', school: 'engineering-built-environment' },
  { title: 'MSc Sustainable Building Design', level: 'PG', school: 'engineering-built-environment' },
  { title: 'BSc Nursing', level: 'UG', school: 'health-life-sciences' },
  { title: 'BSc Public Health', level: 'UG', school: 'health-life-sciences' },
  { title: 'MSc Public Health', level: 'PG', school: 'health-life-sciences' },
  { title: 'BA Public Policy & Governance', level: 'UG', school: 'law-public-policy' },
  { title: 'LLM Dispute Resolution & Arbitration', level: 'PG', school: 'law-public-policy' },
  { title: 'BA Film & Digital Media', level: 'UG', school: 'design-media' },
  { title: 'BA Interior Design', level: 'UG', school: 'design-media' },
  { title: 'BA Graphic Communication', level: 'UG', school: 'design-media' },
  { title: 'MA Design Management', level: 'PG', school: 'design-media' },
  { title: 'International Foundation — Business & Law Pathway', level: 'FD', school: 'foundation-pathways' },
  { title: 'International Foundation — Engineering & Computing Pathway', level: 'FD', school: 'foundation-pathways' },
  { title: 'International Foundation — Health Sciences Pathway', level: 'FD', school: 'foundation-pathways' },
  { title: 'Pre-sessional English (12 weeks)', level: 'FD', school: 'foundation-pathways' },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);

export const formatAED = (n: number) => `AED ${n.toLocaleString('en-US')}`;
export const intakeLabel = (i: Intake[]) => i.map((x) => (x === 'Jan' ? 'January' : 'September')).join(' / ');
export const intakeShort = (i: Intake[]) => i.join('/');

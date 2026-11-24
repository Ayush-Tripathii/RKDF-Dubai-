/** Entry requirements. INVENTED — REPLACE BEFORE LAUNCH. */

export interface Curriculum { id: string; name: string; ug: string; foundation: string; notes: string; }

export const curricula: Curriculum[] = [
  { id: 'cbse-icse', name: 'CBSE / ICSE', ug: '65% aggregate in Class XII', foundation: '50% aggregate in Class XII', notes: 'Mathematics required for Computing, Engineering and Finance programmes.' },
  { id: 'ib', name: 'International Baccalaureate', ug: 'IB Diploma, 26 points', foundation: 'IB Diploma, 22 points, or IB Courses', notes: 'Mathematics (AA or AI) at SL 4 or above for quantitative programmes.' },
  { id: 'a-level', name: 'British A-Level', ug: 'BCC from three A-Levels', foundation: 'Two A-Levels at grade E or above', notes: 'Subject-specific grades apply to Engineering and Pharmacy.' },
  { id: 'american', name: 'American High School', ug: 'High School Diploma, GPA 2.8', foundation: 'High School Diploma, GPA 2.2', notes: 'SAT or ACT scores are welcome but not required.' },
  { id: 'waec', name: 'WAEC (West Africa)', ug: 'Five credits including English and Mathematics', foundation: 'Five passes including English', notes: 'Credits in relevant sciences for Health and Engineering programmes.' },
  { id: 'uae-moe', name: 'UAE Ministry of Education', ug: '70% in the Secondary School Certificate (Advanced or General stream)', foundation: '60% in the Secondary School Certificate', notes: 'EmSAT Mathematics may be requested for quantitative programmes.' },
];

export const english = [
  { test: 'IELTS Academic', score: '6.0 overall', detail: 'No band below 5.5' },
  { test: 'TOEFL iBT', score: '72', detail: 'Including at least 18 in writing' },
  { test: 'EmSAT English', score: '1250', detail: 'Accepted for UAE school leavers' },
];

export const englishSummary = 'IELTS 6.0 · TOEFL iBT 72 · EmSAT English 1250';

export const postgraduate = [
  'A recognised bachelor’s degree with a second-class or equivalent result in a relevant discipline.',
  'MBA (Executive): a bachelor’s degree and at least five years of professional experience, three of them in a managerial role.',
  'LLM: a degree in law, or a degree in a related field with substantial legal experience.',
  'English language requirements as for undergraduate study, with IELTS 6.5 for the LLM.',
];

export const documents = [
  'Passport copy (valid for at least six months)',
  'Recent passport-style photograph on a white background',
  'Secondary school certificate and transcripts (attested — see International students)',
  'English language test result (IELTS, TOEFL iBT or EmSAT)',
  'Personal statement (500–700 words)',
  'One academic reference',
  'For postgraduate applicants: degree certificate, transcripts and CV',
  'For UAE residents: Emirates ID copy',
];

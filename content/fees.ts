/** Fees, scholarships and cost of living. INVENTED — REPLACE BEFORE LAUNCH. */

export const otherFees = [
  { item: 'Application fee (non-refundable)', amount: 'AED 500', note: 'Waived for Open Day attendees' },
  { item: 'Enrolment deposit', amount: 'AED 5,000', note: 'Deducted from first-year tuition' },
  { item: 'Student visa processing', amount: 'AED 3,500', note: 'Per year, including medical and Emirates ID' },
  { item: 'Health insurance (mandatory)', amount: 'AED 1,800', note: 'Per year, unless already covered' },
  { item: 'Laboratory and materials', amount: 'Included', note: 'No separate charges for core coursework' },
  { item: 'Semester in Bhopal', amount: 'No additional tuition', note: 'Travel and accommodation at the student’s cost' },
];

export const paymentTerms = [
  'Tuition is payable in two equal instalments at the start of each semester.',
  'A monthly instalment plan (ten payments per year) is available without interest.',
  'Tuition for each academic year is fixed at the rate published when you enrol and will not rise during your programme.',
  'Fees are quoted in UAE dirhams and are subject to UAE VAT where applicable.',
];

export interface Scholarship { name: string; value: string; eligibility: string; how: string; }

export const scholarships: Scholarship[] = [
  { name: 'Chancellor’s Merit Scholarship', value: '25% of tuition', eligibility: 'Awarded to applicants with outstanding school results — for example 90% in CBSE/ICSE, 36 IB points or AAA at A-Level. Renewable each year subject to academic performance.', how: 'Assessed automatically from your application.' },
  { name: 'Early Decision Scholarship', value: '10% of first-year tuition', eligibility: 'For applicants who apply by the early deadline and accept their offer within 21 days.', how: 'Applied automatically when the offer is accepted.' },
  { name: 'Sibling Scholarship', value: '15% of tuition', eligibility: 'For students whose brother or sister is currently enrolled at RKDF University Dubai.', how: 'Declare your sibling on the application form.' },
  { name: 'RKDF Alumni Family Scholarship', value: '10% of tuition', eligibility: 'For children and siblings of graduates of any RKDF institution, including RKDF University, Bhopal.', how: 'Provide the graduate’s name, institution and year of graduation.' },
  { name: 'Dr. Sadhna Kapoor Women in STEM Award', value: 'Full tuition', eligibility: 'For women of exceptional ability entering an undergraduate programme in Computing, Engineering or Health & Life Sciences. A small number awarded each year.', how: 'Separate application with an essay and interview.' },
];

export const costOfLiving = [
  { item: 'Shared housing', amount: 'AED 2,800–4,200', per: 'per month' },
  { item: 'Studio apartment', amount: 'AED 4,500–6,500', per: 'per month' },
  { item: 'Metro pass', amount: 'AED 350', per: 'per month' },
  { item: 'Campus meal', amount: 'AED 28', per: 'average' },
];

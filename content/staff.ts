/**
 * Leadership and staff directory.
 * Dr. Sadhna Kapoor and Prof. Vijay K. Agrawal: VERIFIED names and credentials — DO NOT CHANGE.
 * Their long-form messages are DRAFT text written for this build and MUST be
 * approved by them before launch (`draft: true` renders a visible note).
 * Dubai appointments are not yet made: no person is invented.
 */

export interface Leader {
  slug: string;
  name: string;
  initials: string;
  title: string;
  institution: string;
  postNominals?: string;
  qualifications?: string;
  verified: boolean;
  draft: boolean;
  message?: string[];
  honours?: string[];
}

export const chancellor: Leader = {
  slug: 'chancellor',
  name: 'Dr. Sadhna Kapoor',
  initials: 'SK',
  title: 'Chancellor',
  institution: 'RKDF University',
  verified: true,
  draft: true,
  honours: [
    'Grand Star Success Award, Academic Union Oxford',
    'Dainik Bhaskar Women Achiever’s Award 2023',
  ],
  message: [
    'Education is the prerequisite for the socio-economic development of the nation in general and of people in particular. That conviction has guided the Ram Krishna Dharmarth Foundation from its first institution to the university it is today.',
    'Our motto, Education Glorifies Nation, has always meant something practical: that a university proves its worth in the lives of its graduates and in the communities they go on to serve. In Bhopal we have built seventeen faculties on that principle, and we have tried to make rigorous education accessible to students who might otherwise have been denied it.',
    'Dubai is a natural next home for that work. It is a city of many nations, built by people who came from elsewhere to make something new. Many of them came from India. Many of their children are now ready for university, alongside students from across the Gulf, Africa and Asia.',
    'RKDF University Dubai will be held to the same academic regulations and the same standards of quality assurance as our home campus. It will publish its fees openly, teach in small groups, and keep its promise of a semester in Bhopal for every undergraduate who wants one.',
    'I invite you to visit, to ask difficult questions, and to judge us by what our students go on to do.',
  ],
};

export const viceChancellor: Leader = {
  slug: 'vice-chancellor',
  name: 'Prof. Vijay K. Agrawal',
  initials: 'VA',
  title: 'Vice-Chancellor',
  institution: 'RKDF University',
  postNominals: 'M.Sc., D.Phil., PGD (Chemistry & Chemical Engineering)',
  qualifications: 'Tokyo Institute of Technology, Japan',
  verified: true,
  draft: true,
  message: [
    'A university is measured first by the quality of its teaching and the integrity of its research. Those are the standards by which RKDF University has always asked to be judged, and they are the standards we bring to Dubai.',
    'My own training was in chemistry and chemical engineering, and I have always believed that the best research starts with a real constraint — a material that fails, a process that wastes, a community that is under-served. That is why our research programme in Bhopal includes a solar integrated carbon capture plant and agricultural technology projects sponsored by the Madhya Pradesh Council of Science and Technology, and why our partnership with CSIR matters so much to us.',
    'In Dubai we will pursue the same approach. Our four research centres address the questions this region cannot avoid: how to build and live in extreme heat, how to capture carbon and generate clean energy, how artificial intelligence can serve Arabic-speaking communities, and how to protect the health of people who work outdoors.',
    'Students at RKDF Dubai will be taught by academics who are active in this work. They will be examined under the same regulations as their peers in Bhopal, and their degrees will carry the same weight.',
    'I look forward to welcoming you.',
  ],
};

export const foundingVc: Leader = {
  slug: 'founding-vice-chancellor-dubai',
  name: 'Prof. [[DUBAI_VC_NAME]]',
  initials: 'VC',
  title: 'Founding Vice-Chancellor, RKDF University Dubai',
  institution: 'RKDF University Dubai',
  verified: false,
  draft: true,
};

export interface Appointment {
  role: string;
  unit: string;
  status: string;
  email?: string;
}

/** Governance and senior roles. Names withheld until appointments are confirmed. */
export const governance: Appointment[] = [
  { role: 'Registrar', unit: 'Office of the Registrar', status: 'Appointment to be announced', email: 'registrar@rkdfdubai.ac.ae' },
  { role: 'Director of Admissions', unit: 'Admissions Office', status: 'Appointment to be announced', email: 'admissions@rkdfdubai.ac.ae' },
  { role: 'Dean of Students', unit: 'Student Life', status: 'Appointment to be announced' },
  { role: 'Director of Quality Assurance', unit: 'Quality & Accreditation', status: 'Appointment to be announced' },
  { role: 'Director of Research', unit: 'Research & Innovation', status: 'Appointment to be announced' },
  { role: 'Director of Careers', unit: 'Careers & Employability', status: 'Appointment to be announced' },
];

export const governanceBodies = [
  { name: 'Board of Governors', text: 'The governing body of RKDF University Dubai, accountable to the Ram Krishna Dharmarth Foundation and to the regulators of the UAE. It approves strategy, budget and institutional policy.' },
  { name: 'Academic Council', text: 'The senior academic body, responsible for programme approval, academic regulations, examinations and the award of degrees, in alignment with the regulations of RKDF University, Bhopal.' },
  { name: 'Quality Assurance Committee', text: 'Oversees programme review, external examining, student feedback and compliance with KHDA and CAA requirements.' },
  { name: 'Research & Ethics Committee', text: 'Reviews research proposals involving human participants, data and the environment, and monitors research integrity.' },
  { name: 'Student Council', text: 'Elected student representatives who sit on university committees and bring student concerns to senior leadership.' },
];

export const directory = [
  { unit: 'Admissions Office', phone: '+971 4 428 6100', email: 'admissions@rkdfdubai.ac.ae' },
  { unit: 'Office of the Registrar', phone: '+971 4 428 6100', email: 'registrar@rkdfdubai.ac.ae' },
  { unit: 'International Student Office (visas)', phone: '+971 4 428 6100', email: 'admissions@rkdfdubai.ac.ae' },
  { unit: 'Student Wellbeing', phone: '+971 4 428 6100', email: 'registrar@rkdfdubai.ac.ae' },
  { unit: 'Media & Communications', phone: '+971 4 428 6100', email: 'registrar@rkdfdubai.ac.ae' },
];

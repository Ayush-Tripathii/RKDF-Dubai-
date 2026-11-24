/**
 * Core institutional facts.
 *
 * `parent` holds VERIFIED facts about RKDF University, Bhopal — DO NOT CHANGE.
 * `dubai` holds INVENTED placeholder data — REPLACE BEFORE LAUNCH (see CONTENT-TODO.md).
 */

export const SITE_URL = 'https://www.rkdfdubai.ac.ae'; // [INVENTED] canonical origin — REPLACE BEFORE LAUNCH

export const parent = {
  legalBody: 'Ram Krishna Dharmarth Foundation (RKDF)',
  legalBodyShort: 'Ram Krishna Dharmarth Foundation',
  name: 'RKDF University, Bhopal',
  location: 'Bhopal, Madhya Pradesh, India',
  status: 'Private state university, Madhya Pradesh',
  chancellor: 'Dr. Sadhna Kapoor',
  viceChancellor: 'Prof. Vijay K. Agrawal',
  vcQualifications: 'M.Sc., D.Phil., PGD (Chemistry & Chemical Engineering), Tokyo Institute of Technology, Japan',
  motto: 'Education Glorifies Nation',
  address: 'Airport Bypass Road, Gandhi Nagar, Bhopal, Madhya Pradesh 462033, India',
  portal: 'https://erplive.rkdf.ac.in',
  portalLabel: 'erplive.rkdf.ac.in',
  website: 'https://rkdf.ac.in',
  websiteLabel: 'rkdf.ac.in',
  social: {
    facebook: 'https://www.facebook.com/rkdfuniversitybhopal',
    twitter: 'https://twitter.com/universityRkdf',
    instagram: 'https://www.instagram.com/rkdfuniversitybhopal',
  },
  accreditations: [
    'NAAC accredited',
    'UGC recognised',
    'AICTE approved',
    'PCI (Pharmacy)',
    'NCTE (Education)',
    'COA & NATA (Architecture)',
    'BCI (Law)',
    'INC & MP NRC (Nursing)',
    'NCH (Homeopathy)',
    'NCISM (Ayurveda)',
    'MP Paramedical Council',
    'ICAR accreditation (Agriculture)',
    'SIRO recognition (Research)',
    'AUAP membership',
    'NIRF participant',
  ],
  faculties: [
    'Management', 'Science', 'Commerce', 'Engineering & Technology', 'Pharmacy',
    'Computer Application', 'Education', 'Social Science', 'Agriculture', 'Architecture',
    'Law', 'Homeopathy', 'Ayurveda', 'Nursing', 'Paramedical',
    'Library & Information Sciences', 'Doctoral Studies (Ph.D. across all faculties)',
  ],
  research: [
    'MoU signed with CSIR, New Delhi at IIT Bombay, August 2023',
    'Solar Integrated Carbon Capture Plant — technical programme',
    'MPCST-sponsored project: AI-Based Smart Agriculture Drone',
    'MPCST-sponsored project: Precision Farming & Sustainable Agriculture',
    'Shodh Sangam — the university’s peer-reviewed research journal',
    'Incubation Centre; university-held patents; Ph.D. supervision across faculties',
  ],
  recognition: [
    'World Education Leadership Award 2023 — Best Private University',
    'Grand Star Success Award, Academic Union Oxford — to Chancellor Dr. Sadhna Kapoor',
    'Dainik Bhaskar Women Achiever’s Award 2023',
    'An RKDF alumnus contributed to India’s Chandrayaan-3 mission',
  ],
  chancellorQuote:
    'Education is the prerequisite for the socio-economic development of the nation in general and of people in particular.',
} as const;

export const dubai = {
  name: 'RKDF University Dubai',
  addressLines: ['Block 11, Dubai International Academic City', 'Al Ruwayyah 2, Dubai', 'United Arab Emirates', 'PO Box 345219'],
  addressOneLine: 'Block 11, Dubai International Academic City, Al Ruwayyah 2, Dubai, UAE · PO Box 345219',
  geo: { lat: 25.1229, lng: 55.4166 }, // [INVENTED] approximate DIAC location — confirm with surveyed coordinates
  phone: '+971 4 428 6100',
  phoneHref: 'tel:+97144286100',
  whatsapp: '+971 50 418 7722',
  whatsappHref: 'https://wa.me/971504187722',
  emailAdmissions: 'admissions@rkdfdubai.ac.ae',
  emailRegistrar: 'registrar@rkdfdubai.ac.ae',
  hours: 'Sunday–Thursday, 08:00–17:00 GST',
  opening: 'January 2027',
  intakes: 'January and September',
  foundingVc: 'Prof. [[DUBAI_VC_NAME]]', // token — do not invent a person
  khda: 'KHDA Educational Permit No. DXB-HE-2026-0147',
  mohesr: 'MoHESR / CAA Initial Institutional Licensure — in progress',
  social: {
    linkedin: 'https://www.linkedin.com/school/rkdf-university-dubai', // [INVENTED] — REPLACE BEFORE LAUNCH
    youtube: 'https://www.youtube.com/@rkdfuniversitydubai', // [INVENTED] — REPLACE BEFORE LAUNCH
  },
} as const;

/** Application deadlines — drive every date on the site from here. [INVENTED] */
export const keyDates = {
  jan2027Close: '2026-12-18',
  sep2027Open: '2027-01-05',
} as const;

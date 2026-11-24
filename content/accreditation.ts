/**
 * Accreditation and regulatory status.
 * KHDA permit and MoHESR/CAA status: INVENTED — REPLACE BEFORE LAUNCH.
 * Home-campus approvals come from site.ts `parent.accreditations` (VERIFIED).
 */

export const regulators = [
  {
    id: 'khda',
    name: 'KHDA',
    full: 'Knowledge and Human Development Authority',
    status: 'Educational Permit No. DXB-HE-2026-0147',
    invented: true,
    summary: 'The Dubai Government authority responsible for the quality of higher education within the emirate.',
    detail: [
      'The Knowledge and Human Development Authority (KHDA) regulates private education in Dubai. Higher-education institutions operating in Dubai’s free zones, including Dubai International Academic City, must hold a KHDA permit.',
      'KHDA reviews each institution’s academic quality, governance and student services, and confirms that programmes are recognised by the institution’s home country.',
    ],
    verify: 'Search for “RKDF University Dubai” in the list of permitted higher-education providers on the KHDA website, khda.gov.ae.',
  },
  {
    id: 'caa',
    name: 'MoHESR / CAA',
    full: 'Ministry of Higher Education and Scientific Research — Commission for Academic Accreditation',
    status: 'Initial Institutional Licensure — application in progress',
    invented: true,
    summary: 'The federal authority. Licensure enables attestation of your degree for employment across the UAE and the wider Gulf.',
    detail: [
      'The Commission for Academic Accreditation (CAA), part of the UAE Ministry of Higher Education and Scientific Research, licenses higher-education institutions and accredits their programmes at federal level.',
      'Federal licensure and programme accreditation allow degrees to be attested by the Ministry, which is commonly required for federal government employment and for some professional licences in the UAE.',
    ],
    verify: 'Contact the Ministry of Higher Education and Scientific Research or consult its published list of licensed institutions at mohesr.gov.ae.',
  },
  {
    id: 'home',
    name: 'RKDF University, Bhopal',
    full: 'Home campus',
    status: 'NAAC accredited · UGC recognised · AICTE, PCI, BCI, COA, ICAR approved',
    invented: false,
    summary: 'Your Dubai degree is awarded under the same academic regulations and quality assurance as the home campus.',
    detail: [
      'RKDF University is a private state university in Madhya Pradesh, India, established by the Ram Krishna Dharmarth Foundation. It is accredited by the National Assessment and Accreditation Council (NAAC) and recognised by the University Grants Commission (UGC).',
      'Its professional programmes hold approvals from the relevant Indian statutory councils, listed in full below.',
    ],
    verify: 'Confirm the university’s status on the UGC list of state private universities (ugc.gov.in) and on the NAAC website (naac.gov.in).',
  },
] as const;

export const attestationFaq = [
  {
    q: 'What does “attestation” mean?',
    a: 'Attestation is the official confirmation, by a government authority, that a degree certificate is genuine and was issued by a recognised institution. In the UAE, the Ministry of Higher Education and Scientific Research attests degrees for employment and further study.',
  },
  {
    q: 'Will my degree be attested in the UAE?',
    a: 'Degrees awarded by institutions holding federal licensure and programme accreditation from the CAA can be attested by the Ministry. RKDF University Dubai’s application for Initial Institutional Licensure is in progress; we will publish each milestone on this page as it is reached.',
  },
  {
    q: 'What is an equivalency certificate?',
    a: 'An equivalency certificate confirms that a degree is equivalent to a UAE degree at the same level. It may be needed for some public-sector roles and regulated professions. The Ministry issues it on application.',
  },
  {
    q: 'Will my degree be recognised in India?',
    a: 'Degrees are awarded under the academic regulations of RKDF University, a UGC-recognised university. Recognition of degrees delivered outside India is governed by UGC regulations on offshore campuses, and we will publish the applicable position for each programme.',
  },
  {
    q: 'Can I work elsewhere in the GCC with my degree?',
    a: 'Each GCC state has its own recognition process. In most cases employers and regulators look first for home-country recognition and UAE federal attestation. Our careers team can advise on specific countries and professions.',
  },
];

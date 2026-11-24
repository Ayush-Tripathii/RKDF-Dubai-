/** Research centres (Dubai). INVENTED — REPLACE BEFORE LAUNCH. Inherited Bhopal programmes are VERIFIED (see site.ts). */
import type { MediaKey } from './media';

export interface Centre {
  slug: string;
  name: string;
  short: string;
  themes: string[];
  image: MediaKey;
  summary: string;
  overview: string[];
  projects: { title: string; text: string }[];
  facilities: string[];
  schools: string[];
}

export const centres: Centre[] = [
  {
    slug: 'gulf-ai-applications',
    name: 'Centre for Gulf AI Applications',
    short: 'Gulf AI Applications',
    themes: ['Arabic language technology', 'Logistics optimisation', 'Applied computer vision'],
    image: 'studentsCode',
    summary: 'Applied artificial intelligence for Arabic-speaking communities and Gulf industries.',
    overview: [
      'The Centre for Gulf AI Applications develops artificial intelligence for problems specific to the region: understanding Arabic in its many dialects, moving goods efficiently through one of the world’s great logistics hubs, and using computer vision in demanding outdoor environments.',
      'It draws on the home campus’s experience with the MPCST-sponsored AI-Based Smart Agriculture Drone, where vision and autonomy are applied under real field conditions.',
    ],
    projects: [
      { title: 'Dialect-aware Arabic speech recognition', text: 'Building evaluation sets and models for Gulf Arabic dialects in customer-service settings.' },
      { title: 'Port and last-mile routing', text: 'Optimisation methods for delivery routing under heat-related time constraints.' },
      { title: 'Vision in dust and glare', text: 'Robust computer vision for inspection in bright, dusty outdoor conditions.' },
    ],
    facilities: ['GPU compute cluster', 'Speech and language data laboratory', 'Drone and sensor test area (shared with Engineering)'],
    schools: ['School of Computing & Artificial Intelligence', 'School of Business & Management'],
  },
  {
    slug: 'desert-construction-materials',
    name: 'Centre for Desert Construction & Materials',
    short: 'Desert Construction & Materials',
    themes: ['Low-carbon concrete', 'Passive cooling', 'Building performance in extreme heat'],
    image: 'construction',
    summary: 'Materials and methods for building well, and with less carbon, in extreme heat.',
    overview: [
      'The Centre for Desert Construction & Materials studies how buildings and infrastructure perform in sustained heat, and how to build them with less embodied carbon.',
      'Its work spans the laboratory — durability testing of concrete under thermal cycling — and the field, where it monitors the performance of passive cooling strategies in occupied buildings.',
    ],
    projects: [
      { title: 'Supplementary cementitious materials', text: 'Testing locally available industrial by-products as partial cement replacements.' },
      { title: 'Passive cooling retrofits', text: 'Measuring the effect of shading, ventilation and thermal mass on indoor temperature.' },
      { title: 'Durability under thermal cycling', text: 'Long-term testing of concrete specimens under repeated heating and cooling.' },
    ],
    facilities: ['Materials testing laboratory', 'Environmental chambers', 'Building performance monitoring kit'],
    schools: ['School of Engineering & the Built Environment', 'School of Design & Media'],
  },
  {
    slug: 'carbon-capture-clean-energy',
    name: 'Centre for Carbon Capture & Clean Energy',
    short: 'Carbon Capture & Clean Energy',
    themes: ['Solar integrated carbon capture', 'Clean energy systems', 'Industrial decarbonisation'],
    image: 'solar',
    summary: 'Extending the Bhopal solar integrated carbon capture programme to Gulf conditions.',
    overview: [
      'The Centre for Carbon Capture & Clean Energy extends the technical programme behind the Solar Integrated Carbon Capture Plant at RKDF University, Bhopal.',
      'In Dubai it will study how solar-integrated capture performs under high ambient temperature, dust and humidity, and how the approach might be applied to industrial sites in the region.',
    ],
    projects: [
      { title: 'Solar capture under Gulf conditions', text: 'Performance modelling and pilot-scale testing of the Bhopal design in Dubai’s climate.' },
      { title: 'Panel soiling and efficiency', text: 'Measuring the effect of dust on integrated solar capture systems.' },
      { title: 'Industrial capture pathways', text: 'Assessing capture options for cement and heavy industry in the region.' },
    ],
    facilities: ['Energy systems laboratory', 'Outdoor solar test bed', 'Gas analysis equipment'],
    schools: ['School of Engineering & the Built Environment', 'School of Health & Life Sciences'],
  },
  {
    slug: 'public-health-hot-climates',
    name: 'Centre for Public Health in Hot Climates',
    short: 'Public Health in Hot Climates',
    themes: ['Occupational heat stress', 'Epidemiology', 'Worker health'],
    image: 'labGlass',
    summary: 'Protecting the health of people who live and work in extreme heat.',
    overview: [
      'The Centre for Public Health in Hot Climates studies the effects of sustained heat on human health, with a particular focus on people who work outdoors.',
      'Its work combines epidemiology, physiology and occupational health, and is designed to inform practical policy for employers and public authorities.',
    ],
    projects: [
      { title: 'Heat stress in outdoor work', text: 'Measuring physiological strain among outdoor workers across the working day.' },
      { title: 'Heat and kidney health', text: 'Epidemiological study of heat exposure and chronic kidney disease risk.' },
      { title: 'Workplace interventions', text: 'Evaluating rest, hydration and scheduling measures with employer partners.' },
    ],
    facilities: ['Physiology laboratory', 'Wearable monitoring equipment', 'Epidemiology data suite'],
    schools: ['School of Health & Life Sciences', 'School of Law & Public Policy'],
  },
];

export const getCentre = (slug: string) => centres.find((c) => c.slug === slug);

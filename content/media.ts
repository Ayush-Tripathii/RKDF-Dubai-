/**
 * Image registry. Every photograph on the site is referenced by key, never by path.
 * To swap in commissioned photography: replace the files in /public/images
 * named `{key}-{640|1280|2000}.{avif|webp}`, update the dimensions in
 * media-dimensions.json, and revise the alt text below.
 *
 * ALL CURRENT PHOTOGRAPHY IS LICENSED STOCK (Unsplash) AND IS A PLACEHOLDER.
 * None of it depicts RKDF University Dubai or RKDF University, Bhopal.
 */
import dims from './media-dimensions.json';

export const media = {
  hero: 'A contemporary glass-fronted academic building with a paved forecourt and young trees, lit at dusk',
  campusLawn: 'A long brick academic building beyond a broad lawn and paved walkway',
  campusWalk: 'Brick campus buildings and a lamp-lined path crossing a lawn in afternoon light',
  campusBrick: 'A classical brick university building with a white cupola, seen across a lawn',
  campusQuad: 'A red-brick academic building with a columned entrance under a clear sky',
  libraryGlass: 'A library reading room with floor-to-ceiling windows looking onto trees',
  libraryStacks: 'A quiet library aisle lined with old bound volumes under warm lamps',
  libraryShelves: 'A wall of wooden library shelving filled with books',
  libraryCurved: 'A curving two-storey wall of library shelves with a gallery walkway',
  libraryAisle: 'A long library aisle between wooden shelves under even light',
  libraryStudent: 'A student walking between tall library shelves',
  lectureTheatre: 'A tiered lecture theatre with students facing a projection screen',
  labGlass: 'Laboratory glassware arranged on a white bench in daylight',
  labEngineer: 'An engineer working at a laptop beside robotic test equipment in a laboratory',
  labCells: 'A fluorescence micrograph of stained cells',
  dubaiSkyline: 'The Dubai skyline at dusk with the Sheikh Zayed Road interchanges below',
  dubaiTower: 'The Burj Khalifa against a blue sky, framed by palm fronds',
  dubaiMarina: 'Towers along Dubai Marina lit at dusk',
  glassFacade: 'The curved glass facade of a contemporary building against the sky',
  whiteFacade: 'The white modular facade of a contemporary building',
  greenFacade: 'A terraced building facade with planting on every level',
  studentsLaptops: 'Three students working together at laptops around a table',
  studentsLibrary: 'Students discussing their work at a table in a library',
  studentsSeminar: 'Students seated with notebooks in a seminar room',
  studentsCode: 'Two students reviewing code together on a laptop',
  studentsNotes: 'People taking notes around a long wooden table',
  classLaptops: 'Adult learners at laptops around a seminar table, with a tutor presenting',
  sharedDesk: 'An overhead view of a shared desk with laptops, notebooks and coffee',
  construction: 'Construction workers fixing reinforcement on a steel deck',
  siteSurvey: 'A group of engineers in safety gear surveying a large construction site',
  solar: 'A solar panel array in a field under scattered cloud',
  dataLaptop: 'A laptop displaying a data analytics dashboard',
  lawLibrary: 'Marble busts and leather-bound volumes in a law library',
  drafting: 'Hands drafting architectural drawings on tracing paper',
  writing: 'A hand writing notes in a notebook beside a laptop',
} as const;

export type MediaKey = keyof typeof media;

export const portraits = {
  yusuf: 'Portrait of Yusuf Rahman',
  lina: 'Portrait of Lina Haddad',
  chidi: 'Portrait of Chidi Okonkwo',
  ananya: 'Portrait of Ananya Pillai',
} as const;
export type PortraitKey = keyof typeof portraits;

export const mediaDims = dims as Record<MediaKey, { width: number; height: number }>;
export const imageWidths = [640, 1280, 2000] as const;

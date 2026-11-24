// Downloads placeholder photography (Unsplash licence) and writes AVIF + WebP
// renditions to /public/images. Replace with commissioned photography before
// launch — see CONTENT-TODO.md. Keys must match /content/media.ts.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const photos = {
  hero: '1574958269340-fa927503f3dd',
  campusLawn: '1592280771190-3e2e4d571952',
  campusWalk: '1591123120675-6f7f1aae0e5b',
  campusBrick: '1562774053-701939374585',
  campusQuad: '1607237138185-eedd9c632b0b',
  libraryGlass: '1564981797816-1043664bf78d',
  libraryStacks: '1481627834876-b7833e8f5570',
  libraryShelves: '1507842217343-583bb7270b66',
  libraryCurved: '1524995997946-a1c2e315a42f',
  libraryAisle: '1498243691581-b145c3f54a5a',
  libraryStudent: '1427504494785-3a9ca7044f45',
  lectureTheatre: '1606761568499-6d2451b23c66',
  labGlass: '1532094349884-543bc11b234d',
  labEngineer: '1581091226825-a6a2a5aee158',
  labCells: '1576086213369-97a306d36557',
  dubaiSkyline: '1512453979798-5ea266f8880c',
  dubaiTower: '1582672060674-bc2bd808a8b5',
  dubaiMarina: '1526495124232-a04e1849168c',
  glassFacade: '1554469384-e58fac16e23a',
  whiteFacade: '1479839672679-a46483c0e7c8',
  greenFacade: '1451976426598-a7593bd6d0b2',
  studentsLaptops: '1522202176988-66273c2fd55f',
  studentsLibrary: '1523240795612-9a054b0db644',
  studentsSeminar: '1571260899304-425eee4c7efc',
  studentsCode: '1531482615713-2afd69097998',
  studentsNotes: '1517048676732-d65bc937f952',
  classLaptops: '1542744173-8e7e53415bb0',
  sharedDesk: '1519389950473-47ba0277781c',
  construction: '1504307651254-35680f356dfd',
  siteSurvey: '1541888946425-d81bb19240f5',
  solar: '1509391366360-2e959784a276',
  dataLaptop: '1460925895917-afdab827c52f',
  lawLibrary: '1505664194779-8beaceb93744',
  drafting: '1503387762-592deb58ef4e',
  writing: '1434030216411-0b793f4b4173',
};
const portraits = {
  yusuf: '1507003211169-0a1dd7228f2d',
  lina: '1494790108377-be9c29b29330',
  chidi: '1500648767791-00dcc994a43e',
  ananya: '1438761681033-6461ffad8d80',
};
const widths = [640, 1280, 2000];
const out = 'public/images';
const dims = {};

async function get(id, w) {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?w=${w}&q=85&fm=jpg`);
  if (!r.ok) throw new Error(`${id} ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

for (const [key, id] of Object.entries(photos)) {
  const src = await get(id, 2000);
  const meta = await sharp(src).metadata();
  dims[key] = { width: meta.width, height: meta.height };
  for (const w of widths) {
    const p = sharp(src).resize({ width: Math.min(w, meta.width) });
    await p.clone().avif({ quality: 52, effort: 4 }).toFile(`${out}/${key}-${w}.avif`);
    await p.clone().webp({ quality: 74 }).toFile(`${out}/${key}-${w}.webp`);
  }
  console.log('photo', key);
}
for (const [key, id] of Object.entries(portraits)) {
  const src = await get(id, 600);
  const p = sharp(src).resize(320, 320, { fit: 'cover', position: 'attention' });
  await p.clone().avif({ quality: 55 }).toFile(`${out}/portrait-${key}.avif`);
  await p.clone().webp({ quality: 78 }).toFile(`${out}/portrait-${key}.webp`);
  console.log('portrait', key);
}
await fs.writeFile('content/media-dimensions.json', JSON.stringify(dims, null, 2));

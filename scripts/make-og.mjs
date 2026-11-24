// Generates purpose-built 1200×630 Open Graph images per key route into /public/og.
import sharp from 'sharp';
import fs from 'node:fs/promises';

const P = '#FAF8F3', N = '#10263F', G = '#A8873D', I = '#5B6A79';
const cards = {
  default: ['RKDF University Dubai', 'A campus of RKDF University, Bhopal', 'libraryGlass'],
  home: ['A university built on thirty years of academic conviction.', 'Opening January 2027 · Dubai International Academic City', 'hero'],
  about: ['The University', 'A campus of RKDF University, Bhopal', 'campusQuad'],
  accreditation: ['Recognised, regulated, accountable', 'KHDA · MoHESR / CAA · NAAC · UGC', 'libraryGlass'],
  campus: ['The Dubai campus', 'Block 11, Dubai International Academic City', 'glassFacade'],
  heritage: ['From Bhopal to Dubai', 'Ram Krishna Dharmarth Foundation · Seventeen faculties', 'libraryShelves'],
  academics: ['Seven schools. Thirty-eight programmes.', 'Schools & faculties', 'lectureTheatre'],
  programmes: ['Fifteen programmes, openly priced', 'Every fee in dirhams, before you apply', 'studentsLibrary'],
  admissions: ['A clear path to joining us', 'January and September intakes', 'studentsLaptops'],
  fees: ['Tuition & fees 2027/28', 'The full schedule in UAE dirhams', 'libraryAisle'],
  scholarships: ['Five scholarship schemes', 'From 10% of tuition to full tuition', 'libraryCurved'],
  international: ['International students', 'Visas, residency, attestation and arrival', 'dubaiSkyline'],
  'student-life': ['Living and studying in Dubai', '31 societies · four sports facilities', 'studentsLaptops'],
  research: ['Research that begins with a real constraint', 'Four research centres', 'solar'],
  careers: ['Where our graduates go', 'A paid placement in every degree', 'sharedDesk'],
  news: ['From the university', 'News & events', 'campusBrick'],
  visit: ['See the campus for yourself', 'Book a campus visit', 'campusWalk'],
  contact: ['Contact RKDF University Dubai', '+971 4 428 6100 · admissions@rkdfdubai.ac.ae', 'libraryAisle'],
  apply: ['Applications for January 2027 are open', 'Applications close 18 December 2026', 'studentsLibrary'],
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function wrap(text, max) {
  const words = text.split(' '); const lines = []; let l = '';
  for (const w of words) { if ((l + ' ' + w).trim().length > max) { lines.push(l.trim()); l = w; } else l += ' ' + w; }
  lines.push(l.trim()); return lines;
}
await fs.mkdir('public/og', { recursive: true });
for (const [key, [title, sub, img]] of Object.entries(cards)) {
  const lines = wrap(title, 24).slice(0, 4);
  const startY = 315 - (lines.length * 62) / 2 + 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${P}"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#E1DACB" stroke-width="2"/>
  <text x="72" y="96" font-family="Georgia, serif" font-size="30" font-weight="600" letter-spacing="2" fill="${N}">RKDF</text>
  <rect x="72" y="110" width="84" height="1.5" fill="${G}"/>
  <text x="72" y="134" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="3" fill="${N}">UNIVERSITY DUBAI</text>
  ${lines.map((ln, i) => `<text x="72" y="${startY + i * 62}" font-family="Georgia, serif" font-size="52" fill="${N}">${esc(ln)}</text>`).join('\n  ')}
  <rect x="72" y="${startY + lines.length * 62 - 22}" width="48" height="1.5" fill="${G}"/>
  <text x="72" y="${startY + lines.length * 62 + 18}" font-family="Arial, sans-serif" font-size="22" fill="${I}">${esc(sub)}</text>
  <text x="72" y="584" font-family="Arial, sans-serif" font-size="13" letter-spacing="3" fill="${I}">DUBAI · UNITED ARAB EMIRATES</text>
</svg>`;
  const photo = await sharp(`public/images/${img}-1280.webp`).resize(460, 630, { fit: 'cover' }).toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: photo, left: 740, top: 0 }]).png({ compressionLevel: 9 }).toFile(`public/og/${key}.png`);
}
console.log('OG images:', Object.keys(cards).length);

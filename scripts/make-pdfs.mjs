// Writes simple text PDFs to /public/downloads so every download link resolves.
// Each is a DRAFT placeholder — replace with designed documents before launch.
import fs from 'node:fs/promises';

function pdf(title, lines) {
  const esc = (s) => s.replace(/[\\()]/g, (m) => '\\' + m).replace(/[^\x20-\x7E]/g, (c) => ({ '—': '-', '–': '-', '’': "'", '·': '-', '“': '"', '”': '"' }[c] ?? ''));
  const pages = [];
  for (let i = 0; i < lines.length; i += 44) pages.push(lines.slice(i, i + 44));
  const objs = [];
  const add = (s) => { objs.push(s); return objs.length; };
  const font = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const bold = add('<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>');
  const pagesId = objs.length + 1 + pages.length * 2;
  const kids = [];
  pages.forEach((pl, pi) => {
    let s = 'BT ';
    if (pi === 0) s += `/F2 22 Tf 56 780 Td (${esc(title)}) Tj 0 -22 Td /F1 9 Tf (RKDF University Dubai - DRAFT placeholder, replace before launch) Tj 0 -28 Td `;
    else s += '/F1 10 Tf 56 790 Td ';
    s += '/F1 10 Tf 14 TL ' + pl.map((l) => `(${esc(l)}) '`).join(' ') + ' ET';
    const c = add(`<< /Length ${s.length} >>\nstream\n${s}\nendstream`);
    kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Contents ${c} 0 R /Resources << /Font << /F1 ${font} 0 R /F2 ${bold} 0 R >> >> >>`));
  });
  add(`<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`);
  const cat = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  let out = '%PDF-1.4\n'; const offs = [];
  objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const x = out.length;
  out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map((o) => String(o).padStart(10, '0') + ' 00000 n \n').join('');
  out += `trailer\n<< /Size ${objs.length + 1} /Root ${cat} 0 R >>\nstartxref\n${x}\n%%EOF`;
  return Buffer.from(out, 'latin1');
}

const { programmes } = await import('../content/programmes.ts').catch(() => ({ programmes: null }));
const progLines = (programmes ?? []).map((p) => `${p.title} - ${p.durationLabel} - AED ${p.tuition.toLocaleString('en-US')} ${p.tuitionBasis === 'annual' ? 'per year' : 'total'}`);
const docs = {
  'rkdf-dubai-prospectus-2027': ['Prospectus 2027', ['RKDF University Dubai is the UAE campus of RKDF University, Bhopal,', 'established by the Ram Krishna Dharmarth Foundation.', '', 'Block 11, Dubai International Academic City, Dubai, UAE', 'Opening January 2027 - intakes each January and September', '', 'Seven schools, thirty-eight programmes.', '', 'Flagship programmes and tuition:', ...progLines, '', 'Admissions: admissions@rkdfdubai.ac.ae - +971 4 428 6100']],
  'rkdf-dubai-fee-schedule-2027': ['Fee schedule 2027/28', ['All fees in UAE dirhams.', '', ...progLines, '', 'Application fee AED 500 - Enrolment deposit AED 5,000', 'Student visa processing AED 3,500 per year', 'Health insurance AED 1,800 per year']],
  'rkdf-dubai-document-checklist': ['Application document checklist', ['[ ] Passport copy', '[ ] Passport-style photograph', '[ ] Attested school certificates and transcripts', '[ ] English language test result', '[ ] Personal statement (500-700 words)', '[ ] One academic reference', '[ ] Postgraduate: degree certificate, transcripts, CV', '[ ] UAE residents: Emirates ID copy']],
  'rkdf-dubai-scholarship-form': ['Scholarship application form', ['Full name: ______________________________', 'Application reference: ____________________', 'Scholarship applied for: __________________', '', 'Statement (300 words):', '', '', '', 'Signature: ______________  Date: __________']],
  'rkdf-dubai-academic-regulations': ['Academic regulations (summary)', ['Programmes at RKDF University Dubai are delivered under the academic', 'regulations of RKDF University, Bhopal.', '', 'Full regulations to be published before enrolment.']],
  'rkdf-dubai-refund-policy': ['Refund and withdrawal policy', ['Full policy to be published before enrolment.']],
  'rkdf-dubai-code-of-conduct': ['Student code of conduct', ['Full code to be published before enrolment.']],
  'rkdf-dubai-complaints-procedure': ['Complaints and appeals procedure', ['Full procedure to be published before enrolment.']],
};
await fs.mkdir('public/downloads', { recursive: true });
for (const [f, [t, l]] of Object.entries(docs)) await fs.writeFile(`public/downloads/${f}.pdf`, pdf(t, l));
console.log('PDFs:', Object.keys(docs).length, programmes ? '' : '(programme list skipped)');

// Post-build checks: no href="#", every internal link resolves, exactly one <h1> per page,
// no hex colours in component files, statistics present in server HTML.
import fs from 'node:fs/promises';
import path from 'node:path';

const root = 'dist/client';
const files = [];
async function walk(d) { for (const e of await fs.readdir(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) await walk(p); else if (p.endsWith('.html')) files.push(p); } }
await walk(root);
const exists = async (u) => {
  const clean = decodeURIComponent(u.split('#')[0].split('?')[0]);
  const cands = [path.join(root, clean), path.join(root, clean, 'index.html')];
  for (const c of cands) { try { const s = await fs.stat(c); if (s.isFile()) return true; } catch {} }
  return false;
};
const problems = [];
const seen = new Map();
for (const f of files) {
  const html = await fs.readFile(f, 'utf8');
  const page = '/' + path.relative(root, f).split(path.sep).join('/').replace(/index\.html$/, '');
  if (/href="#"/.test(html)) problems.push(`${page}: href="#"`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1 && !page.includes('404')) problems.push(`${page}: ${h1} <h1>`);
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const u = m[1];
    if (u.startsWith('//')) continue;
    if (!seen.has(u)) seen.set(u, await exists(u));
    if (!seen.get(u)) problems.push(`${page}: broken ${u}`);
  }
}
const comp = [];
async function walkSrc(d) { for (const e of await fs.readdir(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) await walkSrc(p); else if (p.endsWith('.tsx')) comp.push(p); } }
await walkSrc('src');
for (const c of comp) { const s = await fs.readFile(c, 'utf8'); const m = s.match(/#[0-9a-fA-F]{6}\b/g); if (m) problems.push(`${c}: hex ${m.join(',')}`); }
const home = await fs.readFile(path.join(root, 'index.html'), 'utf8');
for (const v of ['2,400', '180', '46', '94%']) if (!home.includes(v)) problems.push(`home: stat ${v} missing from HTML`);
console.log(`${files.length} pages, ${seen.size} unique internal links checked.`);
console.log(problems.length ? problems.slice(0, 60).join('\n') + `\n${problems.length} problem(s)` : 'No problems found.');

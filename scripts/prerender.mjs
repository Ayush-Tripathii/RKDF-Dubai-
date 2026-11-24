// Prerenders every route in both locales to static HTML, then writes
// sitemap.xml and robots.txt. Real content (including statistics) is in the HTML.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve('dist/client');
const base = process.env.VITE_BASE || '/RKDF-Dubai-/';
// Keep the pristine Vite template so the prerenderer can safely be re-run.
const built = await fs.readFile(path.join(root, 'index.html'), 'utf8');
if (built.includes('<!--app-->')) await fs.writeFile('dist/template.html', built);
const template = await fs.readFile('dist/template.html', 'utf8');
const { render, allPaths, SITE_URL } = await import(pathToFileURL(path.resolve('dist/server/entry-server.js')).href);

const paths = allPaths();
const urls = [...paths, ...paths.map((p) => (p === '/' ? '/ar' : `/ar${p}`))];
let count = 0;
const sitemap = [];
for (const url of urls) {
  const { html, head, lang, dir, noindex } = render(url);
  const page = template
    .replace('<!--lang-->', lang).replace('<!--dir-->', dir)
    .replace('<!--head-->', head)
    .replace('<!--preload-->', lang === 'ar'
      ? `<link rel="preload" href="${base}fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2" as="font" type="font/woff2" crossorigin />\n    <link rel="preload" href="${base}fonts/noto-kufi-arabic-arabic-400-normal.woff2" as="font" type="font/woff2" crossorigin />`
      : '')
    .replace('<!--app-->', html);
  const file = url === '/' ? 'index.html' : url === '/404' ? '404.html' : path.join(url.slice(1), 'index.html');
  await fs.mkdir(path.dirname(path.join(root, file)), { recursive: true });
  await fs.writeFile(path.join(root, file), page);
  if (url === '/404') { await fs.mkdir(path.join(root, '404'), { recursive: true }); await fs.writeFile(path.join(root, '404', 'index.html'), page); }
  if (!noindex && url !== '/404' && url !== '/ar/404') sitemap.push(url);
  count++;
}

const enOnly = sitemap.filter((u) => !u.startsWith('/ar'));
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${enOnly.flatMap((u) => {
  const ar = u === '/' ? '/ar' : `/ar${u}`;
  const alts = `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${u}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${SITE_URL}${ar}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${u}"/>`;
  return [`  <url>\n    <loc>${SITE_URL}${u}</loc>\n${alts}\n  </url>`, `  <url>\n    <loc>${SITE_URL}${ar}</loc>\n${alts}\n  </url>`];
}).join('\n')}
</urlset>
`;
await fs.writeFile(path.join(root, 'sitemap.xml'), xml);
await fs.writeFile(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /styleguide\nDisallow: /ar/styleguide\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Prerendered ${count} pages; sitemap has ${enOnly.length * 2} URLs.`);

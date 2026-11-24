import { useT } from '@/lib/locale';
import { PageShell } from '@/components/PageHeader';
import { Section, TertiaryLink } from '@/components/blocks';

export default function NotFound() {
  const t = useT();
  const p = t.pages.notFound;
  return (
    <PageShell title={p.title} standfirst={p.standfirst} image="libraryAisle" crumbs={[{ label: p.title }]} seo={{ description: 'The page you were looking for at RKDF University Dubai could not be found.', noindex: true }}>
      <Section>
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="t-body text-ink">Try the programme finder, or search the university using the search button at the top of the page.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <TertiaryLink to="/">{t.common.home}</TertiaryLink>
            <TertiaryLink to="/programmes">{t.pages.programmes.title}</TertiaryLink>
            <TertiaryLink to="/sitemap">{t.pages.sitemap.title}</TertiaryLink>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

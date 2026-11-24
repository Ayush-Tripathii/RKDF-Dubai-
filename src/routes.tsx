import type { ReactNode } from 'react';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import { About, Chancellor, ViceChancellor, Leadership, Accreditation, Campus, Heritage } from '@/pages/about';
import { Academics, SchoolPage, Programmes, ProgrammeDetail } from '@/pages/academics';
import { Admissions, EntryRequirements, Tuition, Scholarships, HowToApply, International, Agents, Apply } from '@/pages/admissions';
import { StudentLife, Accommodation, Societies, Support } from '@/pages/studentLife';
import { Research, CentrePage, Careers, Global } from '@/pages/research';
import { News, NewsArticle, Events } from '@/pages/news';
import { Visit, Contact, Downloads } from '@/pages/contact';
import { Privacy, Terms, Accessibility, Sitemap } from '@/pages/legal';
import Styleguide from '@/pages/Styleguide';
import { schools } from '@content/schools';
import { programmes } from '@content/programmes';
import { centres } from '@content/research';
import { news } from '@content/news';

export interface RouteDef { path: string; element: ReactNode }

export const routes: RouteDef[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/about/chancellor', element: <Chancellor /> },
  { path: '/about/vice-chancellor', element: <ViceChancellor /> },
  { path: '/about/leadership', element: <Leadership /> },
  { path: '/about/accreditation', element: <Accreditation /> },
  { path: '/about/campus', element: <Campus /> },
  { path: '/about/heritage', element: <Heritage /> },
  { path: '/academics', element: <Academics /> },
  { path: '/academics/:school', element: <SchoolPage /> },
  { path: '/programmes', element: <Programmes /> },
  { path: '/programmes/:slug', element: <ProgrammeDetail /> },
  { path: '/admissions', element: <Admissions /> },
  { path: '/admissions/entry-requirements', element: <EntryRequirements /> },
  { path: '/admissions/tuition-and-fees', element: <Tuition /> },
  { path: '/admissions/scholarships', element: <Scholarships /> },
  { path: '/admissions/how-to-apply', element: <HowToApply /> },
  { path: '/admissions/international', element: <International /> },
  { path: '/admissions/agents', element: <Agents /> },
  { path: '/student-life', element: <StudentLife /> },
  { path: '/student-life/accommodation', element: <Accommodation /> },
  { path: '/student-life/societies', element: <Societies /> },
  { path: '/student-life/support', element: <Support /> },
  { path: '/research', element: <Research /> },
  { path: '/research/:centre', element: <CentrePage /> },
  { path: '/careers', element: <Careers /> },
  { path: '/global', element: <Global /> },
  { path: '/news', element: <News /> },
  { path: '/news/:slug', element: <NewsArticle /> },
  { path: '/events', element: <Events /> },
  { path: '/visit', element: <Visit /> },
  { path: '/contact', element: <Contact /> },
  { path: '/apply', element: <Apply /> },
  { path: '/downloads', element: <Downloads /> },
  { path: '/styleguide', element: <Styleguide /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/terms', element: <Terms /> },
  { path: '/accessibility', element: <Accessibility /> },
  { path: '/sitemap', element: <Sitemap /> },
  { path: '/404', element: <NotFound /> },
];

/** Every concrete English path (dynamic params expanded). Arabic mirrors are /ar + path. */
export function allPaths(): string[] {
  return routes.flatMap((r) => {
    if (r.path === '/academics/:school') return schools.map((s) => `/academics/${s.slug}`);
    if (r.path === '/programmes/:slug') return programmes.map((p) => `/programmes/${p.slug}`);
    if (r.path === '/research/:centre') return centres.map((c) => `/research/${c.slug}`);
    if (r.path === '/news/:slug') return news.map((n) => `/news/${n.slug}`);
    return [r.path];
  });
}

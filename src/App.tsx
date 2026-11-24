import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LocaleProvider, useT } from '@/lib/locale';
import { UIProvider, RevealObserver, ScrollManager, store } from '@/lib/ui';
import { AnnouncementBar, Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EnquiryModal, SearchOverlay, PersistentActions } from '@/components/overlays';
import { routes } from './routes';
import NotFound from '@/pages/NotFound';

/** Honour a persisted Arabic preference when arriving at the English home page. */
function LocalePreference() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === '/' && store.get('rk-locale') === 'ar') navigate('/ar', { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

function Layout() {
  const t = useT();
  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <AnnouncementBar />
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Routes>
          {routes.flatMap((r) => [
            <Route key={r.path} path={r.path} element={r.element} />,
            <Route key={`ar${r.path}`} path={r.path === '/' ? '/ar' : `/ar${r.path}`} element={r.element} />,
          ])}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div className="h-14 lg:hidden" aria-hidden="true" />
      <PersistentActions />
      <EnquiryModal />
      <SearchOverlay />
      <RevealObserver />
      <ScrollManager />
      <LocalePreference />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <UIProvider>
        <Layout />
      </UIProvider>
    </LocaleProvider>
  );
}

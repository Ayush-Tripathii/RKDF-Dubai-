import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { HeadCollector, renderHead, type HeadData } from './lib/head';
import { allPaths } from './routes';
import { SITE_URL } from '@content/site';

export function render(url: string) {
  const collector: { data?: HeadData } = {};
  const html = renderToString(
    <HeadCollector.Provider value={collector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HeadCollector.Provider>,
  );
  const d = collector.data;
  return {
    html,
    head: d ? renderHead(d) : '',
    lang: d?.lang ?? 'en',
    dir: d?.dir ?? 'ltr',
    noindex: !!d?.noindex,
  };
}

export { allPaths, SITE_URL };

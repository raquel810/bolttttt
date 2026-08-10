import { StrictMode, useState, useEffect, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const DealerPage = lazy(() => import('./components/DealerPage.tsx'));

function Router() {
  const [page, setPage] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setPage(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (page === '#dealers') {
      window.scrollTo(0, 0);
    }
  }, [page]);

  if (page === '#dealers') {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse text-neutral-400">Loading…</div></div>}>
        <DealerPage onBack={() => { window.location.hash = ''; window.scrollTo(0, 0); }} />
      </Suspense>
    );
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);

import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import DealerPage from './components/DealerPage.tsx';
import './index.css';

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
    return <DealerPage />;
  }

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>
);

import { useState, useEffect } from 'react';
import { apps } from './data';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AppsList from './components/AppsList';

type View = 'home' | 'apps' | 'app-detail' | 'basketball' | 'contact';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedApp]);

  const navigate = (target: string) => {
    if (target === 'home') { setView('home'); setSelectedApp(null); }
    else if (target === 'apps') { setView('apps'); setSelectedApp(null); }
    else if (target === 'basketball') { setView('basketball'); setSelectedApp(null); }
    else if (target === 'contact') { /* later */ }
    else {
      const app = apps.find(a => a.id === target);
      if (app) { setSelectedApp(app.id); setView('app-detail'); }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Nav currentView={view} onNavigate={navigate} />

      {view === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <AppsList apps={apps} onSelect={(id) => navigate(id)} />
        </>
      )}

      {view === 'apps' && (
        <div style={{ paddingTop: '64px' }}>
          <AppsList apps={apps} onSelect={(id) => navigate(id)} />
        </div>
      )}

      {(view === 'app-detail' || view === 'basketball') && (
        <div style={{ paddingTop: '120px', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            {view === 'app-detail' ? `App detail: ${selectedApp}` : 'Basketball'} — coming next
          </p>
        </div>
      )}
    </div>
  );
}
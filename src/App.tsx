import { useState, useEffect } from 'react';
import { apps, basketball } from './data';
import Nav from './components/Nav';
import Hero from './components/Hero';
import AppsList from './components/AppsList';
import AppDetail from './components/AppDetail';
import Basketball from './components/Basketball';

type View = 'home' | 'apps' | 'app-detail' | 'basketball' | 'contact';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedApp]);

  const navigate = (target: string) => {
    if (target === 'home') { setView('home'); setSelectedApp(null); }
    else if (target === 'apps') { setView('apps'); setSelectedApp(null); }
    else if (target === 'basketball') { setView('basketball'); setSelectedApp(null); }
    else if (target === 'contact') { setContactOpen(true); }
    else {
      const app = apps.find(a => a.id === target);
      if (app) { setSelectedApp(app.id); setView('app-detail'); }
    }
  };

  const currentApp = apps.find(a => a.id === selectedApp);

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

      {view === 'app-detail' && currentApp && (
        <AppDetail
          app={currentApp}
          onBack={() => navigate('apps')}
          onContact={() => setContactOpen(true)}
        />
      )}

      {view === 'basketball' && (
        <Basketball project={basketball} />
      )}

      {/* Contact Modal */}
      {contactOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={() => setContactOpen(false)}
        >
          <div
            style={{
              background: 'var(--color-bg)',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              border: '1px solid var(--color-border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '16px' }}>
              Contact
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
              Get in touch via email or LinkedIn.
            </p>
            <button
              onClick={() => setContactOpen(false)}
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
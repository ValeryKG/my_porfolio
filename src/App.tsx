import { useState, useEffect } from 'react';
import { apps, basketball } from './data';
import { articles } from './articles';
import { useDeviceContext } from './context/DeviceContext';
import DeviceToggle from './components/shared/DeviceToggle';
import Contact from './components/Contact';

// Desktop components
import DesktopNav from './components/Nav';
import DesktopHero from './components/Hero';
import DesktopSystemSection from './components/SystemSection';
import DesktopAppsList from './components/AppsList';
import DesktopAppDetail from './components/AppDetail';
import DesktopBasketball from './components/Basketball';
import DesktopBuildLog from './components/BuildLog';
import DesktopArticleDetail from './components/ArticleDetail';

// Mobile components
import MobileNav from './components/mobile/Nav';
import MobileHero from './components/mobile/Hero';
import MobileSystemSection from './components/mobile/SystemSection';
import MobileAppsList from './components/mobile/AppsList';
import MobileAppDetail from './components/mobile/AppDetail';
import MobileBasketball from './components/mobile/Basketball';
import MobileBuildLog from './components/mobile/BuildLog';
import MobileArticleDetail from './components/mobile/ArticleDetail';

type View = 'home' | 'apps' | 'app-detail' | 'basketball' | 'build' | 'article-detail' | 'contact';

export default function App() {
  const { isMobile } = useDeviceContext();
  const [view, setView] = useState<View>('home');
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedApp, selectedArticle]);

  const navigate = (target: string) => {
    if (target === 'home') { setView('home'); setSelectedApp(null); setSelectedArticle(null); }
    else if (target === 'apps') { setView('apps'); setSelectedApp(null); }
    else if (target === 'basketball') { setView('basketball'); setSelectedApp(null); }
    else if (target === 'build') { setView('build'); setSelectedArticle(null); }
    else if (target === 'contact') { setContactOpen(true); }
    else {
      const app = apps.find(a => a.id === target);
      if (app) { setSelectedApp(app.id); setView('app-detail'); return; }
      const article = articles.find(a => a.id === target);
      if (article) { setSelectedArticle(article.id); setView('article-detail'); }
    }
  };

  const currentApp = apps.find(a => a.id === selectedApp);
  const currentArticle = articles.find(a => a.id === selectedArticle);

  // Select components based on device
  const Nav = isMobile ? MobileNav : DesktopNav;
  const Hero = isMobile ? MobileHero : DesktopHero;
  const SystemSection = isMobile ? MobileSystemSection : DesktopSystemSection;
  const AppsList = isMobile ? MobileAppsList : DesktopAppsList;
  const AppDetail = isMobile ? MobileAppDetail : DesktopAppDetail;
  const Basketball = isMobile ? MobileBasketball : DesktopBasketball;
  const BuildLog = isMobile ? MobileBuildLog : DesktopBuildLog;
  const ArticleDetail = isMobile ? MobileArticleDetail : DesktopArticleDetail;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Nav currentView={view} onNavigate={navigate} />

      {view === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <SystemSection />
          <AppsList apps={apps} onSelect={(id) => navigate(id)} />
        </>
      )}

      {view === 'apps' && (
        <div style={{ paddingTop: isMobile ? '56px' : '64px' }}>
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

      {view === 'build' && (
        <div style={{ paddingTop: isMobile ? '56px' : '64px' }}>
          <BuildLog articles={articles} onSelect={(id) => navigate(id)} />
        </div>
      )}

      {view === 'article-detail' && currentArticle && (
        <ArticleDetail
          article={currentArticle}
          onBack={() => navigate('build')}
        />
      )}

      {/* Contact Modal - shared component */}
      <Contact isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Device Toggle Button */}
      <DeviceToggle />
    </div>
  );
}

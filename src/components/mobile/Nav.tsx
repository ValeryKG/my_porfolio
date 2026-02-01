import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NavProps {
  currentView: string;
  onNavigate: (target: string) => void;
}

export default function MobileNav({ currentView, onNavigate }: NavProps) {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (target: string) => {
    onNavigate(target);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          padding: '0 16px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-navy)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0,
            }}
          >
            <span style={{
              background: 'var(--color-accent)',
              color: '#fff',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: 700,
            }}>{'>'}</span>
            Portfolio
          </button>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--color-navy)',
              borderRadius: '2px',
              transition: 'transform 0.2s',
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--color-navy)',
              borderRadius: '2px',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }} />
            <span style={{
              width: '24px',
              height: '2px',
              background: 'var(--color-navy)',
              borderRadius: '2px',
              transition: 'transform 0.2s',
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '56px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--color-bg)',
            zIndex: 99,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {[
            { key: 'home', label: 'Home' },
            { key: 'apps', label: t('nav.apps') },
            { key: 'basketball', label: t('nav.basketball') },
            { key: 'contact', label: t('nav.contact') },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigate(item.key)}
              style={{
                background: currentView === item.key ? 'var(--color-accent-dim)' : 'transparent',
                border: 'none',
                borderLeft: currentView === item.key ? '3px solid var(--color-accent)' : '3px solid transparent',
                color: currentView === item.key ? 'var(--color-accent)' : 'var(--color-text)',
                fontFamily: 'inherit',
                fontSize: '1.1rem',
                fontWeight: currentView === item.key ? 600 : 500,
                textAlign: 'left',
                padding: '16px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}

          {/* Language Switcher */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)',
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              Language
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['en', 'he'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => i18n.changeLanguage(lang)}
                  style={{
                    background: i18n.language === lang ? 'var(--color-accent)' : 'var(--color-bg-alt)',
                    color: i18n.language === lang ? '#ffffff' : 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    fontWeight: 600,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

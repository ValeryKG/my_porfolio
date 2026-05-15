import { useTranslation } from 'react-i18next';

interface NavProps {
  currentView: string;
  onNavigate: (target: string) => void;
}

export default function Nav({ currentView, onNavigate }: NavProps) {
  const { t } = useTranslation();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      boxShadow: '0 1px 3px var(--color-shadow)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-navy)',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{
            background: 'var(--color-accent)',
            color: '#fff',
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
          }}>{'>'}</span>
          Portfolio
        </button>

        {/* Nav Links + Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {[
            { key: 'apps', label: t('nav.apps') },
            { key: 'basketball', label: t('nav.basketball') },
            { key: 'build', label: t('nav.build') },
            { key: 'contact', label: t('nav.contact') },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={{
                background: 'none',
                border: 'none',
                color: currentView === item.key ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: currentView === item.key ? 600 : 500,
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: currentView === item.key ? '2px solid var(--color-accent)' : '2px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = 'var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = currentView === item.key ? 'var(--color-accent)' : 'var(--color-text-muted)';
              }}
            >
              {item.label}
            </button>
          ))}

        </div>
      </div>
    </nav>
  );
}
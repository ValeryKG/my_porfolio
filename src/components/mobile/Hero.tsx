import { useTranslation } from 'react-i18next';

interface HeroProps {
  onNavigate: (target: string) => void;
}

export default function MobileHero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px 40px',
      background: 'linear-gradient(180deg, var(--color-accent-dim) 0%, var(--color-bg) 60%)',
    }}>
      <div style={{ maxWidth: '100%', textAlign: 'center' }}>

        {/* Label */}
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          {'{ independent product developer }'}
        </p>

        {/* Title */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
          lineHeight: 1.3,
          marginBottom: '20px',
          letterSpacing: '-0.01em',
        }}>
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          marginBottom: '32px',
          padding: '0 8px',
        }}>
          {t('hero.subtitle')}
        </p>

        {/* Buttons - Stacked on mobile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 16px' }}>
          <button
            onClick={() => onNavigate('apps')}
            style={{
              background: 'var(--color-accent)',
              color: '#ffffff',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '16px 28px',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            }}
          >
            {t('hero.viewApps')}
          </button>

          <button
            onClick={() => onNavigate('basketball')}
            style={{
              background: 'var(--color-bg)',
              color: 'var(--color-navy)',
              border: '2px solid var(--color-border)',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 28px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            {t('hero.viewBasketball')}
          </button>
        </div>

        {/* Stats - horizontal scroll on mobile */}
        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          marginTop: '48px',
          flexWrap: 'wrap',
        }}>
          {[
            { value: '31 days', label: 'Largest app' },
            { value: '6 days', label: 'Latest app' },
            { value: '24 docs', label: 'Methodology' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', minWidth: '80px' }}>
              <p style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-navy)',
                marginBottom: '4px',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

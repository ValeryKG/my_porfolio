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
          {'{ independent developer }'}
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

        {/* Body */}
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          marginBottom: '10px',
          padding: '0 8px',
        }}>
          {t('hero.body1')}
        </p>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          marginBottom: '10px',
          padding: '0 8px',
        }}>
          {t('hero.body2')}
        </p>
        <p style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          color: 'var(--color-navy)',
          lineHeight: 1.7,
          marginBottom: '32px',
          padding: '0 8px',
        }}>
          {t('hero.body3')}
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
            onClick={() => onNavigate('contact')}
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
            Get in touch
          </button>
        </div>

        {/* CoachIQ callout */}
        <div
          onClick={() => onNavigate('coachiq')}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px 16px',
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'left',
            margin: '20px 16px 0',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', flexShrink: 0, marginTop: '5px' }} />
          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--color-navy)' }}>CoachIQ</strong>{' is live — AI basketball coaching with player memory. '}
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>coach-iq.org →</span>
          </span>
        </div>
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';

interface HeroProps {
  onNavigate: (target: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 24px 60px',
      background: 'linear-gradient(180deg, var(--color-accent-dim) 0%, var(--color-bg) 60%)',
    }}>
      <div style={{ maxWidth: '720px', textAlign: 'center' }}>

        {/* Label */}
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '20px',
        }}>
          {'{ independent developer }'}
        </p>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 300,
          color: 'var(--color-navy)',
          lineHeight: 1.2,
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}>
          {t('hero.title')}
        </h1>

        {/* Body */}
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 12px',
        }}>
          {t('hero.body1')}
        </p>
        <p style={{
          fontSize: '1rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: '640px',
          margin: '0 auto 12px',
        }}>
          {t('hero.body2')}
        </p>
        <p style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-navy)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 40px',
        }}>
          {t('hero.body3')}
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('apps')}
            style={{
              background: 'var(--color-accent)',
              color: '#ffffff',
              border: 'none',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = 'var(--color-accent-hover)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'var(--color-accent)';
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            {t('hero.viewApps')}
          </button>

          <button
            onClick={() => onNavigate('contact')}
            style={{
              background: 'var(--color-bg)',
              color: 'var(--color-navy)',
              border: '1px solid var(--color-border)',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = 'var(--color-accent)';
              (e.target as HTMLButtonElement).style.color = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              (e.target as HTMLButtonElement).style.color = 'var(--color-navy)';
            }}
          >
            Get in touch
          </button>
        </div>

        {/* CoachIQ callout */}
        <div
          onClick={() => onNavigate('coachiq')}
          style={{
            marginTop: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '32px',
            cursor: 'pointer',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            <strong style={{ color: 'var(--color-navy)' }}>CoachIQ</strong>{' is live — AI basketball coaching with player memory.'}
          </span>
          <span style={{ fontSize: '0.88rem', color: '#f59e0b', fontWeight: 600, flexShrink: 0 }}>coach-iq.org →</span>
        </div>
      </div>
    </div>
  );
}
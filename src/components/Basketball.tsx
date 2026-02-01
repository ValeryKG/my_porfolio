import { useTranslation } from 'react-i18next';
import type { BasketballProject } from '../data';

interface BasketballProps {
  project: BasketballProject;
}

export default function Basketball({ project }: BasketballProps) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2332 0%, #1e3a5f 50%, #1a2332 100%)',
        padding: '100px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '-120px',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(251, 146, 60, 0.15)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '-80px',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(251, 146, 60, 0.08)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            {t('basketball.label')}
          </p>

          <h1 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 300,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            maxWidth: '600px',
            lineHeight: 1.2,
          }}>
            {project.name}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            fontStyle: 'italic',
            marginBottom: '40px',
          }}>
            {project.tagline}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-orange)',
              color: '#ffffff',
              fontFamily: 'inherit',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = '#ea580c'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'var(--color-orange)'; }}
          >
            {t('basketball.openProject')} {'→'}
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '64px',
        }}>
          {project.stats.map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* NOTE banner */}
        <div style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '64px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <span style={{
            background: 'var(--color-orange)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}>
            NOTE
          </span>
          <div>
            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: '#92400e', marginBottom: '4px' }}>
              {t('basketball.different')}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#78350f', lineHeight: 1.6 }}>
              {t('basketball.differentDesc')}
            </p>
          </div>
        </div>

        {/* What + Unique */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px' }}>
          <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-orange)', fontWeight: 600, marginBottom: '12px' }}>
              {t('basketball.what')}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
              {project.what}
            </p>
          </div>

          <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-orange)', fontWeight: 600, marginBottom: '12px' }}>
              {t('basketball.unique')}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
              {project.unique}
            </p>
          </div>
        </div>

        {/* Categories table */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-orange)', fontWeight: 600, marginBottom: '8px' }}>
            {t('basketball.categories')}
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-navy)', marginBottom: '28px' }}>
            {t('basketball.categories')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 80px 1fr',
              padding: '12px 20px',
              background: 'var(--color-navy)',
              borderRadius: '8px 8px 0 0',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Category</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('basketball.pages')}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Topics</span>
            </div>

            {project.categories.map((cat, i) => (
              <div
                key={cat.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 80px 1fr',
                  padding: '16px 20px',
                  background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-bg-alt)',
                  borderRadius: i === project.categories.length - 1 ? '0 0 8px 8px' : '0',
                  alignItems: 'start',
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-navy)' }}>{cat.name}</span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--color-orange)',
                  background: 'var(--color-orange-dim)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                }}>
                  {cat.pages}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{cat.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Role */}
        <div style={{
          background: 'var(--color-accent-dim)',
          border: '1px solid var(--color-accent-light)',
          borderRadius: '12px',
          padding: '32px',
          marginBottom: '64px',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              letterSpacing: '0.05em',
            }}>
              AI
            </span>
            <div>
              <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '8px' }}>
                {t('basketball.aiRole')}
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
                {project.aiRole}
              </p>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-orange)', fontWeight: 600, marginBottom: '8px' }}>
            {t('basketball.impact')}
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-navy)', marginBottom: '28px' }}>
            {t('basketball.impact')}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {project.impact.map((item, i) => (
              <div key={i} style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--color-orange)', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                  {'→'}
                </span>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

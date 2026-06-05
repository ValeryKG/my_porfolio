import { useTranslation } from 'react-i18next';
import type { BasketballProject } from '../../data';

interface BasketballProps {
  project: BasketballProject;
}

export default function MobileBasketball({ project }: BasketballProps) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '56px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2332 0%, #1e3a5f 100%)',
        padding: '32px 16px 40px',
      }}>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-orange)',
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          {t('basketball.label')}
        </p>

        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 300,
          color: '#ffffff',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}>
          {project.name}
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '1rem',
          fontStyle: 'italic',
          marginBottom: '28px',
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
            fontSize: '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '14px 28px',
            borderRadius: '10px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          {t('basketball.openProject')} →
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px 48px' }}>

        {/* Stats */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '32px',
        }}>
          {project.stats.map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '14px 16px',
            }}>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-navy)', lineHeight: 1.5 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* NOTE banner */}
        <div style={{
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{
              background: 'var(--color-orange)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '4px',
            }}>
              NOTE
            </span>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#92400e' }}>
              {t('basketball.different')}
            </p>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.6 }}>
            {t('basketball.differentDesc')}
          </p>
        </div>

        {/* What It Is */}
        <div style={{
          background: 'var(--color-bg-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '16px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            {t('basketball.what')}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
            {project.what}
          </p>
        </div>

        {/* What Makes It Unique */}
        <div style={{
          background: 'var(--color-bg-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            {t('basketball.unique')}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
            {project.unique}
          </p>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {t('basketball.categories')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {project.categories.map((cat) => (
              <div key={cat.name} style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                    {cat.name}
                  </p>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--color-orange)',
                    background: 'var(--color-orange-dim)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}>
                    {cat.pages} {t('basketball.pages')}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {cat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Role */}
        <div style={{
          background: 'var(--color-accent-dim)',
          border: '1px solid var(--color-accent-light)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '4px',
            }}>
              AI
            </span>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-navy)' }}>
              {t('basketball.aiRole')}
            </p>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
            {project.aiRole}
          </p>
        </div>

        {/* Impact */}
        <div>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {t('basketball.impact')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {project.impact.map((item, i) => (
              <div key={i} style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--color-orange)', fontWeight: 700, fontSize: '1rem' }}>
                  →
                </span>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
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

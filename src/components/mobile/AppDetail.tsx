import { useTranslation } from 'react-i18next';
import type { Project } from '../../data';
import ScreenshotCarousel from '../shared/ScreenshotCarousel';

interface AppDetailProps {
  app: Project;
  onBack: () => void;
  onContact: () => void;
}

export default function MobileAppDetail({ app, onBack, onContact }: AppDetailProps) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '56px' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #2a3f5f 100%)',
        padding: '24px 16px 32px',
      }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'inherit',
            fontSize: '0.95rem',
            cursor: 'pointer',
            marginBottom: '24px',
            padding: 0,
          }}
        >
          ← {t('appDetail.back')}
        </button>

        {/* Title */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '8px',
        }}>
          {app.name}
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '1rem',
          fontStyle: 'italic',
          marginBottom: '24px',
        }}>
          {app.tagline}
        </p>

        {/* Buttons - stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {app.accessType !== 'request' && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'var(--color-accent)',
                color: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '14px 24px',
                borderRadius: '10px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {t('appDetail.openApp')} →
            </a>
          )}

          {app.accessType === 'request' && (
            <button
              onClick={onContact}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '2px solid rgba(255,255,255,0.3)',
                fontFamily: 'inherit',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              {t('appDetail.requestAccess')}
            </button>
          )}
          {app.accessNote && app.accessType === 'public' && (
            <button
              onClick={onContact}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.25)',
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                fontWeight: 500,
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Request Manager Access
            </button>
          )}
        </div>
        {app.accessNote && (
          <p style={{ marginTop: '10px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '0 16px' }}>
            {app.accessNote}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px 48px' }}>

        {/* Screenshot Carousel */}
        {app.screenshots && app.screenshots.length > 0 && (
          <ScreenshotCarousel key={app.id} screenshots={app.screenshots} isMobile />
        )}

        {/* Stats - 2 column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {app.stats.slice(0, 4).map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Problem */}
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '16px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#dc2626',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            {t('appDetail.problem')}
          </p>
          <p style={{ fontSize: '1rem', color: '#7f1d1d', lineHeight: 1.7 }}>
            {app.problem}
          </p>
        </div>

        {/* Solution */}
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#16a34a',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            {t('appDetail.solution')}
          </p>
          <p style={{ fontSize: '1rem', color: '#14532d', lineHeight: 1.7 }}>
            {app.solution}
          </p>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {t('appDetail.features')}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {app.features.map((feature, i) => (
              <div
                key={feature.title}
                style={{
                  background: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{
                    background: 'var(--color-accent-dim)',
                    color: 'var(--color-accent)',
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                    {feature.title}
                  </p>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {t('appDetail.metrics')}
          </p>

          <div style={{
            background: 'var(--color-bg-alt)',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '12px 16px',
              background: 'var(--color-navy)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 600 }}>
                {t('appDetail.before')}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 600 }}>
                {t('appDetail.after')}
              </span>
            </div>

            {app.metrics.map((metric, i) => (
              <div key={metric.label} style={{
                padding: '16px',
                borderBottom: i < app.metrics.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', fontWeight: 500, marginBottom: '8px' }}>
                  {metric.label}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <span style={{ fontSize: '0.95rem', color: '#dc2626' }}>{metric.before}</span>
                  <span style={{ fontSize: '0.95rem', color: '#16a34a', fontWeight: 600 }}>{metric.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
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
            color: 'var(--color-accent)',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            {t('appDetail.architecture')}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.8 }}>
            {app.architecture}
          </p>
        </div>

        {/* Tech */}
        <div style={{
          background: 'var(--color-bg-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            fontWeight: 600,
            marginBottom: '16px',
          }}>
            {t('appDetail.tech')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {app.tech.map((tag) => (
              <span key={tag} style={{
                fontSize: '0.9rem',
                color: 'var(--color-navy)',
                background: 'var(--color-accent-light)',
                border: '1px solid var(--color-accent-dim)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* AI note */}
        <div style={{
          background: 'var(--color-accent-dim)',
          border: '1px solid var(--color-accent-light)',
          borderRadius: '14px',
          padding: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
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
              {t('appDetail.builtWith')}
            </p>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {t('appDetail.builtWithDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}

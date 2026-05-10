import { useTranslation } from 'react-i18next';
import type { Project } from '../data';

interface AppsListProps {
  apps: Project[];
  onSelect: (id: string) => void;
}

export default function AppsList({ apps, onSelect }: AppsListProps) {
  const { t } = useTranslation();

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '80px 24px',
    }}>
      {/* Section Header */}
      <div style={{ marginBottom: '56px' }}>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '12px',
        }}>
          {t('apps.label')}
        </p>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
          marginBottom: '12px',
        }}>
          {t('apps.title')}
        </h2>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
          maxWidth: '520px',
          lineHeight: 1.6,
        }}>
          {t('apps.description')}
        </p>
      </div>

      {/* App Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {apps.map((app, index) => (
          <div
            key={app.id}
            onClick={() => onSelect(app.id)}
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '32px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              card.style.borderColor = 'var(--color-accent)';
              card.style.boxShadow = '0 8px 24px var(--color-shadow-hover)';
              card.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.borderColor = 'var(--color-border)';
              card.style.boxShadow = 'none';
              card.style.transform = 'translateY(0)';
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '3px',
              background: index === 0
                ? 'var(--color-accent)'
                : index === 1
                  ? 'var(--color-green)'
                  : 'var(--color-orange)',
            }} />

            {/* Number + Badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                letterSpacing: '0.1em',
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {app.status === 'live-mvp' && (
                  <span style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-orange)',
                    background: 'rgba(249, 115, 22, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}>
                    Live MVP
                  </span>
                )}
                {app.status === 'in-development' ? (
                  <span style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(148, 163, 184, 0.9)',
                    background: 'rgba(148, 163, 184, 0.1)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}>
                    In Development
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-green)',
                    background: 'var(--color-green-dim)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}>
                    Live
                  </span>
                )}
              </div>
            </div>

            {/* Title + Tagline */}
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 600,
                color: 'var(--color-navy)',
                marginBottom: '6px',
              }}>
                {app.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                fontStyle: 'italic',
              }}>
                {app.tagline}
              </p>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              flex: 1,
            }}>
              {app.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {app.tech.slice(0, 4).map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.9rem',
                  letterSpacing: '0.05em',
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                }}>
                  {tag}
                </span>
              ))}
              {app.tech.length > 4 && (
                <span style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  padding: '3px 4px',
                }}>
                  +{app.tech.length - 4}
                </span>
              )}
            </div>

            {/* Lines of code */}
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '12px',
              marginTop: '4px',
            }}>
              {app.linesOfCode.toLocaleString()} {t('apps.linesOfCode')} · {app.buildTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
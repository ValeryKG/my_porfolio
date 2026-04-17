import { useTranslation } from 'react-i18next';
import type { Project } from '../../data';

interface AppsListProps {
  apps: Project[];
  onSelect: (id: string) => void;
}

export default function MobileAppsList({ apps, onSelect }: AppsListProps) {
  const { t } = useTranslation();

  const accentColors = ['var(--color-accent)', 'var(--color-green)', 'var(--color-orange)'];

  return (
    <div style={{ padding: '40px 16px 60px' }}>
      {/* Section Header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '10px',
        }}>
          {t('apps.label')}
        </p>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
          marginBottom: '12px',
        }}>
          {t('apps.title')}
        </h2>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}>
          {t('apps.description')}
        </p>
      </div>

      {/* App Cards - Single column on mobile */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {apps.map((app, index) => (
          <div
            key={app.id}
            onClick={() => onSelect(app.id)}
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 8px var(--color-shadow)',
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '4px',
              background: accentColors[index] || accentColors[0],
            }} />

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
              }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {app.status === 'live-mvp' && (
                  <span style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-orange)',
                    background: 'rgba(249, 115, 22, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontWeight: 600,
                  }}>
                    Live MVP
                  </span>
                )}
                <span style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: app.accessType === 'public' ? 'var(--color-green)' : 'var(--color-text-muted)',
                  background: app.accessType === 'public' ? 'var(--color-green-dim)' : 'var(--color-bg-alt)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontWeight: 600,
                }}>
                  {app.accessType === 'public' ? 'Live' : 'Live — Private'}
                </span>
              </div>
            </div>

            {/* Title + Tagline */}
            <div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 600,
                color: 'var(--color-navy)',
                marginBottom: '6px',
              }}>
                {app.name}
              </h3>
              <p style={{
                fontSize: '0.95rem',
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
            }}>
              {app.description}
            </p>

            {/* Tech tags - scrollable row */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {app.tech.slice(0, 3).map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-alt)',
                  border: '1px solid var(--color-border)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                }}>
                  {tag}
                </span>
              ))}
              {app.tech.length > 3 && (
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  padding: '6px 8px',
                }}>
                  +{app.tech.length - 3}
                </span>
              )}
            </div>

            {/* Footer */}
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              borderTop: '1px solid var(--color-border)',
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>{app.linesOfCode.toLocaleString()} {t('apps.linesOfCode')}</span>
              <span style={{ color: accentColors[index], fontWeight: 600 }}>View →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import type { Project } from '../data';
import ScreenshotCarousel from './shared/ScreenshotCarousel';

interface AppDetailProps {
  app: Project;
  onBack: () => void;
  onContact: () => void;
}

export default function AppDetail({ app, onBack, onContact }: AppDetailProps) {
  const { t } = useTranslation();

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #2a3f5f 100%)',
        padding: '80px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Back */}
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginBottom: '40px',
              padding: 0,
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            {t('appDetail.back')}
          </button>

          {/* Title + Buttons row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h1 style={{ fontSize: '2.6rem', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                {app.name}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                {app.tagline}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {app.accessType !== 'request' && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#ffffff',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'var(--color-accent-hover)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = 'var(--color-accent)'; }}
                >
                  {t('appDetail.openApp')} {'→'}
                </a>
              )}

              {app.accessType === 'request' && (
                <button
                  onClick={onContact}
                  style={{
                    background: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '10px 22px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
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
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    padding: '8px 18px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Request Manager Access
                </button>
              )}
            </div>
            {app.accessNote && (
              <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>
                {app.accessNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* Screenshot Carousel */}
        {app.screenshots && app.screenshots.length > 0 && (
          <ScreenshotCarousel key={app.id} screenshots={app.screenshots} />
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '64px',
        }}>
          {app.stats.map((stat) => (
            <div key={stat.label} style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 16px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Problem + Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#dc2626', fontWeight: 600, marginBottom: '12px' }}>
              {t('appDetail.problem')}
            </p>
            <p style={{ fontSize: '0.88rem', color: '#7f1d1d', lineHeight: 1.7 }}>{app.problem}</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#16a34a', fontWeight: 600, marginBottom: '12px' }}>
              {t('appDetail.solution')}
            </p>
            <p style={{ fontSize: '0.88rem', color: '#14532d', lineHeight: 1.7 }}>{app.solution}</p>
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '8px' }}>
            {t('appDetail.features')}
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-navy)', marginBottom: '28px' }}>{app.name}</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {app.features.map((feature, i) => (
              <div
                key={feature.title}
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  padding: '24px',
                  display: 'flex',
                  gap: '16px',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
              >
                <span style={{
                  background: 'var(--color-accent-dim)',
                  color: 'var(--color-accent)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '4px' }}>{feature.title}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before vs After */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '8px' }}>
            {t('appDetail.metrics')}
          </p>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-navy)', marginBottom: '28px' }}>
            {t('appDetail.metrics')}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              padding: '12px 20px',
              background: 'var(--color-navy)',
              borderRadius: '8px 8px 0 0',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Task</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('appDetail.before')}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('appDetail.after')}</span>
            </div>

            {app.metrics.map((metric, i) => (
              <div
                key={metric.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  padding: '14px 20px',
                  background: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-bg-alt)',
                  borderRadius: i === app.metrics.length - 1 ? '0 0 8px 8px' : '0',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text)', fontWeight: 500 }}>{metric.label}</span>
                <span style={{ fontSize: '0.8rem', color: '#dc2626' }}>{metric.before}</span>
                <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>{metric.after}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture + Tech */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px' }}>
          <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '12px' }}>
              {t('appDetail.architecture')}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', lineHeight: 1.8 }}>{app.architecture}</p>
          </div>

          <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '32px' }}>
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '16px' }}>
              {t('appDetail.tech')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {app.tech.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-navy)',
                  background: 'var(--color-accent-light)',
                  border: '1px solid var(--color-accent-dim)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI note */}
        <div style={{
          marginTop: '48px',
          background: 'var(--color-accent-dim)',
          border: '1px solid var(--color-accent-light)',
          borderRadius: '12px',
          padding: '24px 28px',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
        }}>
          <span style={{
            background: 'var(--color-accent)',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}>
            AI
          </span>
          <div>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '4px' }}>
              {t('appDetail.builtWith')}
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {t('appDetail.builtWithDesc')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

import type { Article } from '../../articles';

interface BuildLogProps {
  articles: Article[];
  onSelect: (id: string) => void;
}

export default function MobileBuildLog({ articles, onSelect }: BuildLogProps) {
  const published = articles.filter((a) => a.published);

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
          Build Journal
        </p>
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
          marginBottom: '12px',
        }}>
          Behind the Build
        </h2>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}>
          The decisions, failures, and architecture choices that don't fit in a README. Published weekly.
        </p>
      </div>

      {/* Article Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {published.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelect(article.id)}
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
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
              background: article.seriesColor,
            }} />

            {/* Date + Series */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}>
                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: article.seriesColor,
                background: 'rgba(59, 130, 246, 0.08)',
                padding: '3px 10px',
                borderRadius: '20px',
                fontWeight: 600,
              }}>
                {article.series}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: 'var(--color-navy)',
              lineHeight: 1.3,
            }}>
              {article.title}
            </h3>

            {/* Excerpt */}
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}>
              {article.excerpt}
            </p>

            {/* Footer */}
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--color-accent)',
              fontWeight: 600,
              borderTop: '1px solid var(--color-border)',
              paddingTop: '14px',
              textAlign: 'right',
            }}>
              Read →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

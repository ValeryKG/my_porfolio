import type { Article } from '../articles';

interface BuildLogProps {
  articles: Article[];
  onSelect: (id: string) => void;
}

export default function BuildLog({ articles, onSelect }: BuildLogProps) {
  const published = articles.filter((a) => a.published);

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
          Build Journal
        </p>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
          marginBottom: '12px',
        }}>
          Behind the Build
        </h2>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
          maxWidth: '520px',
          lineHeight: 1.6,
        }}>
          The decisions, failures, and architecture choices that don't fit in a README. Published weekly — each article answers one question from the last and ends on a new one.
        </p>
      </div>

      {/* Article Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {published.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelect(article.id)}
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
              background: article.seriesColor,
            }} />

            {/* Date + Series badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}>
                {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: article.seriesColor,
                background: 'rgba(59, 130, 246, 0.08)',
                padding: '2px 10px',
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
              flex: 1,
            }}>
              {article.excerpt}
            </p>

            {/* Footer */}
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-accent)',
              fontWeight: 600,
              borderTop: '1px solid var(--color-border)',
              paddingTop: '12px',
              marginTop: '4px',
            }}>
              Read →
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

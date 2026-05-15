import type { Article } from '../articles';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export default function ArticleDetail({ article, onBack }: ArticleDetailProps) {
  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #2a3f5f 100%)',
        padding: '80px 24px 64px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '32px',
              padding: 0,
              letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
          >
            ← Behind the Build
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              background: 'rgba(59, 130, 246, 0.15)',
              padding: '3px 12px',
              borderRadius: '20px',
              fontWeight: 600,
            }}>
              {article.series}
            </span>
            <span style={{
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.05em',
            }}>
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 300,
            color: '#ffffff',
            lineHeight: 1.2,
            maxWidth: '720px',
          }}>
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 100px' }}>
        <div style={{ maxWidth: '680px' }}>
          {article.content.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text)',
                lineHeight: 1.85,
                marginBottom: '28px',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

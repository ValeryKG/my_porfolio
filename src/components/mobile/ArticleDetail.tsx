import type { Article } from '../../articles';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export default function MobileArticleDetail({ article, onBack }: ArticleDetailProps) {
  return (
    <div style={{ paddingTop: '56px' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-navy) 0%, #2a3f5f 100%)',
        padding: '24px 16px 36px',
      }}>
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
          ← Behind the Build
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.72rem',
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
          }}>
            {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 300,
          color: '#ffffff',
          lineHeight: 1.25,
        }}>
          {article.title}
        </h1>
      </div>

      {/* Article Body */}
      <div style={{ padding: '32px 16px 64px' }}>
        {article.content.map((paragraph, i) => (
          <p
            key={i}
            style={{
              fontSize: '1rem',
              color: 'var(--color-text)',
              lineHeight: 1.85,
              marginBottom: '24px',
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

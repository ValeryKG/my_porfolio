export default function SystemSection() {
  const cards = [
    {
      number: '01',
      title: 'Before the first line',
      body: 'Every project starts with a 6-stage decision tree. Architecture questions answered. Data model documented. Design system locked. Legal pages live. Six gates. None are skippable. This is why the apps work in production — not because of talent, but because of sequence.',
    },
    {
      number: '02',
      title: 'Decisions that don\'t disappear',
      body: 'Every meaningful choice gets an Architecture Decision Record: what the problem was, what the wrong solution looked like, what was chosen and why. StockPilot has 12 of them. When the same pattern appears in a new app, the answer is already written.',
    },
    {
      number: '03',
      title: 'Failures that become rules',
      body: 'When WishBasket exposed two PWA install prompt edge cases, those bugs updated the shared guide library. The next app starts with those lessons already encoded. Six projects in — the system knows more than any single project does.',
    },
    {
      number: '04',
      title: 'Builds that stay maintainable',
      body: 'Most codebases become expensive to change after 6 months. Every decision here is documented — what the problem was, what was tried, what was chosen and why. A year later, opening any project takes minutes not days. The context was never lost because it was never only in someone\'s head.',
    },
  ];

  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 24px 80px',
    }}>
      {/* Section Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '12px',
        }}>
          Methodology
        </p>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
        }}>
          How it's built — not what
        </h2>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
      }}>
        {cards.map((card) => (
          <div
            key={card.number}
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <span style={{
              fontSize: '0.85rem',
              color: 'var(--color-accent)',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}>
              {card.number}
            </span>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--color-navy)',
              lineHeight: 1.3,
            }}>
              {card.title}
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}>
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

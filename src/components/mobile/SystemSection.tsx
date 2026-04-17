export default function MobileSystemSection() {
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
  ];

  return (
    <div style={{
      padding: '0 20px 60px',
    }}>
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
          Methodology
        </p>
        <h2 style={{
          fontSize: '1.6rem',
          fontWeight: 300,
          color: 'var(--color-navy)',
        }}>
          How it's built — not what
        </h2>
      </div>

      {/* Cards stacked vertically */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {cards.map((card) => (
          <div
            key={card.number}
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
              fontSize: '1.1rem',
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

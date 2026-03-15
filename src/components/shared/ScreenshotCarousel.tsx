import { useState, useEffect, useCallback } from 'react';

interface Screenshot {
  file: string;
  caption: string;
}

interface Props {
  screenshots: Screenshot[];
  isMobile?: boolean;
}

export default function ScreenshotCarousel({ screenshots, isMobile = false }: Props) {
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = useCallback(() => setCurrent(c => (c - 1 + screenshots.length) % screenshots.length), [screenshots.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % screenshots.length), [screenshots.length]);

  useEffect(() => {
    if (!zoomed) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomed, prev, next]);

  if (!screenshots || screenshots.length === 0) return null;

  const showNav = screenshots.length > 1;
  const img = screenshots[current];

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    setTouchStart(null);
  };

  const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid var(--color-border)',
    borderRadius: '50%',
    width: isMobile ? '32px' : '36px',
    height: isMobile ? '32px' : '36px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: 'var(--color-navy)',
    lineHeight: 1,
    zIndex: 2,
  });

  const lightboxArrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    fontSize: '1.6rem',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <>
      {/* Carousel */}
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prev();
          if (e.key === 'ArrowRight') next();
        }}
        style={{ outline: 'none', marginBottom: isMobile ? '32px' : '48px' }}
      >
        {/* wrapper: arrows are outside overflow:hidden so they're always clickable */}
        <div style={{ position: 'relative' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

          {/* Image container — overflow hidden only for border-radius clipping */}
          <div style={{
            background: 'var(--color-bg-alt)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <img
              src={img.file}
              alt={img.caption}
              loading="lazy"
              onClick={() => setZoomed(true)}
              style={{
                width: '100%',
                maxHeight: isMobile ? '260px' : '480px',
                objectFit: 'contain',
                display: 'block',
                cursor: 'zoom-in',
              }}
            />

            {/* Zoom hint */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.4)',
              color: '#fff',
              fontSize: '0.75rem',
              padding: '3px 9px',
              borderRadius: '20px',
              pointerEvents: 'none',
              zIndex: 3,
            }}>
              ⊕ Zoom
            </div>
          </div>

          {/* Arrows — outside overflow:hidden, always reachable */}
          {showNav && (
            <>
              <button onClick={prev} style={arrowStyle('left')}>‹</button>
              <button onClick={next} style={arrowStyle('right')}>›</button>
            </>
          )}
        </div>

        {/* Caption + dots */}
        <div style={{ textAlign: 'center', marginTop: '12px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: showNav ? '10px' : 0 }}>
            {img.caption}
          </p>
          {showNav && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === current ? 'var(--color-accent)' : 'var(--color-border)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close — always visible, large tap target */}
          <button
            onClick={() => setZoomed(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontSize: '1.4rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
            }}
          >
            ×
          </button>

          <img
            src={img.file}
            alt={img.caption}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '95vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />

          {/* Caption */}
          <p style={{
            position: 'absolute',
            bottom: '16px',
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.85rem',
            padding: '0 60px',
          }}>
            {img.caption}
          </p>

          {showNav && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} style={lightboxArrowStyle('left')}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} style={lightboxArrowStyle('right')}>›</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(26, 35, 50, 0.5)',
          zIndex: 200,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 201,
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '40px',
        width: '90%',
        maxWidth: '480px',
        boxShadow: '0 24px 48px rgba(26, 35, 50, 0.2)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--color-navy)' }}>
            {t('contact.title')}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              fontFamily: 'inherit',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = 'var(--color-navy)'; e.currentTarget.style.background = 'var(--color-bg-alt)'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.background = 'none'; }}
          >
            {'×'}
          </button>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Email - with copy */}
          <div
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 24px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <span style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              ✉
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '2px' }}>
                {t('contact.email')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                valerynz@hotmail.com
              </p>
            </div>
            <button
              onClick={() => copyToClipboard('valerynz@hotmail.com', 'email')}
              style={{
                background: copied === 'email' ? 'var(--color-green)' : 'var(--color-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                minWidth: '70px',
              }}
            >
              {copied === 'email' ? '✓' : 'Copy'}
            </button>
          </div>

          {/* Phone - with copy */}
          <div
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 24px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <span style={{
              background: 'var(--color-green-dim)',
              color: 'var(--color-green)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              📱
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '2px' }}>
                {t('contact.phone')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                +972 54-332-8803
              </p>
            </div>
            <button
              onClick={() => copyToClipboard('+972543328803', 'phone')}
              style={{
                background: copied === 'phone' ? 'var(--color-green)' : 'var(--color-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                minWidth: '70px',
              }}
            >
              {copied === 'phone' ? '✓' : 'Copy'}
            </button>
          </div>

          {/* WhatsApp - external link */}
          <a
            href="https://wa.me/972543328803"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 24px',
              textDecoration: 'none',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--color-orange)'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <span style={{
              background: 'var(--color-orange-dim)',
              color: 'var(--color-orange)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              💬
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '2px' }}>
                {t('contact.whatsapp')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {t('contact.whatsappDesc')}
              </p>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>→</span>
          </a>

          {/* GitHub - external link */}
          <a
            href="https://github.com/ValeryKG"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '20px 24px',
              textDecoration: 'none',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--color-purple)'; }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <span style={{
              background: 'var(--color-purple-dim)',
              color: 'var(--color-purple)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              💻
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '2px' }}>
                {t('contact.github')}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                github.com/ValeryKG
              </p>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>→</span>
          </a>

        </div>
      </div>
    </>
  );
}

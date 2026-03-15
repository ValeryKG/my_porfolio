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
        borderRadius: '12px',
        padding: '16px',
        width: 'calc(100% - 24px)',
        maxWidth: '360px',
        boxShadow: '0 24px 48px rgba(26, 35, 50, 0.2)',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-navy)' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

          {/* Email - tap to copy */}
          <button
            onClick={() => copyToClipboard('valerynz@hotmail.com', 'email')}
            style={{
              background: copied === 'email' ? 'var(--color-green-dim)' : 'var(--color-bg-alt)',
              border: `1px solid ${copied === 'email' ? 'var(--color-green)' : 'var(--color-border)'}`,
              borderRadius: '10px',
              padding: '14px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}>
              ✉
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1px' }}>
                {t('contact.email')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                valerynz@hotmail.com
              </p>
            </div>
            <span style={{
              color: copied === 'email' ? 'var(--color-green)' : 'var(--color-text-muted)',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              {copied === 'email' ? '✓' : '⧉'}
            </span>
          </button>

          {/* Phone - tap to copy */}
          <button
            onClick={() => copyToClipboard('+972543328803', 'phone')}
            style={{
              background: copied === 'phone' ? 'var(--color-green-dim)' : 'var(--color-bg-alt)',
              border: `1px solid ${copied === 'phone' ? 'var(--color-green)' : 'var(--color-border)'}`,
              borderRadius: '10px',
              padding: '14px 16px',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              textAlign: 'left',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              background: 'var(--color-green-dim)',
              color: 'var(--color-green)',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}>
              📱
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1px' }}>
                {t('contact.phone')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                +972 54-332-8803
              </p>
            </div>
            <span style={{
              color: copied === 'phone' ? 'var(--color-green)' : 'var(--color-text-muted)',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              {copied === 'phone' ? '✓' : '⧉'}
            </span>
          </button>

          {/* WhatsApp - external link */}
          <a
            href="https://wa.me/972543328803"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '14px 16px',
              textDecoration: 'none',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span style={{
              background: 'var(--color-orange-dim)',
              color: 'var(--color-orange)',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}>
              💬
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1px' }}>
                {t('contact.whatsapp')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {t('contact.whatsappDesc')}
              </p>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', flexShrink: 0 }}>→</span>
          </a>

          {/* CV Downloads */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <a
              href="/Valery_Lavrov_CV.pdf"
              download
              style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '12px 14px',
                textDecoration: 'none',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <span style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>↓</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-navy)', margin: 0 }}>CV — PDF</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', margin: 0 }}>Download</p>
              </div>
            </a>
            <a
              href="/Valery_Lavrov_CV.docx"
              download
              style={{
                background: 'var(--color-bg-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '12px 14px',
                textDecoration: 'none',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <span style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0 }}>↓</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-navy)', margin: 0 }}>CV — Word</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', margin: 0 }}>Download</p>
              </div>
            </a>
          </div>

          {/* GitHub - external link */}
          <a
            href="https://github.com/ValeryKG"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '14px 16px',
              textDecoration: 'none',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <span style={{
              background: 'var(--color-purple-dim)',
              color: 'var(--color-purple)',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
            }}>
              💻
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '1px' }}>
                {t('contact.github')}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                github.com/ValeryKG
              </p>
            </div>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', flexShrink: 0 }}>→</span>
          </a>

        </div>
      </div>
    </>
  );
}

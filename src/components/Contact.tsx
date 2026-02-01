import { useTranslation } from 'react-i18next';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const options = [
    {
      href: 'mailto:valery.kg@gmail.com',
      icon: '✉',
      iconBg: 'var(--color-accent-dim)',
      iconColor: 'var(--color-accent)',
      hoverBorder: 'var(--color-accent)',
      titleKey: 'contact.email',
      descKey: 'contact.emailDesc',
    },
    {
      href: 'mailto:valery.kg@gmail.com?subject=Access%20Request',
      icon: '🔑',
      iconBg: 'var(--color-green-dim)',
      iconColor: 'var(--color-green)',
      hoverBorder: 'var(--color-green)',
      titleKey: 'contact.accessRequest',
      descKey: 'contact.accessRequestDesc',
    },
    {
      href: 'mailto:valery.kg@gmail.com?subject=Partnership',
      icon: '🤝',
      iconBg: 'var(--color-orange-dim)',
      iconColor: 'var(--color-orange)',
      hoverBorder: 'var(--color-orange)',
      titleKey: 'contact.partnership',
      descKey: 'contact.partnershipDesc',
    },
  ];

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
          {options.map((option) => (
            <a
              key={option.titleKey}
              href={option.href}
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
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = option.hoverBorder; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >
              <span style={{
                background: option.iconBg,
                color: option.iconColor,
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
              }}>
                {option.icon}
              </span>
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-navy)', marginBottom: '2px' }}>
                  {t(option.titleKey)}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {t(option.descKey)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

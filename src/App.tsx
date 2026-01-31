import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', padding: '40px' }}>
      <h1 style={{ fontWeight: 300, fontSize: '1.5rem', marginBottom: '24px' }}>
        {t('hero.title')}
      </h1>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => i18n.changeLanguage('en')}
          style={{ background: i18n.language === 'en' ? 'var(--color-accent)' : 'var(--color-surface)', color: i18n.language === 'en' ? '#0a0a0f' : 'var(--color-text)', border: '1px solid var(--color-border)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          EN
        </button>
        <button
          onClick={() => i18n.changeLanguage('he')}
          style={{ background: i18n.language === 'he' ? 'var(--color-accent)' : 'var(--color-surface)', color: i18n.language === 'he' ? '#0a0a0f' : 'var(--color-text)', border: '1px solid var(--color-border)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          HE
        </button>
      </div>
    </div>
  )
}
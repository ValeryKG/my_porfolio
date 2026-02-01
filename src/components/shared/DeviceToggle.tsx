import { useDeviceContext } from '../../context/DeviceContext';

export default function DeviceToggle() {
  const { device, isManualOverride, toggleDevice, resetToAuto } = useDeviceContext();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 300,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-end',
    }}>
      <button
        onClick={toggleDevice}
        style={{
          background: 'var(--color-navy)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <span style={{ fontSize: '1rem' }}>
          {device === 'desktop' ? '🖥️' : '📱'}
        </span>
        View {device === 'desktop' ? 'Mobile' : 'Desktop'}
      </button>

      {isManualOverride && (
        <button
          onClick={resetToAuto}
          style={{
            background: 'var(--color-bg)',
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '0.7rem',
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Reset to auto
        </button>
      )}
    </div>
  );
}

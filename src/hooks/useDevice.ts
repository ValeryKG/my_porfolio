import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'mobile';

const MOBILE_BREAKPOINT = 768;
const STORAGE_KEY = 'portfolio-device-preference';

export function useDevice() {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isManualOverride, setIsManualOverride] = useState(false);

  useEffect(() => {
    // Check localStorage for manual preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'desktop' || stored === 'mobile') {
      setDevice(stored);
      setIsManualOverride(true);
      return;
    }

    // Auto-detect based on screen width
    const detectDevice = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setDevice(isMobile ? 'mobile' : 'desktop');
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  const toggleDevice = () => {
    const newDevice = device === 'desktop' ? 'mobile' : 'desktop';
    setDevice(newDevice);
    setIsManualOverride(true);
    localStorage.setItem(STORAGE_KEY, newDevice);
  };

  const resetToAuto = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsManualOverride(false);
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setDevice(isMobile ? 'mobile' : 'desktop');
  };

  return {
    device,
    isMobile: device === 'mobile',
    isDesktop: device === 'desktop',
    isManualOverride,
    toggleDevice,
    resetToAuto,
  };
}

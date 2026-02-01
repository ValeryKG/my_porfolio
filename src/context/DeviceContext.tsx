import { createContext, useContext, type ReactNode } from 'react';
import { useDevice } from '../hooks/useDevice';

type DeviceContextType = ReturnType<typeof useDevice>;

const DeviceContext = createContext<DeviceContextType | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const deviceState = useDevice();
  return (
    <DeviceContext.Provider value={deviceState}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDeviceContext() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within DeviceProvider');
  }
  return context;
}

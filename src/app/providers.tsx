import { useEffect, type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return <BrowserRouter>{children}</BrowserRouter>;
}

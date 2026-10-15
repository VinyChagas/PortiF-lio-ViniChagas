import { createContext, useContext, useEffect } from 'react';

export const CaseReadyContext = createContext<(pathname: string) => void>(() => {});

/** A página avisa quando título e dados essenciais do case já podem aparecer. */
export function useSignalCaseReady(pathname: string, ready: boolean) {
  const signal = useContext(CaseReadyContext);

  useEffect(() => {
    if (ready) signal(pathname);
  }, [pathname, ready, signal]);
}

import type { ReactNode } from 'react';
import { CaseReadyContext } from '@/hooks/useSignalCaseReady';

export function CaseReadyProvider({
  signal,
  children,
}: {
  signal: (pathname: string) => void;
  children: ReactNode;
}) {
  return <CaseReadyContext.Provider value={signal}>{children}</CaseReadyContext.Provider>;
}

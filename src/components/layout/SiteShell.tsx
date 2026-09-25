import type { ReactNode } from 'react';
import { SkipToContent } from '@/components/common/SkipToContent';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipToContent />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

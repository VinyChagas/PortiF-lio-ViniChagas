import type { ReactNode } from 'react';
import { SkipToContent } from '@/components/common/SkipToContent';
import { Footer } from '@/components/layout/Footer';
import { NoiseTexture } from '@/components/visual/NoiseTexture';
import { ScrollProgress } from '@/components/visual/ScrollProgress';

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipToContent />
      <NoiseTexture />
      <ScrollProgress />
      {children}
      <Footer />
    </>
  );
}

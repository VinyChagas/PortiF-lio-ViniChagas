import { useState } from 'react';
import { ASSETS } from '@/lib/assets';
import { cn } from '@/lib/cn';

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={cn('text-sm font-semibold tracking-[0.2em] text-text-primary', className)}>
        VC
      </span>
    );
  }

  return (
    <img
      src={ASSETS.logo}
      alt="Vinicius Chagas"
      className={cn('w-auto', className ?? 'h-8 md:h-9')}
      onError={() => setFailed(true)}
    />
  );
}

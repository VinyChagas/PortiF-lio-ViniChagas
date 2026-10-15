import { useState } from 'react';
import { ASSETS } from '@/lib/assets';
import { cn } from '@/lib/cn';

type BrandLogoProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function BrandLogo({ className, alt = 'Vinicius Chagas', priority = false }: BrandLogoProps) {
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
      alt={alt}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn('w-auto object-contain', className ?? 'h-8')}
      onError={() => setFailed(true)}
    />
  );
}

import { cn } from '@/lib/cn';

type DiagonalAccentProps = {
  variant?: 'slash' | 'bar' | 'corner';
  className?: string;
};

export function DiagonalAccent({ variant = 'slash', className }: DiagonalAccentProps) {
  if (variant === 'bar') {
    return (
      <svg viewBox="0 0 168 52" aria-hidden="true" className={cn('fill-none', className)}>
        <path d="M22 40 L42 10 L158 10 L138 40 Z" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className={cn('fill-none', className)}>
        <path d="M4 28 V8 H28" stroke="currentColor" strokeWidth="1.25" />
        <path d="M44 68 H64 V48" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 88 176" aria-hidden="true" className={cn('fill-none', className)}>
      <path d="M52 6 L74 6 L30 170 L8 170 Z" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function MarkField({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 860 560" aria-hidden="true" className={cn('fill-none', className)}>
      <path d="M268 36 L352 36 L156 512 L72 512 Z" stroke="var(--brand-cyan)" strokeWidth="1.4" />
      <path d="M430 168 L512 78 L812 78 L730 168 Z" stroke="var(--brand-orange)" strokeWidth="1.4" />
      <path
        d="M456 236 L548 168 L690 292 L548 408 Z"
        stroke="white"
        strokeWidth="1.15"
        opacity="0.55"
      />
    </svg>
  );
}

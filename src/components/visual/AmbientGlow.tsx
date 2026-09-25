import { cn } from '@/lib/cn';

type AmbientGlowProps = {
  tone?: 'blue' | 'orange' | 'split';
  className?: string;
};

export function AmbientGlow({ tone = 'split', className }: AmbientGlowProps) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)}>
      {tone === 'blue' || tone === 'split' ? (
        <div className="glow-blue absolute -top-[18%] -left-[12%] h-[58%] w-[48%] bg-[radial-gradient(circle,var(--glow-blue),transparent_68%)] blur-3xl" />
      ) : null}
      {tone === 'orange' || tone === 'split' ? (
        <div className="glow-orange absolute -right-[14%] -bottom-[20%] h-[52%] w-[46%] bg-[radial-gradient(circle,var(--glow-orange),transparent_70%)] blur-3xl" />
      ) : null}
    </div>
  );
}

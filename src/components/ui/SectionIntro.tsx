import { cn } from '@/lib/cn';

type SectionIntroProps = {
  number: string;
  label: string;
  title?: string;
  description?: string;
  className?: string;
};

export function SectionIntro({ number, label, title, description, className }: SectionIntroProps) {
  return (
    <div className={cn('relative z-10 max-w-3xl', className)}>
      <p className="type-label font-mono font-medium tracking-[0.16em] text-text-secondary uppercase">
        <span className="text-text-primary">{number}</span>
        <span className="mx-3 text-white/35" aria-hidden="true">
          —
        </span>
        {label}
      </p>
      {title ? (
        <h2 className="mt-4 max-w-[18ch] text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[0.98] font-semibold tracking-[-0.04em] uppercase">
          {title}
        </h2>
      ) : (
        <h2 className="sr-only">{label}</h2>
      )}
      {description ? (
        <p className="type-body mt-4 max-w-xl text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}

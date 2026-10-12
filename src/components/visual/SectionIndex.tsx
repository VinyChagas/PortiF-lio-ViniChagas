import { cn } from '@/lib/cn';

type SectionIndexProps = {
  value: string;
  className?: string;
};

export function SectionIndex({ value, className }: SectionIndexProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -top-[0.18em] right-[-0.06em] z-0 select-none leading-none font-semibold tracking-[-0.08em] text-white/[0.04]',
        'text-[clamp(6.5rem,30vw,10rem)] lg:text-[clamp(10rem,22vw,22rem)]',
        className,
      )}
    >
      {value}
    </span>
  );
}

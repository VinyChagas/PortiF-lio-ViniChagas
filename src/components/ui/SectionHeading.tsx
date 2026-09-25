import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  index: string;
  label: string;
  title?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('relative z-10 max-w-3xl', className)}>
      <h2>
        <span className="block font-mono text-[0.68rem] font-medium tracking-[0.26em] text-text-muted uppercase">
          {index}
          <span className="mx-3 text-white/30" aria-hidden="true">
            —
          </span>
          {label}
        </span>
        {title ? (
          <span className="mt-4 block max-w-[16ch] text-[clamp(2.3rem,5vw,4.2rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-text-primary">
            {title}
          </span>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

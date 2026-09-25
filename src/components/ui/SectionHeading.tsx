import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? (
        <p className="mb-4 text-[0.72rem] font-medium tracking-[0.22em] text-text-muted uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.85rem,4vw,3rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-text-primary">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

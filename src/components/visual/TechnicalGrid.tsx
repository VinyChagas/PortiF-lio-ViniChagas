import { cn } from '@/lib/cn';

type TechnicalGridProps = {
  className?: string;
};

export function TechnicalGrid({ className }: TechnicalGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0',
        '[background-image:linear-gradient(to_right,rgb(255_255_255/0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.028)_1px,transparent_1px)]',
        '[background-size:4.75rem_4.75rem]',
        '[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]',
        className,
      )}
    />
  );
}

import type { SimpleIcon } from 'simple-icons';
import { cn } from '@/lib/cn';

type TechnologyIconProps = {
  icon?: SimpleIcon;
  className?: string;
};

export function TechnologyIcon({ icon, className }: TechnologyIconProps) {
  if (!icon) {
    return (
      <span className={cn('inline-flex h-5 w-5 items-center justify-center', className)} aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('h-5 w-5', className)}>
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

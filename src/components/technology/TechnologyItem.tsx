import type { CSSProperties } from 'react';
import { TechnologyIcon } from '@/components/technology/TechnologyIcon';
import { technologies, type TechnologyId } from '@/data/technologies';
import { cn } from '@/lib/cn';

type TechnologyItemProps = {
  id: TechnologyId;
  className?: string;
};

export function TechnologyItem({ id, className }: TechnologyItemProps) {
  const technology = technologies[id];
  const brand = technology.icon ? `#${technology.icon.hex}` : 'var(--brand-cyan)';

  return (
    <li
      className={cn(
        'group/tech relative flex items-center gap-3 py-1.5 text-text-muted transition-colors duration-300 hover:text-text-primary',
        className,
      )}
      style={{ '--tech': brand } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-2 -inset-y-0.5 opacity-0 blur-md transition-opacity duration-300 group-hover/tech:opacity-100"
        style={{
          background: 'radial-gradient(circle at 18% 50%, color-mix(in srgb, var(--tech) 45%, transparent), transparent 70%)',
        }}
      />
      <TechnologyIcon
        icon={technology.icon}
        className="relative text-text-muted transition-[color,transform] duration-300 group-hover/tech:translate-x-0.5 group-hover/tech:text-[color:var(--tech)]"
      />
      <span className="type-meta relative tracking-[-0.01em] transition-transform duration-300 group-hover/tech:translate-x-1">
        {technology.name}
      </span>
    </li>
  );
}

import type { CSSProperties } from 'react';
import { TechnologyIcon } from '@/components/technology/TechnologyIcon';
import { technologies, type TechnologyId } from '@/data/technologies';
import { cn } from '@/lib/cn';

type ProjectStackRowProps = {
  technologies: TechnologyId[];
  className?: string;
};

/** Stack compacta em chips técnicos — Soft Geometry discreto. */
export function ProjectStackRow({ technologies: ids, className }: ProjectStackRowProps) {
  if (ids.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {ids.map((id) => {
        const technology = technologies[id];
        const brand = technology.icon ? `#${technology.icon.hex}` : 'var(--brand-cyan)';

        return (
          <li
            key={id}
            className="surface-chip group/tech inline-flex items-center gap-2 px-2.5 py-1.5 text-text-muted transition-[color,border-color,background-color] duration-[var(--duration-soft)] hover:border-white/18 hover:bg-white/[0.04] hover:text-text-primary"
            style={{ '--tech': brand } as CSSProperties}
          >
            <TechnologyIcon
              icon={technology.icon}
              className="h-3.5 w-3.5 text-text-muted transition-colors duration-[var(--duration-soft)] group-hover/tech:text-[color:var(--tech)]"
            />
            <span className="type-meta tracking-[-0.01em]">{technology.name}</span>
          </li>
        );
      })}
    </ul>
  );
}

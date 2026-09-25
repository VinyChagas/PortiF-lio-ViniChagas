import { TechnologyIcon } from '@/components/technology/TechnologyIcon';
import { technologies, type TechnologyId } from '@/data/technologies';
import { cn } from '@/lib/cn';

type TechnologyItemProps = {
  id: TechnologyId;
  className?: string;
};

export function TechnologyItem({ id, className }: TechnologyItemProps) {
  const technology = technologies[id];

  return (
    <li
      className={cn(
        'group/tech relative flex items-center gap-3 py-2 text-text-muted transition-colors duration-500 hover:text-text-primary',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-sm opacity-0 blur-md transition-opacity duration-500 group-hover/tech:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, var(--glow-blue), transparent 70%), radial-gradient(circle at 80% 50%, var(--glow-orange), transparent 72%)',
        }}
      />
      <TechnologyIcon icon={technology.icon} className="relative" />
      <span className="relative text-sm tracking-[-0.01em] transition-transform duration-500 group-hover/tech:translate-x-0.5">
        {technology.name}
      </span>
    </li>
  );
}

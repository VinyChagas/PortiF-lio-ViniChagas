import { TechnologyItem } from '@/components/technology/TechnologyItem';
import type { TechnologyId } from '@/data/technologies';

type TechnologyGroupProps = {
  index: string;
  label: string;
  ids: TechnologyId[];
};

export function TechnologyGroup({ index, label, ids }: TechnologyGroupProps) {
  return (
    <section className="border-t border-white/10 py-8 md:py-10">
      <h3 className="font-mono text-[0.68rem] tracking-[0.22em] text-text-muted uppercase">
        <span className="text-text-secondary">{index}</span>
        <span className="mx-3 text-white/30" aria-hidden="true">
          —
        </span>
        {label}
      </h3>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4">
        {ids.map((id) => (
          <TechnologyItem key={id} id={id} />
        ))}
      </ul>
    </section>
  );
}

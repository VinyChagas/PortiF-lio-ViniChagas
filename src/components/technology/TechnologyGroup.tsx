import { TechnologyItem } from '@/components/technology/TechnologyItem';
import type { TechnologyId } from '@/data/technologies';

type TechnologyGroupProps = {
  index: string;
  label: string;
  ids: TechnologyId[];
};

export function TechnologyGroup({ index, label, ids }: TechnologyGroupProps) {
  return (
    <section className="relative flex h-full flex-col border border-white/10 bg-white/[0.02] p-5 md:p-6">
      <span aria-hidden="true" className="absolute top-0 left-0 h-7 w-px bg-brand-cyan/80" />
      <span aria-hidden="true" className="absolute top-0 left-0 h-px w-7 bg-brand-orange/80" />
      <h3 className="type-label min-h-[2.8em] font-mono tracking-[0.14em] text-text-secondary uppercase">
        <span className="text-text-muted">{index}</span>
        <span className="mx-2 text-white/30" aria-hidden="true">
          —
        </span>
        {label}
      </h3>
      <ul className="mt-4">
        {ids.map((id) => (
          <TechnologyItem key={id} id={id} />
        ))}
      </ul>
    </section>
  );
}

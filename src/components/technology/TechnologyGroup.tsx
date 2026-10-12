import { TechnologyItem } from '@/components/technology/TechnologyItem';
import type { TechnologyId } from '@/data/technologies';

type TechnologyGroupProps = {
  index: string;
  label: string;
  ids: TechnologyId[];
};

export function TechnologyGroup({ index, label, ids }: TechnologyGroupProps) {
  return (
    <section className="surface-soft relative flex h-full flex-col p-5 transition-[border-color,background-color,box-shadow] duration-[var(--duration-soft)] hover:border-white/16 hover:bg-white/[0.03] md:p-6">
      <span aria-hidden="true" className="absolute top-0 left-4 h-px w-8 bg-brand-orange/70 md:left-5" />
      <span aria-hidden="true" className="absolute top-0 left-0 h-8 w-px bg-brand-cyan/70" />
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

import { Link } from 'react-router-dom';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';

type ProjectArchiveCtaProps = {
  count: number;
};

export function ProjectArchiveCta({ count }: ProjectArchiveCtaProps) {
  return (
    <Link
      to="/projetos"
      className="group relative mt-6 block overflow-hidden border border-white/10 bg-white/[0.02] px-6 py-10 md:mt-8 md:px-10 md:py-12"
    >
      <TechnicalGrid className="opacity-40" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(40% 80% at 12% 70%, var(--glow-blue), transparent 70%), radial-gradient(36% 80% at 92% 30%, var(--glow-orange), transparent 72%)',
        }}
      />
      <span aria-hidden="true" className="absolute top-0 left-0 h-10 w-px bg-brand-cyan/80" />
      <span aria-hidden="true" className="absolute right-0 bottom-0 h-px w-16 bg-brand-orange/80" />

      <div className="relative grid items-end gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12">
        <div>
          <p className="text-[clamp(4.5rem,11vw,8rem)] leading-none font-semibold tracking-[-0.06em] text-text-primary transition-[filter] duration-500 group-hover:drop-shadow-[0_0_22px_var(--glow-blue)]">
            {count}
          </p>
          <p className="type-label mt-3 font-mono tracking-[0.16em] text-text-secondary uppercase">
            Projetos no arquivo
          </p>
          <p className="type-body mt-4 max-w-md text-text-secondary">
            Software, automação, inteligência artificial, infraestrutura e experimentos.
          </p>
        </div>
        <p className="type-label font-mono tracking-[0.14em] text-text-primary uppercase md:text-right">
          <span className="block transition-transform duration-500 group-hover:translate-x-1">Explorar</span>
          <span className="mt-1 block transition-transform duration-500 group-hover:translate-x-1.5">
            todos os projetos
          </span>
          <span className="mt-5 inline-flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-16 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-28"
            />
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </span>
        </p>
      </div>
    </Link>
  );
}

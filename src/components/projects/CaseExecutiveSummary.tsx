import { cn } from '@/lib/cn';
import { executiveExcerpt, resolveSummary } from '@/lib/project-case';
import type { PortfolioProject } from '@/types/project';

type CaseExecutiveSummaryProps = {
  project: PortfolioProject;
  className?: string;
};

const blocks = [
  { key: 'problem' as const, index: '01', label: 'O desafio', tone: 'text-brand-orange' },
  { key: 'solution' as const, index: '02', label: 'A solução', tone: 'text-brand-cyan' },
  { key: 'result' as const, index: '03', label: 'O resultado', tone: 'text-text-secondary' },
];

/**
 * Resumo executivo curto — campos estruturados, sem inventar conteúdo.
 */
export function CaseExecutiveSummary({ project, className }: CaseExecutiveSummaryProps) {
  const summary = resolveSummary(project);
  const items = blocks
    .map((block) => ({
      ...block,
      text: executiveExcerpt(summary[block.key]),
    }))
    .filter((item) => item.text);

  if (!items.length) return null;

  return (
    <section
      className={cn('border-t border-white/10 pt-10', className)}
      aria-labelledby="case-executive-title"
      data-case-executive="true"
    >
      <p
        id="case-executive-title"
        className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase"
      >
        Resumo executivo
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
        Desafio, solução e resultado em leitura rápida.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.key} className="surface-panel border-white/10 px-4 py-5 md:px-5">
            <p className={cn('type-label font-mono tracking-[0.14em] uppercase', item.tone)}>
              <span className="text-text-muted">{item.index}</span>
              <span className="mx-2 text-white/25">—</span>
              {item.label}
            </p>
            <p className="type-body mt-4 text-text-secondary">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

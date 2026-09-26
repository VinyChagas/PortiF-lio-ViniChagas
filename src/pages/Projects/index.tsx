import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteShell } from '@/components/layout/SiteShell';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { TechnologyIcon } from '@/components/technology/TechnologyIcon';
import { Container } from '@/components/ui/Container';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { categoryLabel, projectCategories } from '@/data/projects/categories';
import { projects } from '@/data/projects';
import { technologyName, technologies } from '@/data/technologies';
import { usePageMeta } from '@/hooks/usePageMeta';
import { cn } from '@/lib/cn';
import { normalizeSearch } from '@/lib/search';
import type { ProjectCategory } from '@/types/project';

export function ProjectsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProjectCategory | 'todos'>('todos');

  usePageMeta(
    'Projetos | Vinicius Chagas',
    'Arquivo de projetos de software, automação, inteligência artificial e infraestrutura de Vinicius Chagas.',
  );

  const visible = useMemo(() => {
    const term = normalizeSearch(query.trim());

    return projects.filter((project) => {
      if (category !== 'todos' && !project.categories.includes(category)) return false;
      if (!term) return true;

      const haystack = normalizeSearch(
        [
          project.title,
          project.shortDescription ?? '',
          project.context.label,
          project.context.organization ?? '',
          project.context.domain ?? '',
          ...(project.agents?.map((agent) => `${agent.name} ${agent.environment ?? ''}`) ?? []),
          ...project.categories.map((item) => categoryLabel(item)),
          ...project.technologies.map((id) => technologyName(id)),
        ].join(' '),
      );

      return haystack.includes(term);
    });
  }, [category, query]);

  return (
    <SiteShell>
      <main id="conteudo" className="relative overflow-clip pt-28 pb-24 md:pt-32">
        <TechnicalGrid className="opacity-60" />
        <AmbientGlow tone="split" className="opacity-50" />
        <SectionIndex value="04" className="top-24" />

        <Container className="relative">
          <Link
            to="/"
            state={{ transition: 'home' }}
            className="inline-flex min-h-11 items-center gap-3 font-mono type-label tracking-[0.14em] text-text-primary uppercase"
          >
            <span aria-hidden="true">←</span>
            Voltar ao portfólio
          </Link>
          <p className="type-label mt-8 font-mono tracking-[0.16em] text-text-secondary uppercase">
            <span className="text-text-secondary">Arquivo</span>
            <span className="mx-3 text-white/30" aria-hidden="true">
              —
            </span>
            Projetos
          </p>
          <h1 className="mt-6 max-w-[12ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.88] font-semibold tracking-[-0.05em] uppercase">
            Arquivo de projetos
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            {projects.length} projetos. Software, automação, inteligência artificial e infraestrutura
            construídos a partir de problemas reais.
          </p>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-6">
            <div>
              <label
                htmlFor="busca-projetos"
                className="block font-mono type-meta tracking-[0.18em] text-text-muted uppercase"
              >
                Busca
              </label>
              <input
                id="busca-projetos"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome, tecnologia ou contexto"
                className="mt-2 block w-full max-w-md border-b border-white/15 bg-transparent py-2 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-brand-cyan"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
              {projectCategories.map((item) => {
                const selected = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item.id)}
                    className={cn(
                      'min-h-10 border px-3 font-mono type-meta tracking-[0.14em] uppercase transition-colors duration-500',
                      selected
                        ? 'border-brand-cyan/70 text-text-primary'
                        : 'border-white/10 text-text-muted hover:border-white/25 hover:text-text-secondary',
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono type-meta tracking-[0.14em] text-text-muted uppercase" aria-live="polite">
              {String(visible.length).padStart(2, '0')} em vista
            </p>
          </div>

          <ul className="mt-4 border-t border-white/10">
            {visible.map((project) => {
              const number = String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0');

              return (
                <li key={project.id}>
                  <Link
                    to={`/projetos/${project.slug}`}
                    className="group relative block border-b border-white/10 py-6 md:py-7"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(40% 80% at 12% 50%, var(--glow-blue), transparent 70%), radial-gradient(30% 80% at 90% 50%, var(--glow-orange), transparent 72%)',
                      }}
                    />
                    <DiagonalAccent
                      variant="bar"
                      className="pointer-events-none absolute top-1/2 right-0 h-5 w-16 -translate-y-1/2 text-brand-orange opacity-0 transition-opacity duration-500 group-hover:opacity-80"
                    />

                    <div className="relative grid gap-3 md:grid-cols-12 md:items-center md:gap-6">
                      <p className="font-mono type-label tracking-[0.16em] text-text-muted md:col-span-1">
                        {number}
                      </p>
                      <div className="md:col-span-5">
                        <h2 className="text-xl leading-tight font-semibold tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-1 md:text-2xl">
                          {project.title}
                        </h2>
                        <p className="mt-1 font-mono type-meta tracking-[0.14em] text-text-muted uppercase">
                          {project.context.label}
                        </p>
                      </div>
                      <p className="font-mono type-meta tracking-[0.12em] text-text-muted uppercase md:col-span-3">
                        {project.categories.map((item) => categoryLabel(item)).join(' · ')}
                      </p>
                      <div className="md:col-span-3 md:text-right">
                        <ProjectStatus status={project.status} className="md:justify-end" />
                        {project.technologies.length > 0 ? (
                          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 md:justify-end md:opacity-70 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                            {project.technologies.slice(0, 4).map((id) => (
                              <li
                                key={id}
                                className="inline-flex items-center gap-1.5 font-mono type-meta tracking-[0.08em] text-text-muted uppercase"
                              >
                                <TechnologyIcon icon={technologies[id].icon} className="h-3.5 w-3.5" />
                                {technologyName(id)}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {visible.length === 0 ? (
            <p className="py-16 text-sm text-text-muted">Nenhum projeto com esse recorte.</p>
          ) : null}
        </Container>
      </main>
    </SiteShell>
  );
}

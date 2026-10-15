import { useEffect, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { InlineMarkdown } from '@/components/markdown';
import { ProjectArchiveCta } from '@/components/projects/ProjectArchiveCta';
import { Container } from '@/components/ui/Container';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { ProjectVisual } from '@/components/visual/ProjectVisual';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { projectStatusLabel } from '@/data/projects/status';
import { technologyName } from '@/data/technologies';
import { usePortfolioProjects } from '@/hooks/usePortfolioProjects';
import { featuredCounterLabel } from '@/lib/featured-counter';
import { publicProjectImages } from '@/lib/project-media';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import type { PortfolioProject } from '@/types/project';

function ProjectShowcase({
  project,
  index,
  reversed,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  reversed: boolean;
  onOpen: (slug: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const lines = project.displayLines ?? [project.title, ''];
  const caseCode = String(index + 1).padStart(2, '0');
  const cover = publicProjectImages(project)[0];
  const ariaLabel = `Ver case completo ${project.title}`;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--px', `${x * 14}px`);
    event.currentTarget.style.setProperty('--py', `${y * 10}px`);
  };

  const open = () => onOpen(project.slug);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  };

  return (
    <article
      id={project.slug}
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={open}
      onKeyDown={onKeyDown}
      onPointerMove={onPointerMove}
      className={cn(
        'group/card relative cursor-pointer outline-none py-2 lg:py-3',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.02]',
          'px-5 py-6 shadow-[var(--shadow-surface)] md:px-8 md:py-8 lg:px-9',
          'transition-[transform,border-color,background-color,box-shadow] duration-[var(--duration-soft)] ease-[var(--ease-out)]',
          'group-hover/card:-translate-y-1 group-hover/card:border-white/18 group-hover/card:bg-white/[0.035] group-hover/card:shadow-[var(--shadow-elevated)]',
          'group-focus-visible/card:border-white/20',
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-[var(--duration-soft)] group-hover/card:opacity-100"
          style={{
            transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)',
            background:
              project.accent === 'orange'
                ? 'radial-gradient(42% 48% at 78% 58%, var(--glow-orange), transparent 70%)'
                : 'radial-gradient(42% 48% at 22% 46%, var(--glow-blue), transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[var(--duration-soft)] group-hover/card:opacity-100"
          style={{
            boxShadow:
              project.accent === 'orange'
                ? 'inset -1px 0 0 rgb(255 90 31 / 28%), inset 0 1px 0 rgb(255 255 255 / 6%)'
                : 'inset 1px 0 0 rgb(62 200 242 / 28%), inset 0 1px 0 rgb(255 255 255 / 6%)',
          }}
        />

        <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className={cn('relative z-10 min-w-0', reversed && 'lg:col-start-2')}>
            <p className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
              {caseCode} / Estudo de caso
            </p>
            <p className="type-meta mt-2.5 font-mono tracking-[0.12em] text-text-muted uppercase">
              {project.context.label}
            </p>
            <h3 className="type-case-title mt-3 max-w-[18ch] wrap-break-word hyphens-auto">
              <span className="block uppercase">{lines[0]}</span>
              {lines[1] ? <span className="block text-balance">{lines[1]}</span> : null}
            </h3>
            {project.shortDescription ? (
              <InlineMarkdown
                as="p"
                className="mt-4 max-w-md text-base leading-relaxed text-text-secondary md:text-[1.05rem]"
               source={project.shortDescription} />
            ) : null}
            {project.business?.headline && !project.agents?.length ? (
              <InlineMarkdown
                as="p"
                className="mt-2.5 max-w-md text-sm leading-relaxed text-text-muted md:text-base"
               source={project.business.headline} />
            ) : null}
            {project.agents?.length ? (
              <p className="type-label mt-5 font-mono tracking-[0.14em] text-text-primary uppercase">
                {project.agents.map((agent) => agent.environment ?? agent.name).join('  ·  ')}
              </p>
            ) : null}
            <p
              className={cn(
                'type-label font-mono tracking-[0.14em] uppercase',
                project.agents?.length ? 'mt-2.5' : 'mt-5',
              )}
            >
              <span className="text-brand-orange">{project.agents?.length ? 'IA' : 'Negócio'}</span>
              <span className="mx-2 text-white/35">+</span>
              <span className="text-brand-cyan">Engenharia</span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="inline-flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] border border-white/16 bg-white/[0.03] px-4 py-2.5 text-text-primary transition-[border-color,background-color,transform] duration-[var(--duration-soft)] group-hover/card:border-white/28 group-hover/card:bg-white/[0.06]">
                <span className="type-label font-mono tracking-[0.12em] uppercase">
                  Ver case completo
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[var(--duration-soft)] group-hover/card:translate-x-1"
                >
                  →
                </span>
              </span>
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                  className="relative z-20 text-sm text-text-secondary transition-colors duration-500 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan"
                >
                  Repositório
                </a>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              'relative min-w-0 transition-transform duration-[var(--duration-soft)] group-hover/card:scale-[1.01]',
              reversed && 'lg:col-start-1 lg:row-start-1',
            )}
          >
            <ProjectVisual
              accent={project.accent}
              index={index}
              title={lines[1] || lines[0]}
              status={projectStatusLabel(project.status)}
              technologies={project.technologies.map((id) => technologyName(id))}
              cover={cover?.src}
              coverAlt={cover?.alt}
              agents={project.agents}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedProjects() {
  const navigate = useNavigate();
  const [activeCase, setActiveCase] = useState(0);
  const [params] = useSearchParams();
  const { projects, featured: featuredProjects } = usePortfolioProjects();
  const counter = featuredCounterLabel(activeCase, featuredProjects.length, projects.length);

  /** Compatibilidade: ?project=slug antigo abre o case completo. */
  useEffect(() => {
    const openSlug = params.get('project');
    if (!openSlug) return;
    navigate(`/projetos/${openSlug}`, { replace: true });
  }, [navigate, params]);

  const openCase = (slug: string) => {
    navigate(`/projetos/${slug}`);
  };

  useEffect(() => {
    const nodes = featuredProjects
      .map((project) => document.getElementById(project.slug))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = featuredProjects.findIndex((project) => project.slug === visible?.target.id);
        if (next >= 0) setActiveCase(next);
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0.15, 0.4, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [featuredProjects]);

  return (
    <section id="projetos" className="relative scroll-mt-24 overflow-x-clip">
      <TechnicalGrid className="opacity-70" />
      <SectionIndex value="04" className="top-6" />

      <div className="relative z-20 border-b border-white/[0.06] bg-background/55 backdrop-blur-md lg:sticky lg:top-14">
        <Container className="flex min-h-14 items-center justify-between gap-4">
          <h2 className="type-label font-mono font-medium tracking-[0.16em] text-text-secondary uppercase">
            04 — Projetos
          </h2>
          <p className="type-label font-mono tracking-[0.14em] text-text-muted" aria-live="polite">
            {counter.label}
          </p>
        </Container>
      </div>

      <Container className="relative pt-7 pb-5 lg:pt-5">
        <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          {featuredProjects.length === 1
            ? 'Um estudo em destaque, escolhido para mostrar alcance.'
            : `${featuredProjects.length} estudos em destaque, escolhidos para mostrar alcance.`}{' '}
          O arquivo guarda o conjunto.
        </p>

        <div className="relative mt-3 lg:mt-0">
          {featuredProjects.map((project, index) => (
            <div key={project.id}>
              {index > 0 ? (
                <div aria-hidden="true" className="flex justify-center py-1">
                  <DiagonalAccent variant="bar" className="h-6 w-24 text-white/25" />
                </div>
              ) : null}
              <ProjectShowcase
                project={project}
                index={index}
                reversed={index % 2 === 1}
                onOpen={openCase}
              />
            </div>
          ))}
        </div>

        <ProjectArchiveCta
          publishedCount={projects.length}
          featuredCount={featuredProjects.length}
        />
      </Container>
    </section>
  );
}

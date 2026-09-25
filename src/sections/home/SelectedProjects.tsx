import { useEffect, useState, type PointerEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProjectArchiveCta } from '@/components/projects/ProjectArchiveCta';
import { ProjectQuickView } from '@/components/projects/ProjectQuickView';
import { Container } from '@/components/ui/Container';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { ProjectVisual } from '@/components/visual/ProjectVisual';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { featuredProjects, getProjectBySlug, projects } from '@/data/projects';
import { projectStatusLabel } from '@/data/projects/status';
import { technologyName } from '@/data/technologies';
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

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--px', `${x * 14}px`);
    event.currentTarget.style.setProperty('--py', `${y * 10}px`);
  };

  return (
    <article
      id={project.slug}
      className="relative flex flex-col justify-center py-8 lg:py-10"
      onPointerMove={onPointerMove}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          transform: 'translate3d(var(--px, 0px), var(--py, 0px), 0)',
          background:
            project.accent === 'orange'
              ? 'radial-gradient(42% 48% at 78% 58%, var(--glow-orange), transparent 70%)'
              : 'radial-gradient(42% 48% at 22% 46%, var(--glow-blue), transparent 70%)',
        }}
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className={cn('relative z-10', reversed && 'lg:col-start-2')}>
          <p className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
            {caseCode} / Estudo de caso
          </p>
          <p className="type-meta mt-3 font-mono tracking-[0.12em] text-text-muted uppercase">
            {project.context.label}
          </p>
          <h3 className="mt-4 text-[clamp(3rem,7vw,6.4rem)] leading-[0.84] font-semibold tracking-[-0.055em]">
            <span className="block uppercase">{lines[0]}</span>
            {lines[1] ? <span className="block">{lines[1]}</span> : null}
          </h3>
          {project.shortDescription ? (
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
              {project.shortDescription}
            </p>
          ) : null}
          {project.business?.headline && !project.agents?.length ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
              {project.business.headline}
            </p>
          ) : null}
          {project.agents?.length ? (
            <p className="type-label mt-6 font-mono tracking-[0.14em] text-text-primary uppercase">
              {project.agents.map((agent) => agent.name).join(' + ')}
            </p>
          ) : null}
          <p
            className={cn(
              'type-label font-mono tracking-[0.14em] uppercase',
              project.agents?.length ? 'mt-3' : 'mt-6',
            )}
          >
            <span className="text-brand-orange">{project.agents?.length ? 'IA' : 'Negócio'}</span>
            <span className="mx-2 text-white/35">+</span>
            <span className="text-brand-cyan">Engenharia</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <button
              type="button"
              onClick={() => onOpen(project.slug)}
              className="group inline-flex items-center gap-4 text-base text-text-primary"
            >
              <span>Explorar projeto</span>
              <span
                aria-hidden="true"
                className="h-px w-12 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-20"
              />
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </button>
            {project.repository ? (
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-secondary transition-colors duration-500 hover:text-text-primary"
              >
                Repositório
              </a>
            ) : null}
          </div>
        </div>

        <div className={cn('relative', reversed && 'lg:col-start-1 lg:row-start-1')}>
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
    </article>
  );
}

export function SelectedProjects() {
  const [activeCase, setActiveCase] = useState(0);
  const [params, setParams] = useSearchParams();
  const openSlug = params.get('project');
  const openProject = openSlug ? getProjectBySlug(openSlug) : undefined;

  const openQuickView = (slug: string) => {
    const next = new URLSearchParams(params);
    next.set('project', slug);
    setParams(next, { replace: true });
  };

  const closeQuickView = () => {
    const next = new URLSearchParams(params);
    next.delete('project');
    setParams(next, { replace: true });
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
  }, []);

  return (
    <section id="projetos" className="relative scroll-mt-24 overflow-x-clip">
      <TechnicalGrid className="opacity-70" />
      <SectionIndex value="04" className="top-6" />

      <div className="relative z-20 border-b border-white/[0.06] bg-background/55 backdrop-blur-md lg:sticky lg:top-14">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <h2 className="type-label font-mono font-medium tracking-[0.16em] text-text-secondary uppercase">
            04 — Projetos
          </h2>
          <p className="type-label font-mono tracking-[0.14em] text-text-muted">
            {String(activeCase + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
          </p>
        </Container>
      </div>

      <Container className="relative pt-8 pb-6 lg:pt-6">
        <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          {featuredProjects.length === 1
            ? 'Um estudo em destaque, escolhido para mostrar alcance.'
            : `${featuredProjects.length} estudos em destaque, escolhidos para mostrar alcance.`}{' '}
          O arquivo guarda o conjunto.
        </p>

        <div className="relative mt-4 lg:mt-0">
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
                onOpen={openQuickView}
              />
            </div>
          ))}
        </div>

        <ProjectArchiveCta count={projects.length} />
      </Container>
      <ProjectQuickView project={openProject} onClose={closeQuickView} />
    </section>
  );
}

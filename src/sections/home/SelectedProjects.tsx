import { Link } from 'react-router-dom';
import { useEffect, useState, type PointerEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { ProjectVisual } from '@/components/visual/ProjectVisual';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { featuredProjects, projects } from '@/data/projects';
import { projectStatusLabel } from '@/data/projects/status';
import { technologyName } from '@/data/technologies';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import type { PortfolioProject } from '@/types/project';

function ProjectShowcase({
  project,
  index,
  reversed,
}: {
  project: PortfolioProject;
  index: number;
  reversed: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const lines = project.displayLines ?? [project.title, ''];
  const caseCode = String(index + 1).padStart(2, '0');

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
      className="relative flex flex-col justify-center py-8 lg:min-h-[72vh] lg:py-10"
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
          <p className="font-mono text-[0.68rem] tracking-[0.22em] text-text-muted uppercase">
            {caseCode} / Estudo de caso
          </p>
          <p className="mt-3 font-mono text-[0.62rem] tracking-[0.16em] text-text-muted uppercase">
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
          {project.business?.headline ? (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
              {project.business.headline}
            </p>
          ) : null}
          <p className="mt-6 font-mono text-[0.66rem] tracking-[0.18em] uppercase">
            <span className="text-brand-orange">Negócio</span>
            <span className="mx-2 text-white/35">+</span>
            <span className="text-brand-cyan">Engenharia</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              to={`/projetos/${project.slug}`}
              className="group inline-flex items-center gap-4 text-sm text-text-primary"
            >
              <span>Explorar projeto</span>
              <span
                aria-hidden="true"
                className="h-px w-12 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-20"
              />
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
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
          />
        </div>
      </div>
    </article>
  );
}

export function SelectedProjects() {
  const [activeCase, setActiveCase] = useState(0);

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
        <Container className="flex h-12 items-center justify-between">
          <h2 className="font-mono text-[0.66rem] font-medium tracking-[0.22em] text-text-muted uppercase">
            04 — Projetos
          </h2>
          <p className="font-mono text-[0.66rem] tracking-[0.18em] text-text-muted">
            {String(activeCase + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
          </p>
        </Container>
      </div>

      <Container className="relative pt-8 pb-6 lg:pt-6">
        <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          Cinco estudos em destaque, escolhidos para mostrar alcance. O arquivo guarda o conjunto.
        </p>

        <div className="relative mt-4 lg:mt-0">
          {featuredProjects.map((project, index) => (
            <div key={project.id}>
              {index > 0 ? (
                <div aria-hidden="true" className="flex justify-center py-1">
                  <DiagonalAccent variant="bar" className="h-6 w-24 text-white/25" />
                </div>
              ) : null}
              <ProjectShowcase project={project} index={index} reversed={index % 2 === 1} />
            </div>
          ))}
        </div>

        <div className="relative mt-2 border-t border-white/10 pt-8 pb-4 lg:pt-10">
          <Link
            to="/projetos"
            className="group inline-flex items-center gap-4 text-base text-text-primary"
          >
            <span>Explorar todos os projetos</span>
            <span
              aria-hidden="true"
              className="h-px w-16 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-28"
            />
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <p className="mt-3 font-mono text-[0.62rem] tracking-[0.16em] text-text-muted uppercase">
            {String(projects.length).padStart(2, '0')} no arquivo
          </p>
        </div>
      </Container>
    </section>
  );
}

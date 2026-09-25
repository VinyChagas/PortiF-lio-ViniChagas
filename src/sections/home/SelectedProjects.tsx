import { useEffect, useState, type PointerEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { ProjectVisual } from '@/components/visual/ProjectVisual';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { featuredProjects } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import type { PortfolioProject } from '@/types/project';

const displayLines: Record<string, [string, string]> = {
  'automacao-nfse': ['Automação', 'NFSe'],
  baixarras: ['Baixar', 'RAs'],
};

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
  const lines = displayLines[project.id] ?? [project.title, ''];
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
      className="relative flex flex-col justify-center py-16 lg:min-h-[88svh] lg:py-24"
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

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={cn('relative z-10', reversed && 'lg:col-start-2')}>
          <p className="font-mono text-[0.68rem] tracking-[0.22em] text-text-muted uppercase">
            {caseCode} / Estudo de caso
          </p>
          <h3 className="mt-5 text-[clamp(3rem,7vw,6.4rem)] leading-[0.84] font-semibold tracking-[-0.055em]">
            <span className="block uppercase">{lines[0]}</span>
            {lines[1] ? <span className="block">{lines[1]}</span> : null}
          </h3>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
            {project.shortDescription}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted md:text-base">
            {project.business.headline}
          </p>
          <p className="mt-8 font-mono text-[0.66rem] tracking-[0.18em] uppercase">
            <span className="text-brand-orange">Negócio</span>
            <span className="mx-2 text-white/35">+</span>
            <span className="text-brand-cyan">Engenharia</span>
          </p>

          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-4 text-sm text-text-primary"
            >
              <span>Repositório</span>
              <span
                aria-hidden="true"
                className="h-px w-16 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-28"
              />
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          ) : (
            <div aria-hidden="true" className="mt-8 flex items-center gap-4">
              <span className="h-px w-28 bg-linear-to-r from-brand-orange/80 to-transparent" />
            </div>
          )}
        </div>

        <div className={cn('relative', reversed && 'lg:col-start-1 lg:row-start-1')}>
          <ProjectVisual
            accent={project.accent}
            index={index}
            title={lines[1] || lines[0]}
            status={project.status}
            technologies={project.technical.technologies}
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
      <SectionIndex value="03" className="top-6" />

      <div className="relative z-20 border-b border-white/[0.06] bg-background/55 backdrop-blur-md lg:sticky lg:top-14">
        <Container className="flex h-12 items-center justify-between">
          <h2 className="font-mono text-[0.66rem] font-medium tracking-[0.22em] text-text-muted uppercase">
            03 — Projetos
          </h2>
          <p className="font-mono text-[0.66rem] tracking-[0.18em] text-text-muted">
            {String(activeCase + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
          </p>
        </Container>
      </div>

      <Container className="relative pt-10 pb-8 lg:pt-8">
        <p className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          Cases construídos a partir de problemas reais. A visão de negócio e a visão técnica entram
          na próxima etapa.
        </p>

        <div className="relative mt-6 lg:mt-0">
          {featuredProjects.map((project, index) => (
            <div key={project.id}>
              {index > 0 ? (
                <div aria-hidden="true" className="flex justify-center py-2">
                  <DiagonalAccent variant="bar" className="h-7 w-28 text-white/25" />
                </div>
              ) : null}
              <ProjectShowcase project={project} index={index} reversed={index % 2 === 1} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

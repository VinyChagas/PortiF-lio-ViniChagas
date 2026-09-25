import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { featuredProjects } from '@/data/projects';
import { cn } from '@/lib/cn';

const accentMap = {
  blue: 'from-brand-cyan/70 to-transparent',
  orange: 'from-brand-orange/70 to-transparent',
};

export function SelectedProjects() {
  return (
    <section id="projetos" className="relative py-[var(--space-section)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Seleção"
            title="Projetos selecionados"
            description="Cases construídos a partir de problemas reais. A visão de negócio e a visão técnica entram na próxima etapa."
          />
        </Reveal>

        <div className="mt-16 space-y-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <article
                className={cn(
                  'group relative overflow-hidden rounded-md border border-white/6 bg-background-soft/80 px-6 py-8 transition-all duration-500',
                  'hover:-translate-y-0.5 hover:border-white/12 hover:bg-surface/80',
                  'md:px-10 md:py-12',
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-y-0 left-0 w-px bg-linear-to-b',
                    accentMap[project.accent],
                  )}
                />

                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-[0.72rem] tracking-[0.2em] text-text-muted uppercase">
                      0{index + 1} / Case
                    </p>
                    <h3 className="mt-4 text-[clamp(1.7rem,3vw,2.4rem)] leading-tight font-semibold tracking-[-0.03em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                      {project.shortDescription}
                    </p>
                    <p className="mt-6 max-w-xl text-sm leading-relaxed text-text-muted">
                      {project.business.headline}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs tracking-[0.12em] text-text-muted uppercase">
                    {project.technical.technologies.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

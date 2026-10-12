import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AgentCaseContent } from '@/components/projects/AgentCaseContent';
import { ProjectStackRow } from '@/components/projects/ProjectStackRow';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { featuredProjects, projects } from '@/data/projects';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { publicProjectVideos } from '@/lib/project-media';
import { hasExecutiveSummary, resolveSummary } from '@/lib/project-case';
import { easeOutExpo, motionDuration } from '@/lib/motion';
import type { PortfolioProject } from '@/types/project';

type ProjectQuickViewProps = {
  project?: PortfolioProject;
  onClose: () => void;
};

const summaryBlocks = [
  { key: 'problem', index: '01', label: 'Problema', tone: 'text-brand-orange' },
  { key: 'solution', index: '02', label: 'Solução', tone: 'text-brand-cyan' },
  { key: 'result', index: '03', label: 'Resultado', tone: 'text-text-secondary' },
] as const;

export function ProjectQuickView({ project, onClose }: ProjectQuickViewProps) {
  const reduced = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const videos = project ? publicProjectVideos(project) : [];
  const featuredIndex = project ? featuredProjects.findIndex((item) => item.id === project.id) : -1;
  const caseIndex = project
    ? featuredIndex >= 0
      ? featuredIndex
      : projects.findIndex((item) => item.id === project.id)
    : 0;
  const summary = project ? resolveSummary(project) : undefined;
  const isAgentCase = Boolean(project?.agents?.length);

  useFocusTrap(Boolean(project), dialogRef);
  useScrollLock(Boolean(project));

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, project]);

  const transition = reduced
    ? { duration: 0 }
    : { duration: motionDuration.micro, ease: easeOutExpo };

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          tabIndex={-1}
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] outline-none md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Fechar resumo do case"
            className="absolute inset-0 bg-black/72"
            onClick={onClose}
          />
          <motion.div
            className="surface-float relative z-10 flex w-full max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-0.75rem)] flex-col overflow-hidden md:w-[min(88vw,52rem)] md:max-h-[min(90dvh,54rem)]"
            initial={reduced ? false : { y: 16, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { y: 10, opacity: 0, scale: 0.99 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, ease: easeOutExpo }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                background:
                  'radial-gradient(42% 36% at 8% 0%, rgb(62 200 242 / 12%), transparent 55%), radial-gradient(38% 34% at 96% 100%, rgb(255 90 31 / 12%), transparent 55%)',
              }}
            />
            <div className="relative flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-8">
              <p className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
                Case / {String(caseIndex + 1).padStart(3, '0')}
              </p>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="type-label min-h-11 rounded-[var(--radius-sm)] px-3 font-mono tracking-[0.14em] text-text-primary uppercase transition-colors duration-[var(--duration-soft)] hover:bg-white/[0.04]"
              >
                Fechar
              </button>
            </div>

            <div className="relative min-h-0 overflow-y-auto overscroll-contain">
              <div className="px-5 py-6 md:px-8 md:py-8">
                <p className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">
                  {project.context.label}
                </p>
                <h2
                  id="quick-view-title"
                  className="mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
                >
                  {project.title}
                </h2>
                <div className="mt-4">
                  <ProjectStatus status={project.status} />
                </div>

                {project.technologies.length > 0 ? (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <ProjectStackRow technologies={project.technologies} />
                  </div>
                ) : null}

                {isAgentCase ? (
                  <div className="mt-8">
                    <AgentCaseContent project={project} />
                  </div>
                ) : null}

                {!isAgentCase && summary && hasExecutiveSummary(project) ? (
                  <div className="mt-8 space-y-6">
                    {summaryBlocks.map((block) => {
                      const value = summary[block.key];
                      if (!value) return null;
                      return (
                        <section key={block.key}>
                          <h3
                            className={`type-label font-mono tracking-[0.14em] uppercase ${block.tone}`}
                          >
                            <span className="text-text-muted">{block.index}</span>
                            <span className="mx-2 text-white/25">—</span>
                            {block.label}
                          </h3>
                          <p className="type-body mt-2 text-text-secondary">{value}</p>
                        </section>
                      );
                    })}

                    {summary.metrics && summary.metrics.length > 0 ? (
                      <section className="border-t border-white/10 pt-5">
                        <h3 className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
                          Métricas
                        </h3>
                        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                          {summary.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="surface-panel border-l-0 px-3 py-3 shadow-[inset_2px_0_0_rgb(255_255_255_/_0.12)]"
                            >
                              <dt className="type-meta font-mono tracking-[0.08em] text-text-muted uppercase">
                                {metric.label}
                              </dt>
                              {metric.value ? (
                                <dd className="mt-1.5 text-base leading-snug text-text-primary">
                                  {metric.value}
                                </dd>
                              ) : null}
                              {metric.note ? (
                                <dd className="type-meta mt-1 text-text-muted">{metric.note}</dd>
                              ) : null}
                            </div>
                          ))}
                        </dl>
                      </section>
                    ) : null}
                  </div>
                ) : null}

                {!isAgentCase && !hasExecutiveSummary(project) && project.shortDescription ? (
                  <p className="type-body mt-8 text-text-secondary">{project.shortDescription}</p>
                ) : null}

                <Link
                  to={`/projetos/${project.slug}`}
                  onClick={() => {
                    onClose();
                  }}
                  className="group mt-10 flex w-full items-center justify-between gap-4 rounded-[var(--radius-md)] border border-white/16 bg-white/[0.04] px-5 py-4 text-text-primary shadow-[var(--shadow-surface)] transition-[border-color,background-color,transform,box-shadow] duration-[var(--duration-soft)] hover:border-white/28 hover:bg-white/[0.06] hover:shadow-[var(--shadow-elevated)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan"
                >
                  <span className="type-label font-mono tracking-[0.14em] uppercase">
                    Analisar case completo
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center gap-3 transition-transform duration-[400ms] group-hover:translate-x-1"
                  >
                    <span className="h-px w-10 bg-linear-to-r from-brand-cyan to-brand-orange" />
                    →
                  </span>
                </Link>
              </div>

              {videos.length > 0 ? (
                <div className="space-y-4 px-5 pb-8 md:px-8">
                  {videos.map((video) => (
                    <video
                      key={video.src}
                      controls
                      preload="none"
                      poster={video.poster}
                      title={video.title}
                      aria-label={video.title}
                      className="w-full rounded-[var(--radius-md)] border border-white/10 bg-black"
                    >
                      <source src={video.src} />
                      {video.title}
                    </video>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AgentCaseContent } from '@/components/projects/AgentCaseContent';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { TechnologyItem } from '@/components/technology/TechnologyItem';
import { ProjectVisual } from '@/components/visual/ProjectVisual';
import { featuredProjects, projects } from '@/data/projects';
import { projectStatusLabel } from '@/data/projects/status';
import { technologyName } from '@/data/technologies';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { publicProjectImages, publicProjectVideos } from '@/lib/project-media';
import { easeOutExpo, motionDuration } from '@/lib/motion';
import type { PortfolioProject } from '@/types/project';

type ProjectQuickViewProps = {
  project?: PortfolioProject;
  onClose: () => void;
};

export function ProjectQuickView({ project, onClose }: ProjectQuickViewProps) {
  const reduced = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [shot, setShot] = useState(0);
  const images = project ? publicProjectImages(project) : [];
  const videos = project ? publicProjectVideos(project) : [];
  const active = images[shot];
  const featuredIndex = project ? featuredProjects.findIndex((item) => item.id === project.id) : -1;
  const caseIndex = project
    ? featuredIndex >= 0
      ? featuredIndex
      : projects.findIndex((item) => item.id === project.id)
    : 0;

  useFocusTrap(Boolean(project), dialogRef);
  useScrollLock(Boolean(project));

  useEffect(() => {
    setShot(0);
  }, [project?.slug]);

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
            aria-label="Fechar projeto"
            className="absolute inset-0 bg-black/72"
            onClick={onClose}
          />
          <motion.div
            className={
              project.agents?.length
                ? 'relative z-10 flex w-full max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-0.75rem)] flex-col overflow-hidden border border-white/10 bg-background md:w-[min(92vw,90rem)] md:max-h-[min(90dvh,64rem)]'
                : 'relative z-10 flex w-full max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem)] flex-col overflow-hidden border border-white/10 bg-background md:w-[min(88vw,74rem)] md:max-h-[min(calc(100dvh-4rem),54rem)]'
            }
            initial={reduced ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: 8, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: easeOutExpo }}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-background px-5 py-3 md:px-8">
              <p className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
                Case / {String(caseIndex + 1).padStart(3, '0')}
              </p>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="type-label min-h-11 px-3 font-mono tracking-[0.14em] text-text-primary uppercase"
              >
                Fechar
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain">
            {project.agents && project.agents.length > 0 ? (
              <div className="px-5 py-6 md:px-8 md:py-8">
                <p className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">
                  {project.context.label}
                </p>
                <h2
                  id="quick-view-title"
                  className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
                >
                  {project.title}
                </h2>
                <div className="mt-4">
                  <ProjectStatus status={project.status} />
                </div>
                <div className="mt-8">
                  <AgentCaseContent project={project} />
                </div>
                <Link
                  to={`/projetos/${project.slug}`}
                  className="group mt-8 inline-flex items-center gap-4 text-text-primary"
                >
                  <span>Ver case completo</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-12 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-20"
                  />
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            ) : null}

            {project.agents && project.agents.length > 0 ? null : (
            <div className="grid gap-8 px-5 py-6 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:px-8 md:py-8">
              <div>
                <ProjectVisual
                  compact
                  accent={project.accent}
                  index={caseIndex}
                  title={project.displayLines?.[1] || project.title}
                  status={projectStatusLabel(project.status)}
                  technologies={project.technologies.slice(0, 4).map((id) => technologyName(id))}
                  cover={active?.src}
                  coverAlt={active?.alt}
                  priority
                />
                {images.length > 1 ? (
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="type-meta font-mono tracking-[0.12em] text-text-muted">
                      {String(shot + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="type-label min-h-11 min-w-11 border border-white/15 text-text-primary"
                        aria-label="Evidência anterior"
                        onClick={() => setShot((current) => (current === 0 ? images.length - 1 : current - 1))}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        className="type-label min-h-11 min-w-11 border border-white/15 text-text-primary"
                        aria-label="Próxima evidência"
                        onClick={() => setShot((current) => (current === images.length - 1 ? 0 : current + 1))}
                      >
                        →
                      </button>
                    </div>
                  </div>
                ) : null}
                {active?.caption ? (
                  <p className="type-meta mt-3 text-text-muted">{active.caption}</p>
                ) : null}
              </div>

              <div className="flex flex-col">
                <p className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">
                  {project.context.label}
                </p>
                <h2
                  id="quick-view-title"
                  className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
                >
                  {project.title}
                </h2>
                <div className="mt-4">
                  <ProjectStatus status={project.status} />
                </div>

                {project.business?.problem || project.shortDescription ? (
                  <section className="mt-6 border-t border-white/10 pt-5">
                    <h3 className="type-label font-mono tracking-[0.14em] text-brand-orange uppercase">
                      O problema
                    </h3>
                    <p className="type-body mt-2 text-text-secondary">
                      {project.business?.problem || project.shortDescription}
                    </p>
                  </section>
                ) : null}

                {project.business?.solution ? (
                  <section className="mt-5">
                    <h3 className="type-label font-mono tracking-[0.14em] text-brand-cyan uppercase">
                      A solução
                    </h3>
                    <p className="type-body mt-2 text-text-secondary">{project.business.solution}</p>
                  </section>
                ) : null}

                {project.business?.impact || (project.business?.results && project.business.results.length > 0) ? (
                  <section className="mt-5">
                    <h3 className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">
                      Impacto
                    </h3>
                    {project.business?.impact ? (
                      <p className="type-body mt-2 text-text-secondary">{project.business.impact}</p>
                    ) : null}
                    {project.business?.results && project.business.results.length > 0 ? (
                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        {project.business.results.map((result) => (
                          <div key={result.label}>
                            <dt className="type-meta font-mono tracking-[0.08em] text-text-muted uppercase">
                              {result.label}
                            </dt>
                            {result.value ? (
                              <dd className="mt-1 text-text-primary">{result.value}</dd>
                            ) : null}
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </section>
                ) : null}

                {project.technologies.length > 0 ? (
                  <section className="mt-5">
                    <h3 className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase">Stack</h3>
                    <ul className="mt-2">
                      {project.technologies.map((id) => (
                        <TechnologyItem key={id} id={id} />
                      ))}
                    </ul>
                  </section>
                ) : null}

                <Link
                  to={`/projetos/${project.slug}`}
                  className="group mt-8 inline-flex items-center gap-4 text-text-primary"
                >
                  <span>Ver case completo</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-12 bg-linear-to-r from-brand-cyan to-brand-orange transition-all duration-500 group-hover:w-20"
                  />
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
            )}
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
                    className="w-full border border-white/10 bg-black"
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

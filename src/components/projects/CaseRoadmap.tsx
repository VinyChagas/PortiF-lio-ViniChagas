import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import type { ProjectMediaItem } from '@/types/project';

type CaseRoadmapProps = {
  image: ProjectMediaItem;
  className?: string;
};

/**
 * Roadmap visual — imagem dedicada do Studio, sem cortes agressivos.
 */
export function CaseRoadmap({ image, className }: CaseRoadmapProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const alt = image.alt || image.caption || 'Roadmap visual do projeto';

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <section
      className={cn('border-t border-white/10 pt-10', className)}
      aria-labelledby={titleId}
      data-case-roadmap="true"
    >
      <p
        id={titleId}
        className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase"
      >
        Roadmap visual
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
        Visão geral do fluxo ou da evolução do projeto.
      </p>

      <figure className="surface-panel mt-6 max-w-4xl overflow-hidden border-white/10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full bg-[#080b11] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
          aria-label="Ampliar roadmap visual"
        >
          <img
            src={image.src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="mx-auto max-h-[min(70vh,40rem)] w-full object-contain transition duration-500 group-hover:opacity-95"
          />
          <span className="type-meta pointer-events-none absolute right-3 bottom-3 rounded-[var(--radius-sm)] border border-white/10 bg-black/55 px-2 py-1 font-mono tracking-[0.12em] text-text-secondary uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Ampliar
          </span>
        </button>
        {image.caption || image.alt ? (
          <figcaption className="border-t border-white/[0.08] px-4 py-3">
            <p className="type-meta font-mono tracking-[0.08em] text-text-muted">
              {image.caption || image.alt}
            </p>
          </figcaption>
        ) : null}
      </figure>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Roadmap ampliado"
              className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
            >
              <button
                type="button"
                className="absolute inset-0 cursor-zoom-out"
                aria-label="Fechar ampliação"
                onClick={() => setOpen(false)}
              />
              <div className="relative z-10 max-h-[92vh] max-w-[min(96vw,72rem)] overflow-auto">
                <img
                  src={image.src}
                  alt={alt}
                  className="mx-auto max-h-[88vh] w-auto max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="type-label absolute top-2 right-2 rounded-[var(--radius-sm)] border border-white/15 bg-black/70 px-3 py-2 font-mono tracking-[0.14em] text-text-primary uppercase"
                >
                  Fechar
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}

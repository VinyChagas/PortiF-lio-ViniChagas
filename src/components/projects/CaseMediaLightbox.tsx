import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { ProjectMediaItem } from '@/types/project';

type CaseMediaLightboxProps = {
  images: ProjectMediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

/**
 * Apresentação em tela cheia das evidências — navega com setas e teclado.
 */
export function CaseMediaLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: CaseMediaLightboxProps) {
  const labelId = useId();
  const total = images.length;
  const current = images[index];
  const caption = current?.caption || current?.alt || `Evidência ${index + 1}`;

  useScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (total <= 1) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onIndexChange((index - 1 + total) % total);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onIndexChange((index + 1) % total);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, onClose, onIndexChange, total]);

  if (!current) return null;

  const goPrev = () => onIndexChange((index - 1 + total) % total);
  const goNext = () => onIndexChange((index + 1) % total);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      className="fixed inset-0 z-[90] flex flex-col bg-black/88"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Fechar apresentação"
        onClick={onClose}
      />

      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <p
          id={labelId}
          className="type-label font-mono tracking-[0.16em] text-text-secondary uppercase"
        >
          {total > 1 ? `${index + 1} / ${total}` : 'Evidência'}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-sm)] border border-white/15 bg-black/60 text-text-primary transition-colors hover:border-white/30"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center gap-2 px-2 pb-4 md:gap-4 md:px-4">
        {total > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-white/15 bg-black/60 text-text-primary transition-colors hover:border-brand-cyan/50"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        ) : null}

        <figure className="relative flex max-h-full min-w-0 flex-1 flex-col items-center justify-center">
          <img
            src={current.src}
            alt={caption}
            className="max-h-[min(78vh,52rem)] w-auto max-w-full object-contain"
          />
          <figcaption className="mt-3 max-w-3xl px-2 text-center">
            <p className="type-meta font-mono tracking-[0.08em] text-text-muted">{caption}</p>
          </figcaption>
        </figure>

        {total > 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-white/15 bg-black/60 text-text-primary transition-colors hover:border-brand-cyan/50"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {total > 1 ? (
        <div
          className="relative z-10 flex justify-center gap-1.5 px-4 pb-5"
          role="tablist"
          aria-label="Miniaturas da apresentação"
        >
          {images.map((image, i) => {
            const selected = i === index;
            return (
              <button
                key={`${image.src}-${i}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Ir para evidência ${i + 1}`}
                onClick={() => onIndexChange(i)}
                className={
                  selected
                    ? 'h-2 w-6 rounded-full bg-brand-cyan'
                    : 'h-2 w-2 rounded-full bg-white/25 transition-colors hover:bg-white/50'
                }
              />
            );
          })}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}

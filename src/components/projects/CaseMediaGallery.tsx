import { useState } from 'react';
import { CaseMediaLightbox } from '@/components/projects/CaseMediaLightbox';
import { cn } from '@/lib/cn';
import type { ProjectMediaItem } from '@/types/project';

type CaseMediaGalleryProps = {
  images: ProjectMediaItem[];
  title?: string;
  description?: string;
  className?: string;
  /** Variante embutida (dentro de acordeão) vs. seção de página. */
  embedded?: boolean;
};

/**
 * Galeria de evidências — clique abre apresentação em slideshow.
 */
export function CaseMediaGallery({
  images,
  title = 'Evidências',
  description = 'Registros visuais publicados com o case.',
  className,
  embedded = false,
}: CaseMediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <section
      className={cn(
        embedded ? 'mt-5' : 'border-t border-white/10 pt-10',
        className,
      )}
      aria-label={title}
    >
      {embedded ? null : (
        <>
          <p className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase">{title}</p>
          {description ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
              {description}
            </p>
          ) : null}
        </>
      )}

      <ul
        className={cn(
          'grid gap-4 sm:grid-cols-2',
          embedded ? 'mt-0' : 'mt-6',
        )}
      >
        {images.map((image, index) => {
          const alt = image.alt || image.caption || `Evidência ${index + 1}`;
          return (
            <li
              key={`${image.src}-${index}`}
              className="surface-panel overflow-hidden border-white/10"
            >
              <figure className="relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group relative block w-full aspect-[16/10] overflow-hidden bg-[#080b11] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
                  aria-label={`Ampliar evidência ${index + 1}${images.length > 1 ? ` de ${images.length}` : ''}`}
                >
                  <img
                    src={image.src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top opacity-95 transition duration-500 group-hover:opacity-90"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgb(62 200 242 / 10%), transparent 22%, transparent 78%, rgb(255 90 31 / 10%))',
                    }}
                  />
                  <span className="type-meta pointer-events-none absolute right-3 bottom-3 rounded-[var(--radius-sm)] border border-white/10 bg-black/55 px-2 py-1 font-mono tracking-[0.12em] text-text-secondary uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Ampliar
                  </span>
                </button>
                {image.caption || image.alt ? (
                  <figcaption className="border-t border-white/[0.08] px-3 py-3">
                    <p className="type-meta font-mono tracking-[0.08em] text-text-muted">
                      {image.caption || image.alt}
                    </p>
                  </figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>

      {activeIndex !== null ? (
        <CaseMediaLightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onIndexChange={setActiveIndex}
        />
      ) : null}
    </section>
  );
}

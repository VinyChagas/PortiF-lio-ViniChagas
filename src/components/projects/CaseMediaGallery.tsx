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
 * Galeria de evidências — mesmos tokens/superfícies do case, sem cards soltos no hero.
 */
export function CaseMediaGallery({
  images,
  title = 'Evidências',
  description = 'Registros visuais publicados com o case.',
  className,
  embedded = false,
}: CaseMediaGalleryProps) {
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
        {images.map((image, index) => (
          <li
            key={`${image.src}-${index}`}
            className="surface-panel overflow-hidden border-white/10"
          >
            <figure className="relative">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#080b11]">
                <img
                  src={image.src}
                  alt={image.alt || image.caption || `Evidência ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top opacity-95"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(90deg, rgb(62 200 242 / 10%), transparent 22%, transparent 78%, rgb(255 90 31 / 10%))',
                  }}
                />
              </div>
              {image.caption || image.alt ? (
                <figcaption className="border-t border-white/[0.08] px-3 py-3">
                  <p className="type-meta font-mono tracking-[0.08em] text-text-muted">
                    {image.caption || image.alt}
                  </p>
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { useMemo, useState } from 'react';
import { CaseDocumentation } from '@/components/projects/CaseDocumentation';
import { CaseMediaGallery } from '@/components/projects/CaseMediaGallery';
import { cn } from '@/lib/cn';
import { splitDocumentationByArea } from '@/lib/project-case';
import type { ProjectDocumentationSection, ProjectMediaItem } from '@/types/project';

type AreaId = 'business' | 'technical';

type CaseDocumentationExploreProps = {
  sections: ProjectDocumentationSection[];
  mediaBySection?: Record<string, ProjectMediaItem[]>;
  evidenceImages?: ProjectMediaItem[];
  className?: string;
};

/**
 * Documentação completa com áreas Negócio / Técnico.
 * Mantém acordeões existentes; não cria página nova.
 */
export function CaseDocumentationExplore({
  sections,
  mediaBySection,
  evidenceImages = [],
  className,
}: CaseDocumentationExploreProps) {
  const { business, technical } = useMemo(() => splitDocumentationByArea(sections), [sections]);
  const areas = useMemo(() => {
    const next: Array<{ id: AreaId; label: string; sections: ProjectDocumentationSection[] }> = [];
    if (business.length) next.push({ id: 'business', label: 'Área de Negócio', sections: business });
    if (technical.length) {
      next.push({ id: 'technical', label: 'Área Técnica', sections: technical });
    }
    return next;
  }, [business, technical]);

  const [active, setActive] = useState<AreaId>(() => areas[0]?.id ?? 'business');
  const current = areas.find((area) => area.id === active) ?? areas[0];

  if (!areas.length && !evidenceImages.length) return null;

  const evidenceGallery =
    evidenceImages.length > 0 ? (
      <CaseMediaGallery
        images={evidenceImages}
        className={areas.length ? 'mt-4 max-w-4xl' : 'max-w-4xl'}
        title="Evidências"
        description="Registros visuais publicados com o case no Portfolio Studio."
      />
    ) : null;

  if (!areas.length) {
    return (
      <div className={className} data-case-explore="true">
        {evidenceGallery}
      </div>
    );
  }

  return (
    <section
      className={cn('border-t border-white/10 pt-10', className)}
      aria-labelledby="case-explore-title"
      data-case-explore="true"
    >
      <p
        id="case-explore-title"
        className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase"
      >
        Explorar o case completo
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
        Escolha a profundidade: negócio ou implementação técnica.
      </p>

      <div
        role="tablist"
        aria-label="Áreas do case"
        className="mt-6 flex flex-wrap gap-2 border-b border-white/10 pb-3"
      >
        {areas.map((area) => {
          const selected = current?.id === area.id;
          return (
            <button
              key={area.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`case-area-${area.id}`}
              onClick={() => setActive(area.id)}
              className={cn(
                'type-label min-h-11 rounded-[var(--radius-sm)] border px-4 font-mono tracking-[0.14em] uppercase transition-colors duration-[var(--duration-soft)]',
                selected
                  ? area.id === 'business'
                    ? 'border-brand-orange/70 text-brand-orange shadow-[var(--shadow-elevated)]'
                    : 'border-brand-cyan/70 text-brand-cyan shadow-[var(--shadow-elevated)]'
                  : 'border-white/10 text-text-muted hover:text-text-primary',
              )}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`case-area-${current?.id}`}
        className="mt-2"
      >
        {current?.sections.length ? (
          <CaseDocumentation
            sections={current.sections}
            mediaBySection={mediaBySection}
            hideHeader
            className="pt-6"
          />
        ) : null}
      </div>

      {evidenceGallery}
    </section>
  );
}

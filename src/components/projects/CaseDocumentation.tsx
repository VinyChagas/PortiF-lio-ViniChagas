import { useId, useState } from 'react';
import { cn } from '@/lib/cn';
import type { ProjectDocumentationSection } from '@/types/project';

type CaseDocumentationProps = {
  sections: ProjectDocumentationSection[];
  className?: string;
};

function DocumentationPanel({
  section,
  open,
  onToggle,
  index,
}: {
  section: ProjectDocumentationSection;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = useId();
  const buttonId = useId();
  const number = String(index + 1).padStart(2, '0');

  return (
    <div
      className={cn(
        'surface-panel overflow-hidden transition-[border-color,background-color] duration-[var(--duration-soft)]',
        open && 'border-white/16 bg-white/[0.035]',
      )}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full min-h-14 items-center justify-between gap-4 px-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan md:px-5"
        >
          <span className="type-label font-mono tracking-[0.14em] text-text-secondary uppercase transition-colors duration-[var(--duration-soft)] group-hover:text-text-primary">
            <span className="text-text-muted">{number}</span>
            <span className="mx-2 text-white/25">—</span>
            {section.title}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'font-mono text-text-muted transition-transform duration-[var(--duration-soft)]',
              open && 'rotate-45 text-brand-cyan',
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="border-t border-white/[0.08] px-4 pb-5 md:px-5"
      >
        {open ? (
          <div className="pt-4">
            {section.body ? (
              <p className="type-body whitespace-pre-line text-text-secondary">{section.body}</p>
            ) : null}
            {section.items && section.items.length > 0 ? (
              <ul
                className={cn(
                  'space-y-2 text-sm leading-relaxed text-text-secondary md:text-base',
                  section.body && 'mt-3',
                )}
              >
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-cyan/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CaseDocumentation({ sections, className }: CaseDocumentationProps) {
  const [openId, setOpenId] = useState<string | null>(sections[0]?.id ?? null);

  if (sections.length === 0) return null;

  return (
    <section className={cn('border-t border-white/10 pt-10', className)} aria-labelledby="case-docs-title">
      <p
        id="case-docs-title"
        className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase"
      >
        Detalhes do case
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
        Documentação profunda, organizada para consulta. Expanda o que importar.
      </p>
      <div className="mt-6 space-y-3">
        {sections.map((section, index) => (
          <DocumentationPanel
            key={section.id}
            section={section}
            index={index}
            open={openId === section.id}
            onToggle={() => setOpenId((current) => (current === section.id ? null : section.id))}
          />
        ))}
      </div>
    </section>
  );
}

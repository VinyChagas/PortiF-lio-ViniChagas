import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { practiceAreas } from '@/data/skills';
import { cn } from '@/lib/cn';

const areaVisual = {
  software: {
    keywords: ['Aplicações', 'Sistemas', 'Problemas reais'],
    glow: 'bg-[radial-gradient(circle_at_30%_70%,var(--glow-blue),transparent_62%)]',
  },
  automation: {
    keywords: ['Fluxos', 'Processos', 'Repetíveis'],
    glow: 'bg-[radial-gradient(circle_at_20%_80%,var(--glow-blue),transparent_55%),radial-gradient(circle_at_80%_20%,var(--glow-orange),transparent_55%)]',
  },
  ai: {
    keywords: ['Conhecimento', 'Decisão'],
    glow: 'bg-[radial-gradient(circle_at_70%_40%,var(--glow-blue),transparent_60%)]',
  },
} as const;

function AreaSignal({ id }: { id: keyof typeof areaVisual }) {
  if (id === 'software') {
    return (
      <DiagonalAccent
        variant="slash"
        className="absolute right-4 bottom-16 h-32 w-14 text-brand-cyan opacity-50 transition-opacity duration-700 group-hover/panel:opacity-100"
      />
    );
  }

  if (id === 'automation') {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <DiagonalAccent
          variant="slash"
          className="absolute bottom-16 left-5 h-28 w-12 text-brand-cyan opacity-45 transition-opacity duration-700 group-hover/panel:opacity-90"
        />
        <DiagonalAccent
          variant="bar"
          className="absolute top-16 right-4 h-6 w-24 text-brand-orange opacity-50 transition-opacity duration-700 group-hover/panel:opacity-100"
        />
      </div>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 120"
      className="absolute right-4 bottom-16 h-28 w-36 text-brand-cyan opacity-45 transition-opacity duration-700 group-hover/panel:opacity-90"
    >
      <path
        d="M18 78 L58 36 L104 64 L142 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M58 36 L72 92 L104 64" fill="none" stroke="currentColor" strokeWidth="1" />
      {[
        [18, 78],
        [58, 36],
        [104, 64],
        [142, 24],
        [72, 92],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="currentColor" />
      ))}
    </svg>
  );
}

export function PracticeAreas() {
  return (
    <section className="relative scroll-mt-24 overflow-x-clip py-[var(--space-section)]">
      <TechnicalGrid />
      <AmbientGlow tone="blue" className="opacity-50" />
      <SectionIndex value="02" />

      <Container className="relative">
        <Reveal>
          <SectionHeading index="02" label="Expertise" />
        </Reveal>

        <div className="relative z-10 mt-14 border-y border-white/10 md:mt-16 md:grid md:grid-cols-3">
          {practiceAreas.map((area, index) => {
            const visual = areaVisual[area.id];

            return (
              <Reveal
                key={area.id}
                delay={index * 0.08}
                className="h-full border-b border-white/10 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
              >
                <article className="group/panel relative flex h-full min-h-[22rem] flex-col px-6 py-10 md:min-h-[28rem] md:px-8 md:py-12">
                  <div
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700',
                      'group-hover/panel:opacity-100 group-focus-visible/panel:opacity-100',
                      visual.glow,
                    )}
                  />
                  <AreaSignal id={area.id} />

                  <p className="relative font-mono text-[0.72rem] tracking-[0.22em] text-text-muted">
                    {area.number}
                  </p>
                  <h3 className="relative mt-8 text-[clamp(1.65rem,2.5vw,2.45rem)] leading-[0.95] font-semibold tracking-[-0.04em] uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/panel:translate-x-1.5 group-focus-visible/panel:translate-x-1.5">
                    {area.title}
                  </h3>
                  <p className="relative mt-5 max-w-[22rem] text-sm leading-relaxed text-text-secondary md:text-base">
                    {area.description}
                  </p>

                  <ul className="relative mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-10 font-mono text-[0.62rem] tracking-[0.16em] text-text-muted uppercase opacity-80 transition-opacity duration-500 md:opacity-45 md:group-hover/panel:opacity-100 md:group-focus-visible/panel:opacity-100">
                    {visual.keywords.map((keyword) => (
                      <li key={keyword}>{keyword}</li>
                    ))}
                  </ul>

                  <span
                    aria-hidden="true"
                    className="relative mt-6 inline-flex text-text-secondary transition-transform duration-500 group-hover/panel:translate-x-1"
                  >
                    ↗
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

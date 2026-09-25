import { useRef } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { experience } from '@/data/experience';
import { useElementProgress } from '@/hooks/useElementProgress';

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useElementProgress(trackRef);

  return (
    <section
      id="experiencia"
      className="relative scroll-mt-24 overflow-x-clip py-[var(--space-section)]"
    >
      <TechnicalGrid className="opacity-60" />
      <AmbientGlow tone="split" className="opacity-40" />
      <SectionIndex value="04" />

      <Container className="relative">
        <Reveal>
          <SectionHeading index="04" label="Trajetória" />
        </Reveal>

        <div ref={trackRef} className="relative z-10 mt-16 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-[calc(0.625rem-0.5px)] w-px bg-white/10 md:left-[calc(11.625rem-0.5px)]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1 left-[calc(0.625rem-0.5px)] w-px origin-top bg-linear-to-b from-brand-cyan to-brand-orange md:left-[calc(11.625rem-0.5px)]"
            style={{ height: `${progress * 100}%` }}
          />

          <ol className="space-y-16">
            {experience.map((entry, index) => {
              const year = entry.period.start.slice(0, 4);

              return (
                <li key={entry.id}>
                  <Reveal delay={index * 0.08}>
                  <div className="grid grid-cols-[1.25rem_1fr] gap-x-5 md:grid-cols-[9rem_1.25rem_1fr] md:gap-x-8">
                    <div className="hidden pt-1 text-right md:block">
                      <p className="font-mono text-sm tracking-[0.18em] text-text-secondary">
                        {year}
                      </p>
                      <p className="mt-2 font-mono text-[0.66rem] tracking-[0.12em] text-text-muted uppercase">
                        {entry.period.label}
                      </p>
                    </div>

                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_0_5px_var(--background),0_0_16px_var(--brand-orange)]"
                      />
                    </div>

                    <div>
                      <p className="font-mono text-[0.66rem] tracking-[0.16em] text-text-muted uppercase md:hidden">
                        {year} · {entry.period.label}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-semibold tracking-[-0.035em] md:mt-0">
                        {entry.organization}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary md:text-base">{entry.role}</p>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
                        {entry.summary}
                      </p>
                    </div>
                  </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

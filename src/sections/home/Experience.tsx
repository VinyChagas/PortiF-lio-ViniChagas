import { useRef } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionIntro } from '@/components/ui/SectionIntro';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { education } from '@/data/education';
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
      <SectionIndex value="05" />

      <Container className="relative">
        <Reveal>
          <SectionIntro
            number="05"
            label="Trajetória"
            title="Da operação à IA aplicada."
            description="Nessa ordem, porque foi assim que o trabalho aconteceu."
          />
        </Reveal>

        <div ref={trackRef} className="relative z-10 mt-10 md:mt-12">
          <div
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-[calc(0.625rem-0.5px)] w-px bg-white/10 md:left-[calc(11.625rem-0.5px)]"
          />
          <div
            aria-hidden="true"
            className="absolute top-1 left-[calc(0.625rem-0.5px)] w-px origin-top bg-linear-to-b from-brand-cyan to-brand-orange md:left-[calc(11.625rem-0.5px)]"
            style={{ height: `${progress * 100}%` }}
          />

          <ol className="space-y-12 md:space-y-14">
            {experience.map((entry, index) => {
              const year = entry.period.start.slice(0, 4);

              return (
                <li key={entry.id}>
                  <Reveal delay={index * 0.06}>
                    <div className="grid grid-cols-[1.25rem_1fr] gap-x-5 md:grid-cols-[9rem_1.25rem_1fr] md:gap-x-8">
                      <div className="hidden pt-1 text-right md:block">
                        <p className="type-label font-mono tracking-[0.14em] text-text-secondary">{year}</p>
                        <p className="type-meta mt-2 font-mono tracking-[0.08em] text-text-muted uppercase">
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
                        <p className="type-label font-mono tracking-[0.14em] text-brand-cyan uppercase">
                          {entry.stage}
                        </p>
                        <p className="type-meta mt-2 font-mono tracking-[0.1em] text-text-muted uppercase md:hidden">
                          {year} · {entry.period.label}
                        </p>
                        <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] leading-tight font-semibold tracking-[-0.035em]">
                          {entry.organization}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary md:text-base">{entry.role}</p>
                        <p className="type-meta mt-1 font-mono tracking-[0.1em] text-text-muted uppercase">
                          {entry.location}
                        </p>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
                          {entry.summary}
                        </p>
                        {entry.metrics && entry.metrics.length > 0 ? (
                          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                            {entry.metrics.map((metric) => (
                              <div key={metric.label}>
                                <dt className="type-meta max-w-[16rem] font-mono tracking-[0.08em] text-text-muted uppercase">
                                  {metric.label}
                                </dt>
                                <dd className="mt-1 text-lg font-semibold tracking-[-0.03em] text-text-primary">
                                  {metric.value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative z-10 mt-16 border-t border-white/10 pt-10 md:mt-20">
          <h3 className="type-label font-mono tracking-[0.16em] text-text-secondary uppercase">Formação</h3>
          <ul className="mt-4 divide-y divide-white/10">
            {education.map((item) => (
              <li key={item.id} className="grid gap-1 py-4 md:grid-cols-[9rem_1fr] md:gap-8">
                <p className="type-meta font-mono tracking-[0.08em] text-text-muted">{item.period}</p>
                <div>
                  <p className="text-sm font-medium text-text-primary md:text-base">{item.course}</p>
                  <p className="mt-1 text-sm text-text-muted">
                    {item.institution}
                    {item.note ? ` · ${item.note}` : ''}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

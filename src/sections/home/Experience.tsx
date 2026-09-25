import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <section id="experiencia" className="relative py-[var(--space-section)]">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Trajetória" title="Experiência" />
        </Reveal>

        <div className="mt-14 border-t border-white/6">
          {experience.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 0.08}>
              <article className="grid gap-4 border-b border-white/6 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-10">
                <p className="text-sm text-text-muted md:col-span-3">{entry.period.label}</p>
                <div className="md:col-span-9">
                  <h3 className="text-xl tracking-[-0.02em] text-text-primary md:text-2xl">
                    {entry.role}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{entry.organization}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
                    {entry.summary}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

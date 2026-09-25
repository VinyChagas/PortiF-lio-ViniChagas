import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { practiceAreas } from '@/data/skills';

export function PracticeAreas() {
  return (
    <section className="relative py-[var(--space-section)]">
      <Container>
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] text-text-muted uppercase">
            Áreas de atuação
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 border-t border-white/6 md:grid-cols-3 md:gap-0">
          {practiceAreas.map((area, index) => (
            <Reveal
              key={area.id}
              delay={index * 0.08}
              className="md:border-white/6 md:px-8 md:pt-10 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <article>
                <p className="font-serif text-3xl text-text-muted/80">{area.number}</p>
                <h3 className="mt-6 text-sm font-semibold tracking-[0.18em] text-text-primary uppercase">
                  {area.title}
                </h3>
                <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-text-secondary md:text-base">
                  {area.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

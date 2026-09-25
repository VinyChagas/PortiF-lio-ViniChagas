import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/animations/Reveal';
import { ASSETS } from '@/lib/assets';

export function About() {
  return (
    <section id="sobre" className="relative py-[var(--space-section)]">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[22rem] lg:mx-0 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-6 bg-[radial-gradient(circle_at_18%_30%,var(--glow-blue),transparent_42%),radial-gradient(circle_at_88%_78%,var(--glow-orange),transparent_38%)] opacity-80 blur-2xl"
              />
              <figure className="relative overflow-hidden rounded-[0.65rem] bg-surface shadow-[var(--shadow-soft)]">
                <img
                  src={ASSETS.profile}
                  alt="Retrato de Vinicius Chagas"
                  className="aspect-[3/4] w-full object-cover object-[center_18%]"
                />
              </figure>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <Reveal>
              <p className="text-[0.72rem] font-medium tracking-[0.22em] text-text-muted uppercase">
                Sobre
              </p>
              <blockquote className="mt-6 font-serif text-[clamp(2rem,4.4vw,3.35rem)] leading-[1.12] text-text-primary">
                Tecnologia sempre foi minha ferramenta para transformar problemas em sistemas.
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                Trabalho no encontro entre operação e engenharia: entendo o problema, desenho o
                sistema e entrego software, automação e inteligência artificial que entram no
                fluxo real do negócio.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

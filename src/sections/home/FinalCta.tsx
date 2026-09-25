import { Reveal } from '@/components/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { contactEmail } from '@/data/social';

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden py-[var(--space-section)]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(70%_80%_at_0%_50%,var(--glow-blue),transparent_70%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(70%_80%_at_100%_50%,var(--glow-orange),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-brand-cyan/0 via-white/10 to-brand-orange/0" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(2.1rem,6vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
              Tem um problema que tecnologia pode resolver?
            </h2>
            <p className="mt-6 font-serif text-3xl text-text-secondary italic md:text-4xl">
              Vamos conversar.
            </p>
            <div className="mt-10">
              <Button href={`mailto:${contactEmail}`}>Escrever agora</Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

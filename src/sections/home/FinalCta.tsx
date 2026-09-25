import { Reveal } from '@/components/animations/Reveal';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MarkField } from '@/components/visual/DiagonalAccent';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { contactEmail } from '@/data/social';

export function FinalCta() {
  return (
    <section id="contato" className="relative scroll-mt-24 overflow-hidden py-[var(--space-section)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(70%_80%_at_0%_50%,var(--glow-blue),transparent_72%)]" />
        <div className="absolute inset-y-0 right-0 w-[58%] bg-[radial-gradient(70%_80%_at_100%_50%,var(--glow-orange),transparent_72%)]" />
      </div>
      <SectionIndex value="05" className="top-0 text-white/[0.03]" />
      <MarkField className="pointer-events-none absolute top-1/2 left-1/2 h-[min(70vh,38rem)] w-[min(110vw,68rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.09]" />

      <Container className="relative">
        <Reveal variant="slide">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-[0.68rem] tracking-[0.26em] text-text-muted uppercase">
              <span className="text-text-secondary">05</span>
              <span className="mx-3 text-white/30" aria-hidden="true">
                —
              </span>
              Contato
            </p>
            <h2 className="mx-auto mt-8 max-w-[11em] text-[clamp(2.3rem,6.4vw,5.4rem)] leading-[0.9] font-semibold tracking-[-0.05em] uppercase">
              Tem um problema que tecnologia pode resolver?
            </h2>
            <p className="mt-6 text-[clamp(1.35rem,3vw,2rem)] font-medium tracking-[-0.04em] text-text-secondary uppercase">
              Vamos construir a solução.
            </p>
            <div className="mt-11">
              <Button href={`mailto:${contactEmail}`} arrow>
                Vamos conversar
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { motion } from 'motion/react';
import { Reveal } from '@/components/animations/Reveal';
import { Container } from '@/components/ui/Container';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { SectionIndex } from '@/components/visual/SectionIndex';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/assets';
import { easeOutExpo, motionDuration } from '@/lib/motion';

export function About() {
  const reduced = usePrefersReducedMotion();

  const portrait = (
    <figure className="relative">
      <span
        aria-hidden="true"
        className="absolute top-[-12%] bottom-[-16%] left-[8%] w-px origin-top rotate-[16deg] bg-linear-to-b from-brand-cyan/0 via-brand-cyan/70 to-brand-orange/50"
      />
      <span
        aria-hidden="true"
        className="absolute -top-3 -left-3 z-20 h-12 w-12 border-t border-l border-brand-cyan/80"
      />
      <span
        aria-hidden="true"
        className="absolute -right-3 -bottom-3 z-20 h-12 w-12 border-r border-b border-brand-orange/80"
      />
      <div className="relative z-10 overflow-hidden bg-surface shadow-[var(--shadow-soft)]">
        <img
          src={ASSETS.profile}
          alt="Retrato de Vinicius Chagas"
          className="aspect-[4/5] w-full object-cover object-[center_18%]"
        />
      </div>
      <figcaption className="relative z-10 mt-4 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.2em] text-text-muted uppercase">
        <span>01 / Retrato</span>
        <span>Vinicius Chagas</span>
      </figcaption>
    </figure>
  );

  return (
    <section id="sobre" className="relative z-10 -mt-[18vh] scroll-mt-24 overflow-x-clip pt-[22vh]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background"
      />
      <AmbientGlow className="opacity-80" />
      <SectionIndex value="01" className="top-[18vh]" />

      <Container className="relative pb-[var(--space-section)]">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5 lg:-ml-2">
            <div
              aria-hidden="true"
              className="absolute -inset-10 bg-[radial-gradient(circle_at_12%_40%,var(--glow-blue),transparent_46%),radial-gradient(circle_at_92%_70%,var(--glow-orange),transparent_42%)] opacity-90 blur-2xl"
            />
            {reduced ? (
              portrait
            ) : (
              <motion.div
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: motionDuration.reveal, ease: easeOutExpo }}
              >
                {portrait}
              </motion.div>
            )}
          </div>

          <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:pb-4">
            <Reveal>
              <p className="font-mono text-[0.68rem] tracking-[0.26em] text-text-muted uppercase">
                <span className="text-text-secondary">01</span>
                <span className="mx-3 text-white/30" aria-hidden="true">
                  —
                </span>
                Sobre
              </p>
            </Reveal>
            <Reveal variant="slide" delay={0.08}>
              <h2 className="mt-6 max-w-[10em] text-[clamp(2rem,4.2vw,3.7rem)] leading-[0.9] font-semibold tracking-[-0.045em] uppercase">
                Tecnologia é a ferramenta. Problemas reais são o ponto de partida.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
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

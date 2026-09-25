import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ArgusCta } from '@/features/argus/ArgusCta';
import { usePointerLight } from '@/hooks/usePointerLight';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/assets';
import { easeOutExpo } from '@/lib/motion';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const light = usePointerLight(!reduced);
  const [imageReady, setImageReady] = useState(false);

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-background"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#0b1018_0%,#050608_58%,#050608_100%)]" />
        <div className="glow-blue absolute bottom-[-8%] left-[-12%] h-[58%] w-[58%] bg-[radial-gradient(circle,var(--glow-blue)_0%,transparent_68%)] blur-3xl" />
        <div className="glow-orange absolute right-[-14%] bottom-[-10%] h-[56%] w-[56%] bg-[radial-gradient(circle,var(--glow-orange)_0%,transparent_70%)] blur-3xl" />
        <img
          src={ASSETS.ocean}
          alt=""
          className={[
            'ocean-motion pointer-events-none absolute bottom-0 left-1/2 h-[118%] w-[140%] max-w-none origin-bottom object-cover object-[center_62%]',
            imageReady ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onLoad={() => setImageReady(true)}
        />
        <div className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-background via-background/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-linear-to-r from-brand-cyan/0 via-white/10 to-brand-orange/0" />
      </div>

      {light ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            background: `radial-gradient(28rem 20rem at ${light.x}px ${light.y}px, rgb(255 255 255 / 10%), transparent 58%)`,
          }}
        />
      ) : null}

      <Container className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-36 md:pb-44">
        <div className="max-w-3xl">
          <motion.p
            className="text-[0.72rem] font-medium tracking-[0.24em] text-text-muted uppercase md:text-[0.78rem]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.05 }}
          >
            Software • Automação • Inteligência Artificial
          </motion.p>

          <motion.h1
            className="mt-7 max-w-[13ch] text-[clamp(2.6rem,8vw,6rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-text-primary md:max-w-[11.5ch]"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: easeOutExpo, delay: 0.16 }}
          >
            Transformando problemas complexos em soluções inteligentes.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-text-secondary md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.3 }}
          >
            Desenvolvo soluções que conectam tecnologia a problemas reais de negócio.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.42 }}
          >
            <Button href="/#projetos">Explorar projetos</Button>
            <ArgusCta />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

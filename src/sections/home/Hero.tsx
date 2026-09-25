import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DiagonalAccent } from '@/components/visual/DiagonalAccent';
import { RevealText } from '@/components/visual/RevealText';
import { ArgusCta } from '@/features/argus/ArgusCta';
import { useFinePointer } from '@/hooks/useFinePointer';
import { usePointerLight } from '@/hooks/usePointerLight';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/assets';
import { easeOutExpo, motionDuration } from '@/lib/motion';

const headline = ['Transformando', 'problemas complexos', 'em soluções', 'inteligentes.'];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const light = usePointerLight(!reduced && fine);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) setImageReady(true);
  }, []);

  useEffect(() => {
    if (reduced || !fine) return;

    const scene = sceneRef.current;
    if (!scene) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let sy = 0;

    const apply = () => {
      scene.style.transform = `translate3d(${px}px, ${py + sy}px, 0)`;
      frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      px = nx * 12;
      py = ny * 8;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onScroll = () => {
      sy = Math.min(window.scrollY, 640) * 0.07;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, fine]);

  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden bg-background">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#0c121b_0%,#06070b_62%,#06070b_100%)]" />
        <div className="glow-blue absolute bottom-[-6%] left-[-14%] h-[46%] w-[48%] bg-[radial-gradient(circle,var(--glow-blue)_0%,transparent_68%)] blur-3xl" />
        <div className="glow-orange absolute right-[-16%] bottom-[-8%] h-[44%] w-[46%] bg-[radial-gradient(circle,var(--glow-orange)_0%,transparent_70%)] blur-3xl" />
        <div ref={sceneRef} className="absolute inset-0">
          <img
            ref={imageRef}
            src={ASSETS.ocean}
            alt=""
            className={[
              'ocean-motion pointer-events-none absolute bottom-0 left-1/2 h-[78%] w-[142%] max-w-none origin-bottom object-cover object-[center_78%]',
              imageReady ? 'opacity-100' : 'opacity-0',
              'transition-opacity duration-1000 motion-reduce:transition-none',
            ].join(' ')}
            onLoad={() => setImageReady(true)}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background from-0% via-background/80 via-46% to-transparent to-72%" />
        <div className="absolute inset-x-0 bottom-0 h-[16vh] bg-linear-to-t from-background/90 to-transparent" />
      </div>

      {light ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
          style={{
            background: `radial-gradient(24rem 18rem at ${light.x}px ${light.y}px, rgb(255 255 255 / 9%), transparent 62%)`,
          }}
        />
      ) : null}

      <DiagonalAccent
        variant="slash"
        className="absolute top-[14%] right-[8%] hidden h-40 w-16 text-brand-cyan/35 xl:block"
      />
      <DiagonalAccent
        variant="bar"
        className="absolute top-[32%] right-[11%] hidden h-6 w-24 text-brand-orange/40 xl:block"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-[26vh]">
        <div className="max-w-3xl">
          <motion.p
            className="font-mono text-[0.62rem] tracking-[0.18em] text-text-muted uppercase sm:text-[0.68rem] sm:tracking-[0.26em]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.element, ease: easeOutExpo, delay: 0.05 }}
          >
            <span className="block sm:inline">Software · Automação</span>
            <span className="hidden sm:inline"> · </span>
            <span className="block sm:inline">Inteligência Artificial</span>
          </motion.p>

          <h1 className="mt-6 text-[clamp(2rem,6.1vw,4.8rem)] leading-[0.94] font-semibold tracking-[-0.045em] text-text-primary">
            {headline.map((line, index) => (
              <RevealText key={line} mode="mount" delay={0.16 + index * 0.08}>
                {line}
              </RevealText>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-text-secondary md:text-lg"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.element, ease: easeOutExpo, delay: 0.52 }}
          >
            Desenvolvo soluções que conectam tecnologia a problemas reais de negócio.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration.element, ease: easeOutExpo, delay: 0.66 }}
          >
            <Button href="/#projetos" arrow>
              Explorar projetos
            </Button>
            <ArgusCta />
          </motion.div>
        </div>
      </Container>

      <a
        href="#sobre"
        className="absolute bottom-7 left-6 z-10 flex items-center gap-4 md:left-8"
      >
        <span aria-hidden="true" className="scroll-hint block h-14 w-px bg-text-primary/80" />
        <span className="font-mono text-[0.62rem] tracking-[0.28em] text-text-muted uppercase">
          Descer
        </span>
      </a>
    </section>
  );
}

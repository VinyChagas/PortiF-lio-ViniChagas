import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo } from '@/lib/motion';
import { readHomeScroll, restoreHomeScroll, saveHomeScroll, scrollWithoutSmooth } from '@/lib/home-scroll';

type SlideDirection = 'archive' | 'home' | 'none';

let lastPath = '';
let activeSlide: SlideDirection = 'none';

function slideDirection(from: string, to: string): SlideDirection {
  if (from === '/' && to === '/projetos') return 'archive';
  if (from === '/projetos' && to === '/') return 'home';
  return 'none';
}

function useSlideDirection() {
  const location = useLocation();
  const directionRef = useRef<SlideDirection>('none');

  if (lastPath !== location.pathname) {
    const next = lastPath ? slideDirection(lastPath, location.pathname) : 'none';
    if (next === 'archive') saveHomeScroll();
    directionRef.current = next;
    activeSlide = next;
    lastPath = location.pathname;
  }

  return directionRef.current;
}

const variants = {
  enter: (direction: SlideDirection) => ({
    x: direction === 'archive' ? '100%' : direction === 'home' ? '-100%' : 0,
  }),
  center: { x: 0 },
  exit: (direction: SlideDirection) => ({
    x: direction === 'archive' ? '-100%' : direction === 'home' ? '100%' : 0,
  }),
};

function PageFrame({ direction, children }: { direction: SlideDirection; children: ReactNode }) {
  const present = useIsPresent();
  const reduced = usePrefersReducedMotion();
  const leaving = !present && !reduced && activeSlide !== 'none';

  return (
    <motion.div
      custom={direction}
      variants={reduced ? undefined : variants}
      initial={reduced ? false : 'enter'}
      animate={reduced ? undefined : 'center'}
      exit={reduced ? undefined : 'exit'}
      transition={
        reduced
          ? { duration: 0 }
          : {
              duration: window.matchMedia('(max-width: 767px)').matches ? 0.48 : 0.68,
              ease: easeOutExpo,
            }
      }
      aria-hidden={leaving || undefined}
      className="w-full will-change-transform"
      style={
        leaving
          ? {
              position: 'fixed',
              top: activeSlide === 'archive' ? -(readHomeScroll() ?? 0) : 0,
              left: 0,
              width: '100%',
              zIndex: 1,
              pointerEvents: 'none',
            }
          : { position: 'relative', zIndex: 2, width: '100%' }
      }
    >
      {children}
    </motion.div>
  );
}

type RouteTransitionProps = {
  renderRoutes: (location: Location) => ReactNode;
};

export function RouteTransition({ renderRoutes }: RouteTransitionProps) {
  const location = useLocation();
  const direction = useSlideDirection();
  const reduced = usePrefersReducedMotion();
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      if (location.pathname !== '/') scrollWithoutSmooth(0);
    } else if (location.pathname === '/' && direction === 'home') {
      restoreHomeScroll();
    } else {
      scrollWithoutSmooth(0);
    }

    if (reduced || direction === 'none') {
      document.documentElement.style.scrollBehavior = '';
      return;
    }
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    html.style.scrollBehavior = 'auto';
    const ms = window.matchMedia('(max-width: 767px)').matches ? 520 : 740;
    const timer = window.setTimeout(() => {
      html.style.overflow = previous;
      html.style.scrollBehavior = '';
    }, ms);
    return () => window.clearTimeout(timer);
  }, [direction, location.pathname, reduced]);

  return (
    <div className="relative overflow-x-clip">
      <AnimatePresence initial={false} custom={direction}>
        <PageFrame key={location.pathname} direction={direction}>
          {renderRoutes(location)}
        </PageFrame>
      </AnimatePresence>
    </div>
  );
}

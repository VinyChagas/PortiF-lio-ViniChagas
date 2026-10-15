import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { AnimatePresence, motion, useIsPresent } from 'motion/react';
import { CaseReadyProvider } from '@/app/case-transition';
import { CaseTransitionOverlay } from '@/components/boot/CaseTransitionOverlay';
import { getProjectBySlug } from '@/data/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { readHomeScroll, restoreHomeScroll, saveHomeScroll, scrollWithoutSmooth } from '@/lib/home-scroll';
import { easeOutExpo } from '@/lib/motion';
import {
  ROUTE_OVERLAY_EXIT_MS,
  ROUTE_OVERLAY_MAX_MS,
  caseTransitionTitle,
  reduceRouteOverlay,
  type RouteOverlay,
} from '@/lib/route-overlay';

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
  const [trackedPath, setTrackedPath] = useState(location.pathname);
  const [overlay, setOverlay] = useState<RouteOverlay | null>(null);

  if (location.pathname !== trackedPath) {
    const from = trackedPath;
    setTrackedPath(location.pathname);
    setOverlay(
      reduceRouteOverlay(overlay, {
        type: 'navigate',
        from,
        to: location.pathname,
        title: caseTransitionTitle(location.pathname, (slug) => getProjectBySlug(slug)?.title),
        reduced,
      }),
    );
  }

  const signal = useCallback((pathname: string) => {
    setOverlay((current) => reduceRouteOverlay(current, { type: 'ready', path: pathname }));
  }, []);

  useEffect(() => {
    if (!overlay || overlay.phase !== 'in') return;
    const path = overlay.path;
    const timer = window.setTimeout(() => {
      setOverlay((current) => reduceRouteOverlay(current, { type: 'timeout', path }));
    }, ROUTE_OVERLAY_MAX_MS);
    return () => window.clearTimeout(timer);
  }, [overlay]);

  useEffect(() => {
    if (!overlay || overlay.phase !== 'out') return;
    const timer = window.setTimeout(() => {
      setOverlay((current) => reduceRouteOverlay(current, { type: 'exited' }));
    }, reduced ? 0 : ROUTE_OVERLAY_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [overlay, reduced]);

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      if (location.pathname !== '/' || !window.location.hash) scrollWithoutSmooth(0);
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
    <CaseReadyProvider signal={signal}>
      <div className="relative overflow-x-clip">
        <AnimatePresence initial={false} custom={direction}>
          <PageFrame key={location.pathname} direction={direction}>
            {renderRoutes(location)}
          </PageFrame>
        </AnimatePresence>
        {overlay ? <CaseTransitionOverlay title={overlay.title} phase={overlay.phase} /> : null}
      </div>
    </CaseReadyProvider>
  );
}

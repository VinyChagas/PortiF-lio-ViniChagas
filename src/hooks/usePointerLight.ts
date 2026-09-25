import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Point = { x: number; y: number };

export function usePointerLight(enabled: boolean) {
  const reduced = usePrefersReducedMotion();
  const [point, setPoint] = useState<Point | null>(null);
  const active = enabled && !reduced;

  useEffect(() => {
    if (!active) {
      setPoint(null);
      return;
    }

    let frame = 0;
    let next: Point | null = null;

    const onMove = (event: PointerEvent) => {
      next = { x: event.clientX, y: event.clientY };
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        setPoint(next);
        frame = 0;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [active]);

  return point;
}

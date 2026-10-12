import { useEffect, useState, type RefObject } from 'react';

export function useElementProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const element = ref.current;
      if (!element) {
        frame = 0;
        return;
      }

      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.82;
      const distance = rect.height + window.innerHeight * 0.35;
      const current = start - rect.top;
      setProgress(Math.min(1, Math.max(0, current / distance)));
      frame = 0;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}

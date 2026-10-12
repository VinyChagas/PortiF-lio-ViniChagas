import { useEffect, useRef, useState } from 'react';

/**
 * Ativa etapas conforme entram na viewport e mantém-nas concluídas.
 * Complementa useElementProgress (linha) com ativação por node.
 */
export function useStepActivation(count: number, enabled = true) {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState<boolean[]>(() => Array.from({ length: count }, () => false));

  useEffect(() => {
    setActive(Array.from({ length: count }, () => false));
    itemRefs.current = itemRefs.current.slice(0, count);
  }, [count]);

  useEffect(() => {
    if (!enabled || count === 0) return;

    const nodes = itemRefs.current.filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((current) => {
          const next = [...current];
          let changed = false;

          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = nodes.indexOf(entry.target as HTMLElement);
            if (index < 0 || next[index]) continue;
            next[index] = true;
            changed = true;
          }

          return changed ? next : current;
        });
      },
      {
        rootMargin: '-18% 0px -28% 0px',
        threshold: [0.15, 0.35],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [count, enabled]);

  const setItemRef = (index: number) => (node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  return { active, setItemRef };
}

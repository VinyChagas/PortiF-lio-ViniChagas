import { useEffect, useState } from 'react';

const SECTION_IDS = ['inicio', 'sobre', 'projetos', 'experiencia', 'contato'] as const;

export function useActiveSection() {
  const [active, setActive] = useState<string>('inicio');

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      {
        rootMargin: '-42% 0px -42% 0px',
        threshold: [0.05, 0.2, 0.45, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

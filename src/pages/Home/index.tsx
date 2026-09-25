import { useLayoutEffect } from 'react';
import { SiteShell } from '@/components/layout/SiteShell';
import { About } from '@/sections/home/About';
import { Experience } from '@/sections/home/Experience';
import { FinalCta } from '@/sections/home/FinalCta';
import { Hero } from '@/sections/home/Hero';
import { PracticeAreas } from '@/sections/home/PracticeAreas';
import { SelectedProjects } from '@/sections/home/SelectedProjects';
import { TechnologyEcosystem } from '@/sections/home/TechnologyEcosystem';

export function HomePage() {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    document.getElementById(id)?.scrollIntoView();
    html.style.scrollBehavior = previous;
  }, []);

  return (
    <SiteShell>
      <main id="conteudo">
        <Hero />
        <About />
        <PracticeAreas />
        <TechnologyEcosystem />
        <SelectedProjects />
        <Experience />
        <FinalCta />
      </main>
    </SiteShell>
  );
}

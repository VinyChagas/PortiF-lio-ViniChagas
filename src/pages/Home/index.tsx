import { useEffect } from 'react';
import { SiteShell } from '@/components/layout/SiteShell';
import { About } from '@/sections/home/About';
import { Experience } from '@/sections/home/Experience';
import { FinalCta } from '@/sections/home/FinalCta';
import { Hero } from '@/sections/home/Hero';
import { PracticeAreas } from '@/sections/home/PracticeAreas';
import { SelectedProjects } from '@/sections/home/SelectedProjects';

export function HomePage() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <SiteShell>
      <main id="conteudo">
        <Hero />
        <About />
        <PracticeAreas />
        <SelectedProjects />
        <Experience />
        <FinalCta />
      </main>
    </SiteShell>
  );
}

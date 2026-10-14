import { useEffect, useState } from 'react';
import { projects as staticProjects } from '@/data/projects';
import { loadProjectBySlug, loadProjects } from '@/data/projects/runtime';
import type { PortfolioProject } from '@/types/project';

/**
 * Carrega projetos do Studio (publicados) com fallback imediato ao catálogo estático.
 * Após a resposta da API, a lista reflete somente o publicado (sem rascunhos).
 */
export function usePortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>(staticProjects);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void loadProjects().then((items) => {
      if (!cancelled) {
        setProjects(items);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  return {
    projects,
    featured,
    ready,
  };
}

export function usePortfolioProject(slug: string) {
  const [project, setProject] = useState<PortfolioProject | undefined>(() =>
    staticProjects.find((p) => p.slug === slug),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setProject(staticProjects.find((p) => p.slug === slug));
    setReady(false);
    void loadProjectBySlug(slug).then((item) => {
      if (!cancelled) {
        setProject(item);
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { project, ready };
}

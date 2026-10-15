import { projects as staticProjects } from './catalog';
import type { PortfolioProject } from '@/types/project';
import { fetchStudioCatalog, fetchStudioProjectBySlug } from '@/services/studio/client';
import { adaptStudioProject, mergePublishedCatalog, preserveLocalAssets } from '@/services/studio/adapter';

let cache: {
  at: number;
  projects: PortfolioProject[];
  source: 'static' | 'hybrid';
} | null = null;

const CACHE_TTL_MS = 60_000;

/**
 * Catálogo efetivo:
 * - Studio com itens publicados → somente publicados (rascunhos não entram).
 * - API indisponível/vazia → fallback ao catálogo estático (rollback offline).
 */
export async function loadProjects(): Promise<PortfolioProject[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.projects;

  const studio = await fetchStudioCatalog();
  if (!studio?.items?.length) {
    cache = { at: Date.now(), projects: staticProjects, source: 'static' };
    return staticProjects;
  }

  const { projects } = mergePublishedCatalog(staticProjects, studio.items);
  cache = { at: Date.now(), projects, source: 'hybrid' };
  return projects;
}

export async function loadProjectBySlug(slug: string): Promise<PortfolioProject | undefined> {
  const remote = await fetchStudioProjectBySlug(slug);
  if (remote) {
    const staticMatch = staticProjects.find((p) => p.slug === slug);
    return preserveLocalAssets(staticMatch, adaptStudioProject(remote));
  }

  const all = await loadProjects();
  return all.find((p) => p.slug === slug);
}

export function getStaticProjects(): PortfolioProject[] {
  return staticProjects;
}

export function clearProjectsCache() {
  cache = null;
}

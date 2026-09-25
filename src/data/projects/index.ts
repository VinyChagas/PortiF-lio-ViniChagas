import type { PortfolioProject } from '@/types/project';
import { automacaoNfse } from './automacao-nfse';
import { baixarRas } from './baixarras';

export const projects: PortfolioProject[] = [automacaoNfse, baixarRas];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

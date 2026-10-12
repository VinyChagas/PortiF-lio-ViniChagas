import { projects } from './catalog';

export { projects } from './catalog';

export const featuredProjects = projects
  .filter((project) => project.featured)
  .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

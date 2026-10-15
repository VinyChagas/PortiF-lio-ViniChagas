import { categoryLabel } from '@/data/projects/categories';
import { technologyName } from '@/data/technologies';
import { coverImage } from '@/lib/project-media';
import type { PortfolioProject } from '@/types/project';

export const SHOWCASE_LIMIT = 4;
export const SHOWCASE_TECH_LIMIT = 3;
export const SHOWCASE_INTERVAL_MS = 7000;
export const SHOWCASE_TRANSITION_MS = 520;

export type ShowcaseSlide = {
  id: string;
  slug: string;
  href: string;
  title: string;
  category: string;
  description: string | null;
  technologies: string[];
  image: { src: string; alt: string } | null;
};

export function selectShowcaseProjects(
  projects: PortfolioProject[],
  limit = SHOWCASE_LIMIT,
): PortfolioProject[] {
  const featured = projects
    .filter((project) => project.featured)
    .sort(
      (a, b) =>
        (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99) || a.title.localeCompare(b.title, 'pt'),
    );
  const source = featured.length > 0 ? featured : projects;
  const seen = new Set<string>();
  const selected: PortfolioProject[] = [];

  for (const project of source) {
    if (!project.slug || seen.has(project.slug)) continue;
    seen.add(project.slug);
    selected.push(project);
    if (selected.length >= limit) break;
  }

  return selected;
}

export function toShowcaseSlide(project: PortfolioProject): ShowcaseSlide {
  const image = coverImage(project);
  const description = project.shortDescription?.trim() || null;
  const category = project.categories[0]
    ? categoryLabel(project.categories[0])
    : project.context.label;

  return {
    id: project.id,
    slug: project.slug,
    href: `/projetos/${project.slug}`,
    title: project.title,
    category,
    description,
    technologies: project.technologies
      .slice(0, SHOWCASE_TECH_LIMIT)
      .map((id) => technologyName(id)),
    image: image ? { src: image.src, alt: image.alt } : null,
  };
}

export function stepShowcaseIndex(
  current: number,
  count: number,
  direction: 'next' | 'previous',
): number {
  if (count <= 0) return 0;
  if (direction === 'next') return (current + 1) % count;
  return (current - 1 + count) % count;
}

export function showcaseIntentFromKey(key: string): 'next' | 'previous' | null {
  if (key === 'ArrowRight') return 'next';
  if (key === 'ArrowLeft') return 'previous';
  return null;
}

export function canAutoplayShowcase(input: {
  count: number;
  reducedMotion: boolean;
  pausedByUser: boolean;
  pointerInside: boolean;
  focusInside: boolean;
  inView: boolean;
  documentHidden: boolean;
}): boolean {
  return (
    input.count > 1 &&
    !input.reducedMotion &&
    !input.pausedByUser &&
    !input.pointerInside &&
    !input.focusInside &&
    input.inView &&
    !input.documentHidden
  );
}

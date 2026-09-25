import type { PortfolioProject, ProjectMediaItem } from '@/types/project';

const staticKinds = new Set<ProjectMediaItem['kind']>([undefined, 'image', 'gif', 'diagram']);

export function publicProjectImages(project: PortfolioProject): ProjectMediaItem[] {
  const media = project.media;
  if (media?.approvedForPublic !== true) return [];

  const shots = (media.screenshots ?? []).filter((item) => item.src && staticKinds.has(item.kind));
  if (!media.cover || shots.some((item) => item.src === media.cover)) return shots;

  return [
    {
      src: media.cover,
      alt: `${project.title}. Evidência visual do projeto.`,
      type: 'interface',
      kind: 'image',
    },
    ...shots,
  ];
}

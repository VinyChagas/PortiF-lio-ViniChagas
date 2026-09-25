import type { PortfolioProject, ProjectMediaItem, ProjectVideo } from '@/types/project';

const staticKinds = new Set<ProjectMediaItem['kind']>([undefined, 'image', 'gif', 'diagram']);

function staticItems(items: ProjectMediaItem[] | undefined) {
  return (items ?? []).filter((item) => item.src && staticKinds.has(item.kind));
}

export function publicProjectImages(project: PortfolioProject): ProjectMediaItem[] {
  const media = project.media;
  if (media?.approvedForPublic !== true) return [];

  const shots = staticItems(media.screenshots);
  const diagrams = staticItems(media.diagrams).filter(
    (item) => !shots.some((shot) => shot.src === item.src),
  );
  const cover = media.cover;
  const images: ProjectMediaItem[] = !cover || shots.some((item) => item.src === cover)
    ? shots
    : [
        {
          src: cover,
          alt: `${project.title}. Evidência visual do projeto.`,
          type: 'interface',
          kind: 'image',
        },
        ...shots,
      ];

  return [...images, ...diagrams];
}

export function publicProjectVideos(project: PortfolioProject): ProjectVideo[] {
  const media = project.media;
  if (media?.approvedForPublic !== true) return [];
  return (media.videos ?? []).filter((video) => video.src && video.title);
}

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
  return (media.videos ?? [])
    .filter((video) => Boolean(video.src?.trim()))
    .map((video) => ({
      ...video,
      title: video.title?.trim() || 'Demonstração',
    }));
}

/** Normaliza sectionKey do Studio para id de seção de documentação / agrupamento. */
export function mediaSectionGroup(sectionKey: string | undefined): string {
  const key = (sectionKey || '').toLowerCase();
  if (!key) return 'evidence';
  if (key.includes('architect')) return 'architecture';
  if (key.includes('implement')) return 'implementation';
  if (key.includes('result') || key.includes('outcome')) return 'result';
  if (key.includes('challenge')) return 'challenges';
  if (key.includes('decision')) return 'decisions';
  if (key.includes('business') || key.includes('context') || key.includes('problem')) {
    return 'businessRules';
  }
  return 'evidence';
}

export function imagesForSection(
  project: PortfolioProject,
  sectionId: string,
): ProjectMediaItem[] {
  return publicProjectImages(project).filter((item) => mediaSectionGroup(item.sectionKey) === sectionId);
}

export function unsectionedImages(project: PortfolioProject): ProjectMediaItem[] {
  return publicProjectImages(project).filter((item) => mediaSectionGroup(item.sectionKey) === 'evidence');
}

export function coverImage(project: PortfolioProject): ProjectMediaItem | undefined {
  const images = publicProjectImages(project);
  if (!images.length) return undefined;
  const coverSrc = project.media?.cover;
  if (coverSrc) {
    const match = images.find((item) => item.src === coverSrc || item.src.endsWith(coverSrc));
    if (match) return match;
  }
  return images[0];
}

/** Roadmap dedicado — nunca fallback para capa ou galeria. */
export function roadmapImage(project: PortfolioProject): ProjectMediaItem | undefined {
  const media = project.media;
  if (media?.approvedForPublic !== true) return undefined;
  const roadmap = media.roadmap;
  if (!roadmap?.src) return undefined;
  return {
    ...roadmap,
    kind: roadmap.kind ?? 'image',
    alt: roadmap.alt || roadmap.caption || '',
  };
}

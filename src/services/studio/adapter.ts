import { normalizeTechnologyId } from '@/data/technologies';
import type { PortfolioProject } from '@/types/project';
import { studioMediaAbsoluteUrl } from './client';

/**
 * Normaliza um projeto vindo do Studio para o contrato dos componentes existentes.
 * Não altera layout — apenas resolve URLs de mídia e campos opcionais.
 */
function hasRenderableMedia(media: NonNullable<PortfolioProject['media']>): boolean {
  return Boolean(
    media.cover ||
      media.screenshots?.length ||
      media.videos?.length ||
      media.diagrams?.length,
  );
}

/** Paths de arquivo de trabalho / content não são servidos pelo SPA nginx. */
function isBundledOrHttpAsset(url: string | undefined): boolean {
  if (!url) return false;
  if (/^https?:\/\//i.test(url)) return true;
  if (url.startsWith('/assets/')) return true;
  if (url.startsWith('data:')) return true;
  // Vite às vezes embute como caminho absoluto gerado sem /assets prefix em dev; em prod é /assets
  if (url.startsWith('/content/')) return false;
  return !url.includes('/content/projects/');
}

export function adaptStudioProject(raw: PortfolioProject): PortfolioProject {
  const media = raw.media
    ? {
        ...raw.media,
        // Snapshot público do Studio já filtrado — liberar gate de mídia do site.
        approvedForPublic:
          raw.media.approvedForPublic === true || hasRenderableMedia(raw.media),
        cover: studioMediaAbsoluteUrl(raw.media.cover) ?? raw.media.cover,
        roadmap: raw.media.roadmap
          ? {
              ...raw.media.roadmap,
              kind: raw.media.roadmap.kind ?? 'image',
              src: studioMediaAbsoluteUrl(raw.media.roadmap.src) ?? raw.media.roadmap.src,
              alt: raw.media.roadmap.alt || raw.media.roadmap.caption || '',
              caption: raw.media.roadmap.caption || undefined,
            }
          : undefined,
        screenshots: raw.media.screenshots?.map((item) => ({
          ...item,
          kind: item.kind ?? 'image',
          src: studioMediaAbsoluteUrl(item.src) ?? item.src,
          alt: item.alt || item.caption || '',
          caption: item.caption || undefined,
          sectionKey: item.sectionKey || undefined,
        })),
        diagrams: raw.media.diagrams?.map((item) => ({
          ...item,
          kind: item.kind ?? 'diagram',
          src: studioMediaAbsoluteUrl(item.src) ?? item.src,
          alt: item.alt || item.caption || '',
          caption: item.caption || undefined,
          sectionKey: item.sectionKey || undefined,
        })),
        videos: raw.media.videos?.map((item) => ({
          ...item,
          src: studioMediaAbsoluteUrl(item.src) ?? item.src,
          poster: studioMediaAbsoluteUrl(item.poster) ?? item.poster,
        })),
      }
    : undefined;

  return {
    ...raw,
    technologies: (raw.technologies ?? []).map((id) => normalizeTechnologyId(String(id))).filter(Boolean),
    media,
  };
}

/**
 * Preserva avatares/mídia locais do catálogo estático quando o Studio
 * trouxe paths de content/ ou mídia ainda não servível no SPA.
 * Não reintroduz projetos estáticos ausentes do catálogo publicado.
 */
export function preserveLocalAssets(
  staticProject: PortfolioProject | undefined,
  studioProject: PortfolioProject,
): PortfolioProject {
  if (!staticProject) return studioProject;

  let agents = studioProject.agents;
  if (studioProject.agents?.length && staticProject.agents?.length) {
    agents = studioProject.agents.map((agent) => {
      const local = staticProject.agents?.find((item) => item.id === agent.id);
      if (!local) return agent;
      const keepLocalAvatar = !isBundledOrHttpAsset(agent.avatar);
      return {
        ...agent,
        avatar: keepLocalAvatar ? local.avatar : agent.avatar,
        avatarAlt: agent.avatarAlt || local.avatarAlt,
      };
    });
  } else if (!studioProject.agents?.length && staticProject.agents?.length) {
    agents = staticProject.agents;
  }

  let media = studioProject.media;
  const studioHasMedia = Boolean(studioProject.media && hasRenderableMedia(studioProject.media));
  if (!studioHasMedia && staticProject.media) {
    media = staticProject.media;
  } else if (studioHasMedia && agents?.length && staticProject.agents?.length) {
    // Retratos locais seguem no case. A capa publicada no Studio permanece para a vitrine.
    const cover = studioProject.media?.cover;
    media = cover
      ? {
          approvedForPublic: true,
          cover,
        }
      : staticProject.media;
  }

  return {
    ...studioProject,
    agents,
    media,
  };
}

/**
 * Catálogo publicado: apenas slugs do Studio.
 * Assets locais (avatars Vite) são reaplicados a partir do estático por slug.
 */
export function mergePublishedCatalog(
  staticProjects: PortfolioProject[],
  studioProjects: PortfolioProject[],
): { projects: PortfolioProject[]; fromStudio: number; fromStatic: number } {
  const staticBySlug = new Map(staticProjects.map((p) => [p.slug, p]));
  const projects = studioProjects
    .map((raw) => preserveLocalAssets(staticBySlug.get(raw.slug), adaptStudioProject(raw)))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
    });

  return {
    projects,
    fromStudio: studioProjects.length,
    fromStatic: 0,
  };
}

/**
 * @deprecated Prefer `mergePublishedCatalog` no fluxo de lançamento.
 * Mantido para testes de overlay pontual.
 */
export function mergeCatalog(
  staticProjects: PortfolioProject[],
  studioProjects: PortfolioProject[],
): { projects: PortfolioProject[]; fromStudio: number; fromStatic: number } {
  if (staticProjects.length === 0) {
    return mergePublishedCatalog([], studioProjects);
  }

  const bySlug = new Map<string, PortfolioProject>();
  for (const p of staticProjects) bySlug.set(p.slug, p);

  let fromStudio = 0;
  for (const raw of studioProjects) {
    const adapted = adaptStudioProject(raw);
    const merged = preserveLocalAssets(bySlug.get(adapted.slug), adapted);
    bySlug.set(merged.slug, merged);
    fromStudio += 1;
  }

  const projects = [...bySlug.values()].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
  });

  return {
    projects,
    fromStudio,
    fromStatic: Math.max(0, projects.length - fromStudio),
  };
}

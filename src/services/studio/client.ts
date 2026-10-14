import type { PortfolioProject } from '@/types/project';

const DEFAULT_API = 'https://control.vinichagas.cloud/api/portfolio/public';

function apiBase(): string {
  const fromEnv = import.meta.env.VITE_STUDIO_PUBLIC_API?.trim();
  return (fromEnv || DEFAULT_API).replace(/\/$/, '');
}

export type StudioCatalogResponse = {
  items: PortfolioProject[];
  source: string;
};

/**
 * Cliente HTTP do CMS (somente leitura pública).
 * Timeout curto + falha silenciosa para fallback estático.
 */
export async function fetchStudioCatalog(timeoutMs = 4000): Promise<StudioCatalogResponse | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${apiBase()}/catalog`, {
      signal: controller.signal,
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as StudioCatalogResponse;
    if (!data?.items || !Array.isArray(data.items)) return null;
    return data;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchStudioProjectBySlug(
  slug: string,
  timeoutMs = 4000,
): Promise<PortfolioProject | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${apiBase()}/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      credentials: 'omit',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { project?: PortfolioProject };
    return data.project ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function studioMediaAbsoluteUrl(pathOrUrl: string | undefined): string | undefined {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('/api/portfolio/public/media/')) {
    const origin = apiBase().replace(/\/api\/portfolio\/public$/, '');
    return `${origin}${pathOrUrl}`;
  }
  return pathOrUrl;
}

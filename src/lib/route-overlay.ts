export const ROUTE_OVERLAY_MAX_MS = 900;
export const ROUTE_OVERLAY_EXIT_MS = 380;

export type RouteOverlay = {
  path: string;
  title: string;
  phase: 'in' | 'out';
};

export type RouteOverlayEvent =
  | { type: 'navigate'; from: string; to: string; title: string | null; reduced: boolean }
  | { type: 'ready'; path: string }
  | { type: 'timeout'; path: string }
  | { type: 'exited' };

export function isCasePath(pathname: string) {
  return /^\/projetos\/[^/]+$/.test(pathname);
}

export function caseSlug(pathname: string) {
  const match = pathname.match(/^\/projetos\/([^/]+)$/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function caseTransitionTitle(
  pathname: string,
  titleForSlug: (slug: string) => string | undefined,
): string | null {
  const slug = caseSlug(pathname);
  if (!slug) return null;
  const title = titleForSlug(slug)?.trim();
  if (title) return title;
  return slug.replace(/-/g, ' ');
}

export function reduceRouteOverlay(
  current: RouteOverlay | null,
  event: RouteOverlayEvent,
): RouteOverlay | null {
  switch (event.type) {
    case 'navigate': {
      if (event.reduced || event.from === event.to || !isCasePath(event.to) || !event.title) {
        return null;
      }
      return { path: event.to, title: event.title, phase: 'in' };
    }
    case 'ready':
    case 'timeout': {
      if (!current || current.path !== event.path || current.phase === 'out') return current;
      return { ...current, phase: 'out' };
    }
    case 'exited':
      return null;
    default:
      return current;
  }
}

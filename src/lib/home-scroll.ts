export const HOME_SCROLL_KEY = 'portfolio-home-scroll';

export function saveHomeScroll() {
  sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
}

export function readHomeScroll() {
  const raw = sessionStorage.getItem(HOME_SCROLL_KEY);
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function scrollWithoutSmooth(top: number) {
  const html = document.documentElement;
  html.style.scrollBehavior = 'auto';
  window.scrollTo({ top, left: 0, behavior: 'instant' });
  requestAnimationFrame(() => {
    window.scrollTo({ top, left: 0, behavior: 'instant' });
  });
}

export function restoreHomeScroll() {
  const saved = readHomeScroll();
  if (saved !== null) {
    scrollWithoutSmooth(saved);
    return;
  }
  const projects = document.getElementById('projetos');
  scrollWithoutSmooth(projects?.offsetTop ?? 0);
}

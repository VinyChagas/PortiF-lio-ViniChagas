/**
 * Contagem dinâmica da seção de destaques.
 * O denominador é o total de projetos públicos; o numerador é a posição no carrossel de destaques.
 */
export function featuredCounterLabel(activeIndex: number, featuredCount: number, publishedCount: number) {
  const safeFeatured = Math.max(0, featuredCount);
  const safePublished = Math.max(safeFeatured, publishedCount);
  const position = safeFeatured === 0 ? 0 : Math.min(Math.max(activeIndex, 0), safeFeatured - 1) + 1;
  return {
    position,
    total: safePublished,
    label: `${String(position).padStart(2, '0')} / ${String(safePublished).padStart(2, '0')}`,
  };
}

/** Projetos públicos fora dos destaques exibidos. Nunca negativo. */
export function remainingProjectsCount(publishedCount: number, featuredDisplayed: number) {
  return Math.max(0, publishedCount - featuredDisplayed);
}

export function remainingProjectsLabel(remaining: number) {
  if (remaining <= 0) return null;
  if (remaining === 1) return 'Ver outro 1 projeto';
  return `Ver outros ${remaining} projetos`;
}

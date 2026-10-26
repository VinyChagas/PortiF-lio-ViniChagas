import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import { technologyName } from '@/data/technologies';
import { revealViewport } from '@/lib/motion';
import type { PortfolioProject } from '@/types/project';
import {
  canAutoplayShowcase,
  selectShowcaseProjects,
  showcaseIntentFromKey,
  stepShowcaseIndex,
  toShowcaseSlide,
} from './showcase';

function project(
  overrides: Partial<PortfolioProject> & Pick<PortfolioProject, 'id' | 'slug' | 'title'>,
): PortfolioProject {
  return {
    context: { label: 'Contexto' },
    status: 'developed',
    featured: false,
    categories: ['software'],
    technologies: [],
    accent: 'blue',
    ...overrides,
  };
}

const autoplayOn = {
  count: 3,
  reducedMotion: false,
  pausedByUser: false,
  pointerInside: false,
  focusInside: false,
  inView: true,
  documentHidden: false,
};

describe('showcase de projetos', () => {
  it('prioriza destaques publicados na ordem do catálogo', () => {
    const slides = selectShowcaseProjects(projects).map(toShowcaseSlide);
    expect(slides.map((slide) => slide.slug)).toEqual([
      'automacao-nfse',
      'gestor-solicitacoes-operacionais',
      'agentes-ia',
      'omeab-miniserver',
    ]);
    for (const slide of slides) {
      const source = projects.find((item) => item.slug === slide.slug);
      expect(source?.featured).toBe(true);
      expect(slide.href).toBe(`/projetos/${slide.slug}`);
      expect(slide.title).toBe(source?.title);
      expect(slide.description).toBe(source?.shortDescription?.trim() || null);
      expect(slide.technologies).toEqual(
        (source?.technologies ?? []).slice(0, 3).map((id) => technologyName(id)),
      );
    }
  });

  it('não deixa um buraco quando não há projetos', () => {
    expect(selectShowcaseProjects([])).toEqual([]);
  });

  it('funciona com um único projeto e não inventa mídia', () => {
    const only = project({
      id: 'solo',
      slug: 'solo',
      title: 'Solo',
      featured: true,
      featuredOrder: 1,
      shortDescription: 'Descrição **real** do case.',
      categories: ['ia'],
    });
    const [slide] = selectShowcaseProjects([only]).map(toShowcaseSlide);
    expect(slide.href).toBe('/projetos/solo');
    expect(slide.description).toBe('Descrição **real** do case.');
    expect(slide.image).toBeNull();
    expect(slide.category).toBe('IA');
    expect(slide.technologies).toEqual([]);
    expect(canAutoplayShowcase({ ...autoplayOn, count: 1 })).toBe(false);
  });

  it('usa publicados quando nenhum destaque existe, sem duplicar slug', () => {
    const items = [
      project({ id: 'a', slug: 'a', title: 'A' }),
      project({ id: 'a2', slug: 'a', title: 'A duplicado' }),
      project({ id: 'b', slug: 'b', title: 'B', technologies: ['react', 'typescript'] }),
    ];
    const selected = selectShowcaseProjects(items);
    expect(selected.map((item) => item.slug)).toEqual(['a', 'b']);
    expect(toShowcaseSlide(selected[1]).technologies).toEqual(['React', 'TypeScript']);
  });

  it('ignora não destacados quando existe destaque', () => {
    const items = [
      project({ id: 'plain', slug: 'plain', title: 'Comum' }),
      project({ id: 'star', slug: 'star', title: 'Destaque', featured: true, featuredOrder: 2 }),
    ];
    expect(selectShowcaseProjects(items).map((item) => item.slug)).toEqual(['star']);
  });

  it('respeita reduced motion, pausa, foco, visibilidade e aba oculta', () => {
    expect(canAutoplayShowcase(autoplayOn)).toBe(true);
    expect(canAutoplayShowcase({ ...autoplayOn, reducedMotion: true })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, pausedByUser: true })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, pointerInside: true })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, focusInside: true })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, inView: false })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, documentHidden: true })).toBe(false);
    expect(canAutoplayShowcase({ ...autoplayOn, settled: false })).toBe(false);
  });

  it('navega por teclado e dá a volta na lista', () => {
    expect(showcaseIntentFromKey('ArrowRight')).toBe('next');
    expect(showcaseIntentFromKey('ArrowLeft')).toBe('previous');
    expect(showcaseIntentFromKey('Enter')).toBeNull();
    expect(stepShowcaseIndex(0, 3, 'previous')).toBe(2);
    expect(stepShowcaseIndex(2, 3, 'next')).toBe(0);
  });

  it('não esconde conteúdo de forma permanente na revelação por scroll', () => {
    expect(revealViewport.once).toBe(true);
  });
});

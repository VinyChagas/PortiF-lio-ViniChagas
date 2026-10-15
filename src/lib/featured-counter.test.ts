import { describe, expect, it } from 'vitest';
import {
  featuredCounterLabel,
  remainingProjectsCount,
  remainingProjectsLabel,
} from './featured-counter';

describe('featuredCounterLabel', () => {
  it('usa o total público dinâmico no denominador', () => {
    expect(featuredCounterLabel(0, 4, 12).label).toBe('01 / 12');
    expect(featuredCounterLabel(3, 4, 12).label).toBe('04 / 12');
    expect(featuredCounterLabel(1, 4, 8).label).toBe('02 / 08');
  });

  it('não deixa o total menor que a quantidade de destaques', () => {
    expect(featuredCounterLabel(0, 4, 2).total).toBe(4);
  });
});

describe('remainingProjectsCount', () => {
  it('calcula restantes sem negativo', () => {
    expect(remainingProjectsCount(12, 4)).toBe(8);
    expect(remainingProjectsCount(8, 4)).toBe(4);
    expect(remainingProjectsCount(4, 4)).toBe(0);
    expect(remainingProjectsCount(3, 3)).toBe(0);
    expect(remainingProjectsCount(2, 4)).toBe(0);
  });
});

describe('remainingProjectsLabel', () => {
  it('omite CTA quando não há restantes', () => {
    expect(remainingProjectsLabel(0)).toBeNull();
    expect(remainingProjectsLabel(1)).toBe('Ver outro 1 projeto');
    expect(remainingProjectsLabel(8)).toBe('Ver outros 8 projetos');
  });
});

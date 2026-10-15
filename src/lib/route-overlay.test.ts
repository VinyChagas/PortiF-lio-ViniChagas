import { describe, expect, it } from 'vitest';
import {
  ROUTE_OVERLAY_MAX_MS,
  caseTransitionTitle,
  isCasePath,
  reduceRouteOverlay,
  type RouteOverlay,
} from './route-overlay';

const titles: Record<string, string> = {
  'automacao-nfse': 'Automação NFSe',
};

function navigate(from: string, to: string, reduced = false) {
  return reduceRouteOverlay(null, {
    type: 'navigate' as const,
    from,
    to,
    title: caseTransitionTitle(to, (slug) => titles[slug]),
    reduced,
  });
}

describe('transição de rotas', () => {
  it('abre a transição só ao entrar em um case', () => {
    expect(isCasePath('/projetos/automacao-nfse')).toBe(true);
    expect(isCasePath('/projetos')).toBe(false);
    expect(isCasePath('/')).toBe(false);

    expect(navigate('/', '/projetos/automacao-nfse')).toEqual({
      path: '/projetos/automacao-nfse',
      title: 'Automação NFSe',
      phase: 'in',
    });
    expect(navigate('/', '/projetos')).toBeNull();
    expect(navigate('/projetos/automacao-nfse', '/')).toBeNull();
  });

  it('o voltar do navegador encerra a transição', () => {
    const current = navigate('/', '/projetos/automacao-nfse') as RouteOverlay;
    expect(
      reduceRouteOverlay(current, {
        type: 'navigate',
        from: current.path,
        to: '/',
        title: null,
        reduced: false,
      }),
    ).toBeNull();
  });

  it('troca o case sem manter o título anterior', () => {
    const current = navigate('/', '/projetos/automacao-nfse');
    expect(
      reduceRouteOverlay(current, {
        type: 'navigate',
        from: '/projetos/automacao-nfse',
        to: '/projetos/case-novo',
        title: caseTransitionTitle('/projetos/case-novo', () => undefined),
        reduced: false,
      }),
    ).toEqual({
      path: '/projetos/case-novo',
      title: 'case novo',
      phase: 'in',
    });
  });

  it('sai quando os dados essenciais ficam prontos ou no timeout', () => {
    const current = navigate('/', '/projetos/automacao-nfse') as RouteOverlay;
    expect(reduceRouteOverlay(current, { type: 'ready', path: current.path })).toMatchObject({
      phase: 'out',
    });
    expect(reduceRouteOverlay(current, { type: 'ready', path: '/outra' })).toBe(current);
    expect(reduceRouteOverlay(current, { type: 'timeout', path: current.path })?.phase).toBe('out');
    expect(reduceRouteOverlay({ ...current, phase: 'out' }, { type: 'exited' })).toBeNull();
  });

  it('não bloqueia quando o visitante prefere menos movimento', () => {
    expect(navigate('/', '/projetos/automacao-nfse', true)).toBeNull();
  });

  it('não prende a navegação além de uma janela curta', () => {
    expect(ROUTE_OVERLAY_MAX_MS).toBeLessThanOrEqual(1200);
  });
});

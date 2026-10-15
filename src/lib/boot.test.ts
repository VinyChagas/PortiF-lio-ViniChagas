import { describe, expect, it } from 'vitest';
import {
  BOOT_MAX_MS,
  bootCanReveal,
  criticalAssetsForPath,
  type BootAssetStatus,
} from './boot';

describe('boot sequence', () => {
  it('na homepage espera fontes, logo e imagem principal', () => {
    expect(criticalAssetsForPath('/')).toEqual(['fonts', 'logo', 'hero']);
  });

  it('em um case não espera a paisagem da homepage nem mídias secundárias', () => {
    expect(criticalAssetsForPath('/projetos/automacao-nfse')).toEqual(['fonts', 'logo']);
    expect(criticalAssetsForPath('/projetos')).toEqual(['fonts', 'logo']);
  });

  it('revela quando os recursos críticos terminam, inclusive com falha', () => {
    const required = criticalAssetsForPath('/');
    const pending: Partial<Record<'fonts' | 'logo' | 'hero', BootAssetStatus>> = {
      fonts: 'ready',
      logo: 'ready',
      hero: 'pending',
    };
    expect(bootCanReveal(pending, required)).toBe(false);

    expect(bootCanReveal({ ...pending, hero: 'failed' }, required)).toBe(true);
    expect(bootCanReveal({ fonts: 'timed-out', logo: 'failed', hero: 'ready' }, required)).toBe(true);
  });

  it('não fica preso: o limite de espera é finito e curto', () => {
    expect(BOOT_MAX_MS).toBeGreaterThan(0);
    expect(BOOT_MAX_MS).toBeLessThanOrEqual(4000);
  });
});

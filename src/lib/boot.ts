export const BOOT_FONT_TIMEOUT_MS = 1200;
export const BOOT_ASSET_TIMEOUT_MS = 2200;
export const BOOT_MAX_MS = 2800;
export const BOOT_EXIT_MS = 460;

export type BootAssetId = 'fonts' | 'logo' | 'hero';
export type BootAssetStatus = 'pending' | 'ready' | 'failed' | 'timed-out';

/** Recursos que realmente bloqueiam a primeira pintura útil da rota. */
export function criticalAssetsForPath(pathname: string): BootAssetId[] {
  if (pathname === '/' || pathname === '') return ['fonts', 'logo', 'hero'];
  return ['fonts', 'logo'];
}

export function bootCanReveal(
  statuses: Partial<Record<BootAssetId, BootAssetStatus>>,
  required: BootAssetId[],
): boolean {
  return required.every((id) => {
    const status = statuses[id];
    return status === 'ready' || status === 'failed' || status === 'timed-out';
  });
}

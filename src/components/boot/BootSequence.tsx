import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { BrandLogo } from '@/components/common/BrandLogo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/assets';
import {
  BOOT_ASSET_TIMEOUT_MS,
  BOOT_EXIT_MS,
  BOOT_FONT_TIMEOUT_MS,
  BOOT_MAX_MS,
  bootCanReveal,
  criticalAssetsForPath,
  type BootAssetId,
  type BootAssetStatus,
} from '@/lib/boot';

type BootPhase = 'visible' | 'exiting' | 'done';

function whenFontsReady(timeoutMs: number): Promise<BootAssetStatus> {
  const ready =
    document.fonts?.ready.then(() => 'ready' as const) ?? Promise.resolve('ready' as const);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (status: BootAssetStatus) => {
      if (settled) return;
      settled = true;
      resolve(status);
    };
    const timer = window.setTimeout(() => finish('timed-out'), timeoutMs);
    ready.then(
      () => {
        window.clearTimeout(timer);
        finish('ready');
      },
      () => {
        window.clearTimeout(timer);
        finish('failed');
      },
    );
  });
}

function whenImageSettled(src: string, timeoutMs: number): Promise<BootAssetStatus> {
  return new Promise((resolve) => {
    const image = new Image();
    let settled = false;
    const finish = (status: BootAssetStatus) => {
      if (settled) return;
      settled = true;
      resolve(status);
    };
    const timer = window.setTimeout(() => finish('timed-out'), timeoutMs);
    image.onload = () => {
      window.clearTimeout(timer);
      finish('ready');
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      finish('failed');
    };
    image.src = src;
    if (image.complete) {
      window.clearTimeout(timer);
      finish(image.naturalWidth > 0 ? 'ready' : 'failed');
    }
  });
}

function useBootPhase(pathname: string) {
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const [phase, setPhase] = useState<BootPhase>('visible');

  useEffect(() => {
    let cancelled = false;
    const required = criticalAssetsForPath(pathname);
    const statuses: Partial<Record<BootAssetId, BootAssetStatus>> = {};
    for (const id of required) statuses[id] = 'pending';

    const reveal = () => {
      if (cancelled) return;
      setPhase((current) => {
        if (current !== 'visible') return current;
        return reducedRef.current ? 'done' : 'exiting';
      });
    };

    const settle = (id: BootAssetId, status: BootAssetStatus) => {
      statuses[id] = status;
      if (bootCanReveal(statuses, required)) reveal();
    };

    const maxTimer = window.setTimeout(reveal, BOOT_MAX_MS);

    if (required.includes('fonts')) {
      void whenFontsReady(BOOT_FONT_TIMEOUT_MS).then((status) => settle('fonts', status));
    }
    if (required.includes('logo')) {
      void whenImageSettled(ASSETS.logo, BOOT_ASSET_TIMEOUT_MS).then((status) => settle('logo', status));
    }
    if (required.includes('hero')) {
      void whenImageSettled(ASSETS.ocean, BOOT_ASSET_TIMEOUT_MS).then((status) => settle('hero', status));
    }

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== 'exiting') return;
    const timer = window.setTimeout(() => setPhase('done'), reduced ? 0 : BOOT_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  return phase;
}

export function BootGate({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const initialPath = useRef(pathname);
  const phase = useBootPhase(initialPath.current);

  return (
    <>
      <div inert={phase === 'visible' ? true : undefined}>{children}</div>
      {phase === 'done' ? null : <BootOverlay phase={phase} />}
    </>
  );
}

function BootOverlay({ phase }: { phase: Exclude<BootPhase, 'done'> }) {
  return (
    <div className="boot-overlay" data-phase={phase} role="status" aria-live="polite" aria-busy={phase === 'visible'}>
      <p className="sr-only">VinyLab inicializando a experiência</p>
      <div className="boot-stage">
        <div className="boot-lights" aria-hidden="true">
          <span className="boot-light boot-light-blue" />
          <span className="boot-light boot-light-orange" />
        </div>
        <BrandLogo alt="" priority className="boot-logo" />
      </div>
      <p className="boot-label font-mono tracking-[0.18em] text-text-muted uppercase" aria-hidden="true">
        VinyLab / Initializing experience
      </p>
      <div className="boot-line" aria-hidden="true">
        <span className="boot-line-bar" />
      </div>
    </div>
  );
}

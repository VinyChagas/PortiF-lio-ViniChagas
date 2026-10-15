import { BrandLogo } from '@/components/common/BrandLogo';

type CaseTransitionOverlayProps = {
  title: string;
  phase: 'in' | 'out';
};

export function CaseTransitionOverlay({ title, phase }: CaseTransitionOverlayProps) {
  return (
    <div
      className="case-overlay"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-busy={phase === 'in'}
      aria-hidden={phase === 'out' ? true : undefined}
    >
      <p className="sr-only">Carregando case {title}</p>
      <div className="case-overlay-panel">
        <BrandLogo alt="" className="case-overlay-logo" />
        <p className="font-mono text-[0.68rem] tracking-[0.18em] text-text-muted uppercase" aria-hidden="true">
          VinyLab / Loading case
        </p>
        <p
          className="mt-2 max-w-[16ch] text-center text-xl font-semibold tracking-[-0.03em] text-balance text-text-primary"
          aria-hidden="true"
        >
          {title}
        </p>
        <div className="boot-line mt-5" aria-hidden="true">
          <span className="boot-line-bar" />
        </div>
      </div>
    </div>
  );
}

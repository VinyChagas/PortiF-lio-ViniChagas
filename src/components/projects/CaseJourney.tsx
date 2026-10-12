import { useRef } from 'react';
import { cn } from '@/lib/cn';
import { useElementProgress } from '@/hooks/useElementProgress';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useStepActivation } from '@/hooks/useStepActivation';
import type { ProjectJourneyStep } from '@/types/project';

type CaseJourneyProps = {
  steps: ProjectJourneyStep[];
  className?: string;
};

/** Progresso global → preenchimento do segmento entre etapa i e i+1. */
function segmentFill(progress: number, index: number, segmentCount: number, reduced: boolean) {
  if (reduced) return 1;
  if (segmentCount <= 0) return 0;
  const start = index / segmentCount;
  const end = (index + 1) / segmentCount;
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function Lane({
  tone,
  label,
  children,
  active,
  reduced,
}: {
  tone: 'business' | 'engineering';
  label: string;
  children?: string;
  active: boolean;
  reduced: boolean;
}) {
  const fromLeft = tone === 'business';
  const empty = !children;

  if (empty) {
    return (
      <div className={cn('hidden min-w-0 md:block', !reduced && !active && 'opacity-35')}>
        <p
          className={cn(
            'type-label font-mono tracking-[0.14em] uppercase',
            tone === 'business' ? 'text-brand-orange' : 'text-brand-cyan',
          )}
        >
          {label}
        </p>
        <p className="type-body mt-3 text-text-muted">—</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'min-w-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out)]',
        active || reduced
          ? 'translate-x-0 opacity-100'
          : cn('opacity-0', fromLeft ? '-translate-x-4' : 'translate-x-4'),
      )}
    >
      <p
        className={cn(
          'type-label font-mono tracking-[0.14em] uppercase',
          tone === 'business' ? 'text-brand-orange' : 'text-brand-cyan',
        )}
      >
        {label}
      </p>
      <p className="type-body mt-3 max-w-md text-text-secondary md:max-w-none">{children}</p>
    </div>
  );
}

function JourneyNode({
  active,
  reduced,
}: {
  active: boolean;
  reduced: boolean;
}) {
  const lit = active || reduced;

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative z-10 block h-2.5 w-2.5 shrink-0 rounded-full border transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-out)]',
        lit
          ? 'scale-105 border-brand-cyan/80 bg-brand-cyan/90 shadow-[0_0_10px_rgb(62_200_242_/_0.22)]'
          : 'scale-100 border-white/20 bg-transparent',
      )}
    />
  );
}

function StepLabel({
  number,
  label,
  active,
  align = 'center',
}: {
  number: string;
  label: string;
  active: boolean;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={cn(
        'mt-3 transition-colors duration-500',
        align === 'center' ? 'text-center' : 'text-left',
        active ? 'text-text-secondary' : 'text-text-muted',
      )}
    >
      <p className="type-label font-mono tracking-[0.18em] uppercase">
        <span className={active ? 'text-brand-cyan/80' : 'text-text-muted'}>{number}</span>
      </p>
      <p className="type-label mt-1 font-mono tracking-[0.16em] uppercase">{label}</p>
    </div>
  );
}

/** Segmento real entre etapas — gap geométrico, sem máscara. */
function ProgressSegment({
  fill,
  className,
}: {
  fill: number;
  className?: string;
}) {
  const clamped = Math.min(1, Math.max(0, fill));

  return (
    <div
      aria-hidden="true"
      className={cn('relative mt-5 w-px min-h-[4rem] flex-1 bg-white/[0.06]', className)}
    >
      <div
        className="absolute inset-x-0 top-0 w-px origin-top bg-linear-to-b from-brand-orange/45 via-white/18 to-brand-cyan/50"
        style={{ height: `${clamped * 100}%` }}
      />
    </div>
  );
}

export function CaseJourney({ steps, className }: CaseJourneyProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const progress = useElementProgress(trackRef);
  const { active, setItemRef } = useStepActivation(steps.length, !reduced);

  if (steps.length === 0) return null;

  const fill = reduced ? 1 : progress;
  const segmentCount = Math.max(0, steps.length - 1);

  return (
    <section
      className={cn('border-t border-white/10 pt-12', className)}
      aria-labelledby="case-journey-title"
    >
      <div className="flex flex-col items-center text-center">
        <p
          id="case-journey-title"
          className="type-label font-mono tracking-[0.2em] text-text-muted uppercase"
        >
          Case Journey
        </p>
        <div className="mt-5 flex w-full max-w-3xl items-center justify-between gap-6">
          <p className="type-label font-mono tracking-[0.14em] text-brand-orange uppercase">Negócio</p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-linear-to-r from-brand-orange/25 via-white/[0.06] to-brand-cyan/25"
          />
          <p className="type-label font-mono tracking-[0.14em] text-brand-cyan uppercase">Engenharia</p>
        </div>
      </div>

      <div ref={trackRef} className="relative z-10 mt-14 md:mt-16">
        <ol>
          {steps.map((step, index) => {
            const number = String(index + 1).padStart(2, '0');
            const isActive = reduced || Boolean(active[index]);
            const hasNext = index < steps.length - 1;
            const segmentProgress = hasNext
              ? segmentFill(fill, index, segmentCount, reduced)
              : 0;

            return (
              <li
                key={step.id}
                ref={setItemRef(index)}
                className="relative"
                data-active={isActive ? 'true' : 'false'}
              >
                {/* Desktop */}
                <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] md:items-stretch md:gap-10 lg:gap-14">
                  <Lane
                    tone="business"
                    label="Negócio"
                    active={isActive}
                    reduced={reduced}
                  >
                    {step.business}
                  </Lane>

                  <div className="relative flex h-full flex-col items-center pt-1">
                    <JourneyNode active={isActive} reduced={reduced} />
                    <StepLabel number={number} label={step.label} active={isActive} />
                    {hasNext ? <ProgressSegment fill={segmentProgress} /> : null}
                  </div>

                  <Lane
                    tone="engineering"
                    label="Engenharia"
                    active={isActive}
                    reduced={reduced}
                  >
                    {step.engineering}
                  </Lane>
                </div>

                {/* Mobile */}
                <div className="grid grid-cols-[0.75rem_minmax(0,1fr)] items-stretch gap-x-5 md:hidden">
                  <div className="relative flex h-full flex-col items-center pt-1">
                    <JourneyNode active={isActive} reduced={reduced} />
                    {hasNext ? <ProgressSegment fill={segmentProgress} className="mt-3" /> : null}
                  </div>

                  <div className="min-w-0 space-y-6 pb-16">
                    <StepLabel
                      number={number}
                      label={step.label}
                      active={isActive}
                      align="left"
                    />

                    {step.business ? (
                      <Lane tone="business" label="Negócio" active={isActive} reduced={reduced}>
                        {step.business}
                      </Lane>
                    ) : null}
                    {step.engineering ? (
                      <Lane
                        tone="engineering"
                        label="Engenharia"
                        active={isActive}
                        reduced={reduced}
                      >
                        {step.engineering}
                      </Lane>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

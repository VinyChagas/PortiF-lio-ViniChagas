import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { easeOutExpo, motionDuration } from '@/lib/motion';
import type { ProjectAgent } from '@/types/project';
import { DiagonalAccent } from './DiagonalAccent';
import { TechnicalGrid } from './TechnicalGrid';

type ProjectVisualProps = {
  accent: 'blue' | 'orange';
  index: number;
  title: string;
  status?: string;
  technologies: string[];
  cover?: string;
  coverAlt?: string;
  agents?: ProjectAgent[];
  compact?: boolean;
  priority?: boolean;
};

function AgentMediaCell({
  agent,
  priority,
}: {
  agent: ProjectAgent;
  priority: boolean;
}) {
  return (
    <figure className="relative flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-white/[0.02]">
      <div className="relative flex aspect-[4/5] items-center justify-center p-3 sm:p-4">
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-0 left-0 h-8 w-px',
            agent.id === 'argus' ? 'bg-brand-cyan/80' : 'bg-brand-orange/80',
          )}
        />
        {agent.avatar ? (
          <img
            src={agent.avatar}
            alt={agent.avatarAlt || agent.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-contain object-center"
          />
        ) : (
          <span className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">
            {agent.name}
          </span>
        )}
      </div>
      <figcaption className="border-t border-white/10 px-3 py-2.5 sm:px-3.5">
        <p className="type-label font-mono tracking-[0.14em] text-text-primary uppercase">
          {agent.name}
        </p>
        {agent.environment ? (
          <p className="type-meta mt-1 font-mono tracking-[0.08em] text-text-secondary uppercase">
            {agent.environment}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function ProjectVisual({
  accent,
  index,
  title,
  status,
  technologies,
  cover,
  coverAlt,
  agents,
  compact = false,
  priority = false,
}: ProjectVisualProps) {
  const reduced = usePrefersReducedMotion();
  const orange = accent === 'orange';
  const caseCode = String(index + 1).padStart(3, '0');
  const pair = agents && agents.length > 1 ? agents : undefined;

  const frame = (
    <div
      className={cn(
        'group/visual relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.08] bg-[#080b11]',
        compact ? 'min-h-[16rem]' : 'min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem]',
        orange
          ? 'shadow-[inset_-1px_0_0_rgb(255_90_31_/_0.45)]'
          : 'shadow-[inset_1px_0_0_rgb(62_200_242_/_0.45)]',
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: orange
            ? 'radial-gradient(70% 60% at 86% 72%, var(--glow-orange), transparent 68%), radial-gradient(40% 36% at 12% 18%, rgb(62 200 242 / 10%), transparent 70%)'
            : 'radial-gradient(70% 62% at 16% 28%, var(--glow-blue), transparent 68%), radial-gradient(36% 32% at 88% 80%, rgb(255 90 31 / 10%), transparent 70%)',
        }}
      />
      <TechnicalGrid className="opacity-80 transition-opacity duration-500 group-hover/visual:opacity-100" />

      <div className="relative z-[1] flex flex-1 flex-col">
        <p className="type-label shrink-0 px-5 pt-4 font-mono tracking-[0.16em] text-text-secondary sm:px-6 sm:pt-5">
          CASE / {caseCode}
        </p>

        {pair ? (
          <div className="relative grid flex-1 grid-cols-2 gap-2.5 px-4 py-4 sm:gap-3 sm:px-5 sm:py-5">
            {pair.map((agent) => (
              <AgentMediaCell key={agent.id} agent={agent} priority={priority} />
            ))}
          </div>
        ) : null}

        {cover && !pair ? (
          <div className="relative mx-[8%] mt-3 mb-2 aspect-[16/9] max-h-[11rem] overflow-hidden sm:max-h-[13rem] lg:max-h-[14rem]">
            <img
              src={cover}
              alt={coverAlt || ''}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/visual:scale-[1.015] group-hover/visual:opacity-100 group-hover/visual:contrast-110"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent)',
                maskImage:
                  'linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgb(62 200 242 / 16%), transparent 24%, transparent 76%, rgb(255 90 31 / 14%)), linear-gradient(to bottom, rgb(8 11 17 / 20%), transparent 18%, transparent 78%, rgb(8 11 17 / 45%))',
              }}
            />
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-2 px-2 text-center text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[0.85] font-semibold tracking-[-0.05em] text-white/[0.08]"
            >
              {title}
            </p>
          </div>
        ) : null}

        {!pair && !cover ? (
          <div className="relative flex flex-1 items-end px-5 pb-2 sm:px-6">
            <p
              aria-hidden="true"
              className="text-[clamp(2rem,4.5vw,3.6rem)] leading-[0.86] font-semibold tracking-[-0.05em] text-white/[0.07]"
            >
              {title}
            </p>
          </div>
        ) : null}

        <DiagonalAccent
          variant="slash"
          className={cn(
            'pointer-events-none absolute h-28 w-14 opacity-50 sm:h-36 sm:w-16',
            orange ? 'top-10 right-4 text-brand-orange/45' : 'bottom-24 left-4 text-brand-cyan/45',
          )}
        />

        <div className="relative z-[1] mt-auto flex items-end justify-between gap-4 border-t border-white/[0.08] bg-[#080b11]/80 px-5 py-4 backdrop-blur-[2px] sm:gap-6 sm:px-6 sm:py-4">
          <div className="min-w-0">
            {technologies.length > 0 ? (
              <>
                <p className="type-meta font-mono tracking-[0.14em] text-text-secondary uppercase">
                  Stack
                </p>
                <ul className="type-meta mt-1.5 space-y-0.5 font-mono tracking-[0.08em] text-text-primary uppercase">
                  {technologies.slice(0, 4).map((tech) => (
                    <li key={tech} className="truncate">
                      {tech}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          {status ? (
            <p className="type-meta max-w-[11rem] shrink-0 text-right font-mono leading-relaxed text-text-secondary sm:max-w-[14rem]">
              <span
                className={cn(
                  'mb-1 block tracking-[0.14em] uppercase',
                  orange ? 'text-brand-orange-light' : 'text-brand-cyan',
                )}
              >
                Status
              </span>
              {status}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (reduced || compact) return frame;

  return (
    <motion.div
      initial={{ clipPath: 'inset(14% 8% 14% 8%)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: motionDuration.reveal, ease: easeOutExpo }}
    >
      {frame}
    </motion.div>
  );
}

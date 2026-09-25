import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { easeOutExpo, motionDuration } from '@/lib/motion';
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
  compact?: boolean;
  priority?: boolean;
};

export function ProjectVisual({
  accent,
  index,
  title,
  status,
  technologies,
  cover,
  coverAlt,
  compact = false,
  priority = false,
}: ProjectVisualProps) {
  const reduced = usePrefersReducedMotion();
  const orange = accent === 'orange';
  const caseCode = String(index + 1).padStart(3, '0');

  const frame = (
    <div
      className={cn(
        'group/visual relative overflow-hidden bg-[#080b11]',
        compact ? 'min-h-[16rem] sm:min-h-[18rem]' : 'min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]',
        orange ? 'shadow-[inset_-1px_0_0_rgb(255_90_31_/_0.45)]' : 'shadow-[inset_1px_0_0_rgb(62_200_242_/_0.45)]',
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: orange
            ? 'radial-gradient(70% 60% at 86% 72%, var(--glow-orange), transparent 68%), radial-gradient(40% 36% at 12% 18%, rgb(62 200 242 / 10%), transparent 70%)'
            : 'radial-gradient(70% 62% at 16% 28%, var(--glow-blue), transparent 68%), radial-gradient(36% 32% at 88% 80%, rgb(255 90 31 / 10%), transparent 70%)',
        }}
      />
      <TechnicalGrid className="opacity-80 transition-opacity duration-500 group-hover/visual:opacity-100" />
      {cover ? (
        <div className="absolute inset-x-[9%] top-[18%] bottom-[48%] overflow-hidden">
          <img
            src={cover}
            alt={coverAlt || ''}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/visual:scale-[1.015] group-hover/visual:opacity-100 group-hover/visual:contrast-110"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent)',
              maskImage: 'linear-gradient(to bottom, transparent, #000 12%, #000 86%, transparent)',
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
        </div>
      ) : null}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-x-8 h-px opacity-70 transition-opacity duration-500 group-hover/visual:opacity-100',
          orange
            ? 'top-[34%] bg-linear-to-r from-transparent via-brand-orange/70 to-transparent'
            : 'top-[28%] bg-linear-to-r from-transparent via-brand-cyan/70 to-transparent',
        )}
      />
      <DiagonalAccent
        variant="slash"
        className={cn(
          'absolute h-44 w-20 opacity-80 transition-opacity duration-500 group-hover/visual:opacity-100',
          orange ? 'top-8 right-6 text-brand-orange/55' : 'bottom-10 left-6 text-brand-cyan/55',
        )}
      />
      <DiagonalAccent
        variant="bar"
        className={cn(
          'absolute h-7 w-28 opacity-80 transition-opacity duration-500 group-hover/visual:opacity-100',
          orange ? 'bottom-16 left-8 text-brand-cyan/40' : 'top-16 right-8 text-brand-orange/45',
        )}
      />

      <p className="type-label absolute top-5 left-6 font-mono tracking-[0.16em] text-text-secondary">
        CASE / {caseCode}
      </p>

      <p
        aria-hidden="true"
        className="absolute right-6 bottom-28 left-6 text-[clamp(3.2rem,7vw,6rem)] leading-[0.82] font-semibold tracking-[-0.06em] text-white/[0.07]"
      >
        {title}
      </p>

      <div className="absolute right-6 bottom-5 left-6 flex items-end justify-between gap-6">
        <div>
          {technologies.length > 0 ? (
            <>
              <p className="type-meta font-mono tracking-[0.14em] text-text-secondary uppercase">Stack</p>
              <ul className="type-meta mt-2 space-y-1 font-mono tracking-[0.08em] text-text-primary uppercase">
                {technologies.slice(0, 4).map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        {status ? (
          <p className="type-meta max-w-[14rem] text-right font-mono leading-relaxed text-text-secondary">
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

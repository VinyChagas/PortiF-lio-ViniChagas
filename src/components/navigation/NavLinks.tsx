import { navigation } from '@/data/navigation';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import { easeOutExpo } from '@/lib/motion';
import { motion } from 'motion/react';

type NavLinksProps = {
  className?: string;
  onNavigate?: () => void;
  activeId?: string;
  variant?: 'dock' | 'stack';
};

export function NavLinks({ className, onNavigate, activeId, variant = 'dock' }: NavLinksProps) {
  const reduced = usePrefersReducedMotion();
  const stacked = variant === 'stack';

  return (
    <ul className={cn(stacked ? 'flex flex-col gap-1' : 'flex items-center gap-0.5', className)}>
      {navigation.map((item) => {
        const active = item.id === activeId;

        return (
          <li key={item.id}>
            <a
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'nav-link relative inline-flex items-center text-text-secondary',
                stacked
                  ? 'w-full rounded-2xl px-3 py-2.5 text-[1.05rem] tracking-[-0.02em]'
                  : 'rounded-full px-3 py-1.5 text-[0.84rem] tracking-[-0.01em]',
                active && 'text-text-primary',
              )}
            >
              {active ? (
                <motion.span
                  layoutId={stacked || reduced ? undefined : 'nav-active'}
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 bg-white/[0.05]',
                    stacked ? 'rounded-2xl' : 'rounded-full',
                  )}
                  transition={reduced ? { duration: 0 } : { duration: 0.35, ease: easeOutExpo }}
                />
              ) : null}
              <span className="relative z-[1]">{item.label}</span>
              {active ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute h-px bg-linear-to-r from-brand-cyan to-brand-orange',
                    stacked ? 'right-3 bottom-1.5 left-3' : 'right-3 -bottom-px left-3',
                  )}
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

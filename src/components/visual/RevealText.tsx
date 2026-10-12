import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo, motionDuration } from '@/lib/motion';

type RevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: 'mount' | 'view';
};

export function RevealText({ children, className, delay = 0, mode = 'view' }: RevealTextProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  const transition = {
    duration: motionDuration.reveal,
    ease: easeOutExpo,
    delay,
  };

  return (
    <span className="block overflow-hidden">
      <motion.span
        className={className ? `block ${className}` : 'block'}
        initial={{ y: '112%' }}
        {...(mode === 'mount'
          ? { animate: { y: '0%' }, transition }
          : {
              whileInView: { y: '0%' },
              viewport: { once: true, margin: '-10% 0px' },
              transition,
            })}
      >
        {children}
      </motion.span>
    </span>
  );
}

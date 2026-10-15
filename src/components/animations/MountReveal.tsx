import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo } from '@/lib/motion';

type MountRevealProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

/** Entrada por bloco, com atraso curto. Não anima caractere a caractere. */
export function MountReveal({ children, index = 0, className }: MountRevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: easeOutExpo,
        delay: Math.min(index * 0.055, 0.28),
      }}
    >
      {children}
    </motion.div>
  );
}

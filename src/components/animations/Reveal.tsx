import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo, motionDuration } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: 'fade' | 'slide' | 'scale';
};

const initialByVariant = {
  fade: { opacity: 0, y: 16 },
  slide: { opacity: 0, y: 28 },
  scale: { opacity: 0, y: 18, scale: 0.985 },
};

export function Reveal({ children, delay = 0, className, variant = 'fade' }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={initialByVariant[variant]}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{
        duration: variant === 'slide' ? motionDuration.reveal : motionDuration.element,
        ease: easeOutExpo,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

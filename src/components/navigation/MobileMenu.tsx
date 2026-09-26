import { motion } from 'motion/react';
import { NavLinks } from '@/components/navigation/NavLinks';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo } from '@/lib/motion';

type MobileMenuProps = {
  onClose: () => void;
  activeId?: string;
};

export function MobileMenu({ onClose, activeId }: MobileMenuProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      id="menu-flutuante"
      initial={reduced ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
      transition={reduced ? { duration: 0 } : { duration: 0.28, ease: easeOutExpo }}
      className="md:hidden"
    >
      <nav className="max-h-[min(70dvh,26rem)] overflow-y-auto px-2 pt-1 pb-2" aria-label="Seções">
        <NavLinks variant="stack" activeId={activeId} onNavigate={onClose} />
      </nav>
    </motion.div>
  );
}

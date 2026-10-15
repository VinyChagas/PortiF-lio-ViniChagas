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
      initial={reduced ? false : { gridTemplateRows: '0fr', opacity: 0 }}
      animate={{ gridTemplateRows: '1fr', opacity: 1 }}
      exit={reduced ? { opacity: 0 } : { gridTemplateRows: '0fr', opacity: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.48, ease: easeOutExpo }}
      className="grid md:hidden"
    >
      <div className="overflow-hidden">
        <nav className="max-h-[min(70dvh,26rem)] overflow-y-auto px-2 pt-1 pb-2" aria-label="Seções">
          <NavLinks variant="stack" activeId={activeId} onNavigate={onClose} />
        </nav>
      </div>
    </motion.div>
  );
}

import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/Button';
import { NavLinks } from '@/components/navigation/NavLinks';
import { useScrollLock } from '@/hooks/useScrollLock';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduced = usePrefersReducedMotion();
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-60 bg-background/96 backdrop-blur-md"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex h-[var(--header-height)] items-center justify-between px-6">
            <a href="/#inicio" onClick={onClose} aria-label="Vinicius Chagas — início">
              <BrandLogo />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Fechar menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex h-[calc(100svh-var(--header-height))] flex-col justify-between px-6 pb-10">
            <NavLinks
              className="mt-10 flex-col items-start gap-7"
              itemClassName="text-3xl font-medium tracking-[-0.03em] text-text-primary"
              onNavigate={onClose}
            />
            <Button href="/#contato" className="w-full" onClick={onClose} arrow>
              Vamos conversar
            </Button>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

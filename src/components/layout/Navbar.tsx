import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrandLogo } from '@/components/common/BrandLogo';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { NavLinks } from '@/components/navigation/NavLinks';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

export function Navbar() {
  const scrolled = useScrolled(12);
  const sectionId = useActiveSection();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const activeId = pathname.startsWith('/projetos') ? 'projetos' : sectionId;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3"
      style={{ top: 'max(0.7rem, env(safe-area-inset-top))' }}
    >
      <div
        data-scrolled={scrolled ? 'true' : 'false'}
        className={cn(
          'nav-dock pointer-events-auto flex w-max max-w-[calc(100vw-1.5rem)] flex-col',
          open ? 'rounded-[1.6rem]' : 'rounded-full',
        )}
      >
        <div className="flex items-center gap-1 py-1.5 pr-1.5 pl-3 sm:gap-2 sm:pr-2 sm:pl-3.5">
          <a href="/#inicio" aria-label="Vinicius Chagas — início" className="mr-1 shrink-0">
            <BrandLogo className="h-7" />
          </a>

          <nav className="hidden md:block" aria-label="Principal">
            <NavLinks activeId={activeId} />
          </nav>

          <a href="/#contato" className="nav-cta ml-1 inline-flex">
            Vamos conversar
          </a>

          <button
            type="button"
            className="nav-link ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-text-secondary md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-flutuante"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>

        <AnimatePresence>
          {open ? <MobileMenu activeId={activeId} onClose={() => setOpen(false)} /> : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

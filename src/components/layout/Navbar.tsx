import { Menu } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { NavLinks } from '@/components/navigation/NavLinks';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

export function Navbar() {
  const scrolled = useScrolled(24);
  const activeId = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-b border-white/10 bg-background/72 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-6 transition-[height] duration-500',
          scrolled ? 'h-14' : 'h-[var(--header-height)]',
        )}
      >
        <a href="/#inicio" aria-label="Vinicius Chagas — início" className="relative z-10">
          <span
            className={cn(
              'inline-flex origin-left transition-transform duration-500',
              scrolled ? 'scale-[0.92]' : 'scale-100',
            )}
          >
            <BrandLogo className="h-8 md:h-9" />
          </span>
        </a>

        <nav className="hidden flex-1 justify-end lg:flex" aria-label="Principal">
          <NavLinks className="mr-10" activeId={activeId} />
          <Button href="/#contato" variant="ghost" className="px-4 py-2 text-[0.8rem]">
            Vamos conversar
          </Button>
        </nav>

        <button
          type="button"
          className="text-text-secondary transition-colors hover:text-text-primary lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { NavLinks } from '@/components/navigation/NavLinks';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';

export function Navbar() {
  const scrolled = useScrolled(18);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-b border-white/6 bg-background/72 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-6">
        <a href="/#inicio" aria-label="Vinicius Chagas — início" className="relative z-10">
          <BrandLogo />
        </a>

        <nav className="hidden flex-1 justify-end lg:flex" aria-label="Principal">
          <NavLinks className="mr-10" />
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

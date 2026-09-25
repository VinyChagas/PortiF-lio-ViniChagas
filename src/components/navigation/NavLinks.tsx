import { navigation } from '@/data/navigation';
import { cn } from '@/lib/cn';

type NavLinksProps = {
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
  activeId?: string;
};

export function NavLinks({ className, itemClassName, onNavigate, activeId }: NavLinksProps) {
  return (
    <ul className={cn('flex items-center gap-8', className)}>
      {navigation.map((item) => {
        const active = item.id === activeId;

        return (
          <li key={item.id}>
            <a
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'relative text-[0.84rem] tracking-[-0.01em] text-text-secondary transition-colors duration-300 hover:text-text-primary',
                active && 'text-text-primary',
                itemClassName,
              )}
            >
              {item.label}
              {active ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-px w-full bg-linear-to-r from-brand-cyan to-brand-orange"
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

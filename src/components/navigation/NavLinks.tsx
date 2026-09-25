import { navigation } from '@/data/navigation';
import { cn } from '@/lib/cn';

type NavLinksProps = {
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
};

export function NavLinks({ className, itemClassName, onNavigate }: NavLinksProps) {
  return (
    <ul className={cn('flex items-center gap-8', className)}>
      {navigation.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary',
              itemClassName,
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

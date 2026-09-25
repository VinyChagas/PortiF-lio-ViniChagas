import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({ href, children, className, external }: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-text-secondary transition-colors duration-300 hover:text-text-primary',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

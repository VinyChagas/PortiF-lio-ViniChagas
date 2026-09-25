import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  ariaLabel?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-white/10 bg-text-primary text-background hover:bg-white hover:shadow-[0_0_32px_var(--glow-blue)]',
  ghost:
    'border border-white/12 bg-transparent text-text-primary hover:border-white/28 hover:bg-white/4',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium tracking-[-0.01em] transition-all duration-300 ease-out',
    'translate-y-0 hover:-translate-y-px',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

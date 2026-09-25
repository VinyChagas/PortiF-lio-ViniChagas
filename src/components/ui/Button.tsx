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
  arrow?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-transparent bg-text-primary text-ink hover:bg-white hover:shadow-[0_12px_36px_rgb(255_255_255_/_0.08)]',
  ghost:
    'border border-white/16 bg-transparent text-text-primary hover:bg-white/[0.04] hover:shadow-[inset_2px_0_0_rgb(62_200_242_/_0.9),inset_-2px_0_0_rgb(255_90_31_/_0.85)]',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  ariaLabel,
  arrow = false,
}: ButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-medium tracking-[-0.01em]',
    'transition-[transform,background-color,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
    'hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan',
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        >
          →
        </span>
      ) : null}
    </>
  );

  const ink = variant === 'primary' ? ({ color: 'var(--ink)' } as const) : undefined;

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        style={ink}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} style={ink} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

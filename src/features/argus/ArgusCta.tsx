import { cn } from '@/lib/cn';

type ArgusCtaProps = {
  className?: string;
};

export function ArgusCta({ className }: ArgusCtaProps) {
  return (
    <a
      href="#argus"
      className={cn(
        'group inline-flex flex-col items-start gap-1 px-1 py-1',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan',
        className,
      )}
    >
      <span className="font-mono text-[0.62rem] tracking-[0.24em] text-brand-cyan uppercase">
        Argus
      </span>
      <span className="font-mono text-[0.62rem] tracking-[0.16em] text-text-muted uppercase">
        AI Portfolio Interface
      </span>
      <span className="mt-1 inline-flex items-center gap-2 text-sm text-text-primary">
        Conheça o Argus
        <span
          aria-hidden="true"
          className="inline-block text-brand-orange-light transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        >
          ↗
        </span>
      </span>
    </a>
  );
}

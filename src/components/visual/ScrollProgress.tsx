import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 bottom-0 left-0 z-[70] w-px bg-white/[0.06]"
    >
      <div
        className="w-full origin-top bg-linear-to-b from-brand-cyan to-brand-orange"
        style={{ height: `${Math.max(progress * 100, 0)}%` }}
      />
    </div>
  );
}

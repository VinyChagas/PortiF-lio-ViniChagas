import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { InlineMarkdown } from '@/components/markdown';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import {
  SHOWCASE_INTERVAL_MS,
  SHOWCASE_TRANSITION_MS,
  canAutoplayShowcase,
  showcaseIntentFromKey,
  stepShowcaseIndex,
  toShowcaseSlide,
} from '@/lib/showcase';
import type { PortfolioProject } from '@/types/project';

type FeaturedProjectsShowcaseProps = {
  projects: PortfolioProject[];
  settled?: boolean;
};

export function FeaturedProjectsShowcase({ projects, settled = true }: FeaturedProjectsShowcaseProps) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [inView, setInView] = useState(true);
  const [documentHidden, setDocumentHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  );
  const [progressRun, setProgressRun] = useState(0);

  const count = projects.length;
  const safeIndex = count === 0 ? 0 : ((index % count) + count) % count;
  const project = projects[safeIndex];

  const autoplay = canAutoplayShowcase({
    count,
    reducedMotion: reduced,
    pausedByUser,
    pointerInside,
    focusInside,
    inView,
    documentHidden,
    settled,
  });
  const autoplayRef = useRef(autoplay);

  useEffect(() => {
    if (index !== safeIndex) setIndex(safeIndex);
  }, [index, safeIndex]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    const onChange = () => setDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  useEffect(() => {
    if (autoplay && !autoplayRef.current) setProgressRun((current) => current + 1);
    autoplayRef.current = autoplay;
  }, [autoplay]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => stepShowcaseIndex(current, count, 'next'));
    }, SHOWCASE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, safeIndex, count]);

  useEffect(() => {
    projects.forEach((item, itemIndex) => {
      const image = toShowcaseSlide(item).image;
      if (!image) return;
      const preload = new Image();
      preload.decoding = 'async';
      if (itemIndex === safeIndex) preload.fetchPriority = 'high';
      preload.src = image.src;
    });
  }, [projects, safeIndex]);

  if (!project) return null;

  const slide = toShowcaseSlide(project);

  const go = (direction: 'next' | 'previous') => {
    setIndex((current) => stepShowcaseIndex(current, count, direction));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const intent = showcaseIntentFromKey(event.key);
    if (!intent || count < 2) return;
    event.preventDefault();
    go(intent);
  };

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return;
    setPointerInside(true);
  };

  return (
    <section
      ref={rootRef}
      data-showcase="true"
      aria-roledescription="carrossel"
      aria-label="Projetos em destaque"
      className="group/showcase w-full min-w-0 motion-reduce:transform-none lg:w-[23.5rem] lg:justify-self-end"
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={() => setPointerInside(false)}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusInside(false);
      }}
    >
      <div
        className={cn(
          'overflow-hidden rounded-[var(--radius-xl)] border border-white/10 bg-[#07090d]/58',
          'shadow-[0_16px_40px_rgb(0_0_0_/_0.18)] transition-colors duration-300 ease-[var(--ease-out)]',
          'group-hover/showcase:border-white/18',
        )}
      >
        <SlideStage slide={slide} reduced={reduced} position={safeIndex + 1} total={count} />

        {count > 1 && !reduced ? (
          <div className="px-4" aria-hidden="true">
            <span className="block h-px overflow-hidden bg-white/10">
              <span
                key={`${slide.slug}-${progressRun}`}
                className={cn('showcase-progress', !autoplay && 'showcase-progress-paused')}
                style={{ animationDuration: `${SHOWCASE_INTERVAL_MS}ms` }}
              />
            </span>
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3 px-3 pt-2.5 pb-3">
          <p className="pl-1 font-mono text-[0.68rem] tracking-[0.14em] text-text-muted">
            {String(safeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
          {count > 1 ? (
            <div className="flex items-center gap-1">
              <ShowcaseControl label="Projeto anterior" onClick={() => go('previous')}>
                <ChevronLeft size={16} strokeWidth={1.5} />
              </ShowcaseControl>
              <ShowcaseControl
                label={pausedByUser ? 'Retomar projetos' : 'Pausar projetos'}
                pressed={pausedByUser}
                onClick={() => setPausedByUser((current) => !current)}
              >
                {pausedByUser ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
              </ShowcaseControl>
              <ShowcaseControl label="Próximo projeto" onClick={() => go('next')}>
                <ChevronRight size={16} strokeWidth={1.5} />
              </ShowcaseControl>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ShowcaseControl({
  label,
  children,
  onClick,
  pressed,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-colors duration-200 hover:border-white/25 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
    >
      {children}
    </button>
  );
}

function SlideStage({
  slide,
  reduced,
  position,
  total,
}: {
  slide: ReturnType<typeof toShowcaseSlide>;
  reduced: boolean;
  position: number;
  total: number;
}) {
  const incoming = useRef(slide);
  const previous = useRef(slide);
  incoming.current = slide;
  const [leaving, setLeaving] = useState<ReturnType<typeof toShowcaseSlide> | null>(null);

  useEffect(() => {
    const next = incoming.current;
    if (previous.current.slug === next.slug) return;
    const last = previous.current;
    previous.current = next;
    if (reduced) {
      setLeaving(null);
      return;
    }
    setLeaving(last);
    const timer = window.setTimeout(() => {
      setLeaving((current) => (current?.slug === last.slug ? null : current));
    }, SHOWCASE_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [reduced, slide.slug]);

  return (
    <div className="relative">
      {leaving ? (
        <div className="showcase-slide-out absolute inset-0" aria-hidden="true" inert>
          <SlideBody slide={leaving} position={position} total={total} priority={false} />
        </div>
      ) : null}
      <div key={slide.slug} className={cn(!reduced && 'showcase-slide-in')}>
        <SlideBody slide={slide} position={position} total={total} priority />
      </div>
    </div>
  );
}

function SlideBody({
  slide,
  position,
  total,
  priority,
}: {
  slide: ReturnType<typeof toShowcaseSlide>;
  position: number;
  total: number;
  priority: boolean;
}) {
  return (
    <Link
      to={slide.href}
      className="block outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
      aria-label={`Ver case completo: ${slide.title}. ${position} de ${total}.`}
    >
      <SlideMedia slide={slide} priority={priority} />
      <div className="flex h-[13.25rem] flex-col overflow-hidden px-4 pt-3.5 pb-3">
        <p className="truncate font-mono text-[0.68rem] tracking-[0.16em] text-text-muted uppercase">
          {slide.category}
        </p>
        <p className="mt-2 line-clamp-2 h-[2.85rem] text-[1.35rem] leading-[1.05] font-semibold tracking-[-0.03em] text-text-primary">
          {slide.title}
        </p>
        <InlineMarkdown
          as="p"
          source={slide.description || '\u00a0'}
          className="mt-2 line-clamp-2 h-[2.85rem] text-sm leading-relaxed text-text-secondary"
        />
        <ul className="mt-2.5 flex h-7 w-full min-w-0 gap-1.5 overflow-hidden">
          {slide.technologies.map((name) => (
            <li
              key={name}
              className="rounded-full border border-white/10 px-2 py-1 font-mono text-[0.65rem] tracking-[0.08em] text-text-muted uppercase"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-auto inline-flex items-center gap-2 text-sm text-text-primary">
          <span>Ver case completo</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-[var(--ease-out)] group-hover/showcase:translate-x-1 motion-reduce:transform-none"
          >
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

function SlideMedia({
  slide,
  priority,
}: {
  slide: ReturnType<typeof toShowcaseSlide>;
  priority: boolean;
}) {
  const src = slide.image?.src;
  const imageRef = useRef<HTMLImageElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    setShown(Boolean(image?.complete && image.naturalWidth > 0));
  }, [src]);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#080b11]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(62% 80% at 0% 100%, rgb(62 200 242 / 16%), transparent 70%), radial-gradient(54% 72% at 100% 0%, rgb(255 90 31 / 14%), transparent 68%)',
        }}
      />
      {src ? (
        <img
          ref={imageRef}
          src={src}
          alt=""
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-[var(--ease-out)] motion-reduce:transition-none',
            shown ? 'opacity-100' : 'opacity-0',
          )}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setShown(true)}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#07090d]/40 to-transparent" />
    </div>
  );
}

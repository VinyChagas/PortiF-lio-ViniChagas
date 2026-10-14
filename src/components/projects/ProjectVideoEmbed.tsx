import { resolveVideoPlayback } from '@/lib/video-embed';
import { cn } from '@/lib/cn';
import type { ProjectVideo } from '@/types/project';

type ProjectVideoEmbedProps = {
  video: ProjectVideo;
  className?: string;
};

/** Player para vídeos do Studio: YouTube via iframe, arquivo direto via video nativo. */
export function ProjectVideoEmbed({ video, className }: ProjectVideoEmbedProps) {
  const playback = resolveVideoPlayback(video.src);
  const title = video.title || 'Demonstração';

  if (playback.mode === 'iframe') {
    return (
      <div className={cn('overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-black', className)}>
        <div className="relative aspect-video w-full">
          <iframe
            src={playback.embedSrc}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-3 py-2">
          <p className="type-meta font-mono tracking-[0.08em] text-text-muted">{title}</p>
          <a
            href={playback.watchUrl}
            target="_blank"
            rel="noreferrer"
            className="type-meta font-mono tracking-[0.08em] text-brand-cyan underline-offset-4 hover:underline"
          >
            YouTube
          </a>
        </div>
      </div>
    );
  }

  if (playback.mode === 'link') {
    return (
      <a
        href={playback.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'surface-panel flex min-h-28 flex-col justify-center gap-2 border-white/10 px-5 py-6 transition-colors duration-500 hover:border-brand-cyan/40',
          className,
        )}
      >
        <span className="type-label font-mono tracking-[0.14em] text-brand-cyan uppercase">
          {playback.label}
        </span>
        <span className="text-sm text-text-secondary">{title}</span>
        <span className="type-meta break-all font-mono tracking-[0.06em] text-text-muted">
          {playback.href}
        </span>
      </a>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-black', className)}>
      <video
        controls
        preload="metadata"
        poster={video.poster}
        title={title}
        aria-label={title}
        className="aspect-video w-full bg-black"
      >
        <source src={playback.src} />
        {title}
      </video>
      <p className="border-t border-white/[0.08] px-3 py-2 type-meta font-mono tracking-[0.08em] text-text-muted">
        {title}
      </p>
    </div>
  );
}

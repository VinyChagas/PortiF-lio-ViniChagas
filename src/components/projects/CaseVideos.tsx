import { ProjectVideoEmbed } from '@/components/projects/ProjectVideoEmbed';
import { cn } from '@/lib/cn';
import type { ProjectVideo } from '@/types/project';

type CaseVideosProps = {
  videos: ProjectVideo[];
  className?: string;
};

/**
 * Seção de vídeos incorporados no Studio (ex.: YouTube).
 */
export function CaseVideos({ videos, className }: CaseVideosProps) {
  if (!videos.length) return null;

  return (
    <section
      className={cn('border-t border-white/10 pt-10', className)}
      aria-labelledby="case-videos-title"
      data-case-videos="true"
    >
      <p
        id="case-videos-title"
        className="type-label font-mono tracking-[0.2em] text-text-secondary uppercase"
      >
        Demonstração
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
        Vídeo publicado com o case no Portfolio Studio.
      </p>

      <ul className="mt-6 grid max-w-4xl gap-6">
        {videos.map((video) => (
          <li key={video.src}>
            <ProjectVideoEmbed video={video} />
          </li>
        ))}
      </ul>
    </section>
  );
}

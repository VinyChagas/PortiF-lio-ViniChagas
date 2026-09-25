import { projectStatuses } from '@/data/projects/status';
import { cn } from '@/lib/cn';
import type { ProjectStatusId } from '@/types/project';

const tones = {
  done: 'bg-brand-cyan',
  progress: 'bg-brand-orange',
  start: 'bg-text-muted',
};

type ProjectStatusProps = {
  status: ProjectStatusId;
  className?: string;
};

export function ProjectStatus({ status, className }: ProjectStatusProps) {
  const item = projectStatuses[status];

  return (
    <p className={cn('inline-flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] text-text-secondary uppercase', className)}>
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', tones[item.tone])} />
      {item.label}
    </p>
  );
}

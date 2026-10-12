import type { ProjectStatusId } from '@/types/project';

export const projectStatuses: Record<
  ProjectStatusId,
  { label: string; tone: 'done' | 'progress' | 'start' }
> = {
  developed: { label: 'Desenvolvido', tone: 'done' },
  production: { label: 'Em produção', tone: 'done' },
  'developed-production': { label: 'Desenvolvido / produção', tone: 'done' },
  multiple: { label: 'Várias ferramentas', tone: 'done' },
  prototype: { label: 'Protótipo funcional', tone: 'progress' },
  mvp: { label: 'MVP funcional', tone: 'progress' },
  'developed-mvp': { label: 'Desenvolvido / MVP', tone: 'progress' },
  'near-completion': { label: 'Quase concluído', tone: 'progress' },
  'in-development': { label: 'Em desenvolvimento', tone: 'progress' },
  starting: { label: 'Começando agora', tone: 'start' },
};

export function projectStatusLabel(status: ProjectStatusId) {
  return projectStatuses[status].label;
}

import type { ProjectCategory } from '@/types/project';

export const projectCategories: { id: ProjectCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'software', label: 'Software' },
  { id: 'automacao', label: 'Automação' },
  { id: 'ia', label: 'IA' },
  { id: 'full-stack', label: 'Full stack' },
  { id: 'banking', label: 'Banking' },
  { id: 'fiscal', label: 'Fiscal' },
  { id: 'infraestrutura', label: 'Infraestrutura' },
  { id: 'pessoal', label: 'Projeto pessoal' },
];

export function categoryLabel(id: ProjectCategory) {
  return projectCategories.find((item) => item.id === id)?.label ?? id;
}

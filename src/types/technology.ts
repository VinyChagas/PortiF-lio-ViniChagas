import type { SimpleIcon } from 'simple-icons';

export type TechnologyGroupId = 'ai' | 'backend' | 'frontend' | 'automation' | 'infrastructure';

export type Technology = {
  id: string;
  name: string;
  group: TechnologyGroupId;
  icon?: SimpleIcon;
  conceptual?: boolean;
};

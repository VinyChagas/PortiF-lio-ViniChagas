export const PROJECT_VIEW_MODES = ['business', 'technical'] as const;

export type ProjectViewMode = (typeof PROJECT_VIEW_MODES)[number];

export const projectViewLabels: Record<ProjectViewMode, string> = {
  business: 'Visão negócio',
  technical: 'Visão técnica',
};

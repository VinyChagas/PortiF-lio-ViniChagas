export type ProjectAccent = 'blue' | 'orange';

export type ProjectResult = {
  label: string;
  value?: string;
  note?: string;
  source?: string;
};

export type ProjectBusinessView = {
  headline: string;
  context: string;
  problem: string;
  before: string;
  trigger?: string;
  solution: string;
  impact?: string;
  results: ProjectResult[];
};

export type ProjectTechnicalView = {
  headline: string;
  technologies: string[];
  architecture: string;
  implementation?: string;
  challenges: string[];
  decisions: string[];
  infrastructure?: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  argusProjectId: string;
  title: string;
  shortDescription: string;
  cover?: string;
  accent: ProjectAccent;
  featured: boolean;
  status?: string;
  business: ProjectBusinessView;
  technical: ProjectTechnicalView;
  gallery: string[];
  repository?: string | null;
};

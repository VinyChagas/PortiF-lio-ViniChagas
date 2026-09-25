import type { TechnologyId } from '@/data/technologies';

export type ProjectAccent = 'blue' | 'orange';

export type ProjectStatusId =
  | 'developed'
  | 'production'
  | 'developed-production'
  | 'multiple'
  | 'mvp'
  | 'developed-mvp'
  | 'prototype'
  | 'in-development'
  | 'near-completion'
  | 'starting';

export type ProjectCategory =
  | 'software'
  | 'automacao'
  | 'ia'
  | 'full-stack'
  | 'banking'
  | 'fiscal'
  | 'infraestrutura'
  | 'pessoal';

export type ProjectMetric = {
  label: string;
  value?: string;
  note?: string;
  source?: string;
};

export type ProjectContext = {
  label: string;
  organization?: string;
  domain?: string;
};

export type ProjectBusinessView = {
  headline?: string;
  context?: string;
  problem?: string;
  before?: string[];
  trigger?: string;
  solution?: string;
  impact?: string;
  results?: ProjectMetric[];
};

export type ProjectMediaKind = 'image' | 'gif' | 'video' | 'diagram';

export type ProjectMediaType = 'interface' | 'architecture' | 'automation' | 'result' | 'diagram';

export type ProjectMediaItem = {
  src: string;
  alt: string;
  caption?: string;
  type?: ProjectMediaType;
  kind?: ProjectMediaKind;
};

export type ProjectVideo = {
  src: string;
  poster?: string;
  title: string;
};

export type ProjectMedia = {
  cover?: string;
  approvedForPublic?: boolean;
  screenshots?: ProjectMediaItem[];
  videos?: ProjectVideo[];
  diagrams?: ProjectMediaItem[];
};

export type ProjectAgent = {
  id: string;
  name: string;
  nameOrigin?: string;
  environment?: string;
  objective?: string;
  responsibilities?: string[];
  capabilities?: string[];
  technologies?: TechnologyId[];
  status?: ProjectStatusId;
  note?: string;
  avatar?: string;
  avatarAlt?: string;
};

export type ProjectTechnicalView = {
  headline?: string;
  architecture?: string;
  implementation?: string;
  challenges?: string[];
  decisions?: string[];
  infrastructure?: string;
  integrations?: string[];
};

export type PortfolioProject = {
  id: string;
  slug: string;
  argusProjectId?: string;
  title: string;
  displayLines?: [string, string];
  shortDescription?: string;
  context: ProjectContext;
  status: ProjectStatusId;
  featured: boolean;
  featuredOrder?: number;
  categories: ProjectCategory[];
  technologies: TechnologyId[];
  accent: ProjectAccent;
  business?: ProjectBusinessView;
  technical?: ProjectTechnicalView;
  media?: ProjectMedia;
  agents?: ProjectAgent[];
  gallery?: string[];
  repository?: string;
  demo?: string;
  seoTitle?: string;
  seoDescription?: string;
};

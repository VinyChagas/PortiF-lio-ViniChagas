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
  objective?: string;
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
  /** Chave de seção do Studio (ex.: solution.architecture). */
  sectionKey?: string;
};

export type ProjectVideo = {
  src: string;
  poster?: string;
  title: string;
};

export type ProjectMedia = {
  cover?: string;
  /** Roadmap visual independente (não é capa nem galeria). */
  roadmap?: ProjectMediaItem;
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

/** Resumo executivo — nível 2 (modal). */
export type ProjectSummary = {
  problem?: string;
  solution?: string;
  result?: string;
  metrics?: ProjectMetric[];
};

export type ProjectJourneyStepId =
  | 'context'
  | 'problem'
  | 'challenge'
  | 'solution'
  | 'architecture'
  | 'decisions'
  | 'result';

/** Etapa da Case Journey — negócio e engenharia em paralelo. */
export type ProjectJourneyStep = {
  id: ProjectJourneyStepId;
  label: string;
  business?: string;
  engineering?: string;
};

export type ProjectDocumentationSectionId =
  | 'businessRules'
  | 'architecture'
  | 'implementation'
  | 'challenges'
  | 'decisions'
  | 'limitations'
  | 'evolution'
  | 'evidence'
  | 'media'
  | 'learnings';

/** Documentação profunda — nível 3 (acordeões). */
export type ProjectDocumentationSection = {
  id: ProjectDocumentationSectionId | string;
  title: string;
  body?: string;
  items?: string[];
};

export type ProjectDocumentation = {
  sections: ProjectDocumentationSection[];
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
  /** Ids do catálogo local e/ou slugs vindos do Studio (desconhecidos são tolerados na UI). */
  technologies: Array<TechnologyId | string>;
  accent: ProjectAccent;
  /** Fonte legada; ainda usada para derivar summary/journey quando omitidos. */
  business?: ProjectBusinessView;
  /** Fonte legada; ainda usada para derivar journey/documentation quando omitidos. */
  technical?: ProjectTechnicalView;
  /** Resumo executivo do modal. Se omitido, deriva de `business`. */
  summary?: ProjectSummary;
  /** Narrativa paralela negócio | engenharia. Se omitida, deriva de business/technical. */
  journey?: ProjectJourneyStep[];
  /** Detalhes extensos em seções expansíveis. Se omitida, deriva do restante. */
  documentation?: ProjectDocumentation;
  media?: ProjectMedia;
  agents?: ProjectAgent[];
  gallery?: string[];
  repository?: string;
  demo?: string;
  seoTitle?: string;
  seoDescription?: string;
};

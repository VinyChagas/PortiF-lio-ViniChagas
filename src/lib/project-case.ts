import type {
  PortfolioProject,
  ProjectDocumentation,
  ProjectDocumentationSection,
  ProjectJourneyStep,
  ProjectJourneyStepId,
  ProjectSummary,
} from '@/types/project';

const JOURNEY_LABELS: Record<ProjectJourneyStepId, string> = {
  context: 'Contexto',
  problem: 'Problema',
  challenge: 'Desafio',
  solution: 'Solução',
  architecture: 'Arquitetura',
  decisions: 'Decisões',
  result: 'Resultado',
};

const BUSINESS_DOC_IDS = new Set([
  'context',
  'problem',
  'solution',
  'impact',
  'evolution',
  'business',
  'negocio',
]);

const TECHNICAL_DOC_IDS = new Set([
  'architecture',
  'implementation',
  'businessRules',
  'challenges',
  'decisions',
  'limitations',
  'learnings',
  'evidence',
  'media',
  'integrations',
  'infraestrutura',
]);

function joinList(items?: string[]) {
  if (!items?.length) return undefined;
  return items.join(' ');
}

function pushStep(
  steps: ProjectJourneyStep[],
  id: ProjectJourneyStepId,
  business?: string,
  engineering?: string,
) {
  const nextBusiness = business?.trim() || undefined;
  const nextEngineering = engineering?.trim() || undefined;
  if (!nextBusiness && !nextEngineering) return;
  steps.push({
    id,
    label: JOURNEY_LABELS[id],
    business: nextBusiness,
    engineering: nextEngineering,
  });
}

/** Deriva a Case Journey a partir de business/technical sem inventar conteúdo. */
export function deriveJourney(project: PortfolioProject): ProjectJourneyStep[] {
  const business = project.business;
  const technical = project.technical;
  const challenges = technical?.challenges ?? [];
  const steps: ProjectJourneyStep[] = [];

  pushStep(steps, 'context', business?.context, technical?.headline);

  pushStep(steps, 'problem', business?.problem, challenges[0]);

  pushStep(
    steps,
    'challenge',
    joinList(business?.before) || business?.trigger,
    challenges.length > 1 ? joinList(challenges.slice(1)) : undefined,
  );

  pushStep(steps, 'solution', business?.solution, technical?.implementation);

  pushStep(
    steps,
    'architecture',
    undefined,
    technical?.architecture || technical?.infrastructure,
  );

  pushStep(steps, 'decisions', undefined, joinList(technical?.decisions));

  const engineeringResult = business?.results
    ?.filter((item) => item.value)
    .map((item) => {
      const note = item.note ? ` (${item.note})` : '';
      return `${item.label}: ${item.value}${note}`;
    })
    .join(' · ');

  pushStep(steps, 'result', business?.impact, engineeringResult);

  return steps;
}

export function resolveSummary(project: PortfolioProject): ProjectSummary {
  if (project.summary) return project.summary;

  return {
    problem: project.business?.problem || project.shortDescription,
    solution: project.business?.solution,
    result: project.business?.impact,
    metrics: project.business?.results,
  };
}

export function resolveJourney(project: PortfolioProject): ProjectJourneyStep[] {
  if (project.journey?.length) return project.journey;
  return deriveJourney(project);
}

function pushDoc(
  sections: ProjectDocumentationSection[],
  id: string,
  title: string,
  body?: string,
  items?: string[],
) {
  if (!body?.trim() && !items?.length) return;
  sections.push({ id, title, body: body?.trim() || undefined, items });
}

/** Deriva documentação profunda a partir do conteúdo documentado. */
export function deriveDocumentation(project: PortfolioProject): ProjectDocumentation {
  const business = project.business;
  const technical = project.technical;
  const sections: ProjectDocumentationSection[] = [];

  const contextBody = [business?.context, business?.headline].filter(Boolean).join('\n\n');
  pushDoc(sections, 'context', 'Contexto', contextBody || undefined);

  pushDoc(sections, 'problem', 'Problema', business?.problem, business?.before);
  pushDoc(sections, 'solution', 'Solução', business?.solution);

  const impactBody = business?.impact;
  const impactItems = business?.results?.map((item) => {
    const parts = [item.label];
    if (item.value) parts.push(item.value);
    if (item.note) parts.push(item.note);
    return parts.join(' — ');
  });
  pushDoc(sections, 'impact', 'Impacto', impactBody, impactItems);

  if (business?.trigger) {
    pushDoc(sections, 'evolution', 'Evolução', business.trigger);
  }

  pushDoc(sections, 'architecture', 'Arquitetura', technical?.architecture);
  pushDoc(sections, 'implementation', 'Implementação', technical?.implementation);
  pushDoc(sections, 'businessRules', 'Regras de negócio', business?.objective);
  pushDoc(sections, 'challenges', 'Desafios técnicos', undefined, technical?.challenges);
  pushDoc(sections, 'decisions', 'Decisões técnicas', undefined, technical?.decisions);

  if (technical?.infrastructure) {
    pushDoc(sections, 'limitations', 'Infraestrutura e limitações', technical.infrastructure);
  }

  if (technical?.integrations?.length) {
    pushDoc(sections, 'learnings', 'Integrações', undefined, technical.integrations);
  }

  return { sections };
}

export function resolveDocumentation(project: PortfolioProject): ProjectDocumentation {
  if (project.documentation?.sections?.length) return project.documentation;
  return deriveDocumentation(project);
}

export function documentationArea(
  sectionId: string,
): 'business' | 'technical' {
  const id = sectionId.toLowerCase();
  if (BUSINESS_DOC_IDS.has(sectionId) || BUSINESS_DOC_IDS.has(id)) return 'business';
  if (TECHNICAL_DOC_IDS.has(sectionId) || TECHNICAL_DOC_IDS.has(id)) return 'technical';
  if (
    id.includes('architect') ||
    id.includes('implement') ||
    id.includes('challenge') ||
    id.includes('decision') ||
    id.includes('infra') ||
    id.includes('evidence') ||
    id.includes('media') ||
    id.includes('rule') ||
    id.includes('tecn')
  ) {
    return 'technical';
  }
  if (
    id.includes('business') ||
    id.includes('context') ||
    id.includes('problem') ||
    id.includes('impact') ||
    id.includes('evolution') ||
    id.includes('nego') ||
    id.includes('result')
  ) {
    return 'business';
  }
  return 'business';
}

export function splitDocumentationByArea(sections: ProjectDocumentationSection[]) {
  const business = sections.filter((s) => documentationArea(s.id) === 'business');
  const technical = sections.filter((s) => documentationArea(s.id) === 'technical');
  return { business, technical };
}

/** Texto curto para blocos executivos — não inventa; só corta leitura excessiva. */
export function executiveExcerpt(text: string | undefined, maxChars = 420): string | undefined {
  const value = text?.trim();
  if (!value) return undefined;
  if (value.length <= maxChars) return value;
  const slice = value.slice(0, maxChars);
  const breakAt = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('\n'));
  if (breakAt > maxChars * 0.45) return slice.slice(0, breakAt + 1).trim();
  return `${slice.trim()}…`;
}

export function hasExecutiveSummary(project: PortfolioProject) {
  const summary = resolveSummary(project);
  return Boolean(summary.problem || summary.solution || summary.result || summary.metrics?.length);
}

export function hasCaseJourney(project: PortfolioProject) {
  return resolveJourney(project).length > 0;
}

export function hasCaseDocumentation(project: PortfolioProject) {
  return resolveDocumentation(project).sections.length > 0;
}

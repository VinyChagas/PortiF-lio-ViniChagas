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
  'need',
  'problem',
  'solution',
  'impact',
  'objective',
  'evolution',
  'business',
  'negocio',
  'contribution',
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
  'responsibilities',
  'components',
  'contributionDecisions',
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

function summaryWeight(summary: ProjectSummary | undefined): number {
  if (!summary) return 0;
  return (
    (summary.problem?.trim().length ?? 0) +
    (summary.solution?.trim().length ?? 0) +
    (summary.result?.trim().length ?? 0) +
    (summary.metrics?.length ?? 0) * 24
  );
}

function deriveSummary(project: PortfolioProject): ProjectSummary {
  return {
    problem: project.business?.problem || project.shortDescription,
    solution: project.business?.solution,
    result: project.business?.impact,
    metrics: project.business?.results,
  };
}

export function resolveSummary(project: PortfolioProject): ProjectSummary {
  const derived = deriveSummary(project);
  if (!project.summary) return derived;
  // Prefere o resumo derivado do CMS quando a presentation migrada é mais curta.
  return summaryWeight(derived) > summaryWeight(project.summary) ? derived : project.summary;
}

export function resolveJourney(project: PortfolioProject): ProjectJourneyStep[] {
  const derived = deriveJourney(project);
  if (!project.journey?.length) return derived;
  if (derived.length && journeyWeight(derived) > journeyWeight(project.journey)) return derived;
  return project.journey;
}

function journeyWeight(steps: ProjectJourneyStep[]): number {
  return steps.reduce(
    (sum, step) => sum + (step.business?.length ?? 0) + (step.engineering?.length ?? 0),
    0,
  );
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
  pushDoc(sections, 'need', 'Necessidade', business?.need);

  pushDoc(sections, 'problem', 'Problema', business?.problem, business?.before);
  pushDoc(sections, 'solution', 'Solução', business?.solution);
  pushDoc(sections, 'objective', 'Objetivo', business?.objective);

  const impactBody = business?.impact;
  const impactItems = business?.results?.map((item) => {
    const parts = [item.label];
    if (item.value) parts.push(item.value);
    if (item.note) parts.push(item.note);
    return parts.join(' — ');
  });
  pushDoc(sections, 'impact', 'Impacto', impactBody, impactItems);

  // trigger só vira Evolução quando distinto de need (API antiga copiava Necessidade → trigger).
  if (business?.trigger && business.trigger.trim() !== business.need?.trim()) {
    pushDoc(sections, 'evolution', 'Evolução', business.trigger);
  }

  pushDoc(sections, 'architecture', 'Arquitetura', technical?.architecture);
  pushDoc(sections, 'implementation', 'Implementação', technical?.implementation);
  pushDoc(sections, 'challenges', 'Desafios técnicos', undefined, technical?.challenges);
  pushDoc(sections, 'decisions', 'Decisões técnicas', undefined, technical?.decisions);

  if (technical?.infrastructure || technical?.integrations?.length) {
    pushDoc(
      sections,
      'integrations',
      'Integrações',
      technical?.infrastructure,
      technical?.integrations,
    );
  }

  return { sections };
}

function sectionWeight(section: ProjectDocumentationSection): number {
  return (
    (section.body?.trim().length ?? 0) +
    (section.items?.reduce((sum, item) => sum + item.length, 0) ?? 0)
  );
}

/**
 * Une seções publicadas com as derivadas do CMS.
 * Não inventa texto: só preenche ids ausentes ou substitui quando o derivado é claramente mais rico.
 */
export function mergeDocumentationSections(
  published: ProjectDocumentation | undefined,
  derived: ProjectDocumentation,
): ProjectDocumentation {
  if (!published?.sections.length) return derived;
  if (!derived.sections.length) return published;

  const byId = new Map<string, ProjectDocumentationSection>();
  for (const section of derived.sections) byId.set(section.id, section);

  for (const section of published.sections) {
    const existing = byId.get(section.id);
    if (!existing) {
      byId.set(section.id, section);
      continue;
    }
    if (sectionWeight(section) > sectionWeight(existing) * 1.25) {
      byId.set(section.id, section);
    }
  }

  const order = [
    'context',
    'need',
    'problem',
    'solution',
    'objective',
    'impact',
    'evolution',
    'architecture',
    'implementation',
    'challenges',
    'decisions',
    'integrations',
    'businessRules',
    'limitations',
    'contribution',
    'responsibilities',
    'components',
    'contributionDecisions',
    'learnings',
    'evidence',
    'media',
  ];
  const ordered: ProjectDocumentationSection[] = [];
  const seen = new Set<string>();
  for (const id of order) {
    const section = byId.get(id);
    if (section) {
      ordered.push(section);
      seen.add(id);
    }
  }
  for (const [id, section] of byId) {
    if (!seen.has(id)) ordered.push(section);
  }
  return { sections: ordered };
}

export function resolveDocumentation(project: PortfolioProject): ProjectDocumentation {
  const derived = deriveDocumentation(project);
  if (!project.documentation?.sections?.length) return derived;
  // Presentation migrada curta não pode ocultar business/technical ricos do Studio.
  return mergeDocumentationSections(project.documentation, derived);
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
    id.includes('need') ||
    id.includes('problem') ||
    id.includes('impact') ||
    id.includes('objective') ||
    id.includes('evolution') ||
    id.includes('nego') ||
    id.includes('result') ||
    id === 'contribution'
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

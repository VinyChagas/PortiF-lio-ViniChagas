import { describe, expect, it } from 'vitest';
import type { PortfolioProject } from '@/types/project';
import {
  deriveDocumentation,
  documentationArea,
  mergeDocumentationSections,
  resolveDocumentation,
  resolveSummary,
  splitDocumentationByArea,
} from './project-case';

const richStudioProject = {
  id: 'botnfs',
  slug: 'botnfs-automacao-nfse-curitiba',
  title: 'BotNFS',
  context: { label: 'Fiscal' },
  status: 'developed',
  featured: true,
  categories: ['automacao'],
  technologies: ['node'],
  accent: 'orange',
  business: {
    context:
      'Durante minha atuação em uma operação contábil de Curitiba, uma atividade recorrente era consultar o portal municipal para baixar NFS-e.',
    need: 'A demanda inicial recebida foi operacional: ajudar no download mensal das notas.',
    problem: 'A execução manual não escalava de forma satisfatória para centenas de empresas.',
    solution: 'Desenvolvi o BotNFS, uma solução de automação fiscal baseada em navegador.',
    impact: 'Antes da automação, o processo consumia aproximadamente quatro dias úteis.',
    objective: 'Consultar NFS-e de múltiplas empresas de modo padronizado.',
  },
  technical: {
    architecture:
      'Frontend React e backend Selenium com fila de navegadores e progresso em tempo real para a operação fiscal.',
    implementation:
      'Fluxo com planilhas, autenticação, troca de perfil por procuração e organização dos downloads por competência.',
    challenges: [
      'Escalar uma rotina manual\n\nProblema: volume mensal\n\nSolução: fila de navegadores',
    ],
    decisions: ['Automatizar a interface existente'],
    infrastructure: 'Portal ISS Curitiba\n2Captcha',
  },
  summary: {
    problem: 'Resumo curto legado.',
    solution: 'Solução curta legada.',
    result: 'Resultado curto legado.',
  },
  documentation: {
    sections: [
      {
        id: 'architecture',
        title: 'Arquitetura',
        body: 'Primeira geração resumida.',
      },
      {
        id: 'evolution',
        title: 'Evolução',
        body: 'Após a descontinuação do ISS Curitiba, a operação migrou para o Portal Nacional.',
      },
    ],
  },
} as PortfolioProject;

describe('project-case integrity Studio → HML', () => {
  it('deriveDocumentation preserves full business and technical narratives', () => {
    const docs = deriveDocumentation(richStudioProject);
    const byId = Object.fromEntries(docs.sections.map((section) => [section.id, section]));

    expect(byId.context?.body).toContain('Curitiba');
    expect(byId.need?.body).toContain('download mensal');
    expect(byId.problem?.body).toContain('execução manual');
    expect(byId.objective?.body).toContain('padronizado');
    expect(byId.architecture?.body).toContain('Selenium');
    expect(byId.integrations?.body).toContain('Portal ISS Curitiba');
  });

  it('resolveDocumentation merges rich CMS fields over thin migrated sections', () => {
    const docs = resolveDocumentation(richStudioProject);
    const byId = Object.fromEntries(docs.sections.map((section) => [section.id, section]));

    expect(byId.architecture?.body).toContain('Selenium');
    expect(String(byId.architecture?.body).length).toBeGreaterThan(60);
    expect(byId.context?.body).toContain('Curitiba');
    expect(byId.need?.body).toContain('download mensal');
    expect(byId.evolution?.body).toContain('Portal Nacional');
  });

  it('Área de Negócio includes context/need/problem/objective, not only evolution', () => {
    const docs = resolveDocumentation(richStudioProject);
    const { business, technical } = splitDocumentationByArea(docs.sections);

    expect(business.some((section) => section.id === 'context')).toBe(true);
    expect(business.some((section) => section.id === 'need')).toBe(true);
    expect(business.some((section) => section.id === 'problem')).toBe(true);
    expect(business.some((section) => section.id === 'objective')).toBe(true);
    expect(business.some((section) => section.id === 'evolution')).toBe(true);
    expect(technical.some((section) => section.id === 'architecture')).toBe(true);
    expect(documentationArea('need')).toBe('business');
    expect(documentationArea('objective')).toBe('business');
  });

  it('resolveSummary prefers richer business fields over thin migrated summary', () => {
    const summary = resolveSummary(richStudioProject);
    expect(summary.problem).toContain('execução manual');
    expect(summary.solution).toContain('BotNFS');
    expect(summary.result).toContain('quatro dias');
  });

  it('does not promote need into evolution when trigger duplicates need', () => {
    const docs = deriveDocumentation({
      ...richStudioProject,
      business: {
        ...richStudioProject.business,
        need: 'Necessidade operacional de download.',
        trigger: 'Necessidade operacional de download.',
      },
      documentation: undefined,
    });
    expect(docs.sections.some((section) => section.id === 'need')).toBe(true);
    expect(docs.sections.some((section) => section.id === 'evolution')).toBe(false);
  });

  it('mergeDocumentationSections keeps unique published sections and richer derived bodies', () => {
    const merged = mergeDocumentationSections(
      {
        sections: [
          { id: 'architecture', title: 'Arquitetura', body: 'Curto' },
          { id: 'evolution', title: 'Evolução', body: 'Geração seguinte' },
        ],
      },
      {
        sections: [
          {
            id: 'architecture',
            title: 'Arquitetura',
            body: 'Arquitetura completa com frontend, backend e fila de navegadores documentada no Studio.',
          },
          { id: 'context', title: 'Contexto', body: 'Contexto completo do case.' },
        ],
      },
    );

    const byId = Object.fromEntries(merged.sections.map((section) => [section.id, section]));
    expect(byId.architecture?.body).toContain('fila de navegadores');
    expect(byId.context?.body).toContain('Contexto completo');
    expect(byId.evolution?.body).toBe('Geração seguinte');
  });
});

import { describe, expect, it } from 'vitest';
import type { PortfolioProject } from '@/types/project';
import {
  adaptStudioProject,
  mergeCatalog,
  mergePublishedCatalog,
  preserveLocalAssets,
} from './adapter';

const staticProject = {
  id: 'static-a',
  slug: 'automacao-nfse',
  title: 'Estático',
  context: { label: 'X' },
  status: 'developed',
  featured: true,
  featuredOrder: 1,
  categories: ['automacao'],
  technologies: ['node'],
  accent: 'orange',
} as PortfolioProject;

const studioProject = {
  ...staticProject,
  title: 'Studio Publicado',
  shortDescription: 'Vindo do CMS',
} as PortfolioProject;

describe('studio catalog merge', () => {
  it('prefers studio published project by slug and can keep static-only entries', () => {
    const other = {
      ...staticProject,
      id: 'static-b',
      slug: 'outro',
      title: 'Outro',
      featured: false,
    } as PortfolioProject;

    const merged = mergeCatalog([staticProject, other], [studioProject]);
    expect(merged.projects).toHaveLength(2);
    expect(merged.projects.find((p) => p.slug === 'automacao-nfse')?.title).toBe('Studio Publicado');
    expect(merged.projects.find((p) => p.slug === 'outro')?.title).toBe('Outro');
    expect(merged.fromStudio).toBe(1);
  });

  it('published catalog excludes static-only drafts', () => {
    const draftOnlyStatic = {
      ...staticProject,
      id: 'draft',
      slug: 'draft-only-static',
      title: 'Rascunho',
      featured: true,
    } as PortfolioProject;

    const merged = mergePublishedCatalog([staticProject, draftOnlyStatic], [studioProject]);
    expect(merged.projects).toHaveLength(1);
    expect(merged.projects[0]?.slug).toBe('automacao-nfse');
    expect(merged.projects.some((p) => p.slug === 'draft-only-static')).toBe(false);
  });

  it('marks studio media as approved for public rendering', () => {
    const withMedia = {
      ...studioProject,
      media: {
        cover: '/api/portfolio/public/media/abc/file',
        screenshots: [{ src: '/api/portfolio/public/media/abc/file', alt: 'x' }],
      },
    } as PortfolioProject;

    const adapted = adaptStudioProject(withMedia);
    expect(adapted.media?.approvedForPublic).toBe(true);
    expect(adapted.media?.cover).toContain('control.vinichagas.cloud');
  });

  it('preserves sectionKey, caption and absolute media URLs', () => {
    const withMedia = {
      ...studioProject,
      media: {
        screenshots: [
          {
            src: '/api/portfolio/public/media/abc/file',
            alt: '',
            caption: 'Fluxo fiscal',
            sectionKey: 'solution.architecture',
          },
        ],
      },
    } as PortfolioProject;

    const adapted = adaptStudioProject(withMedia);
    const shot = adapted.media?.screenshots?.[0];
    expect(shot?.src).toContain('https://control.vinichagas.cloud/api/portfolio/public/media/abc/file');
    expect(shot?.sectionKey).toBe('solution.architecture');
    expect(shot?.caption).toBe('Fluxo fiscal');
    expect(shot?.kind).toBe('image');
  });

  it('preserves bundled agent avatars when Studio returns content/ paths', () => {
    const staticAgents = {
      ...staticProject,
      slug: 'agentes-ia',
      agents: [
        {
          id: 'hestia',
          name: 'Hestia',
          avatar: '/assets/Perfil-Hestia.jpg',
          avatarAlt: 'local',
          status: 'in-development' as const,
        },
      ],
    } as PortfolioProject;

    const studioAgents = {
      ...staticAgents,
      title: 'Studio Agentes',
      agents: [
        {
          id: 'hestia',
          name: 'Hestia',
          avatar: '/content/projects/agentes-ia/hestia/Perfil%20Hestia%20IA.jpg',
          status: 'in-development' as const,
        },
      ],
      media: {
        cover: '/api/portfolio/public/media/missing/file',
        screenshots: [{ src: '/api/portfolio/public/media/missing/file', alt: 'x' }],
      },
    } as PortfolioProject;

    const preserved = preserveLocalAssets(staticAgents, adaptStudioProject(studioAgents));
    expect(preserved.title).toBe('Studio Agentes');
    expect(preserved.agents?.[0]?.avatar).toBe('/assets/Perfil-Hestia.jpg');
    expect(preserved.media?.cover).toContain('control.vinichagas.cloud');
    expect(preserved.media?.screenshots).toBeUndefined();
  });
});

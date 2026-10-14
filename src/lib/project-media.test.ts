import { describe, expect, it } from 'vitest';
import type { PortfolioProject } from '@/types/project';
import {
  coverImage,
  imagesForSection,
  mediaSectionGroup,
  publicProjectImages,
  unsectionedImages,
} from './project-media';

const project = {
  id: 'p',
  slug: 'simples-nacional',
  title: 'Simples',
  context: { label: 'SCS' },
  status: 'developed',
  featured: false,
  categories: [],
  technologies: [],
  accent: 'orange',
  media: {
    approvedForPublic: true,
    cover: 'https://control.vinichagas.cloud/api/portfolio/public/media/a/file',
    screenshots: [
      {
        src: 'https://control.vinichagas.cloud/api/portfolio/public/media/a/file',
        alt: 'Capa',
        kind: 'image',
      },
      {
        src: 'https://control.vinichagas.cloud/api/portfolio/public/media/b/file',
        alt: 'Arquitetura',
        sectionKey: 'solution.architecture',
        kind: 'image',
      },
      {
        src: 'https://control.vinichagas.cloud/api/portfolio/public/media/c/file',
        alt: 'Geral',
        kind: 'image',
      },
    ],
  },
} as PortfolioProject;

describe('project-media', () => {
  it('exposes all approved images', () => {
    expect(publicProjectImages(project)).toHaveLength(3);
  });

  it('resolves cover and unsectioned gallery without dropping media', () => {
    expect(coverImage(project)?.src).toContain('/media/a/');
    expect(unsectionedImages(project).map((i) => i.src)).toEqual([
      expect.stringContaining('/media/a/'),
      expect.stringContaining('/media/c/'),
    ]);
  });

  it('groups sectioned images', () => {
    expect(mediaSectionGroup('solution.architecture')).toBe('architecture');
    expect(imagesForSection(project, 'architecture')).toHaveLength(1);
  });
});

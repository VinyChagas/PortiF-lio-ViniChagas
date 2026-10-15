import { Link, useParams } from 'react-router-dom';
import { useSignalCaseReady } from '@/hooks/useSignalCaseReady';
import { MountReveal } from '@/components/animations/MountReveal';
import { Reveal } from '@/components/animations/Reveal';
import { SiteShell } from '@/components/layout/SiteShell';
import { InlineMarkdown } from '@/components/markdown';
import { AgentCaseContent } from '@/components/projects/AgentCaseContent';
import { CaseDocumentationExplore } from '@/components/projects/CaseDocumentationExplore';
import { CaseExecutiveSummary } from '@/components/projects/CaseExecutiveSummary';
import { CaseRoadmap } from '@/components/projects/CaseRoadmap';
import { CaseVideos } from '@/components/projects/CaseVideos';
import { ProjectStackRow } from '@/components/projects/ProjectStackRow';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { Container } from '@/components/ui/Container';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { categoryLabel } from '@/data/projects/categories';
import {
  hasCaseDocumentation,
  hasExecutiveSummary,
  resolveDocumentation,
} from '@/lib/project-case';
import {
  imagesForSection,
  publicProjectVideos,
  roadmapImage,
  unsectionedImages,
} from '@/lib/project-media';
import { usePageMeta } from '@/hooks/usePageMeta';
import { usePortfolioProject } from '@/hooks/usePortfolioProjects';
import { NotFoundPage } from '@/pages/NotFound';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const { project, ready } = usePortfolioProject(slug);
  useSignalCaseReady(`/projetos/${slug}`, Boolean(project) || ready);

  usePageMeta(
    project?.seoTitle ?? (project ? `${project.title} | Vinicius Chagas` : 'Página não encontrada | Vinicius Chagas'),
    project?.seoDescription ?? project?.shortDescription,
  );

  if (!project) {
    if (!ready) {
      return (
        <SiteShell>
          <main id="conteudo" className="relative overflow-clip pt-28 pb-24 md:pt-32">
            <Container className="relative">
              <p className="font-mono type-label tracking-[0.16em] text-text-muted uppercase">
                Carregando case…
              </p>
            </Container>
          </main>
        </SiteShell>
      );
    }
    return <NotFoundPage />;
  }

  const documentation = resolveDocumentation(project);
  const isAgentCase = Boolean(project.agents?.length);
  const roadmap = roadmapImage(project);
  const videos = publicProjectVideos(project);
  const evidenceImages = unsectionedImages(project).filter(
    (item) => item.src !== roadmap?.src && item.src !== project.media?.cover,
  );
  const sectionMediaIds = [
    'architecture',
    'implementation',
    'result',
    'challenges',
    'decisions',
    'businessRules',
    'context',
    'problem',
    'solution',
    'impact',
    'evidence',
  ] as const;
  const mediaBySection = Object.fromEntries(
    sectionMediaIds.map((id) => [id, imagesForSection(project, id)]),
  );
  const hasDeepContent =
    isAgentCase ||
    hasCaseDocumentation(project) ||
    hasExecutiveSummary(project) ||
    Boolean(roadmap) ||
    videos.length > 0 ||
    evidenceImages.length > 0;

  return (
    <SiteShell>
      <main id="conteudo" className="relative overflow-clip pt-28 pb-24 md:pt-32">
        <TechnicalGrid className="opacity-50" />
        <AmbientGlow className="opacity-60" />

        <Container className="relative">
          <MountReveal index={0}>
            <Link
              to="/projetos"
              className="text-link font-mono type-label tracking-[0.16em] text-text-muted uppercase"
            >
              ← Arquivo
            </Link>
          </MountReveal>

          {/* 01 — Apresentação */}
          <header data-case-presentation="true">
            <MountReveal index={1}>
              <p className="mt-8 font-mono type-label tracking-[0.22em] text-text-muted uppercase">
                {project.context.label}
              </p>
            </MountReveal>
            <MountReveal index={2}>
              <h1 className="type-case-title mt-4 max-w-[18ch]">
                {project.title}
              </h1>
            </MountReveal>
            <MountReveal index={3}>
              <div className="mt-5">
                <ProjectStatus status={project.status} />
              </div>
              <p className="mt-3 font-mono type-meta tracking-[0.14em] text-text-muted uppercase">
                {project.categories.map((item) => categoryLabel(item)).join(' · ')}
              </p>
            </MountReveal>

            {project.shortDescription ? (
              <MountReveal index={4}>
                <InlineMarkdown
                  as="p"
                  className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg"
                 source={project.shortDescription} />
              </MountReveal>
            ) : null}

            {project.technologies.length > 0 ? (
              <MountReveal index={5}>
                <div className="mt-8 max-w-3xl border-t border-white/10 pt-6">
                  <ProjectStackRow technologies={project.technologies} />
                </div>
              </MountReveal>
            ) : null}

            {project.repository ? (
              <MountReveal index={6}>
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link mt-8 inline-flex text-sm text-text-primary"
                >
                  Repositório
                </a>
              </MountReveal>
            ) : null}
          </header>

          {isAgentCase ? (
            <Reveal className="mt-10 border-t border-white/10 pt-8">
              <AgentCaseContent project={project} />
            </Reveal>
          ) : null}

          {!isAgentCase ? (
            <>
              {/* 02 — Roadmap visual (somente se cadastrado no Studio) */}
              {roadmap ? (
                <Reveal>
                  <CaseRoadmap image={roadmap} className="mt-4" />
                </Reveal>
              ) : null}

              {/* 02b — Vídeo externo (YouTube / arquivo) */}
              <CaseVideos videos={videos} className="mt-4" />

              {/* 03 — Resumo executivo */}
              <CaseExecutiveSummary project={project} className="mt-4" />

              {/* 04 — Documentação completa (Negócio / Técnico) */}
              {hasCaseDocumentation(project) || evidenceImages.length > 0 ? (
                <CaseDocumentationExplore
                  sections={documentation.sections}
                  mediaBySection={mediaBySection}
                  evidenceImages={evidenceImages}
                  className="mt-4"
                />
              ) : null}
            </>
          ) : null}

          {!hasDeepContent ? (
            <p className="mt-10 max-w-xl border-t border-white/10 pt-8 text-sm leading-relaxed text-text-muted">
              O estudo de caso completo ainda não está publicado. O que aparece aqui é somente o que já
              está documentado.
            </p>
          ) : null}
        </Container>
      </main>
    </SiteShell>
  );
}

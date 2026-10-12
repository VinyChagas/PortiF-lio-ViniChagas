import { Link, useParams } from 'react-router-dom';
import { SiteShell } from '@/components/layout/SiteShell';
import { AgentCaseContent } from '@/components/projects/AgentCaseContent';
import { CaseDocumentation } from '@/components/projects/CaseDocumentation';
import { CaseJourney } from '@/components/projects/CaseJourney';
import { ProjectStackRow } from '@/components/projects/ProjectStackRow';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { Container } from '@/components/ui/Container';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { categoryLabel } from '@/data/projects/categories';
import { getProjectBySlug } from '@/data/projects';
import {
  hasCaseDocumentation,
  hasCaseJourney,
  resolveDocumentation,
  resolveJourney,
} from '@/lib/project-case';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFoundPage } from '@/pages/NotFound';

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  usePageMeta(
    project?.seoTitle ?? (project ? `${project.title} | Vinicius Chagas` : 'Página não encontrada | Vinicius Chagas'),
    project?.seoDescription ?? project?.shortDescription,
  );

  if (!project) return <NotFoundPage />;

  const journey = resolveJourney(project);
  const documentation = resolveDocumentation(project);
  const isAgentCase = Boolean(project.agents?.length);
  const hasNarrative =
    isAgentCase || hasCaseJourney(project) || hasCaseDocumentation(project);

  return (
    <SiteShell>
      <main id="conteudo" className="relative overflow-clip pt-28 pb-24 md:pt-32">
        <TechnicalGrid className="opacity-50" />
        <AmbientGlow className="opacity-60" />

        <Container className="relative">
          <Link
            to="/projetos"
            className="font-mono type-label tracking-[0.16em] text-text-muted uppercase transition-colors duration-500 hover:text-text-primary"
          >
            ← Arquivo
          </Link>

          <p className="mt-8 font-mono type-label tracking-[0.22em] text-text-muted uppercase">
            {project.context.label}
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {project.title}
          </h1>
          <div className="mt-5">
            <ProjectStatus status={project.status} />
          </div>
          <p className="mt-3 font-mono type-meta tracking-[0.14em] text-text-muted uppercase">
            {project.categories.map((item) => categoryLabel(item)).join(' · ')}
          </p>

          {project.shortDescription ? (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {project.shortDescription}
            </p>
          ) : null}

          {project.technologies.length > 0 ? (
            <div className="mt-8 max-w-3xl border-t border-white/10 pt-6">
              <ProjectStackRow technologies={project.technologies} />
            </div>
          ) : null}

          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex text-sm text-text-primary underline-offset-4 hover:underline"
            >
              Repositório
            </a>
          ) : null}

          {!isAgentCase && (hasCaseJourney(project) || hasCaseDocumentation(project)) ? (
            <section className="mt-12 max-w-2xl border-t border-white/10 pt-8">
              <p className="type-label font-mono tracking-[0.18em] text-text-secondary uppercase">
                Do problema à solução
              </p>
              <p className="mt-3 text-base leading-relaxed text-text-muted md:text-lg">
                Uma visão paralela entre a necessidade operacional e as decisões de engenharia que
                transformaram o processo.
              </p>
            </section>
          ) : null}

          {isAgentCase ? (
            <div className="mt-10 border-t border-white/10 pt-8">
              <AgentCaseContent project={project} />
            </div>
          ) : null}

          {!isAgentCase && hasCaseJourney(project) ? (
            <CaseJourney steps={journey} className="mt-4" />
          ) : null}

          {!isAgentCase && hasCaseDocumentation(project) ? (
            <CaseDocumentation sections={documentation.sections} className="mt-4" />
          ) : null}

          {!hasNarrative ? (
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

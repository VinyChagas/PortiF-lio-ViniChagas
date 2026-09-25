import { Link, useParams } from 'react-router-dom';
import { SiteShell } from '@/components/layout/SiteShell';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { TechnologyItem } from '@/components/technology/TechnologyItem';
import { Container } from '@/components/ui/Container';
import { AmbientGlow } from '@/components/visual/AmbientGlow';
import { TechnicalGrid } from '@/components/visual/TechnicalGrid';
import { categoryLabel } from '@/data/projects/categories';
import { getProjectBySlug } from '@/data/projects';
import { projectViewLabels } from '@/features/project-view/modes';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFoundPage } from '@/pages/NotFound';
import type { ProjectBusinessView, ProjectTechnicalView } from '@/types/project';

function hasText(value?: string | string[]) {
  if (!value) return false;
  return Array.isArray(value) ? value.length > 0 : value.trim().length > 0;
}

function BusinessBlock({ business }: { business: ProjectBusinessView }) {
  const fields = [
    ['Contexto', business.context],
    ['Problema', business.problem],
    ['Gatilho', business.trigger],
    ['Solução', business.solution],
    ['Impacto', business.impact],
  ] as const;

  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="font-mono text-[0.68rem] tracking-[0.2em] text-brand-orange uppercase">
        {projectViewLabels.business}
      </h2>
      {business.headline ? (
        <p className="mt-4 max-w-2xl text-lg leading-snug font-medium tracking-[-0.03em] text-text-primary">
          {business.headline}
        </p>
      ) : null}
      <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-text-secondary md:text-base">
        {fields.map(([label, value]) =>
          hasText(value) ? (
            <p key={label}>
              <span className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">
                {label}
              </span>
              <span className="mt-1 block">{value}</span>
            </p>
          ) : null,
        )}
        {business.before && business.before.length > 0 ? (
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">Antes</p>
            <ul className="mt-2 space-y-2">
              {business.before.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {business.results && business.results.length > 0 ? (
          <dl className="grid gap-4 sm:grid-cols-3">
            {business.results.map((result) => (
              <div key={result.label}>
                <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-text-muted uppercase">
                  {result.label}
                </dt>
                {result.value ? <dd className="mt-1 text-base text-text-primary">{result.value}</dd> : null}
                {result.note ? <dd className="mt-1 text-xs text-text-muted">{result.note}</dd> : null}
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}

function TechnicalBlock({ technical }: { technical: ProjectTechnicalView }) {
  const fields = [
    ['Arquitetura', technical.architecture],
    ['Implementação', technical.implementation],
    ['Infraestrutura', technical.infrastructure],
  ] as const;

  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="font-mono text-[0.68rem] tracking-[0.2em] text-brand-cyan uppercase">
        {projectViewLabels.technical}
      </h2>
      {technical.headline ? (
        <p className="mt-4 max-w-2xl text-lg leading-snug font-medium tracking-[-0.03em]">
          {technical.headline}
        </p>
      ) : null}
      <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-text-secondary md:text-base">
        {fields.map(([label, value]) =>
          hasText(value) ? (
            <p key={label}>
              <span className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">
                {label}
              </span>
              <span className="mt-1 block">{value}</span>
            </p>
          ) : null,
        )}
        {technical.challenges && technical.challenges.length > 0 ? (
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">Desafios</p>
            <ul className="mt-2 list-disc space-y-2 pl-4">
              {technical.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {technical.decisions && technical.decisions.length > 0 ? (
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">Decisões</p>
            <ul className="mt-2 list-disc space-y-2 pl-4">
              {technical.decisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);
  const hasCase = Boolean(project?.business || project?.technical);

  usePageMeta(
    project?.seoTitle ?? (project ? `${project.title} | Vinicius Chagas` : 'Página não encontrada | Vinicius Chagas'),
    project?.seoDescription ?? project?.shortDescription,
  );

  if (!project) return <NotFoundPage />;

  return (
    <SiteShell>
      <main id="conteudo" className="relative overflow-x-clip pt-28 pb-24 md:pt-32">
        <TechnicalGrid className="opacity-50" />
        <AmbientGlow className="opacity-60" />

        <Container className="relative">
          <Link
            to="/projetos"
            className="font-mono text-[0.66rem] tracking-[0.16em] text-text-muted uppercase transition-colors duration-500 hover:text-text-primary"
          >
            ← Arquivo
          </Link>

          <p className="mt-8 font-mono text-[0.68rem] tracking-[0.22em] text-text-muted uppercase">
            {project.context.label}
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {project.title}
          </h1>
          <div className="mt-5">
            <ProjectStatus status={project.status} />
          </div>
          <p className="mt-3 font-mono text-[0.62rem] tracking-[0.14em] text-text-muted uppercase">
            {project.categories.map((item) => categoryLabel(item)).join(' · ')}
          </p>

          {project.shortDescription ? (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {project.shortDescription}
            </p>
          ) : null}

          {project.technologies.length > 0 ? (
            <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-x-6 sm:grid-cols-3">
              {project.technologies.map((id) => (
                <TechnologyItem key={id} id={id} />
              ))}
            </ul>
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

          {project.business ? <BusinessBlock business={project.business} /> : null}
          {project.technical ? <TechnicalBlock technical={project.technical} /> : null}

          {!hasCase ? (
            <p className="mt-10 max-w-xl border-t border-white/10 pt-8 text-sm leading-relaxed text-text-muted">
              O estudo de caso completo ainda não está publicado. O que aparece aqui é somente o que já
              está documentado.
            </p>
          ) : !project.technical ? (
            <p className="mt-10 max-w-xl border-t border-white/10 pt-8 text-sm leading-relaxed text-text-muted">
              A visão técnica deste caso ainda não está publicada.
            </p>
          ) : !project.business ? (
            <p className="mt-10 max-w-xl border-t border-white/10 pt-8 text-sm leading-relaxed text-text-muted">
              A visão de negócio deste caso ainda não está publicada.
            </p>
          ) : null}
        </Container>
      </main>
    </SiteShell>
  );
}

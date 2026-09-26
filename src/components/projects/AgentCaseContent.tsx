import { lazy, Suspense } from 'react';
import { ProjectStatus } from '@/components/projects/ProjectStatus';
import { TechnologyItem } from '@/components/technology/TechnologyItem';
import type { PortfolioProject, ProjectAgent } from '@/types/project';

const AgentCaseExperience = lazy(() =>
  import('@/components/projects/AgentCaseExperience').then((module) => ({
    default: module.AgentCaseExperience,
  })),
);

function documentedList(items?: string[]) {
  return items?.filter((item) => item.trim().length > 0) ?? [];
}

function AgentRelation({ agents }: { agents: ProjectAgent[] }) {
  return (
    <div className="mt-8 border border-white/10 px-4 py-8 md:px-8">
      <p className="text-center type-label font-mono tracking-[0.16em] text-text-secondary uppercase">
        Agentes de IA
      </p>
      <div aria-hidden="true" className="mx-auto mt-4 h-6 w-px bg-white/25" />
      <div className="relative mt-0 grid grid-cols-2 gap-4 md:gap-8">
        <span aria-hidden="true" className="absolute top-0 right-[12%] left-[12%] h-px bg-white/20" />
        {agents.map((agent) => (
          <div key={agent.id} className="pt-4 text-center">
            <div aria-hidden="true" className="mx-auto h-6 w-px bg-white/25" />
            <p className="type-label mt-3 font-mono tracking-[0.14em] text-text-primary uppercase">{agent.name}</p>
            <p className="type-meta mt-2 text-text-secondary">{agent.environment ?? 'Ambiente não documentado'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentBlock({ agent, index }: { agent: ProjectAgent; index: number }) {
  const responsibilities = documentedList(agent.responsibilities);
  const capabilities = documentedList(agent.capabilities);
  const hasWork =
    Boolean(agent.objective) ||
    responsibilities.length > 0 ||
    capabilities.length > 0 ||
    (agent.technologies?.length ?? 0) > 0;

  return (
    <section className="mt-8 border-t border-white/10 pt-6">
      <p className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">
        {String(index + 1).padStart(2, '0')} / {agent.name}
      </p>
      <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-none font-semibold tracking-[-0.04em]">
        {agent.name}
      </h3>
      {agent.status ? (
        <div className="mt-4">
          <ProjectStatus status={agent.status} />
        </div>
      ) : null}
      {agent.nameOrigin ? <p className="type-body mt-4 max-w-2xl text-text-secondary">{agent.nameOrigin}</p> : null}
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="type-meta font-mono tracking-[0.12em] text-text-muted uppercase">Ambiente</dt>
          <dd className="type-body mt-1 text-text-secondary">{agent.environment ?? 'Não documentado'}</dd>
        </div>
        {agent.objective ? (
          <div>
            <dt className="type-meta font-mono tracking-[0.12em] text-text-muted uppercase">Objetivo</dt>
            <dd className="type-body mt-1 text-text-secondary">{agent.objective}</dd>
          </div>
        ) : null}
      </dl>
      {responsibilities.length > 0 ? (
        <div className="mt-4">
          <p className="type-meta font-mono tracking-[0.12em] text-text-muted uppercase">Responsabilidades</p>
          <ul className="mt-2 space-y-1 text-text-secondary">
            {responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {capabilities.length > 0 ? (
        <div className="mt-4">
          <p className="type-meta font-mono tracking-[0.12em] text-text-muted uppercase">Capacidades</p>
          <ul className="mt-2 space-y-1 text-text-secondary">
            {capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {agent.technologies && agent.technologies.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-x-4">
          {agent.technologies.map((id) => (
            <TechnologyItem key={id} id={id} />
          ))}
        </ul>
      ) : null}
      {!hasWork ? (
        <p className="type-body mt-4 text-text-muted">
          Objetivo, responsabilidades, capacidades e tecnologias ainda não documentados.
        </p>
      ) : null}
      {agent.note ? <p className="type-body mt-4 max-w-2xl text-text-secondary">{agent.note}</p> : null}
    </section>
  );
}

export function AgentCaseContent({ project }: { project: PortfolioProject }) {
  const agents = project.agents ?? [];
  if (agents.length === 0) return null;
  if (project.slug === 'agentes-ia') {
    return (
      <Suspense fallback={null}>
        <AgentCaseExperience />
      </Suspense>
    );
  }

  return (
    <div>
      {project.business?.headline ? (
        <p className="max-w-xl text-[clamp(1.6rem,3vw,2.3rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
          {project.business.headline}
        </p>
      ) : null}
      {project.shortDescription ? (
        <p className="type-body mt-4 max-w-2xl text-text-secondary">{project.shortDescription}</p>
      ) : null}
      {project.business?.context ? (
        <p className="type-body mt-3 max-w-2xl text-text-muted">{project.business.context}</p>
      ) : null}
      <AgentRelation agents={agents} />
      {agents.map((agent, index) => (
        <AgentBlock key={agent.id} agent={agent} index={index} />
      ))}
    </div>
  );
}

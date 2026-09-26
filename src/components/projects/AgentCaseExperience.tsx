import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AgentDocumentation } from '@/components/projects/AgentDocumentation';
import { publicAgent, publicAgents, type PublicAgentProfile } from '@/content/agentes-ia';
import { documentationSections } from '@/content/parse-portfolio-md';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { easeOutExpo } from '@/lib/motion';
import { cn } from '@/lib/cn';

function AgentStory({ agent }: { agent: PublicAgentProfile }) {
  const sections = documentationSections(agent.document.sections);
  const warm = agent.accent === 'orange';

  return (
    <article>
      <p
        className={cn(
          'type-label font-mono tracking-[0.16em] uppercase',
          warm ? 'text-brand-orange' : 'text-brand-cyan',
        )}
      >
        {agent.role}
      </p>
      <h3 className="mt-3 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.88] font-semibold tracking-[-0.05em] uppercase">
        {agent.name}
      </h3>
      <p className="type-label mt-3 font-mono tracking-[0.14em] text-text-secondary uppercase">
        {agent.environment}
      </p>
      {agent.document.epigraph ? (
        <p className="mt-6 max-w-[75ch] text-[clamp(1.35rem,2.4vw,1.9rem)] leading-snug font-medium tracking-[-0.03em] text-text-primary">
          {agent.document.epigraph}
        </p>
      ) : null}

      <AgentDocumentation agentId={agent.id} agentName={agent.name} sections={sections} />

      {agent.images.length > 0 ? (
        <section className="mt-12">
          <h4 className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">Imagens</h4>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {agent.images.map((image) => (
              <li key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full border border-white/10" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {agent.diagrams.length > 0 ? (
        <section className="mt-12">
          <h4 className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">Diagramas</h4>
          <ul className="mt-4 grid gap-4">
            {agent.diagrams.map((diagram) => (
              <li key={diagram.src}>
                <img src={diagram.src} alt={diagram.alt} loading="lazy" decoding="async" className="w-full border border-white/10" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {agent.videos.length > 0 ? (
        <section className="mt-12 space-y-4">
          <h4 className="type-label font-mono tracking-[0.14em] text-text-muted uppercase">Vídeos</h4>
          {agent.videos.map((video) => (
            <video
              key={video.src}
              controls
              preload="none"
              poster={video.poster}
              title={video.title}
              aria-label={video.title}
              className="w-full border border-white/10 bg-black"
            >
              <source src={video.src} />
            </video>
          ))}
        </section>
      ) : null}
    </article>
  );
}

export function AgentCaseExperience() {
  const reduced = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState<PublicAgentProfile['id'] | null>(null);
  const active = activeId ? publicAgent(activeId) : undefined;

  return (
    <div>
      <p className="max-w-3xl text-[clamp(1.7rem,3vw,2.6rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
        Dois agentes. Dois ambientes. Uma mesma ideia.
      </p>
      <p className="type-body mt-4 max-w-2xl text-text-secondary">
        Hestia cuida da casa digital. Argus representa os olhos sobre o ecossistema externo.
      </p>

      <div className="mt-10 border border-white/10 px-4 py-8 md:px-10">
        <p className="text-center type-label font-mono tracking-[0.18em] text-text-secondary uppercase">Ecossistema</p>
        <div aria-hidden="true" className="mx-auto mt-4 h-8 w-px bg-white/25" />
        <div className="relative grid gap-8 sm:grid-cols-2">
          <span aria-hidden="true" className="absolute top-0 right-[18%] left-[18%] hidden h-px bg-white/20 sm:block" />
          <div className="text-center">
            <div aria-hidden="true" className="mx-auto hidden h-8 w-px bg-white/25 sm:block" />
            <p className="type-label mt-3 font-mono tracking-[0.14em] text-brand-orange uppercase">Hestia</p>
            <p className="mt-2 text-text-primary">Home Lab</p>
            <p className="type-meta mt-1 font-mono tracking-[0.1em] text-text-muted uppercase">OMEAB</p>
          </div>
          <div className="text-center">
            <div aria-hidden="true" className="mx-auto hidden h-8 w-px bg-white/25 sm:block" />
            <p className="type-label mt-3 font-mono tracking-[0.14em] text-brand-cyan uppercase">Argus</p>
            <p className="mt-2 text-text-primary">VPS</p>
            <p className="type-meta mt-1 font-mono tracking-[0.1em] text-text-muted uppercase">VinyLab</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2" role="tablist" aria-label="Agentes do case">
        {publicAgents.map((agent) => {
          const selected = agent.id === activeId;
          const warm = agent.accent === 'orange';
          return (
            <button
              key={agent.id}
              type="button"
              role="tab"
              id={`agent-tab-${agent.id}`}
              aria-selected={selected}
              aria-controls="agent-panel"
              onClick={() => setActiveId(agent.id)}
              className={cn(
                'group relative overflow-hidden border bg-[#080b11] text-left transition-colors duration-500',
                selected
                  ? warm
                    ? 'border-brand-orange/70'
                    : 'border-brand-cyan/70'
                  : 'border-white/10 hover:border-white/25',
              )}
            >
              <span
                aria-hidden="true"
                className={cn('absolute top-0 left-0 h-16 w-px', warm ? 'bg-brand-orange' : 'bg-brand-cyan')}
              />
              <img
                src={agent.portrait.src}
                alt={agent.portrait.alt}
                className="aspect-square w-full object-contain p-6"
              />
              <div className="border-t border-white/10 px-5 py-4">
                <p className="text-[clamp(1.6rem,3vw,2.2rem)] leading-none font-semibold tracking-[-0.04em] uppercase">
                  {agent.name}
                </p>
                <p className="type-meta mt-2 font-mono tracking-[0.12em] text-text-secondary uppercase">
                  {agent.environment}
                </p>
                <p className="mt-4 inline-flex items-center gap-3 text-text-primary">
                  <span>{selected ? 'Em leitura' : 'Explorar'}</span>
                  <span aria-hidden="true">→</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {active ? (
          <motion.div
            key={active.id}
            id="agent-panel"
            role="tabpanel"
            aria-labelledby={`agent-tab-${active.id}`}
            className="mt-10"
            initial={reduced ? false : { opacity: 0, x: active.accent === 'cyan' ? -18 : 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: active.accent === 'cyan' ? 12 : -12 }}
            transition={reduced ? { duration: 0 } : { duration: 0.45, ease: easeOutExpo }}
          >
            <AgentStory agent={active} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

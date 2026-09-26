import { useState, type ReactNode } from 'react';
import type { MdBlock, MdSection } from '@/content/parse-portfolio-md';
import { cn } from '@/lib/cn';

const prose =
  'max-w-[75ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.7] text-text-secondary';

const tokenPattern =
  /(\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+`|\[[^\]\n]+\]\((?:https?:\/\/|mailto:)[^)\s]+\)|\*[^*\s][^*\n]*?\*|_[^_\s][^_\n]*?_)/g;

function isSafeHref(href: string) {
  return /^(https?:\/\/|mailto:)/i.test(href);
}

function MarkdownText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(tokenPattern.source, 'g');
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(
        <strong key={key} className="font-medium text-text-primary">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className="font-mono text-[0.92em] text-text-primary">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith('[')) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && isSafeHref(link[2])) {
        const external = link[2].startsWith('http');
        nodes.push(
          <a
            key={key}
            href={link[2]}
            className="text-text-primary underline decoration-white/30 underline-offset-4 transition-colors duration-500 hover:decoration-brand-cyan"
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(link?.[1] ?? token);
      }
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    key += 1;
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function Blocks({ blocks }: { blocks: MdBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.kind === 'emphasis') {
          return (
            <p
              key={index}
              className="max-w-[75ch] border-l border-brand-cyan py-1 pl-4 text-[clamp(1.05rem,1.25vw,1.3rem)] leading-snug font-medium tracking-[-0.02em] text-text-primary"
            >
              {block.text}
            </p>
          );
        }
        if (block.kind === 'sub') {
          return (
            <h5
              key={index}
              className="pt-2 font-mono text-[clamp(0.95rem,1vw,1.05rem)] tracking-[0.12em] text-text-primary uppercase"
            >
              <MarkdownText text={block.text} />
            </h5>
          );
        }
        if (block.kind === 'quote') {
          return (
            <blockquote key={index} className={cn(prose, 'border-l border-white/20 pl-4 text-text-primary')}>
              <MarkdownText text={block.text} />
            </blockquote>
          );
        }
        if (block.kind === 'list') {
          return (
            <ul key={index} className={cn(prose, 'space-y-2')}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.85em] h-px w-3 shrink-0 bg-white/30" />
                  <span>
                    <MarkdownText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.kind === 'code') {
          return (
            <pre
              key={index}
              className="max-w-full overflow-x-auto border border-white/10 bg-black/40 p-4 font-mono text-[0.72rem] leading-relaxed text-text-secondary"
            >
              {block.text}
            </pre>
          );
        }
        return (
          <p key={index} className={prose}>
            <MarkdownText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}

function initiallyOpen(sections: MdSection[]) {
  const overview = sections.findIndex((section) => /visão geral/i.test(section.title));
  return new Set([overview >= 0 ? overview : 0]);
}

type AgentDocumentationProps = {
  agentId: string;
  agentName: string;
  sections: MdSection[];
};

export function AgentDocumentation({ agentId, agentName, sections }: AgentDocumentationProps) {
  const [open, setOpen] = useState(() => initiallyOpen(sections));

  if (sections.length === 0) return null;

  return (
    <section className="mt-12" aria-label={`Documentação de ${agentName}`}>
      <p className="font-mono text-[clamp(0.8rem,0.9vw,0.95rem)] tracking-[0.16em] text-text-muted uppercase">
        Documentação <span className="text-text-secondary">/ {agentName}</span>
      </p>
      <ul className="mt-5 border-t border-white/10">
        {sections.map((section, index) => {
          const expanded = open.has(index);
          const number = String(index + 1).padStart(2, '0');
          const panelId = `${agentId}-doc-${index}`;
          const buttonId = `${panelId}-button`;

          return (
            <li key={panelId} className="border-b border-white/10 transition-colors duration-500 hover:border-white/25">
              <h4 className="m-0 font-normal">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpen((current) => {
                      const next = new Set(current);
                      if (next.has(index)) next.delete(index);
                      else next.add(index);
                      return next;
                    })
                  }
                  className="group flex min-h-12 w-full items-start gap-3 py-4 text-left sm:gap-5"
                >
                  <span
                    className={cn(
                      'pt-1 font-mono text-[0.8rem] tracking-[0.14em] transition-colors duration-500',
                      expanded ? 'text-brand-cyan' : 'text-text-muted group-hover:text-brand-cyan',
                    )}
                  >
                    {number}
                  </span>
                  <span className="min-w-0 flex-1 text-[clamp(1.15rem,1.4vw,1.45rem)] leading-snug font-medium tracking-[-0.03em] text-text-primary/90 uppercase transition-colors duration-500 group-hover:text-text-primary">
                    {section.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pt-0.5 font-mono text-lg leading-none transition-colors duration-500',
                      expanded ? 'text-brand-orange' : 'text-text-muted group-hover:text-brand-orange',
                    )}
                  >
                    {expanded ? '−' : '+'}
                  </span>
                </button>
              </h4>
              <div
                className={cn(
                  'grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                  expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={expanded ? undefined : true}
                    className={cn(
                      'pb-6 pl-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:pl-[4.75rem]',
                      expanded ? 'translate-y-0' : '-translate-y-1',
                    )}
                  >
                    <Blocks blocks={section.blocks} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

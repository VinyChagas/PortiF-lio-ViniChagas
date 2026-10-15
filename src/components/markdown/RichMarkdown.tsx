import { cn } from '@/lib/cn';
import { InlineMarkdown } from './InlineMarkdown';
import { parseMarkdownBlocks } from './parse-blocks';

type RichMarkdownProps = {
  children: string;
  className?: string;
  /** Compacta headings para contextos de documentação embutida. */
  compact?: boolean;
};

const prose =
  'max-w-[75ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.7] text-text-secondary';

/**
 * Markdown em blocos para documentação, desafios e arquitetura.
 * Não usa dangerouslySetInnerHTML nem HTML cru do CMS.
 */
export function RichMarkdown({ children, className, compact = false }: RichMarkdownProps) {
  const blocks = parseMarkdownBlocks(children);

  if (blocks.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      {blocks.map((block, index) => {
        if (block.kind === 'hr') {
          return <hr key={index} className="border-0 border-t border-white/10" />;
        }

        if (block.kind === 'heading') {
          const Tag = (`h${block.level}` as 'h2' | 'h3' | 'h4');
          return (
            <Tag
              key={index}
              className={cn(
                'font-medium tracking-[-0.02em] text-text-primary',
                compact
                  ? 'pt-1 text-[clamp(1rem,1.15vw,1.15rem)]'
                  : block.level === 2
                    ? 'pt-2 text-[clamp(1.2rem,1.6vw,1.45rem)]'
                    : block.level === 3
                      ? 'pt-1 text-[clamp(1.1rem,1.35vw,1.3rem)]'
                      : 'pt-1 font-mono text-[clamp(0.95rem,1vw,1.05rem)] tracking-[0.1em] uppercase',
              )}
            >
              <InlineMarkdown source={block.text} />
            </Tag>
          );
        }

        if (block.kind === 'quote') {
          return (
            <blockquote
              key={index}
              className={cn(prose, 'border-l border-white/20 pl-4 text-text-primary')}
            >
              <InlineMarkdown source={block.text} />
            </blockquote>
          );
        }

        if (block.kind === 'list') {
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag
              key={index}
              className={cn(prose, 'space-y-2', block.ordered && 'list-decimal pl-5')}
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className={cn(!block.ordered && 'flex gap-3')}>
                  {!block.ordered ? (
                    <span aria-hidden="true" className="mt-[0.85em] h-px w-3 shrink-0 bg-white/30" />
                  ) : null}
                  <span>
                    <InlineMarkdown source={item} />
                  </span>
                </li>
              ))}
            </ListTag>
          );
        }

        if (block.kind === 'code') {
          return (
            <pre
              key={index}
              className="max-w-full overflow-x-auto rounded-[var(--radius-md)] border border-white/10 bg-black/40 p-4 font-mono text-[0.72rem] leading-relaxed text-text-secondary"
            >
              <code>{block.text}</code>
            </pre>
          );
        }

        return (
          <p key={index} className={cn(prose, 'whitespace-pre-line')}>
            <InlineMarkdown source={block.text} />
          </p>
        );
      })}
    </div>
  );
}

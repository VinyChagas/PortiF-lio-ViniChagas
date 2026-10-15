import { cn } from '@/lib/cn';
import { parseInlineMarkdown } from './parse-inline';

type InlineMarkdownProps = {
  source: string;
  className?: string;
  as?: 'span' | 'p';
};

/**
 * Markdown inline para cards, resumos e linhas curtas.
 * Headings/tabelas não são interpretados — apenas ênfase, código e links seguros.
 */
export function InlineMarkdown({ source, className, as = 'span' }: InlineMarkdownProps) {
  const content = parseInlineMarkdown(source ?? '');
  if (as === 'p') {
    return <p className={cn(className)}>{content}</p>;
  }
  return <span className={cn(className)}>{content}</span>;
}

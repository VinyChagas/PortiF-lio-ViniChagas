import { type ReactNode, createElement } from 'react';

const tokenPattern =
  /(\*\*[^*]+?\*\*|__[^_]+?__|`[^`]+`|\[[^\]\n]+\]\([^)\s]+\)|\*[^*\s][^*\n]*?\*|_[^_\s][^_\n]*?_)/g;

export function isSafeHref(href: string) {
  return /^(https?:\/\/|mailto:)/i.test(href.trim());
}

type InlineOptions = {
  strongClassName?: string;
  emClassName?: string;
  codeClassName?: string;
  linkClassName?: string;
};

/**
 * Renderiza Markdown inline seguro (negrito, itálico, código, links http/mailto).
 * Não interpreta HTML bruto.
 */
export function parseInlineMarkdown(text: string, options: InlineOptions = {}): ReactNode[] {
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
        createElement(
          'strong',
          {
            key,
            className: options.strongClassName ?? 'font-medium text-text-primary',
          },
          token.slice(2, -2),
        ),
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        createElement(
          'code',
          {
            key,
            className:
              options.codeClassName ?? 'font-mono text-[0.92em] text-text-primary',
          },
          token.slice(1, -1),
        ),
      );
    } else if (token.startsWith('[')) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && isSafeHref(link[2])) {
        const href = link[2].trim();
        const external = href.startsWith('http');
        nodes.push(
          createElement(
            'a',
            {
              key,
              href,
              className:
                options.linkClassName ??
                'text-text-primary underline decoration-white/30 underline-offset-4 transition-colors duration-500 hover:decoration-brand-cyan',
              ...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {}),
            },
            link[1],
          ),
        );
      } else {
        nodes.push(link?.[1] ?? token);
      }
    } else {
      nodes.push(
        createElement('em', { key, className: options.emClassName }, token.slice(1, -1)),
      );
    }
    key += 1;
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

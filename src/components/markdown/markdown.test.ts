import { describe, expect, it } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { InlineMarkdown } from './InlineMarkdown';
import { RichMarkdown } from './RichMarkdown';
import { isSafeHref, parseInlineMarkdown } from './parse-inline';
import { parseMarkdownBlocks } from './parse-blocks';

describe('parseInlineMarkdown', () => {
  it('renderiza negrito semântico', () => {
    const html = renderToStaticMarkup(
      createElement(InlineMarkdown, { source: 'Texto com **destaque** aqui' }),
    );
    expect(html).toContain('<strong');
    expect(html).toContain('destaque');
    expect(html).not.toContain('**');
  });

  it('renderiza itálico', () => {
    const html = renderToStaticMarkup(
      createElement(InlineMarkdown, { source: 'Texto com *ênfase* clara' }),
    );
    expect(html).toContain('<em');
    expect(html).toContain('ênfase');
    expect(html).not.toContain('*ênfase*');
  });

  it('permite apenas links seguros', () => {
    expect(isSafeHref('https://example.com')).toBe(true);
    expect(isSafeHref('mailto:a@b.com')).toBe(true);
    expect(isSafeHref('javascript:alert(1)')).toBe(false);
    expect(isSafeHref('data:text/html,hi')).toBe(false);

    const nodes = parseInlineMarkdown('[ok](javascript:alert(1))');
    const html = renderToStaticMarkup(createElement('span', null, ...nodes));
    expect(html).not.toContain('<a');
    expect(html).not.toContain('javascript:');
    expect(html).toContain('ok');

    const safe = renderToStaticMarkup(
      createElement(InlineMarkdown, { source: '[site](https://example.com)' }),
    );
    expect(safe).toContain('<a');
    expect(safe).toContain('https://example.com');
  });
});

describe('parseMarkdownBlocks / RichMarkdown', () => {
  it('mantém listas com hierarquia', () => {
    const blocks = parseMarkdownBlocks('- item um\n- item dois\n\n1. primeiro\n2. segundo');
    expect(blocks).toEqual([
      { kind: 'list', ordered: false, items: ['item um', 'item dois'] },
      { kind: 'list', ordered: true, items: ['primeiro', 'segundo'] },
    ]);

    const html = renderToStaticMarkup(
      createElement(RichMarkdown, null, '- **Notas importantes**\n- segundo'),
    );
    expect(html).toContain('<ul');
    expect(html).toContain('<strong');
    expect(html).toContain('Notas importantes');
    expect(html).not.toContain('**Notas');
  });

  it('não interpreta HTML cru', () => {
    const html = renderToStaticMarkup(
      createElement(RichMarkdown, null, '<script>alert(1)</script>\n\n**ok**'),
    );
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('<strong');
  });
});

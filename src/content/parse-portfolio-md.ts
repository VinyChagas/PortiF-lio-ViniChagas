export type MdBlock =
  | { kind: 'p'; text: string }
  | { kind: 'emphasis'; text: string }
  | { kind: 'sub'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; text: string };

export type MdSection = {
  title: string;
  blocks: MdBlock[];
};

export type ParsedPortfolio = {
  title: string;
  epigraph: string;
  sections: MdSection[];
};

function isRule(trimmed: string) {
  return /^([-*_])\1{2,}$/.test(trimmed);
}

function isContinuation(line: string) {
  if (!/^\s+\S/.test(line)) return false;
  const trimmed = line.trim();
  if (trimmed.startsWith('#') || trimmed.startsWith('>') || trimmed.startsWith('```')) return false;
  if (isRule(trimmed) || /^[-*]\s+/.test(trimmed)) return false;
  return true;
}

export function normalizeProse(text: string) {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/\s+---\s+/g, ' — ')
    .replace(/\s+--\s+/g, ' — ')
    .replace(/\s+/g, ' ')
    .trim();
}

function asProse(text: string): MdBlock {
  const normalized = normalizeProse(text);
  const emphasis = normalized.match(/^\*\*([^*]+)\*\*$/);
  if (emphasis) return { kind: 'emphasis', text: emphasis[1].trim() };
  return { kind: 'p', text: normalized };
}

export function documentationSections(sections: MdSection[]) {
  return sections.filter(
    (section) => section.blocks.length > 0 && !/nota para publicação/i.test(section.title),
  );
}

export function parsePortfolioMarkdown(source: string): ParsedPortfolio {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  let title = '';
  const epigraph: string[] = [];
  let seenSection = false;
  const sections: MdSection[] = [];
  let current: MdSection | null = null;
  let index = 0;

  const push = (block: MdBlock) => {
    current?.blocks.push(block);
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed || isRule(trimmed)) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const buffer: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        buffer.push(lines[index]);
        index += 1;
      }
      index += 1;
      push({ kind: 'code', text: buffer.join('\n').replace(/\s+$/, '') });
      continue;
    }

    if (line.startsWith('# ')) {
      const heading = normalizeProse(line.slice(2));
      if (!title) {
        title = heading.replace(/\s+/g, ' ');
        index += 1;
        continue;
      }
      current = { title: heading, blocks: [] };
      sections.push(current);
      seenSection = true;
      index += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      current = { title: normalizeProse(line.slice(3)), blocks: [] };
      sections.push(current);
      seenSection = true;
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      push({ kind: 'sub', text: normalizeProse(line.slice(4)) });
      index += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const buffer: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('>')) {
        buffer.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }
      const text = normalizeProse(buffer.join(' '));
      if (!seenSection) {
        const emphasis = text.match(/^\*\*([^*]+)\*\*$/);
        epigraph.push(emphasis ? emphasis[1].trim() : text);
      } else if (text) {
        const block = asProse(text);
        push(block.kind === 'p' ? { kind: 'quote', text: block.text } : block);
      }
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim()) && !isRule(lines[index].trim())) {
        const parts = [lines[index].trim().replace(/^[-*]\s+/, '')];
        index += 1;
        while (index < lines.length && isContinuation(lines[index])) {
          parts.push(lines[index].trim());
          index += 1;
        }
        items.push(normalizeProse(parts.join(' ')));
      }
      push({ kind: 'list', items });
      continue;
    }

    const buffer = [trimmed];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      const nextTrimmed = next.trim();
      if (
        !nextTrimmed ||
        isRule(nextTrimmed) ||
        next.startsWith('#') ||
        nextTrimmed.startsWith('>') ||
        nextTrimmed.startsWith('- ') ||
        nextTrimmed.startsWith('```')
      ) {
        break;
      }
      buffer.push(nextTrimmed);
      index += 1;
    }
    const text = buffer.join(' ');
    if (text.trim()) push(asProse(text));
  }

  return { title, epigraph: epigraph.join(' '), sections };
}

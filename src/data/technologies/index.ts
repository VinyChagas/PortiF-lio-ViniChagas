import {
  siAngular,
  siAxios,
  siCaddy,
  siDocker,
  siExpress,
  siFastapi,
  siLinux,
  siN8n,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSelenium,
  siTailwindcss,
  siTypescript,
  siUbuntu,
  siVite,
  siWireguard,
  type SimpleIcon,
} from 'simple-icons';
import type { Technology, TechnologyGroupId } from '@/types/technology';

type TechnologySeed = {
  name: string;
  group: TechnologyGroupId;
  icon?: SimpleIcon;
  conceptual?: boolean;
};

const seeds = {
  ollama: { name: 'Ollama', group: 'ai', icon: siOllama },
  llms: { name: 'LLMs', group: 'ai', conceptual: true },
  rag: { name: 'RAG', group: 'ai', conceptual: true },
  'ai-agents': { name: 'AI Agents', group: 'ai', conceptual: true },
  'prompt-engineering': { name: 'Prompt Engineering', group: 'ai', conceptual: true },
  'generative-ai': { name: 'IA generativa', group: 'ai', conceptual: true },
  'local-ai': { name: 'IA local', group: 'ai', conceptual: true },
  python: { name: 'Python', group: 'backend', icon: siPython },
  node: { name: 'Node.js', group: 'backend', icon: siNodedotjs },
  fastapi: { name: 'FastAPI', group: 'backend', icon: siFastapi },
  typescript: { name: 'TypeScript', group: 'backend', icon: siTypescript },
  express: { name: 'Express', group: 'backend', icon: siExpress },
  prisma: { name: 'Prisma', group: 'backend', icon: siPrisma },
  axios: { name: 'Axios', group: 'backend', icon: siAxios },
  postgresql: { name: 'PostgreSQL', group: 'backend', icon: siPostgresql },
  'sql-server': { name: 'SQL Server', group: 'backend' },
  rest: { name: 'APIs REST', group: 'backend', conceptual: true },
  'api-rest': { name: 'API REST', group: 'backend', conceptual: true },
  websocket: { name: 'WebSocket', group: 'backend', conceptual: true },
  pdfkit: { name: 'PDFKit', group: 'backend', conceptual: true },
  'json-e-jsonl': { name: 'JSON / JSONL', group: 'backend', conceptual: true },
  etl: { name: 'ETL', group: 'backend', conceptual: true },
  react: { name: 'React', group: 'frontend', icon: siReact },
  angular: { name: 'Angular', group: 'frontend', icon: siAngular },
  vite: { name: 'Vite', group: 'frontend', icon: siVite },
  tailwind: { name: 'Tailwind CSS', group: 'frontend', icon: siTailwindcss },
  playwright: { name: 'Playwright', group: 'automation' },
  selenium: { name: 'Selenium', group: 'automation', icon: siSelenium },
  n8n: { name: 'n8n', group: 'automation', icon: siN8n },
  excel: { name: 'Excel VBA', group: 'automation' },
  linux: { name: 'Linux', group: 'infrastructure', icon: siLinux },
  ubuntu: { name: 'Ubuntu Server', group: 'infrastructure', icon: siUbuntu },
  docker: { name: 'Docker', group: 'infrastructure', icon: siDocker },
  wireguard: { name: 'WireGuard', group: 'infrastructure', icon: siWireguard },
  caddy: { name: 'Caddy', group: 'infrastructure', icon: siCaddy },
  vps: { name: 'VPS', group: 'infrastructure', conceptual: true },
} satisfies Record<string, TechnologySeed>;

export type TechnologyId = keyof typeof seeds;

/** Aliases vindos do Studio (slugify de nomes) → ids do catálogo local. */
const TECHNOLOGY_ALIASES: Record<string, TechnologyId> = {
  'apis-rest': 'rest',
  'api-rest': 'api-rest',
  'json-e-jsonl': 'json-e-jsonl',
  'sqlserver': 'sql-server',
  'node-js': 'node',
  'nodejs': 'node',
  'tailwind-css': 'tailwind',
  'excel-vba': 'excel',
};

export const technologies: Record<TechnologyId, Technology> = Object.fromEntries(
  Object.entries(seeds).map(([id, seed]) => [id, { id, ...seed }]),
) as Record<TechnologyId, Technology>;

export const technologyGroups: { id: TechnologyGroupId; label: string; ids: TechnologyId[] }[] = [
  {
    id: 'ai',
    label: 'IA e LLMs',
    ids: ['ollama', 'llms', 'rag', 'ai-agents', 'prompt-engineering', 'generative-ai', 'local-ai'],
  },
  {
    id: 'backend',
    label: 'Backend e dados',
    ids: [
      'python',
      'node',
      'fastapi',
      'typescript',
      'express',
      'prisma',
      'axios',
      'postgresql',
      'sql-server',
      'rest',
      'api-rest',
      'websocket',
      'pdfkit',
      'json-e-jsonl',
      'etl',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    ids: ['react', 'angular', 'vite', 'tailwind'],
  },
  {
    id: 'automation',
    label: 'Automação',
    ids: ['playwright', 'selenium', 'n8n', 'excel'],
  },
  {
    id: 'infrastructure',
    label: 'Infraestrutura',
    ids: ['linux', 'ubuntu', 'docker', 'wireguard', 'caddy', 'vps'],
  },
];

function humanizeTechId(id: string): string {
  return id
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .trim();
}

/** Normaliza ids do Studio/CMS para o catálogo local quando possível. */
export function normalizeTechnologyId(raw: string): string {
  const id = raw.trim().toLowerCase();
  if (!id) return id;
  if (id in technologies) return id;
  return TECHNOLOGY_ALIASES[id] ?? id;
}

/**
 * Resolve tecnologia sem lançar — ids desconhecidos do Studio não podem derrubar o site.
 */
export function resolveTechnology(id: string): Technology {
  const normalized = normalizeTechnologyId(id);
  const known = technologies[normalized as TechnologyId];
  if (known) return known;
  return {
    id: normalized || id,
    name: humanizeTechId(normalized || id),
    group: 'backend',
    conceptual: true,
  };
}

export function getTechnology(id: TechnologyId) {
  return resolveTechnology(id);
}

export function technologyName(id: string) {
  return resolveTechnology(id).name;
}

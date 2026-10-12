import argusDocument from '../../public/assets/projects/agentes-ia/argus/ARGUS_PORTFOLIO.md?raw';
import hestiaDocument from '../../public/assets/projects/agentes-ia/hestia/HESTIA_PORTFOLIO.md?raw';
import { agentPortraits } from '@/content/agent-portraits';
import { parsePortfolioMarkdown, type ParsedPortfolio } from '@/content/parse-portfolio-md';

export type AgentPublicMedia = {
  src: string;
  alt: string;
};

export type AgentPublicVideo = {
  src: string;
  poster?: string;
  title: string;
};

export type PublicAgentProfile = {
  id: 'hestia' | 'argus';
  name: string;
  environment: string;
  role: string;
  accent: 'orange' | 'cyan';
  portrait: AgentPublicMedia;
  document: ParsedPortfolio;
  images: AgentPublicMedia[];
  diagrams: AgentPublicMedia[];
  videos: AgentPublicVideo[];
};

const argus = parsePortfolioMarkdown(argusDocument);
const hestia = parsePortfolioMarkdown(hestiaDocument);

export const publicAgents: PublicAgentProfile[] = [
  {
    id: 'hestia',
    name: 'Hestia',
    environment: 'Home Lab / OMEAB',
    role: 'A guardiã da casa',
    accent: 'orange',
    portrait: agentPortraits.hestia,
    document: hestia,
    images: [],
    diagrams: [],
    videos: [],
  },
  {
    id: 'argus',
    name: 'Argus',
    environment: 'VPS / VinyLab',
    role: 'Os olhos sobre o ecossistema',
    accent: 'cyan',
    portrait: agentPortraits.argus,
    document: argus,
    images: [],
    diagrams: [],
    videos: [],
  },
];

export function publicAgent(id: string) {
  return publicAgents.find((agent) => agent.id === id);
}

import type { PortfolioProject } from '@/types/project';

export const automacaoNfse: PortfolioProject = {
  id: 'automacao-nfse',
  slug: 'automacao-nfse',
  argusProjectId: 'automacao-nfs',
  title: 'Automação NFSe',
  shortDescription:
    'Sistema que automatiza a coleta mensal de NFS-e em portais fiscais, nascido de um processo operacional real.',
  accent: 'orange',
  featured: true,
  status: 'em uso, com limitações do portal',
  business: {
    headline: 'Do processo mensal manual a um sistema de coleta.',
    context:
      'Desenvolvido no contexto da SCS Contabilidade, a partir da operação fiscal de NFS-e.',
    problem:
      'A coleta mensal de notas em portais fiscais era feita à mão, ocupava a equipe e dependia de um fluxo instável.',
    before:
      'A equipe fiscal dedicava dias a cada ciclo para autenticar, baixar notas e registrar ausência de movimento.',
    trigger:
      'O desgaste do processo mensal e, depois, a descontinuação do portal municipal.',
    solution:
      'Automação de autenticação, downloads e organização dos arquivos — reconstruída quando o portal de origem mudou.',
    impact:
      'A coleta deixou de depender de um mutirão mensal manual e passou a ser operada por sistema.',
    results: [
      {
        label: 'Ciclo manual anterior',
        value: '3 a 4 dias',
        source: 'documentação interna autorizada para portfólio',
      },
      {
        label: 'Paralelismo evidenciado',
        value: '273 empresas em 10 min 18 s',
        note: '60 navegadores, vídeo de 29/08/2025',
        source: 'documentação interna autorizada para portfólio',
      },
    ],
  },
  technical: {
    headline: 'Duas gerações: Selenium no portal municipal, Playwright no portal nacional.',
    technologies: [
      'Node.js',
      'Express',
      'TypeScript',
      'Playwright',
      'Selenium',
      'React',
      'Angular',
      'PostgreSQL',
      'Prisma',
    ],
    architecture:
      'Duas gerações sucessoras: automação do ISS Curitiba e, depois, do Portal Nacional de NFS-e. Cada uma com backend próprio, fila de navegadores e frontend operacional.',
    implementation:
      'A primeira geração concentra login, CAPTCHA, troca de perfil e downloads em lote. A geração vigente autentica por certificado A1 ou credencial e baixa XML e DANFS-e nota a nota.',
    challenges: [
      'Portal municipal instável, com frames e tempos irregulares.',
      'CAPTCHA no login da primeira geração.',
      'Descontinuação do portal de origem, exigindo reconstrução.',
      'Download unitário no portal nacional, sem lote.',
    ],
    decisions: [
      'Selenium na primeira geração, por comunidade e curva de aprendizado na época.',
      'Playwright na geração nacional, por suporte nativo a certificado digital.',
      'Persistência evoluindo de planilha/JSON para PostgreSQL.',
    ],
    infrastructure: 'Operação local controlada; preparação de VPS em andamento.',
  },
  gallery: [],
  repository: null,
};

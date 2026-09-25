import type { PortfolioProject } from '@/types/project';

export const baixarRas: PortfolioProject = {
  id: 'baixarras',
  slug: 'baixarras',
  argusProjectId: 'baixarras',
  title: 'BaixarRAs',
  shortDescription:
    'Sistema full stack para coleta completa de dados de atendimento (RAs) em portal corporativo.',
  accent: 'blue',
  featured: true,
  status: 'uso interno',
  business: {
    headline: 'Coletar um RA inteiro sem perder histórico, anexos ou posição na timeline.',
    context:
      'Coleta de registros de atendimento no portal Autbank, com foco em exportação organizada por RA.',
    problem:
      'Obter, para cada RA, dados gerais, histórico paginado e anexos — persistindo o resultado de forma completa.',
    before:
      'A captura manual no portal exigia navegar dados gerais, timeline e anexos, com risco de perder a posição ao voltar de um download.',
    trigger: 'Necessidade de coleta completa e repetível a partir do portal.',
    solution:
      'Login automatizado, consulta por número, coleta em duas fases e exportação em pasta e JSON por RA.',
    results: [],
  },
  technical: {
    headline: 'Backend de automação com Selenium e frontend React para consulta e exportação.',
    technologies: [
      'Node.js',
      'Express',
      'React',
      'Vite',
      'Axios',
      'Selenium WebDriver',
    ],
    architecture:
      'Backend concentra a automação do portal. Frontend oferece telas de consulta e exportação. Seletores do portal ficam centralizados.',
    implementation:
      'Coleta em duas fases: primeiro o texto e o mapeamento de anexos; depois o download dos arquivos, com reposicionamento na timeline.',
    challenges: [
      'Após baixar um anexo e voltar, o portal retorna à primeira página da timeline.',
    ],
    decisions: [
      'Seletores centralizados para isolar a fragilidade da UI do portal.',
      'Estratégia em duas fases para não interromper a coleta de texto ao baixar anexos.',
    ],
  },
  gallery: [],
  repository: 'https://github.com/VinyChagas/BaixarRAs',
};

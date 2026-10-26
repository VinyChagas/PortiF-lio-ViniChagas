import { agentPortraits } from '@/content/agent-portraits';
import type { PortfolioProject } from '@/types/project';

export const projects: PortfolioProject[] = [
  {
    id: 'automacao-nfse',
    slug: 'automacao-nfse',
    argusProjectId: 'automacao-nfs',
    title: 'Automação NFSe',
    displayLines: ['Automação', 'NFSe'],
    shortDescription:
      'Sistema que automatiza a coleta mensal de NFS-e no portal municipal de Curitiba, nascido da operação fiscal da SCS Contabilidade.',
    context: { label: 'SCS / Fiscal', organization: 'SCS Contabilidade', domain: 'Fiscal' },
    status: 'developed',
    featured: true,
    featuredOrder: 1,
    categories: ['automacao', 'fiscal', 'software'],
    technologies: ['node', 'express', 'typescript', 'selenium', 'react', 'vite'],
    accent: 'orange',
    business: {
      headline: 'Do mutirão mensal de 3–4 dias a um ciclo automatizado em minutos.',
      context:
        'SCS Contabilidade. Operação fiscal de NFS-e no ISS Curitiba, cobrindo cerca de 300 empresas (não a carteira total de quase 500 clientes). Iniciativa própria a partir de maio de 2024, no cargo de analista contábil fiscal.',
      problem:
        'A coleta mensal de notas no portal municipal era feita à mão: login, busca de emitidas e recebidas e baixa sem movimento para preservar certidões (CND). Ocupava a equipe fiscal e dependia de um portal instável.',
      before: [
        'Ciclo de 3 a 4 dias por mês, com cerca de 300 empresas de NFS-e em Curitiba.',
        'Equipe fiscal de 5 pessoas; além do autor, mais 2 do setor executavam a baixa.',
        'Campos do portal que não permitiam colar dados, inclusive no login.',
        'Empresas sem emissão exigiam baixa sem movimento em outra tela, mês a mês.',
      ],
      trigger:
        'Desgaste do processo mensal e iniciativa própria para automatizá-lo. Depois, a descontinuação do portal municipal exigiu uma geração seguinte no Portal Nacional.',
      solution:
        'Automação de autenticação (com CAPTCHA), troca de perfil por procuração, download em lote de emitidas e recebidas, baixa sem movimento, geração de DAM e organização dos arquivos — com frontend operacional próprio.',
      impact:
        'A coleta deixou de depender de um mutirão mensal manual. O primeiro MVP automático reduziu o ciclo a cerca de 5 horas; com paralelismo, o recorte evidenciado chegou a 273 empresas em 10 min 18 s. A partir do quinto mês, o processo automático passou a cobrir o ciclo.',
      results: [
        {
          label: 'Ciclo manual anterior',
          value: '3 a 4 dias',
          note: '~300 empresas NFS-e Curitiba; equipe fiscal de 5',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'MVP com 1 navegador',
          value: '~5 horas',
          note: '~300 empresas; cronômetro no computador',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'Paralelismo evidenciado',
          value: '273 empresas em 10 min 18 s',
          note: '60 navegadores; ~5 min 6 s espera 2Captcha + ~5 min 13 s processamento; vídeo de 29/08/2025',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'Escala descrita no currículo',
          value: '~400 empresas em cerca de 30 min',
          source: 'currículo',
        },
      ],
    },
    technical: {
      headline: 'Primeira geração (Bot Fiscal): Selenium no portal ISS Curitiba.',
      architecture:
        'Backend Node.js/Express com Selenium WebDriver e Chrome, fila de navegadores (p-limit), Socket.IO para progresso e frontend React/Vite para operação, validação e cadastro.',
      implementation:
        'Login CNPJ/senha com CAPTCHA (2Captcha ou fila manual), troca de perfil por procuração, download em lote de emitidas e recebidas, baixa sem movimento, geração de DAM, pause/stop da execução e persistência em planilha Excel e JSON em disco.',
      challenges: [
        'Portal municipal instável, com frames e tempos de carregamento irregulares.',
        'CAPTCHA no login — resolvido com 2Captcha (custo relatado ~USD 1,15 / ~300 empresas) e fila manual.',
        'Campos que não permitiam colar; a automação preenche via WebDriver.',
        'Dois modos de acesso: procuração da contabilidade versus credenciais da própria empresa.',
        'MVP com um navegador ainda levava cerca de 5 horas — resolvido com paralelismo (execução evidenciada com 60 Chromes).',
        'Descontinuação do portal de Curitiba, que exigiu a geração seguinte no Portal Nacional.',
      ],
      decisions: [
        'Tentativa inicial com Playwright/Python no ISS Curitiba; migração para Selenium por comunidade, fóruns e curva de aprendizado na época.',
        '2Captcha no login de Curitiba por custo baixo, API estável e facilidade — com fallback de resolução manual na UI.',
        'Persistência que partiu de planilha Excel e JSON em disco.',
        'Frontend React/Vite nesta geração, com telas de validação e cadastro; parte das rotas de automação/relatórios ainda em placeholder.',
      ],
      infrastructure:
        'Execução local. Hardware do recorte de paralelismo: 14 núcleos / 28 threads, 64 GB RAM, 1 TB SSD, GPU 3090, Ubuntu.',
      integrations: [
        'Portal ISS Curitiba',
        '2Captcha (resolução automática de CAPTCHA)',
      ],
    },
    summary: {
      problem:
        'A coleta mensal de NFS-e no ISS Curitiba era manual: login, emitidas, recebidas e baixa sem movimento. Levava 3 a 4 dias, com cerca de 300 empresas, e dependia de um portal instável.',
      solution:
        'Sistema próprio (Bot Fiscal) que automatiza autenticação com CAPTCHA, troca de perfil, downloads em lote, baixa sem movimento e organização dos arquivos, com frontend operacional.',
      result:
        'O mutirão mensal deu lugar a um ciclo automatizado: MVP em ~5 horas com um navegador; paralelismo evidenciado em 273 empresas / 10 min 18 s com 60 navegadores.',
      metrics: [
        {
          label: 'Ciclo manual anterior',
          value: '3 a 4 dias',
          note: '~300 empresas NFS-e Curitiba',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'MVP com 1 navegador',
          value: '~5 horas',
          note: '~300 empresas',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'Paralelismo evidenciado',
          value: '273 empresas em 10 min 18 s',
          note: '60 navegadores; vídeo de 29/08/2025',
          source: 'documentação interna autorizada para portfólio',
        },
        {
          label: 'Escala descrita no currículo',
          value: '~400 empresas em cerca de 30 min',
          source: 'currículo',
        },
      ],
    },
    journey: [
      {
        id: 'context',
        label: 'Contexto',
        business:
          'SCS Contabilidade. Operação fiscal recorrente de NFS-e no ISS Curitiba (~300 empresas; carteira total ~500). Iniciativa própria a partir de maio de 2024.',
        engineering:
          'Necessidade de interagir programaticamente com o portal municipal: autenticação, frames, CAPTCHA, downloads e organização de arquivos.',
      },
      {
        id: 'problem',
        label: 'Problema',
        business:
          'Processo 100% manual de 3 a 4 dias por mês, envolvendo login, emitidas, recebidas e baixa sem movimento para não prejudicar certidões (CND).',
        engineering:
          'Portal arcaico e instável, com frames, tempos irregulares, CAPTCHA no login e campos que não permitiam colar.',
      },
      {
        id: 'challenge',
        label: 'Desafio',
        business:
          'Escalar a coleta sem aumentar o esforço humano e ter as notas prontas no primeiro dia útil do mês.',
        engineering:
          'Tornar a execução confiável apesar do portal: CAPTCHA, procuração versus credencial própria, e paralelismo após um MVP de ~5 horas com um navegador.',
      },
      {
        id: 'solution',
        label: 'Solução',
        business:
          'Transformação da coleta mensal em processo automatizado, com interface própria para operação e cadastro.',
        engineering:
          'Bot Fiscal: login + CAPTCHA (2Captcha/manual), troca de perfil, downloads em lote, baixa sem movimento, DAM, pause/stop e fila de Chromes.',
      },
      {
        id: 'architecture',
        label: 'Arquitetura',
        business:
          'A operação fiscal deixa de depender do mutirão mensal e passa a rodar como sistema interno controlado.',
        engineering:
          'Backend Express + Selenium/Chrome + p-limit; frontend React/Vite; Socket.IO para progresso; persistência em Excel/JSON.',
      },
      {
        id: 'decisions',
        label: 'Decisões',
        business:
          'Ninguém pediu a ferramenta formalmente; não havia solução de mercado para o portal exclusivo de Curitiba.',
        engineering:
          'Playwright/Python inicial → Selenium por comunidade. 2Captcha no login. Persistência em planilha e JSON nesta geração.',
      },
      {
        id: 'result',
        label: 'Resultado',
        business:
          'Do ciclo manual de 3–4 dias a um processo automatizado. A partir do quinto mês, o robô passou a cobrir o ciclo do início ao fim.',
        engineering:
          'MVP: ~5 h / ~300 empresas (1 navegador). Paralelismo canônico: 273 empresas / 60 navegadores / 10 min 18 s (vídeo 29/08/2025; ~metade do tempo em espera 2Captcha).',
      },
    ],
    documentation: {
      sections: [
        {
          id: 'businessRules',
          title: 'Regras de negócio',
          body: 'Coleta mensal de NFS-e emitidas e recebidas no ISS Curitiba, incluindo baixa sem movimento quando não há emissão, para preservar certidões (CND).',
          items: [
            'Escopo: cerca de 300 empresas com NFS-e em Curitiba — não a carteira total de quase 500 clientes.',
            'Equipe fiscal: 5 pessoas; além do autor, mais 2 do setor executavam a baixa.',
            'Dois caminhos de acesso: procuração da contabilidade (troca de perfil) ou credenciais da própria empresa.',
            'DAM municipal aplicável a casos de lucro presumido nesta geração.',
            'Iniciativa própria a partir de maio de 2024; cargo: analista contábil fiscal.',
          ],
        },
        {
          id: 'architecture',
          title: 'Arquitetura',
          body: 'Primeira geração (Bot Fiscal): API Node.js/Express, automação Selenium/Chrome, fila p-limit, Socket.IO e frontend React/Vite.',
          items: [
            'Persistência principal em planilhas Excel e JSON em disco.',
            'Frontend com rotas de login, home, validador e contabilidades funcionais; automação, relatórios e centro de custo parcialmente placeholder.',
            'Hardware do recorte de paralelismo: 14c/28t, 64 GB RAM, 1 TB SSD, RTX 3090, Ubuntu.',
          ],
        },
        {
          id: 'implementation',
          title: 'Implementação',
          body: 'Fluxo mensal automatizado no portal ISS Curitiba.',
          items: [
            'Login CNPJ/senha com CAPTCHA automático (2Captcha) ou fila manual via Socket.IO.',
            'Troca de perfil por procuração (SelectCNPJ) quando o acesso é da contabilidade.',
            'Download em lote de NFS-e emitidas e recebidas (~30–40 s só nessa etapa, conforme relato).',
            'Baixa sem movimento e geração de DAM quando aplicável.',
            'CRUD/importação de empresas via planilha e pause/stop da execução.',
          ],
        },
        {
          id: 'challenges',
          title: 'Desafios',
          items: [
            'CAPTCHA no login — 2Captcha + fallback manual; custo relatado ~USD 1,15 / ~300 empresas.',
            'Portal instável com frames e waits irregulares — switchTo().frame e esperas por elemento.',
            'Impossibilidade de colar no login manual — resolvida pelo preenchimento via WebDriver.',
            'Procuração versus credencial própria no mesmo pipeline.',
            'MVP de ~5 horas com um navegador — paralelismo com 60 Chromes no recorte evidenciado.',
            'Descontinuação do portal municipal — exigiu a geração seguinte (Portal Nacional / AutoNacional).',
          ],
        },
        {
          id: 'decisions',
          title: 'Decisões técnicas',
          items: [
            'Playwright/Python na tentativa inicial do ISS Curitiba → Selenium por comunidade e curva na época.',
            '2Captcha escolhido entre alternativas por custo, estabilidade da API e facilidade.',
            'Persistência Excel → JSON nesta geração (caminho posterior para Postgres fica na 2ª geração).',
            'React/Vite no frontend desta geração.',
          ],
        },
        {
          id: 'limitations',
          title: 'Limitações',
          items: [
            'Geração voltada ao portal municipal de Curitiba — descontinuada com a migração nacional.',
            'Teto antigo de “quase 80” navegadores nunca foi ocupação estável; execução evidenciada usou 60.',
            'CLI do Bot Fiscal listava até 30 navegadores; a UI aceitava valores livres (60 no vídeo canônico).',
            'Parte das telas do frontend React permanecia placeholder.',
          ],
        },
        {
          id: 'evolution',
          title: 'Evolução',
          body: 'Após a descontinuação do ISS Curitiba, a operação migrou para o Portal Nacional na geração seguinte (AutoNacional / Plataforma NFSe), com Playwright, certificado A1 e PostgreSQL.',
          items: [
            'Calendário da primeira geração: cerca de 8 meses (~4 meses se contar só as quinzenas após o dia 15).',
            'Bot Fiscal ainda rodou em paralelo até março de 2026 enquanto havia emissão no portal antigo.',
            'A segunda geração está documentada no case Plataforma NFSe / 2ª geração.',
          ],
        },
        {
          id: 'evidence',
          title: 'Evidências',
          items: [
            'Ciclo manual — 3 a 4 dias / ~300 empresas — documentação interna autorizada',
            'MVP 1 navegador — ~5 horas / ~300 empresas — cronômetro no computador',
            'Paralelismo canônico — 273 empresas / 60 navegadores / 10 min 18,36 s — vídeo 29/08/2025',
            'Decomposição do mesmo vídeo — ~5 min 6 s espera 2Captcha + ~5 min 13 s processamento',
            'Escala no currículo — ~400 empresas em cerca de 30 min',
            'Relato oral anterior de ~23 min / ~300 empresas — substituído pelo vídeo canônico como headline',
          ],
        },
        {
          id: 'learnings',
          title: 'Aprendizados e impacto',
          items: [
            'Iniciativa própria: a ferramenta não foi pedida formalmente; a equipe em geral nem sabia que era possível.',
            'Não existia ferramenta de mercado para o portal exclusivo de Curitiba na primeira geração.',
            'Apresentação à gestão; reconhecimento relatado inclui aumento salarial de 40% e dois dias de home office semanais dedicados ao desenvolvimento.',
            'Houve comercialização do serviço a outra contabilidade (nome não citável), com modelo por empresas.',
            'Paralelismo de navegadores foi a alavanca de escala; no recorte canônico, o CAPTCHA consumiu cerca de metade do tempo de parede.',
          ],
        },
      ],
    },
    seoTitle: 'Automação NFSe | Vinicius Chagas',
    seoDescription:
      'Automação da coleta mensal de NFS-e no ISS Curitiba, nascida da operação fiscal da SCS Contabilidade.',
  },
  {
    id: 'plataforma-nfse',
    slug: 'plataforma-nfse',
    argusProjectId: 'plataforma-nfse',
    title: 'Plataforma NFSe / 2ª geração',
    shortDescription:
      'Evolução da automação de NFS-e para o cenário nacional, com certificados digitais, credenciais empresariais e armazenamento seguro.',
    context: { label: 'SCS / Fiscal', organization: 'SCS Contabilidade', domain: 'Fiscal' },
    status: 'developed',
    featured: false,
    categories: ['automacao', 'fiscal', 'software'],
    technologies: ['node', 'typescript', 'playwright', 'postgresql', 'prisma'],
    accent: 'orange',
    business: {
      headline: 'A coleta reconstruída quando o portal de origem mudou.',
      context: 'Segunda geração da automação fiscal de NFS-e, ainda no contexto da SCS.',
      solution:
        'Arquitetura para o Portal Nacional de NFS-e, com gestão de certificados digitais, credenciais empresariais e armazenamento seguro.',
    },
    technical: {
      headline: 'Playwright na geração nacional, com certificado digital.',
      architecture:
        'Backend próprio e fila de navegadores. A autenticação usa certificado A1 ou credencial. A persistência evoluiu para PostgreSQL.',
      implementation:
        'Download de XML e DANFS-e nota a nota, porque o portal nacional não oferece lote.',
      challenges: ['Download unitário no portal nacional, sem lote.'],
      decisions: [
        'Playwright nesta geração, pelo suporte nativo a certificado digital.',
        'PostgreSQL no lugar da persistência anterior em planilha e JSON.',
      ],
      infrastructure: 'Operação local controlada; preparação de VPS em andamento.',
    },
  },
  {
    id: 'baixarras',
    slug: 'baixarras',
    argusProjectId: 'baixarras',
    title: 'BaixarRAs',
    displayLines: ['Baixar', 'RAs'],
    shortDescription:
      'Sistema full stack para coleta completa de dados de atendimento (RAs) em portal corporativo.',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: false,
    categories: ['automacao', 'banking', 'software', 'full-stack'],
    technologies: ['node', 'express', 'react', 'vite', 'axios', 'selenium'],
    accent: 'blue',
    repository: 'https://github.com/VinyChagas/BaixarRAs',
    business: {
      headline: 'Coletar um RA inteiro sem perder histórico, anexos ou posição na timeline.',
      context:
        'Coleta de registros de atendimento no portal de um fornecedor de tecnologia, no contexto de uma instituição financeira, com exportação organizada por RA.',
      problem:
        'Obter, para cada RA, dados gerais, histórico paginado e anexos — persistindo o resultado de forma completa.',
      before: [
        'A captura manual no portal exigia navegar dados gerais, timeline e anexos, com risco de perder a posição ao voltar de um download.',
      ],
      trigger: 'Necessidade de coleta completa e repetível a partir do portal.',
      solution:
        'Login automatizado, consulta por número, coleta em duas fases e exportação em pasta e JSON por RA.',
    },
    technical: {
      headline: 'Backend de automação com Selenium e frontend React para consulta e exportação.',
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
    seoTitle: 'BaixarRAs | Vinicius Chagas',
    seoDescription:
      'Sistema full stack para coleta de registros de atendimento no contexto de uma instituição financeira.',
  },
  {
    id: 'gestorras',
    slug: 'gestorras',
    argusProjectId: 'gestorras',
    title: 'GestorRAs / MultiPortal',
    displayLines: ['GestorRAs', 'MultiPortal'],
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: true,
    featuredOrder: 2,
    categories: ['banking', 'software'],
    technologies: [],
    accent: 'blue',
  },
  {
    id: 'proccompare',
    slug: 'proccompare',
    argusProjectId: 'proccompare',
    title: 'ProcCompare',
    shortDescription:
      'Ferramenta para comparar versões de procedures SQL entre fornecedor e produção, identificar divergências e apoiar reuniões de change.',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: false,
    categories: ['banking', 'software'],
    technologies: ['sql-server'],
    accent: 'blue',
    business: {
      headline: 'Divergências de procedure visíveis antes do change.',
      problem:
        'Comparar o que o fornecedor entrega com o que está em produção, incluindo trechos removidos ou adicionados e risco de regressão.',
      solution:
        'Comparação automatizada de procedures SQL para apoiar a análise de change e as reuniões de liberação.',
    },
  },
  {
    id: 'autotickets',
    slug: 'autotickets',
    argusProjectId: 'autotickets',
    title: 'AutoTickets',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: false,
    categories: ['banking'],
    technologies: [],
    accent: 'blue',
  },
  {
    id: 'pipeline-ia-atendimentos',
    slug: 'pipeline-ia-atendimentos',
    argusProjectId: 'pipeline-ia-atendimentos',
    title: 'Pipeline IA para análise de atendimentos/RAs',
    displayLines: ['Pipeline', 'IA'],
    shortDescription:
      'Automação para baixar atendimentos, evidências e históricos, processar o conteúdo com um LLM local e gerar resumos técnicos.',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: false,
    categories: ['ia', 'automacao', 'banking'],
    technologies: ['llms', 'local-ai'],
    accent: 'orange',
    business: {
      headline: 'O histórico do atendimento vira um resumo técnico.',
      context: 'Pipeline usado no ambiente bancário para passagem de contexto da equipe.',
      problem:
        'Ler históricos e evidências de atendimento à mão atrasava a análise e a passagem de contexto.',
      solution:
        'Download dos atendimentos e dos históricos, processamento em servidor local com LLM e geração de resumos técnicos.',
    },
    seoTitle: 'Pipeline IA de atendimentos | Vinicius Chagas',
    seoDescription:
      'Pipeline com IA local para ler históricos de atendimento e gerar resumos técnicos.',
  },
  {
    id: 'automacao-abertura-fechamento',
    slug: 'automacao-abertura-fechamento',
    argusProjectId: 'automacao-abertura-fechamento',
    title: 'Automação Abertura/Fechamento',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'developed',
    featured: false,
    categories: ['automacao', 'banking'],
    technologies: [],
    accent: 'orange',
  },
  {
    id: 'ferramentas-evidencias-bancarias',
    slug: 'ferramentas-evidencias-bancarias',
    argusProjectId: 'ferramentas-evidencias-bancarias',
    title: 'Ferramentas operacionais / evidências bancárias',
    shortDescription:
      'Conjunto de ferramentas internas para rotinas operacionais e coleta de evidências no contexto bancário.',
    context: { label: 'Instituição financeira', organization: 'Instituição financeira', domain: 'Banking' },
    status: 'multiple',
    featured: false,
    categories: ['banking'],
    technologies: [],
    accent: 'blue',
  },
  {
    id: 'simples-nacional',
    slug: 'simples-nacional',
    argusProjectId: 'simples-nacional',
    title: 'Sistema de cálculo do Simples Nacional',
    shortDescription:
      'Microsistema em Excel/VBA para cálculo de impostos do Simples Nacional, com histórico de processamento e uso contínuo por mais de três anos.',
    context: { label: 'SCS', organization: 'SCS Contabilidade', domain: 'Fiscal' },
    status: 'developed-production',
    featured: false,
    categories: ['automacao', 'fiscal'],
    technologies: ['excel'],
    accent: 'orange',
    business: {
      headline: 'O cálculo do Simples Nacional saiu da conta manual.',
      context: 'Ferramenta interna criada na SCS Contabilidade.',
      solution:
        'Cálculo automatizado dos impostos, com histórico de processamento, em uso contínuo por mais de três anos.',
    },
  },
  {
    id: 'plataforma-ambiental',
    slug: 'plataforma-ambiental',
    argusProjectId: 'plataforma-ambiental',
    title: 'Plataforma de indicadores/emissões ambientais',
    displayLines: ['Plataforma', 'ambiental'],
    shortDescription:
      'Plataforma para cálculo de emissões de gases poluentes e indicadores ambientais, no lugar de um processo manual em planilhas.',
    context: {
      label: 'Sinergia Engenharia',
      organization: 'Sinergia Engenharia de Meio Ambiente',
      domain: 'Ambiental',
    },
    status: 'developed',
    featured: false,
    categories: ['software', 'full-stack'],
    technologies: ['react', 'node', 'python', 'postgresql', 'rest'],
    accent: 'blue',
    business: {
      headline: 'Planilhas governamentais viraram plataforma.',
      context:
        'Concebida na Sinergia Engenharia de Meio Ambiente, onde fui o primeiro profissional de tecnologia da equipe.',
      problem:
        'O cálculo de emissões e os indicadores dependiam de planilhas governamentais e de um processo manual.',
      solution:
        'Sistema digital para automatizar cálculos ambientais, apoiar certificações e simplificar análises.',
    },
    technical: {
      architecture:
        'Desenvolvimento full stack com React, Node.js, Python, PostgreSQL e APIs REST, além de integrações e ajustes de usabilidade.',
    },
    seoTitle: 'Plataforma ambiental | Vinicius Chagas',
    seoDescription:
      'Plataforma de emissões e indicadores ambientais desenvolvida na Sinergia Engenharia.',
  },
  {
    id: 'sistema-financeiro-contabil',
    slug: 'sistema-financeiro-contabil',
    argusProjectId: 'sistema-financeiro-contabil',
    title: 'Sistema Financeiro Contábil',
    context: {
      label: 'Projeto próprio / SCS',
      organization: 'SCS Contabilidade',
      domain: 'Projeto próprio',
    },
    status: 'mvp',
    featured: false,
    categories: ['software', 'pessoal'],
    technologies: [],
    accent: 'orange',
  },
  {
    id: 'notalote',
    slug: 'notalote',
    argusProjectId: 'notalote',
    title: 'NotaLote / XML → PDF/CSV',
    shortDescription: 'Ferramenta própria para transformar XML em PDF e CSV.',
    context: { label: 'Projeto próprio', domain: 'Projeto próprio' },
    status: 'developed-mvp',
    featured: false,
    categories: ['pessoal', 'software'],
    technologies: [],
    accent: 'blue',
  },
  {
    id: 'automacao-android-tiktok',
    slug: 'automacao-android-tiktok',
    argusProjectId: 'automacao-android-tiktok',
    title: 'Automação Android/TikTok',
    context: { label: 'Projeto próprio', domain: 'Projeto próprio' },
    status: 'prototype',
    featured: false,
    categories: ['automacao', 'pessoal'],
    technologies: [],
    accent: 'orange',
  },
  {
    id: 'omeab-miniserver',
    slug: 'omeab-miniserver',
    argusProjectId: 'omeab-miniserver',
    title: 'OMEAB / MiniServer',
    displayLines: ['OMEAB', 'MiniServer'],
    shortDescription:
      'Servidor Ubuntu com RTX 3090 para LLMs locais, RAG, agentes e automações, com acesso controlado.',
    context: { label: 'Homelab', domain: 'Homelab' },
    status: 'production',
    featured: true,
    featuredOrder: 4,
    categories: ['infraestrutura', 'ia'],
    technologies: ['ubuntu', 'linux', 'llms', 'rag', 'ai-agents', 'local-ai'],
    accent: 'orange',
    business: {
      headline: 'Modelos locais, no próprio servidor.',
      solution:
        'Homelab de IA local para executar LLMs, RAG, agentes e automações, com acesso controlado por VPN, domínio e uma camada de segurança.',
    },
    seoTitle: 'OMEAB / MiniServer | Vinicius Chagas',
    seoDescription: 'Homelab de IA local com GPU para LLMs, RAG, agentes e automações.',
  },
  {
    id: 'control-center-miniserver',
    slug: 'control-center-miniserver',
    argusProjectId: 'control-center-miniserver',
    title: 'Control Center do MiniServer',
    context: { label: 'Homelab', domain: 'Homelab' },
    status: 'developed',
    featured: false,
    categories: ['infraestrutura'],
    technologies: [],
    accent: 'blue',
  },
  {
    id: 'agentes-ia',
    slug: 'agentes-ia',
    argusProjectId: 'agentes-ia',
    title: 'Agentes de Inteligência Artificial',
    displayLines: ['Agentes de', 'Inteligência Artificial'],
    shortDescription: 'Duas inteligências especializadas para dois ambientes distintos.',
    context: { label: 'Hestia + Argus', domain: 'IA' },
    status: 'in-development',
    featured: true,
    featuredOrder: 3,
    categories: ['ia'],
    technologies: [],
    accent: 'orange',
    business: {
      headline: 'Dois ambientes. Dois agentes. Uma mesma ideia.',
      context: 'Hestia cuida da casa digital. Argus representa os olhos sobre o ecossistema externo.',
    },
    agents: [
      {
        id: 'hestia',
        name: 'Hestia',
        environment: 'Home Lab / OMEAB',
        nameOrigin:
          'O nome vem de Héstia, associada ao lar, à lareira e à proteção da casa. No case, essa identidade é a da home lab.',
        avatar: agentPortraits.hestia.src,
        avatarAlt: agentPortraits.hestia.alt,
        status: 'in-development',
      },
      {
        id: 'argus',
        name: 'Argus',
        environment: 'VPS / VinyLab',
        nameOrigin:
          'O nome vem de Argus Panoptes, associado à vigilância e aos muitos olhos. No case, essa identidade é a da VPS.',
        avatar: agentPortraits.argus.src,
        avatarAlt: agentPortraits.argus.alt,
        status: 'in-development',
      },
    ],
    seoTitle: 'Agentes de Inteligência Artificial | Vinicius Chagas',
    seoDescription: 'Case único de Argus e Hestia.',
  },
  {
    id: 'infraestrutura-vps',
    slug: 'infraestrutura-vps',
    argusProjectId: 'infraestrutura-vps',
    title: 'Infraestrutura VPS / Control Center',
    context: { label: 'Infraestrutura', domain: 'Infraestrutura' },
    status: 'in-development',
    featured: false,
    categories: ['infraestrutura'],
    technologies: ['vps'],
    accent: 'blue',
  },
  {
    id: 'ecossistema-n8n',
    slug: 'ecossistema-n8n',
    argusProjectId: 'ecossistema-n8n',
    title: 'Ecossistema n8n do MiniServer',
    shortDescription: 'Ecossistema de automações com n8n no MiniServer.',
    context: { label: 'Automação', domain: 'Automação' },
    status: 'near-completion',
    featured: false,
    categories: ['automacao', 'infraestrutura'],
    technologies: ['n8n'],
    accent: 'orange',
  },
  {
    id: 'rag-portfolio',
    slug: 'rag-portfolio',
    argusProjectId: 'rag-portfolio',
    title: 'RAG pessoal / Portfólio Inteligente',
    shortDescription: 'RAG pessoal aplicado ao portfólio, em estágio inicial.',
    context: { label: 'IA', domain: 'IA' },
    status: 'starting',
    featured: false,
    categories: ['ia', 'pessoal'],
    technologies: ['rag', 'llms'],
    accent: 'blue',
  },
  {
    id: 'portfolio-full-stack',
    slug: 'portfolio-full-stack',
    argusProjectId: 'portfolio-full-stack',
    title: 'Portfólio Full Stack interativo',
    shortDescription: 'Este portfólio, em desenvolvimento como peça full stack interativa.',
    context: { label: 'Projeto pessoal', domain: 'Projeto pessoal' },
    status: 'in-development',
    featured: false,
    categories: ['software', 'full-stack', 'pessoal'],
    technologies: ['react', 'vite', 'tailwind', 'typescript'],
    accent: 'orange',
  },
];

import type { ExperienceEntry } from '@/types/experience';

export const experience: ExperienceEntry[] = [
  {
    id: 'milgran',
    organization: 'Milgran Granitos',
    role: 'Tax & Export Operations Analyst',
    location: 'Barra de São Francisco, ES',
    stage: 'Operação',
    period: {
      start: '2020-05',
      end: '2021-09',
      label: 'Mai 2020 — Set 2021',
    },
    summary:
      'Operação fiscal e de exportação: documentação, rastreabilidade e rotinas internas. Uma macro em Excel/VBA para manifestação de notas reduziu um processo de cerca de duas semanas para aproximadamente cinco horas, no volume de 300 a 400 notas por mês.',
    metrics: [
      {
        value: '2 sem. → ~5 h',
        label: 'Rotina fiscal de manifestação de notas',
      },
    ],
  },
  {
    id: 'sinergia',
    organization: 'Sinergia Engenharia de Meio Ambiente',
    role: 'Full Stack Software Engineer',
    location: 'Curitiba, PR',
    stage: 'Software',
    period: {
      start: '2023-05',
      end: '2024-01',
      label: 'Mai 2023 — Jan 2024',
    },
    summary:
      'Primeiro profissional de tecnologia da equipe. A plataforma de cálculo de emissões e indicadores ambientais saiu de planilhas governamentais para um sistema com React, Node.js, Python, PostgreSQL e APIs REST. O trabalho incluía clientes, requisitos, sprints e a ponte entre negócio e entrega.',
  },
  {
    id: 'scs-contabilidade',
    organization: 'SCS Contabilidade',
    role: 'Business Process & Automation Specialist',
    location: 'Curitiba, PR',
    stage: 'Automação',
    period: {
      start: '2024-04',
      end: '2025-06',
      label: 'Abr 2024 — Jun 2025',
    },
    summary:
      'Transformação digital de processos fiscais e contábeis. A automação de NFS-e passou a cobrir cerca de 400 empresas em aproximadamente 30 minutos. O cálculo do Simples Nacional virou um microsistema em Excel/VBA, com histórico de processamento e uso contínuo por mais de três anos.',
    metrics: [
      {
        value: '~400',
        label: 'Empresas na automação de NFS-e',
      },
      {
        value: '~30 min',
        label: 'Ciclo aproximado dessa coleta',
      },
    ],
  },
  {
    id: 'to-brasil',
    organization: 'T.O. Brasil',
    role: 'Software Engineer | AI Automation Specialist',
    location: 'Curitiba, PR',
    stage: 'IA aplicada',
    period: {
      start: '2025-07',
      end: '2026-06',
      label: 'Jul 2025 — Jun 2026',
    },
    summary:
      'Ambiente bancário: sustentação de sistemas, automações para a equipe de Running e IA aplicada. O conjunto inclui mais de seis ferramentas internas, comparação de procedures SQL entre fornecedor e produção, e um pipeline com modelo local para ler históricos de atendimento e gerar resumos técnicos.',
    metrics: [
      {
        value: '6+',
        label: 'Ferramentas internas para operações bancárias',
      },
    ],
  },
];

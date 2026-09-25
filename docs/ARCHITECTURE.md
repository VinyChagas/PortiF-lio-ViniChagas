# Arquitetura — V0.1

## Organização do frontend

Stack: React 19, TypeScript, Vite, Tailwind CSS 4, Motion, Lucide, React Router 7.

A árvore segue o crescimento previsto do portfólio. Nesta versão só existem arquivos que a Home e a fundação realmente usam.

```
src/
  app/           App, router e providers
  components/    UI, layout, navegação, animações, comuns
  features/      Argus (CTA visual) e modos de visão de projeto
  sections/home/ Blocos da Home
  pages/         Home e NotFound
  data/          Projetos, experiência, áreas, social, navegação
  services/argus Contrato futuro do RAG
  hooks/         Scroll, motion, ponteiro
  lib/           cn, assets, easing
  types/         Projeto, experiência, Argus
  styles/        tokens, globals, animações
```

## Componentes

- `ui/` — botão, container, heading, link. Design system próprio, sem lib de UI.
- `layout/` — shell, navbar e footer.
- `navigation/` — links e menu mobile.
- `animations/Reveal` — entrada em viewport, respeitando reduced motion.
- `common/` — logo oficial e skip link.

## Sections e pages

A Home é uma página só, com âncoras:

`#inicio` → `#sobre` → áreas → `#projetos` → `#experiencia` → `#contato`

`NotFound` existe para rotas internas ainda não construídas. Não há páginas completas de projeto, sobre ou contato nesta entrega.

## Data

Projetos vivem em `src/data/projects/`, um arquivo por case, agregados em `index.ts`.

O tipo `PortfolioProject` já separa:

- `business` — contexto, problema, antes, gatilho, solução, impacto, resultados
- `technical` — arquitetura, stack, implementação, desafios, decisões
- `argusProjectId` — identificador futuro para o RAG
- `gallery` e `repository`

A Home usa só `title`, `shortDescription`, `business.headline` e um recorte da stack. O restante fica pronto para a página de case.

Experiência e social não inventam empresas, datas ou URLs. LinkedIn permanece como espaço reservado até a URL oficial ser confirmada.

## Preparação para projetos

`features/project-view/modes.ts` define `business` e `technical`. A V0.1 não implementa o toggle. A V0.2 deve consumir esses modos sem refatorar o modelo de dados.

## Preparação para o Argus

`services/argus/client.ts` expõe `askArgus({ question, projectId })` e falha de propósito: não há backend falso nem chatbot simulado.

O CTA “Conheça o Argus” é visual e aponta para uma nota no footer. Nas páginas de projeto, o `project_id` a enviar será `argusProjectId`.

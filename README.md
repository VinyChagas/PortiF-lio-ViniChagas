# Portfólio — Vinicius Chagas

Presença digital profissional de Vinicius Chagas. A V0.1 entrega a fundação visual e a Home: premium, minimalista e cinematográfica, para recrutadores, profissionais técnicos, empresários e potenciais clientes.

## Status

**V0.1 — fundação visual + Home**

Implementado: design system, navbar, Hero, Sobre, áreas de atuação, preview de projetos, experiência básica, CTA, footer, responsividade e preparação arquitetural para cases e Argus.

Ainda não: páginas internas completas, toggle Negócio/Técnico, Argus funcional, backend ou CMS.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- Lucide
- React Router 7

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Estrutura principal

```
src/app            aplicação, router e providers
src/components     UI, layout e navegação
src/sections/home  seções da Home
src/pages          Home e 404
src/data           conteúdo estruturado
src/types          contratos, inclusive visão negócio/técnica
docs               design system e arquitetura
```

## Assets oficiais

Estes arquivos são a identidade visual. Não substituir, não recolorir, não gerar de novo:

```
public/assets/brand/background-ocean.png
public/assets/brand/logo-vc.png
public/assets/profile/viny-profile.jpg
```

O Hero, a navbar e a seção Sobre apontam para esses caminhos. Se o repositório for clonado sem eles, copie os arquivos oficiais para essas pastas antes de avaliar o visual final.

## Documentação

- [Design system](docs/DESIGN_SYSTEM.md)
- [Arquitetura](docs/ARCHITECTURE.md)

# Como alimentar o portfólio

O site lê os projetos em `src/data/projects/catalog.ts`. Essa é a única fonte que a interface usa hoje.

A pasta `content/projects/` é o arquivo de trabalho de cada projeto: texto, imagens, vídeos, diagramas e documentos. Nada que estiver ali aparece no site sozinho. O portfólio é público. Um arquivo só entra na interface quando você decide publicá-lo no catálogo, com `media.approvedForPublic: true` no caso de evidências.

O Markdown ainda não é lido pelo site. Os READMEs existem para você completar. Uma integração futura pode ir de `README.md` para a página `/projetos/:slug` sem mudar esta organização.

## Adicionar descrição

Edite:

`content/projects/<slug>/README.md`

O que for para o site também precisa estar no objeto do projeto em `src/data/projects/catalog.ts`. O README sozinho não altera a Home nem o arquivo.

## Adicionar screenshots

Coloque os arquivos de trabalho em:

`content/projects/<slug>/images/`

Nomes sugeridos, sem obrigatoriedade:

- `01-dashboard.png`
- `02-execution.png`
- `03-results.png`
- `04-architecture.png`

Formatos previstos: png, jpg, webp, avif, gif.

Para publicar, copie a imagem para `public/assets/projects/<slug>/` e registre no catálogo:

```ts
media: {
  approvedForPublic: true,
  cover: '/assets/projects/<slug>/cover.webp',
  screenshots: [
    {
      src: '/assets/projects/<slug>/01-dashboard.webp',
      alt: 'Descrição objetiva da tela',
      type: 'interface',
      kind: 'image',
    },
  ],
}
```

`approvedForPublic` precisa ser `true`. Sem isso, o site mantém o visual abstrato.

A imagem entra dentro do Project Visual atual: gradiente, grid, fade nas bordas e tipografia. Ela não substitui o painel por um retângulo cru.

## Adicionar vídeos

Coloque o arquivo de trabalho em:

`content/projects/<slug>/videos/`

Exemplo:

```
videos/
├── demo.mp4
└── demo-poster.jpg
```

Também cabe `.webm`. Não há vídeo de exemplo no repositório.

Para publicar, copie para `public/assets/projects/<slug>/` e registre, ainda com `approvedForPublic: true`:

```ts
videos: [
  {
    src: '/assets/projects/<slug>/demo.mp4',
    poster: '/assets/projects/<slug>/demo-poster.jpg',
    title: 'Título do vídeo',
  },
]
```

O player só aparece no Quick View, com `preload="none"`, sem autoplay, e só se houver `poster` quando você quiser a capa. A Home não baixa o vídeo.

## Adicionar diagramas

Coloque o arquivo de trabalho em:

`content/projects/<slug>/diagrams/`

Formatos previstos: png, svg, webp, mmd.

Para publicar uma imagem de diagrama, use `media.diagrams` com `kind: 'diagram'` e `approvedForPublic: true`. Arquivos `.mmd` ficam como fonte; o site não renderiza Mermaid nesta versão.

## Adicionar documentos

Coloque materiais complementares em:

`content/projects/<slug>/documents/`

Esta pasta é nota interna. O site não lista e não publica esses arquivos. Conteúdo de ambiente corporativo permanece aqui até existir uma decisão explícita de publicar um trecho no catálogo.

## Argus

`content/projects/agentes-ia/argus/`

Avatar de trabalho:

`content/projects/agentes-ia/argus/images/avatar.webp`

Avatar publicado, quando quiser que o site mostre:

`public/assets/projects/agentes-ia/argus/avatar.webp`

No catálogo, no item `id: 'argus'`:

```ts
avatar: '/assets/projects/agentes-ia/argus/avatar.webp',
avatarAlt: 'Argus',
```

Sem `avatar`, o painel mostra só o nome.

## Hestia

`content/projects/agentes-ia/hestia/`

Avatar de trabalho:

`content/projects/agentes-ia/hestia/images/avatar.webp`

Avatar publicado:

`public/assets/projects/agentes-ia/hestia/avatar.webp`

No item `id: 'hestia'`:

```ts
avatar: '/assets/projects/agentes-ia/hestia/avatar.webp',
avatarAlt: 'Hestia',
```

## Como marcar um projeto como destaque

No objeto do projeto, em `src/data/projects/catalog.ts`:

```ts
featured: true,
featuredOrder: 5,
```

A Home usa somente `featured: true`, na ordem de `featuredOrder`. O contador `01 / 04` sai de `featuredProjects.length`. Não há número fixo na interface.

Para tirar um destaque: `featured: false`.

## Como alterar a ordem

Mude `featuredOrder`. Números menores aparecem primeiro. Os valores atuais são 1, 2, 3 e 4.

## Como adicionar um novo projeto

1. Inclua um objeto em `projects` dentro de `src/data/projects/catalog.ts`, com `id` e `slug` iguais ao nome da pasta.
2. Crie:

```
content/projects/<slug>/
├── README.md
├── images/
├── videos/
├── diagrams/
└── documents/
```

3. Preencha só o que estiver documentado. O restante fica `TODO`.
4. Se for destaque, defina `featured` e `featuredOrder`.
5. A contagem do arquivo (`projects.length`) muda sozinha.

Não crie outro arquivo de lista. O arquivo de projetos e a Home leem o mesmo catálogo.

## Como adicionar um novo agente

1. Crie `content/projects/agentes-ia/<id>/` com `README.md`, `images/`, `videos/` e `diagrams/`.
2. Acrescente um item em `agents` do projeto `agentes-ia` no catálogo:

```ts
{
  id: 'novo-agente',
  name: 'Nome',
}
```

Argus e Hestia não são entradas separadas do arquivo. O case publicado é um só: Agentes de Inteligência Artificial.

## Como funciona a mídia e o fallback

- Com `media.approvedForPublic === true` e `cover` ou screenshot, o Project Visual incorpora a imagem.
- Sem mídia aprovada, permanece o painel abstrato: gradiente, grid, azul, laranja e geometria.
- No case de agentes, se houver dois ou mais agentes, o painel mostra os nomes lado a lado. Avatar só entra quando o campo `avatar` existe.
- Vídeo não entra na Home.

## O que o site já consome

O site consome o catálogo TypeScript. Não consome `content/projects/**/README.md`.

A rota `/projetos/:slug` já existe e mostra o que estiver no catálogo, inclusive os agentes quando o projeto tiver `agents`.

# Argus --- Inteligência Operacional da VPS

> **Muitos olhos sobre o ambiente. Uma única inteligência para
> compreender o todo.**

## Visão geral

Argus é o agente de inteligência artificial projetado para atuar sobre o
ecossistema da minha **VPS VinyLab**.

Seu propósito é funcionar como uma camada inteligente entre mim e a
infraestrutura: compreender solicitações, consultar o estado do
ambiente, conectar serviços, interpretar informações operacionais e,
progressivamente, executar ações controladas através das ferramentas
disponíveis na VPS.

O projeto não foi concebido como um chatbot genérico.

Argus representa a evolução de uma infraestrutura composta por
aplicações, containers, automações, bancos de dados, métricas e serviços
independentes para um ambiente capaz de ser **consultado e operado
através de uma interface inteligente e contextual**.

Dentro do meu ecossistema pessoal, ele complementa a Hestia:

-   **Hestia** --- inteligência responsável pela home lab e pelo
    ambiente local.
-   **Argus** --- inteligência responsável pela VPS, aplicações e
    serviços do ecossistema VinyLab.

------------------------------------------------------------------------

## Por que o nome Argus?

O nome é inspirado em **Argus Panoptes (Argos Panoptes)**, personagem da
mitologia grega conhecido por possuir muitos olhos e permanecer
constantemente vigilante.

A referência representa diretamente a função que pretendo dar ao agente.

Uma VPS moderna não possui apenas um elemento para observar. Existem
aplicações, containers, automações, bancos de dados, métricas,
integrações e serviços funcionando simultaneamente.

Argus foi pensado para reunir esses diferentes "olhos" da infraestrutura
e transformar sinais isolados em uma visão contextual do ambiente.

Por isso, a referência mitológica não é apenas estética.

Ela representa três conceitos centrais do projeto:

**observação → contexto → ação controlada**

------------------------------------------------------------------------

## O problema

À medida que uma infraestrutura cresce, administrá-la passa a exigir
interação com diversas ferramentas diferentes.

Em um mesmo ambiente podem existir:

-   aplicações;
-   APIs;
-   containers;
-   bancos de dados;
-   automações;
-   dashboards;
-   métricas;
-   logs;
-   integrações;
-   modelos de linguagem;
-   serviços internos;
-   sistemas de conhecimento.

Cada ferramenta possui sua própria interface e sua própria visão do
ambiente.

Isso cria uma fragmentação operacional.

Para responder perguntas aparentemente simples, muitas vezes é
necessário navegar entre vários sistemas:

-   Quais serviços estão disponíveis?
-   Existe algum comportamento anormal?
-   O problema está na aplicação ou na infraestrutura?
-   Uma automação executou corretamente?
-   Existe documentação sobre determinado projeto?
-   Qual informação é segura para apresentar publicamente?
-   É possível executar determinada ação sem fornecer acesso irrestrito
    ao servidor?

Argus nasceu para criar uma **camada inteligente sobre essa
complexidade**.

------------------------------------------------------------------------

## Papel dentro do VinyLab

O VinyLab já possui diferentes componentes especializados.

Argus não pretende substituir essas ferramentas.

Seu papel é conectá-las.

``` text
                     ┌──────────────────────┐
                     │        Viny          │
                     │ Interfaces / Mensagem│
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │        ARGUS         │
                     │   Agente de IA       │
                     └──────────┬───────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │ Automações  │       │Observability│       │ Conhecimento│
   │     n8n     │       │ & Métricas  │       │    RAG      │
   └─────────────┘       └─────────────┘       └─────────────┘
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                ▼
                  ┌───────────────────────────┐
                  │      ECOSSISTEMA VPS      │
                  │ aplicações • dados • APIs │
                  │ containers • serviços     │
                  └───────────────────────────┘
```

O princípio arquitetural é:

**Argus compreende → ferramentas especializadas consultam ou executam →
Argus contextualiza.**

------------------------------------------------------------------------

## Uma interface inteligente para a infraestrutura

O objetivo é reduzir a necessidade de interagir manualmente com cada
ferramenta para tarefas operacionais comuns.

Em vez de navegar entre diferentes dashboards, logs, automações e
documentações, Argus deverá funcionar como uma interface capaz de
entender perguntas relacionadas ao ambiente e utilizar a ferramenta
adequada para buscar a resposta.

Isso permite evoluir de:

``` text
humano → ferramenta → informação
```

para:

``` text
humano → Argus → contexto → ferramenta → resposta
```

A diferença está no contexto.

Argus não deve apenas recuperar dados. Ele deve compreender qual
informação é relevante para a solicitação realizada.

------------------------------------------------------------------------

## Control Center

O ecossistema possui um **Control Center** responsável por centralizar a
visualização e o gerenciamento de diferentes partes da VPS.

Ele funciona como a interface visual da infraestrutura.

Argus representa a camada conversacional e inteligente desse mesmo
ambiente.

Conceitualmente:

``` text
CONTROL CENTER
      ↓
visão visual

ARGUS
      ↓
visão conversacional e contextual
```

As duas experiências são complementares.

O objetivo futuro é permitir que o usuário escolha entre observar o
ambiente visualmente ou conversar com ele.

------------------------------------------------------------------------

## Automação com n8n

O n8n funciona como uma das principais camadas de execução e integração
da VPS.

Dentro dessa arquitetura:

**Argus não precisa implementar cada integração diretamente.**

Ele pode utilizar automações especializadas para realizar operações
controladas.

O modelo conceitual é:

``` text
Usuário
   ↓
Argus
   ↓
decisão / intenção
   ↓
n8n
   ↓
workflow especializado
   ↓
serviço
   ↓
resultado
   ↓
Argus
   ↓
resposta contextualizada
```

Essa separação reduz o acoplamento entre inteligência e execução.

Também permite controlar com maior precisão quais operações o agente
poderá realizar.

------------------------------------------------------------------------

## Observabilidade

A VPS possui uma camada dedicada à observabilidade da infraestrutura e
dos containers.

Ela coleta informações relacionadas à saúde e ao comportamento do
ambiente.

Argus deverá utilizar essa camada como um de seus "olhos".

A ideia não é transformar o agente em um sistema de monitoramento.

O monitoramento continua sendo responsabilidade das ferramentas
especializadas.

Argus deverá interpretar esses sinais.

Por exemplo, em vez de apresentar somente métricas isoladas, a evolução
esperada é permitir respostas contextualizadas sobre:

-   disponibilidade;
-   consumo de recursos;
-   comportamento de serviços;
-   dependências;
-   alterações relevantes;
-   possíveis relações entre sintomas observados.

------------------------------------------------------------------------

## Argus e o RAG

Uma das evoluções mais importantes do projeto é a integração com uma
arquitetura de **RAG (Retrieval-Augmented Generation)**.

É importante separar claramente os dois conceitos:

**Argus não é o RAG.**

O RAG funciona como uma camada de recuperação de conhecimento
documentado.

Argus funciona como o agente que utiliza esse conhecimento.

Conceitualmente:

``` text
                 PERGUNTA
                    │
                    ▼
               ┌─────────┐
               │  ARGUS  │
               └────┬────┘
                    │
                    ▼
               ┌─────────┐
               │   RAG   │
               │ memória │
               └────┬────┘
                    │
                    ▼
          DOCUMENTAÇÃO RELEVANTE
                    │
                    ▼
               ┌─────────┐
               │  ARGUS  │
               └────┬────┘
                    │
                    ▼
          RESPOSTA FUNDAMENTADA
```

Em uma frase:

> **O RAG encontra evidências. Argus transforma essas evidências em
> contexto e interação.**

------------------------------------------------------------------------

## RAG do portfólio

Uma das primeiras aplicações planejadas dessa arquitetura é o próprio
portfólio.

Cada projeto poderá possuir documentação estruturada contendo
informações como:

-   contexto;
-   problema;
-   solução;
-   arquitetura;
-   tecnologias;
-   desafios;
-   resultados;
-   screenshots;
-   diagramas;
-   decisões técnicas.

O RAG será responsável por localizar as informações relevantes.

Argus será responsável por utilizar essas informações para responder ao
visitante.

Exemplo conceitual:

``` text
Visitante
    ↓
“Como funciona o projeto X?”
    ↓
Argus
    ↓
RAG
    ↓
documentação pública do projeto
    ↓
Argus
    ↓
resposta fundamentada
```

Quando a informação não estiver documentada, o comportamento esperado é
não improvisar.

Isso transforma o agente em uma interface conversacional sobre o meu
trabalho, sem depender de respostas inventadas.

------------------------------------------------------------------------

## Informação pública vs. informação interna

Essa separação é especialmente importante porque Argus opera em um
ambiente que também possui informações privadas.

O agente precisa compreender que:

``` text
conhecimento disponível
```

não significa necessariamente:

``` text
conhecimento publicável
```

A arquitetura deve manter fronteiras claras entre:

-   documentação pública;
-   conhecimento interno;
-   informações operacionais;
-   configurações;
-   credenciais;
-   segredos;
-   dados sensíveis.

No contexto do portfólio, Argus deve responder exclusivamente a partir
das fontes explicitamente aprovadas para publicação.

------------------------------------------------------------------------

## Segurança por arquitetura

Assim como Hestia, Argus segue o princípio de que um agente de IA não
deve possuir acesso irrestrito à infraestrutura simplesmente por
conveniência.

Entre os princípios arquiteturais estão:

-   ausência de exposição de credenciais ao modelo;
-   operações através de ferramentas especializadas;
-   separação entre inteligência e execução;
-   autenticação para funcionalidades privadas;
-   controle explícito de permissões;
-   proteção de informações sensíveis;
-   isolamento de serviços internos;
-   respostas fundamentadas em fontes autorizadas;
-   comportamento conservador quando uma operação ou informação não
    estiver autorizada.

O objetivo não é construir um agente que possa "fazer qualquer coisa".

É construir um agente que saiba **exatamente o que pode fazer**.

------------------------------------------------------------------------

## Ecossistema

Argus foi projetado para ocupar o centro de um ecossistema composto por
diferentes tecnologias.

### Inteligência

-   Hermes Agent
-   LLMs
-   integração com provedores de modelos
-   RAG
-   agentes e ferramentas especializadas

### Automação

-   n8n
-   workflows
-   integrações entre serviços
-   rotinas operacionais

### Dados

-   PostgreSQL
-   bases especializadas
-   armazenamento vetorial para conhecimento

### Infraestrutura

-   Linux
-   Docker
-   proxy/reverse proxy
-   serviços e aplicações containerizadas
-   VPS

### Observabilidade

-   Prometheus
-   Grafana
-   métricas de host
-   métricas de containers

### Interfaces

-   Control Center
-   Telegram
-   aplicações web
-   portfólio

------------------------------------------------------------------------

## Estado atual

A infraestrutura necessária para o ecossistema Argus já possui
diferentes componentes funcionais.

Entre eles estão:

-   Control Center;
-   automações;
-   banco de dados;
-   observabilidade;
-   serviços containerizados;
-   integrações previstas com modelos de linguagem;
-   canais de comunicação;
-   infraestrutura de RAG em desenvolvimento/evolução.

O agente principal Argus ainda está em processo de integração com todo
esse ecossistema.

Essa distinção é importante:

> **a infraestrutura ao redor do agente já existe; o objetivo atual é
> conectar essas capacidades através do Argus.**

O projeto, portanto, representa uma arquitetura em evolução e não uma
funcionalidade ficticiamente apresentada como concluída.

------------------------------------------------------------------------

# Roadmap

## 1. Implantação do agente principal

Concluir a implantação do Argus como serviço operacional da VPS.

Essa etapa estabelece a camada conversacional central que conectará as
demais capacidades existentes.

------------------------------------------------------------------------

## 2. Argus + RAG

Integrar o agente à camada de recuperação de conhecimento.

Objetivos:

-   consultar documentação;
-   recuperar contexto;
-   identificar fontes;
-   responder somente quando existir evidência suficiente;
-   separar conhecimento público e privado.

Essa integração será um dos principais requisitos para levar o Argus ao
portfólio.

------------------------------------------------------------------------

## 3. Argus no portfólio

Transformar o atual conceito de "Conheça o Argus" em uma experiência
conversacional real.

O visitante poderá fazer perguntas sobre projetos e receber respostas
baseadas exclusivamente na documentação pública disponível.

A proposta não é adicionar um chatbot genérico ao site.

É criar uma interface inteligente para explorar o meu trabalho.

------------------------------------------------------------------------

## 4. Integração com o Control Center

Permitir que Argus utilize informações do Control Center e das fontes
operacionais da VPS para responder perguntas relacionadas ao ambiente.

Exemplos conceituais:

-   saúde geral;
-   serviços disponíveis;
-   comportamento recente;
-   informações operacionais permitidas.

------------------------------------------------------------------------

## 5. Integração operacional com n8n

Permitir que determinadas intenções sejam convertidas em workflows
controlados.

Modelo:

``` text
pedido
  ↓
Argus
  ↓
validação
  ↓
workflow autorizado
  ↓
resultado
  ↓
Argus
```

Nenhuma ação sensível deve ser executada sem políticas explícitas.

------------------------------------------------------------------------

## 6. Sistema de permissões

Criar diferentes níveis de capacidade dependendo da origem da
solicitação.

Por exemplo:

``` text
VISITANTE DO PORTFÓLIO
        ↓
somente conhecimento público

USUÁRIO AUTENTICADO
        ↓
informações privadas autorizadas

ADMINISTRADOR
        ↓
operações controladas
```

Isso permite que o mesmo agente tenha diferentes perímetros sem misturar
responsabilidades.

------------------------------------------------------------------------

## 7. Observabilidade contextual

Integrar métricas e estado dos serviços ao raciocínio do agente.

A evolução desejada é sair de respostas como:

> "O serviço está online."

para algo mais contextual:

> "O serviço está disponível e suas métricas permanecem dentro do
> comportamento esperado no período analisado."

Sempre respeitando os dados realmente disponíveis.

------------------------------------------------------------------------

## 8. Incidentes e correlação

Criar uma camada capaz de relacionar eventos de diferentes componentes.

Em vez de interpretar cada alerta isoladamente, Argus poderá utilizar
dependências e contexto histórico para auxiliar na identificação de
causas prováveis.

------------------------------------------------------------------------

## 9. Auto-remediação controlada

Em estágio posterior, determinadas situações conhecidas poderão acionar
rotinas de recuperação previamente aprovadas.

A arquitetura deverá incluir:

-   catálogo explícito de ações;
-   limites;
-   validações;
-   auditoria;
-   rollback quando aplicável;
-   confirmação humana para operações de maior impacto.

------------------------------------------------------------------------

## 10. Memória operacional

Expandir o RAG para funcionar como memória histórica da VPS.

Essa memória poderá reunir:

-   documentação;
-   decisões arquiteturais;
-   incidentes;
-   troubleshooting;
-   mudanças;
-   procedimentos;
-   histórico de projetos.

O objetivo é permitir que Argus compreenda não apenas o estado atual,
mas também **como o ambiente chegou até ele**.

------------------------------------------------------------------------

## 11. Interface multimodal

Explorar diferentes formas de interação com Argus:

-   texto;
-   voz;
-   dashboards;
-   notificações;
-   interfaces web.

A interface deverá mudar conforme o contexto, mas o agente e suas
políticas permanecerão centralizados.

------------------------------------------------------------------------

## 12. Argus como camada operacional do VinyLab

A visão de longo prazo é tornar Argus a interface inteligente central do
ecossistema VinyLab.

Não para substituir:

-   n8n;
-   Grafana;
-   bancos;
-   APIs;
-   dashboards;
-   sistemas de monitoramento.

Mas para conectar todos eles.

``` text
              VINY
                │
                ▼
             ARGUS
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 Conhecimento Automação Observabilidade
    │           │           │
    └───────────┼───────────┘
                ▼
             VINYLAB
```

------------------------------------------------------------------------

# Visão de longo prazo

Argus representa uma mudança na forma como quero administrar minha
infraestrutura.

Em vez de uma coleção de ferramentas independentes, a meta é construir
um ambiente em que cada serviço continue especializado, mas exista uma
camada capaz de compreender como essas peças se relacionam.

O objetivo não é entregar controle irrestrito da VPS para uma IA.

É criar uma **inteligência operacional segura**, capaz de observar,
consultar, contextualizar, explicar e, progressivamente, executar ações
autorizadas.

Se Hestia representa a inteligência que cuida da minha casa digital,
Argus representa os olhos sobre o ecossistema externo.

> **Muitos serviços. Muitos sinais. Muitos olhos. Um único contexto.**

------------------------------------------------------------------------

## Nota para publicação

Este documento foi preparado especificamente para apresentação pública
em portfólio.

Por segurança, foram intencionalmente omitidos detalhes como:

-   endereços de rede;
-   portas internas;
-   rotas administrativas;
-   credenciais;
-   tokens;
-   configurações de autenticação;
-   caminhos internos do servidor;
-   detalhes de implantação que ampliariam a superfície de ataque;
-   informações privadas armazenadas na infraestrutura.

A documentação técnica interna do projeto possui um nível de detalhe
diferente da versão pública apresentada aqui.

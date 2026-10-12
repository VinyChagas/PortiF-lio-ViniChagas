# Hestia --- Inteligência da Home Lab

> **Sua casa digital, sempre em ordem.**

## Visão geral

Hestia é a inteligência operacional do meu **home lab OMEAB**. O projeto
nasceu para transformar um servidor doméstico em um ambiente mais
organizado, observável e inteligente, combinando **agentes de IA,
automação, monitoramento, organização de arquivos, mídia, conhecimento e
infraestrutura**.

Mais do que um chatbot, Hestia representa uma camada de inteligência
sobre o ambiente: ela conversa comigo, consulta informações da
infraestrutura, auxilia na organização da casa digital e participa de
uma arquitetura em que eventos e serviços são monitorados continuamente.

O princípio que orienta o projeto é simples:

**organizar sem destruir.**

Por isso, ações sensíveis são deliberadamente limitadas, mediadas ou
mantidas fora do alcance direto do agente.

------------------------------------------------------------------------

## Por que o nome Hestia?

O nome vem de **Héstia**, deusa grega associada ao **lar, à lareira e à
proteção da casa**.

A escolha traduz diretamente o papel do projeto.

Se o home lab é a minha "casa digital", Hestia é sua guardiã: acompanha
o estado do ambiente, ajuda a manter arquivos e serviços organizados e
sinaliza quando alguma coisa sai do esperado.

Essa identidade também estabelece uma divisão conceitual dentro do meu
ecossistema:

-   **Hestia** --- inteligência responsável pelo ambiente local e pela
    home lab.
-   **Argus** --- agente voltado ao ambiente externo e à infraestrutura
    da VPS.

Assim, o nome não é apenas uma referência estética à mitologia grega:
ele representa a responsabilidade arquitetural do agente dentro do
ecossistema.

------------------------------------------------------------------------

## O problema

Conforme uma home lab cresce, ela deixa rapidamente de ser apenas "um
servidor".

Passam a coexistir:

-   containers;
-   serviços de mídia;
-   armazenamento;
-   backups;
-   bancos de dados;
-   automações;
-   monitoramento;
-   aplicações próprias;
-   documentos e conhecimento;
-   agentes de inteligência artificial.

Administrar tudo isso manualmente aumenta a complexidade operacional e
torna mais difícil responder perguntas simples:

-   Está tudo funcionando?
-   Algum serviço caiu?
-   O armazenamento está saudável?
-   Os backups estão sendo executados?
-   Existe algo que precisa da minha atenção?
-   Onde determinado conteúdo está armazenado?
-   É possível organizar arquivos sem dar acesso irrestrito ao servidor?

Hestia nasceu para criar uma **camada inteligente entre o administrador
e essa infraestrutura**.

------------------------------------------------------------------------

## Arquitetura conceitual

O projeto segue um modelo simples:

**Hestia decide → automações orquestram → serviços especializados
executam.**

A inteligência conversacional não recebe acesso irrestrito ao servidor.
Em vez disso, operações são expostas através de interfaces controladas e
serviços especializados.

``` text
                    ┌──────────────────────┐
                    │        Viny          │
                    │ Telegram / Interface │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       HESTIA         │
                    │   Agente de IA       │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │    Operators    │         │   Automações    │
        │ ações mediadas  │         │       n8n       │
        └────────┬────────┘         └────────┬────────┘
                 │                           │
                 └─────────────┬─────────────┘
                               ▼
              ┌────────────────────────────────┐
              │         OMEAB Home Lab         │
              │ storage • mídia • serviços •   │
              │ backups • dados • observability│
              └────────────────────────────────┘
```

------------------------------------------------------------------------

## Duas camadas, uma identidade

### 1. Agente inteligente

A camada conversacional é baseada em um agente **Hermes**, conectado a
um modelo de linguagem e utilizado através do Telegram.

Ela foi desenhada para atuar como interface humana da home lab.

Entre suas capacidades estão:

-   consultar o estado de serviços;
-   organizar arquivos e mídia através de operações controladas;
-   trabalhar com notas e conhecimento;
-   consultar e atualizar bibliotecas de mídia;
-   responder perguntas sobre o ambiente;
-   utilizar ferramentas especializadas sem receber acesso
    administrativo irrestrito.

### 2. Plataforma operacional

Por trás do agente existe uma camada de automação e observabilidade
responsável por acompanhar continuamente a infraestrutura.

Ela combina tecnologias como:

-   **n8n** para orquestração;
-   **PostgreSQL** para persistência de eventos e estados;
-   **Docker** para execução dos serviços;
-   agentes próprios de health check;
-   mecanismos de incidentes;
-   mecanismos de notificação;
-   monitoramento de armazenamento, containers e backups.

Essa camada permite que Hestia seja mais do que uma interface de
conversa: existe uma infraestrutura observando a própria infraestrutura.

------------------------------------------------------------------------

## Observabilidade e eventos

A home lab possui uma malha de monitoramento responsável por transformar
sinais técnicos em informações operacionais.

Entre os elementos acompanhados estão:

-   saúde do armazenamento;
-   capacidade de disco;
-   estado dos containers;
-   disponibilidade dos serviços;
-   integridade dos backups;
-   automações de mídia;
-   alterações relevantes de configuração;
-   saúde do próprio sistema de monitoramento.

Os eventos são registrados e podem evoluir para incidentes quando
representam uma situação maior.

A ideia é diferenciar:

**evento = sintoma**

**incidente = situação**

Por exemplo, em vez de interpretar várias falhas isoladas de serviços
como problemas independentes, a arquitetura pode correlacioná-las com
uma indisponibilidade do armazenamento do qual esses serviços dependem.

------------------------------------------------------------------------

## Automação

O n8n funciona como uma das principais camadas de orquestração do
projeto.

Entre os fluxos desenvolvidos estão automações relacionadas a:

-   eventos;
-   armazenamento;
-   backups;
-   disponibilidade de serviços;
-   containers;
-   capacidade de disco;
-   relatórios operacionais;
-   ingestão de conhecimento;
-   organização de mídia;
-   monitoramento de aplicações;
-   análise de incidentes;
-   detecção de alterações de configuração.

A intenção é retirar tarefas repetitivas da administração cotidiana sem
transformar automação em acesso irrestrito.

------------------------------------------------------------------------

## Organização de mídia e arquivos

Hestia também atua como interface inteligente para a organização do
conteúdo armazenado no servidor.

Operações potencialmente destrutivas são evitadas por design.

O fluxo ideal para mudanças em lote segue o princípio:

**analisar → criar plano → simular → aprovar → executar → validar**

Isso permite combinar IA e automação sem abrir mão de previsibilidade e
controle humano.

O ecossistema integra serviços de mídia e gerenciamento de arquivos,
permitindo que alterações realizadas no armazenamento sejam refletidas
nas respectivas bibliotecas.

------------------------------------------------------------------------

## Conhecimento e RAG

O projeto também possui uma camada experimental de **RAG
(Retrieval-Augmented Generation)**.

A proposta é transformar documentação, notas e conhecimento operacional
da home lab em uma base consultável pela Hestia.

No estágio atual, essa camada ainda é um piloto controlado.

A evolução esperada é permitir perguntas como:

-   "O que mudou neste serviço?"
-   "Existe documentação sobre esse incidente?"
-   "Como esse fluxo foi configurado?"
-   "Qual foi a última decisão arquitetural relacionada a este
    componente?"

Isso aproxima a Hestia de uma verdadeira **memória operacional da
infraestrutura**.

------------------------------------------------------------------------

## Segurança por arquitetura

Uma das decisões centrais do projeto foi não tratar segurança apenas
como configuração, mas como parte da própria arquitetura.

Alguns princípios adotados:

-   o agente não possui shell administrativo;
-   operações destrutivas não ficam livremente disponíveis;
-   ações são realizadas por ferramentas especializadas;
-   serviços internos são isolados conforme sua necessidade;
-   credenciais não fazem parte do contexto conversacional;
-   operações sensíveis permanecem mediadas;
-   monitoramento e execução são responsabilidades separadas;
-   automação não significa autonomia irrestrita.

O objetivo é construir um agente útil sem transformar conveniência em
risco operacional.

------------------------------------------------------------------------

## Ecossistema

Hestia se conecta a diferentes componentes da minha home lab, incluindo:

### Inteligência e automação

-   Hermes Agent
-   LLMs
-   RAG
-   n8n
-   agentes e serviços próprios

### Infraestrutura

-   Ubuntu Server
-   Docker
-   PostgreSQL
-   armazenamento redundante
-   rede privada e acesso remoto seguro

### Mídia e arquivos

-   Jellyfin
-   Audiobookshelf
-   Immich
-   compartilhamento e gerenciamento de arquivos

### Observabilidade

-   health checks próprios
-   monitoramento de serviços
-   eventos
-   incidentes
-   notificações
-   relatórios operacionais

### Conhecimento

-   Obsidian
-   base RAG
-   documentação técnica
-   histórico operacional

------------------------------------------------------------------------

## Estado atual

Hestia já funciona como uma camada operacional real da home lab.

Atualmente, o projeto possui:

-   agente conversacional funcional;
-   operações controladas para arquivos e mídia;
-   monitoramento automatizado;
-   persistência de eventos;
-   mecanismo de incidentes;
-   notificações;
-   automações recorrentes;
-   observabilidade de serviços e armazenamento;
-   RAG em estágio experimental.

Algumas capacidades continuam propositalmente limitadas enquanto a
arquitetura de segurança e aprovação evolui.

------------------------------------------------------------------------

# Roadmap

## 1. Hestia → RAG

Expandir a integração entre o agente e a base de conhecimento para que
Hestia possa consultar documentação, decisões arquiteturais, incidentes
anteriores e histórico operacional.

**Objetivo:** transformar documentação passiva em memória consultável.

------------------------------------------------------------------------

## 2. Ações operacionais mediadas

Evoluir a ponte entre Hestia e as automações para permitir determinadas
ações controladas, sempre com:

-   catálogo explícito de operações;
-   validação;
-   níveis de permissão;
-   auditoria;
-   confirmação humana quando necessário.

**Objetivo:** passar gradualmente de observação para operação segura.

------------------------------------------------------------------------

## 3. Auto-remediação controlada

Criar mecanismos capazes de resolver automaticamente problemas
conhecidos e de baixo risco.

Exemplos conceituais:

-   recuperar um serviço em condição conhecida;
-   executar validações adicionais;
-   iniciar rotinas de recuperação previamente aprovadas.

A auto-remediação deverá trabalhar com políticas claras e limites
rígidos.

------------------------------------------------------------------------

## 4. Evolução do motor de incidentes

Aprimorar a correlação entre eventos para identificar causa provável,
dependências afetadas e ciclo de vida completo dos incidentes.

Próximos passos:

-   correlação mais inteligente;
-   fechamento automático quando a condição normalizar;
-   histórico de recorrência;
-   enriquecimento com contexto do RAG.

------------------------------------------------------------------------

## 5. Sistema inteligente de notificações

Evoluir o gerenciador de notificações para decidir não apenas **o que
aconteceu**, mas **se aquilo realmente merece interromper o usuário**.

A ideia é reduzir ruído e priorizar:

-   severidade;
-   impacto;
-   recorrência;
-   dependências;
-   contexto histórico.

------------------------------------------------------------------------

## 6. RAG como memória da casa

Ampliar a base de conhecimento para documentação validada da home lab,
incluindo:

-   arquitetura;
-   procedimentos;
-   decisões;
-   troubleshooting;
-   changelogs;
-   incidentes;
-   documentação dos serviços.

------------------------------------------------------------------------

## 7. Recuperação e Disaster Recovery

Evoluir a estratégia de backup para contemplar cópias externas e
procedimentos documentados de recuperação.

**Objetivo:** garantir que redundância local e backup sejam tratados
como responsabilidades diferentes.

------------------------------------------------------------------------

## 8. Monitoramento de energia

Adicionar uma camada dedicada a energia e desligamento seguro quando a
infraestrutura física permitir.

Possibilidades futuras:

-   integração com UPS/nobreak compatível;
-   detecção de falta de energia;
-   desligamento coordenado;
-   validação após retorno da energia.

------------------------------------------------------------------------

## 9. Interface unificada

Evoluir o Control Center para funcionar como uma visão central do
ecossistema Hestia.

A proposta é reunir:

-   saúde geral;
-   serviços;
-   armazenamento;
-   incidentes;
-   automações;
-   backups;
-   conhecimento;
-   atividades recentes;
-   interação com o agente.

------------------------------------------------------------------------

## 10. Hestia mais contextual

No longo prazo, Hestia deverá entender não apenas o estado atual, mas o
contexto temporal da home lab.

Em vez de responder apenas:

> "O serviço está funcionando."

A meta é permitir respostas como:

> "O serviço está funcionando agora, apresentou instabilidade
> anteriormente, a causa estava relacionada a uma dependência de
> armazenamento e não houve nova ocorrência desde a recuperação."

Essa evolução transforma monitoramento em **compreensão operacional**.

------------------------------------------------------------------------

# Visão de longo prazo

A meta da Hestia não é criar uma IA com controle irrestrito sobre um
servidor.

É construir uma **inteligência operacional segura para uma
infraestrutura pessoal**.

Uma camada capaz de observar, contextualizar, organizar, lembrar,
explicar e, progressivamente, executar ações previamente autorizadas.

Tudo isso preservando o princípio que deu origem ao projeto:

> **Hestia cuida da casa digital --- mas não toma posse dela.**

------------------------------------------------------------------------

## Nota para publicação

Este documento foi preparado como material público de portfólio. Por
segurança, detalhes operacionais sensíveis --- como endereços de rede,
portas internas, credenciais, identificadores privados, caminhos
específicos de infraestrutura, mecanismos de autenticação e
configurações que poderiam ampliar a superfície de ataque --- foram
intencionalmente omitidos.

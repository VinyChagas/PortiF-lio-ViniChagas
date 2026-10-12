# Automação NFSe

Fonte de enriquecimento: knowledge ArgusRAG `projetos/automacao-nfse` (autorizado parcial para portfólio). Este case cobre a **primeira geração (Bot Fiscal / ISS Curitiba)**. A segunda geração está em `plataforma-nfse`.

## Visão geral

Sistema que automatiza a coleta mensal de NFS-e no portal municipal de Curitiba, nascido da operação fiscal da SCS Contabilidade. Iniciativa própria a partir de maio de 2024.

## Contexto

SCS Contabilidade. Fiscal. Analista contábil fiscal. Cerca de 300 empresas com NFS-e em Curitiba (carteira total ~500 clientes). Equipe fiscal de 5 pessoas; além do autor, mais 2 na baixa.

## Problema

A coleta mensal no ISS Curitiba era manual: login, emitidas, recebidas e baixa sem movimento para preservar CND. Ciclo de 3 a 4 dias, portal instável, campos sem colar e CAPTCHA.

## Cenário anterior

Equipe fiscal dedicava dias a cada ciclo para autenticar, baixar notas e registrar ausência de movimento.

## Solução

Bot Fiscal: autenticação com CAPTCHA, troca de perfil por procuração, download em lote, baixa sem movimento, DAM, organização de arquivos e frontend operacional.

## Arquitetura

Backend Node.js/Express + Selenium/Chrome + p-limit + Socket.IO. Frontend React/Vite. Persistência em Excel/JSON.

## Tecnologias

Node.js, Express, TypeScript, Selenium, React, Vite.

## Automação / fluxo

Login CNPJ/senha, CAPTCHA (2Captcha ou fila manual), troca de perfil, downloads em lote, baixa sem movimento, DAM, pause/stop.

## Desafios técnicos

Portal instável com frames. CAPTCHA. Impossibilidade de colar no login. Procuração vs credencial própria. MVP de ~5 h com 1 navegador. Descontinuação do portal municipal.

## Resultados

- Ciclo manual: 3 a 4 dias (~300 empresas)
- MVP 1 navegador: ~5 horas
- Paralelismo canônico: 273 empresas / 60 navegadores / 10 min 18 s (vídeo 29/08/2025)
- Escala no currículo: ~400 empresas em cerca de 30 min

## Status

Desenvolvido (geração Curitiba descontinuada com a migração nacional).

## Evidências

Vídeo canônico de paralelismo 29/08/2025. Demais mídias permanecem confidenciais até publicação explícita.

## Imagens

TODO

## Vídeos

TODO (canônico interno: VIDEO-2025-08-29)

## Diagramas

TODO

## Observações

Selenium nesta geração. Persistência Excel/JSON. Angular/Playwright/Postgres pertencem à 2ª geração (`plataforma-nfse`). Nada nesta pasta é publicado automaticamente. Secrets, certificados e dados de clientes permanecem fora do site.

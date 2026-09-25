# Automação NFSe



## Visão geral

Sistema que automatiza a coleta mensal de NFS-e em portais fiscais, nascido de um processo operacional real.

## Contexto

SCS Contabilidade. Fiscal. Desenvolvido no contexto da operação fiscal de NFS-e.

## Problema

A coleta mensal de notas em portais fiscais era feita à mão, ocupava a equipe e dependia de um fluxo instável.

## Cenário anterior

A equipe fiscal dedicava dias a cada ciclo para autenticar, baixar notas e registrar ausência de movimento.

## Solução

Automação de autenticação, downloads e organização dos arquivos, na geração voltada ao portal municipal.

## Arquitetura

Backend próprio, fila de navegadores e frontend operacional para a coleta no portal municipal de ISS.

## Tecnologias

Node.js, Express, TypeScript, Selenium, React, Angular.

## Automação / fluxo

A primeira geração concentra login, CAPTCHA, troca de perfil e downloads em lote.

## Desafios técnicos

Portal municipal instável, com frames e tempos irregulares. CAPTCHA no login. Descontinuação do portal de origem, que exigiu uma geração seguinte.

## Resultados

Ciclo manual anterior: 3 a 4 dias. Paralelismo evidenciado: 273 empresas em 10 min 18 s (60 navegadores, vídeo de 29/08/2025). Escala descrita no currículo: cerca de 400 empresas em cerca de 30 min.

## Status

Desenvolvido.

## Evidências

TODO

## Imagens

TODO

## Vídeos

TODO

## Diagramas

TODO

## Observações

Selenium nesta geração. Persistência que partiu de planilha e JSON. Nada nesta pasta é publicado automaticamente.


# BaixarRAs



## Visão geral

Sistema full stack para coleta completa de dados de atendimento (RAs) em portal corporativo.

## Contexto

Banco CNH. Banking. Coleta de registros de atendimento no portal Autbank, com exportação organizada por RA.

## Problema

Obter, para cada RA, dados gerais, histórico paginado e anexos — persistindo o resultado de forma completa.

## Cenário anterior

A captura manual no portal exigia navegar dados gerais, timeline e anexos, com risco de perder a posição ao voltar de um download.

## Solução

Login automatizado, consulta por número, coleta em duas fases e exportação em pasta e JSON por RA.

## Arquitetura

Backend concentra a automação do portal. Frontend oferece telas de consulta e exportação. Seletores do portal ficam centralizados.

## Tecnologias

Node.js, Express, React, Vite, Axios, Selenium.

## Automação / fluxo

Coleta em duas fases: primeiro o texto e o mapeamento de anexos; depois o download dos arquivos, com reposicionamento na timeline.

## Desafios técnicos

Após baixar um anexo e voltar, o portal retorna à primeira página da timeline.

## Resultados

TODO

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

Repositório: https://github.com/VinyChagas/BaixarRAs. Nada nesta pasta é publicado automaticamente.


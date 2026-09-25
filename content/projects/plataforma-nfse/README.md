# Plataforma NFSe / 2ª geração



## Visão geral

Evolução da automação de NFS-e para o cenário nacional, com certificados digitais, credenciais empresariais e armazenamento seguro.

## Contexto

SCS Contabilidade. Fiscal. Segunda geração da automação fiscal de NFS-e.

## Problema

TODO

## Cenário anterior

TODO

## Solução

Arquitetura para o Portal Nacional de NFS-e, com gestão de certificados digitais, credenciais empresariais e armazenamento seguro.

## Arquitetura

Backend próprio e fila de navegadores. A autenticação usa certificado A1 ou credencial. A persistência evoluiu para PostgreSQL.

## Tecnologias

Node.js, TypeScript, Playwright, PostgreSQL, Prisma.

## Automação / fluxo

Download de XML e DANFS-e nota a nota, porque o portal nacional não oferece lote.

## Desafios técnicos

Download unitário no portal nacional, sem lote.

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

Playwright nesta geração, pelo suporte nativo a certificado digital. Operação local controlada; preparação de VPS em andamento. Nada nesta pasta é publicado automaticamente.


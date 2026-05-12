# Decisoes Arquiteturais

# ADR-001 - Dados estaticos no prototipo inicial

## Contexto

O projeto ainda nao tem corpus validado de promessas nem necessidade operacional de escrita por utilizadores.

## Decisao

Manter partidos, eleicoes, documentos e promessas em `src/lib/politrace-data.ts`.

## Justificacao

Esta abordagem reduz dependencias, facilita auditoria academica e evita introduzir infraestrutura antes de existir necessidade clara.

## Consequencias

O prototipo e simples de executar e rever. Em contrapartida, atualizacoes de dados exigem alteracao de codigo e novo deploy.

# ADR-002 - Uso de TanStack Router e TanStack Start

## Contexto

A aplicacao precisa de rotas tipadas, paginas publicas e possibilidade de renderizacao SSR.

## Decisao

Usar TanStack Router com TanStack Start e Vite.

## Justificacao

A stack permite rotas file-based, bom suporte TypeScript e build moderno sem introduzir uma framework maior do que o necessario.

## Consequencias

O projeto depende da geracao de `src/routeTree.gen.ts`. Esse ficheiro e gerado automaticamente pela stack e deve permanecer versionado porque e usado pelo router.

# ADR-003 - Remocao de componentes UI nao utilizados

## Contexto

O ZIP continha uma colecao extensa de componentes shadcn e dependencias associadas, mas a aplicacao nao os importava.

## Decisao

Remover os componentes e dependencias nao usados, mantendo apenas os componentes especificos do projeto.

## Justificacao

Reduz superficie de manutencao, tamanho do CSS gerado, alertas de lint e dependencias transitivas.

## Consequencias

Novos componentes partilhados devem ser adicionados de forma incremental, quando houver necessidade real.

# ADR-004 - CI minimo mas executavel

## Contexto

O projeto tem scripts funcionais para typecheck, lint e build.

## Decisao

Adicionar workflow GitHub Actions que executa `npm ci`, `npm run typecheck`, `npm run lint` e `npm run build`.

## Justificacao

O CI valida a integridade tecnica do projeto sem criar etapas decorativas.

## Consequencias

Pull requests passam a ter validacao automatica. Testes unitarios devem ser adicionados ao workflow quando existirem.

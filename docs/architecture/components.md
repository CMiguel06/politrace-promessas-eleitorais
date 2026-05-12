# Arquitetura - Componentes

## Componentes internos

| Componente             | Funcao                                                | Entradas                                         | Saidas                        | Dependencias                   |
| ---------------------- | ----------------------------------------------------- | ------------------------------------------------ | ----------------------------- | ------------------------------ |
| `Layout`               | Define cabecalho, navegacao, area principal e rodape. | Rotas filhas via `Outlet`.                       | Estrutura comum da aplicacao. | `@tanstack/react-router`       |
| `StatusBadge`          | Mostra o estado de uma promessa com cor semantica.    | `PromiseStatus`.                                 | Elemento visual de estado.    | `STATUS_LABEL`, `STATUS_TOKEN` |
| `AreaBadge`            | Mostra a area politica de uma promessa.               | Texto da area.                                   | Elemento visual simples.      | Nenhuma externa                |
| Rotas em `src/routes/` | Exibem paginas e agregacoes.                          | Dados estaticos e estado local quando aplicavel. | HTML/React renderizado.       | TanStack Router, React         |
| `politrace-data.ts`    | Centraliza tipos e dados do dominio.                  | Nao aplicavel.                                   | Tipos, constantes e colecoes. | Nenhuma externa                |
| `server.ts`            | Encapsula entrada SSR e tratamento de erro.           | `Request`, `env`, `ctx`.                         | `Response`.                   | TanStack Start server entry    |

## Pontos de extensao

- Adicionar novas paginas criando ficheiros em `src/routes/`.
- Expandir o dominio em `src/lib/politrace-data.ts` ou migrar para uma camada de dados persistente.
- Criar componentes partilhados em `src/components/` quando houver repeticao real de UI.
- Adicionar validacao de dados antes de popular o catalogo de promessas.

## Dependencias internas

As rotas dependem diretamente dos dados estaticos. Esta decisao e aceitavel para o prototipo, mas deve ser revista quando existir persistencia, API ou atualizacao frequente do corpus.

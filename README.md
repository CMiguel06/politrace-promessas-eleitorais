# PoliTrace - Promessas Eleitorais

Observatorio digital para catalogar, pesquisar e acompanhar promessas eleitorais e compromissos politicos com base em documentos publicos verificaveis.

## Problema

Programas eleitorais, listas de candidatos, resultados e compromissos politicos tendem a estar dispersos por varias fontes. O PoliTrace organiza esse universo num prototipo web que separa dados eleitorais, documentos de origem, promessas identificadas, estados de cumprimento e evidencias.

## Funcionalidades principais

- Dashboard com indicadores agregados do corpus.
- Catalogo de promessas com filtros por area, partido e estado.
- Consulta de partidos, eleicoes, documentos e evidencias.
- Comparador entre forcas politicas e areas programaticas.
- Classificador exploratorio "Promessa ou Fumo?" para avaliar mensurabilidade de texto.
- Paginas de metodologia, etica, relatorios e enquadramento do projeto.

## Tecnologias

- TypeScript
- React 19
- TanStack Router
- TanStack Start
- TanStack Query
- Vite
- Tailwind CSS 4
- Cloudflare Workers via Wrangler/Vite plugin
- ESLint e Prettier

## Estrutura do projeto

```text
.
|-- .github/
|   |-- ISSUE_TEMPLATE/
|   |-- workflows/
|   `-- pull_request_template.md
|-- docs/
|   |-- architecture/
|   |   |-- diagrams/
|   |   |-- components.md
|   |   |-- data-flow.md
|   |   |-- decisions.md
|   |   `-- overview.md
|   `-- usage/
|       `-- getting-started.md
|-- src/
|   |-- components/
|   |-- lib/
|   |-- routes/
|   |-- router.tsx
|   |-- server.ts
|   |-- start.ts
|   `-- styles.css
|-- CHANGELOG.md
|-- CONTRIBUTING.md
|-- LICENSE
|-- SECURITY.md
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
`-- wrangler.jsonc
```

## Instalação

Requisitos:

- Node.js 22 ou superior
- npm

```bash
npm ci
```

## Execução local

```bash
npm run dev
```

O Vite disponibiliza a aplicacao localmente no URL indicado no terminal.

## Qualidade e build

```bash
npm run typecheck
npm run lint
npm run build
```

## Exemplos de utilizacao

- Aceder ao Dashboard para ver totais de partidos, documentos, eleicoes e promessas.
- Usar a pesquisa de promessas para filtrar compromissos por texto, area ou partido.
- Consultar "Documentos" para confirmar as fontes eleitorais registadas.
- Usar "Promessa ou Fumo?" para testar se uma frase contem compromisso mensuravel.

## Screenshots

Nao existem screenshots versionadas nesta versao limpa. As imagens externas anteriormente referenciadas no README nao foram preservadas como assets locais.

## Estado atual

Protótipo academico funcional. A base contem partidos, eleicoes e documentos de referencia para o contexto Madeira 2025. O catalogo de promessas esta intencionalmente vazio ate existir recolha documental validada para cada promessa.

## Roadmap

- Recolher programas eleitorais com URL, data de consulta e metadados.
- Popular `PROMISES` apenas com compromissos rastreaveis a documentos.
- Adicionar testes unitarios para funcoes de classificacao e agregacao.
- Introduzir persistencia de dados quando o corpus deixar de ser estatico.
- Criar screenshots locais em `docs/screenshots/` quando houver versao visual estabilizada.

## Autor

Caio Camacho.

## Licença

Distribuido sob a licenca MIT. Ver [LICENSE](LICENSE).

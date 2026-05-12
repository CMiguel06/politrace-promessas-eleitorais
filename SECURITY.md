# Politica de Seguranca

## Versoes suportadas

O projeto esta em fase `0.x`. Apenas a versao mais recente da branch `main` recebe correcoes.

## Reportar vulnerabilidades

Se encontrar uma vulnerabilidade, nao abra uma issue publica com detalhes exploraveis. Contacte o mantenedor do projeto por um canal privado e inclua:

- descricao do problema;
- passos de reproducao;
- impacto esperado;
- ficheiros ou rotas afetadas;
- sugestao de correcao, se existir.

## Segredos e configuracao local

Este projeto nao requer segredos para desenvolvimento local nesta versao. Mesmo assim:

- nao versionar `.env`, `.env.local`, `.dev.vars` ou credenciais locais;
- nao colocar tokens, chaves API ou passwords em exemplos;
- rodar imediatamente qualquer segredo que tenha sido publicado por engano;
- usar `.env.example` apenas quando forem introduzidas variaveis de ambiente reais.

## Dependencias

As dependencias devem ser instaladas com `npm ci` e auditadas regularmente:

```bash
npm audit
```

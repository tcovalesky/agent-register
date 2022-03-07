# agent-register

## Introdução

Este serviço é responsável por gerenciar um registro de agentes.

## Como rodar

1. Clone o repositório e instale as dependências com o comando `npm install`.
2. (Opcional) Personalize as variáveis de ambiente se baseando no arquivo `.env.example`.
3. Suba os serviços utilizando o comando `docker-compose up`.
4. Após esses passos a aplicação estará executando no endereço `http://localhost:3000` (ou na porta especificada no `.env`);

## Testes

No link https://www.getpostman.com/collections/5124510c30ea19481e18 é possível acessar uma collection do POSTMAN para a realização de testes.

Os testes automatizados estão implementados em sua maioria como testes fim a fim. Para executar os testes é necessário ter uma instância de um banco mongo executando.

Essa instância pode ser executada com o comando `docker-compose up db`. Após a instância do banco estar executando é possível executar o comando `npm run test` para a execução dos testes e o comando `npm run test:cov` para obter a cobertura de testes.

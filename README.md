# Guardiao do Almoxarifado - API

API desenvolvida por Gustavo Henrique Maciel, aluno do curso Lions Startups.

Esta API faz parte do projeto Guardiao do Almoxarifado. Ela guarda os dados de
usuarios, produtos e movimentacoes de estoque, alem de fornecer os relatorios
usados pelo frontend.

## Links do projeto

- Frontend: https://guardiao-almoxarifado-frontend-61i7.onrender.com
- API publicada: https://almoxarifado-6jpd.onrender.com

## O que a API faz

- Cadastro e login de usuarios.
- Autenticacao com token JWT.
- Controle de perfis ADMIN e LEITOR.
- Cadastro, edicao, listagem e remocao de produtos.
- Registro de entradas e saidas do estoque.
- Relatorio de saldo atual.
- Relatorio de historico de movimentacoes.
- Healthcheck para acompanhar o deploy.

## Tecnologias usadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Render

## Como rodar localmente

Instale as dependencias:

```bash
npm install
```

Copie o exemplo de variaveis de ambiente:

```bash
cp .env.example .env
```

Configure o `.env` com os dados do banco:

```env
APP_NAME=guardiao-almoxarifado
PORT=3000
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/guardiao_almoxarifado
JWT_SECRET=troque-por-uma-chave-longa-e-segura
```

Para rodar em desenvolvimento:

```bash
npm run dev
```

Para iniciar em modo normal:

```bash
npm start
```

Para fazer uma checagem simples dos arquivos JavaScript:

```bash
npm test
```

## Perfis de usuario

- ADMIN: pode cadastrar produtos, alterar produtos, excluir produtos e registrar movimentacoes.
- LEITOR: pode consultar produtos e visualizar relatorios.

## Endpoints principais

| Metodo | Endpoint | Acesso |
|---|---|---|
| GET | `/` | Publico |
| GET | `/api/healthcheck/ping` | Publico |
| POST | `/api/auth/register` | Publico |
| POST | `/api/auth/login` | Publico |
| POST | `/api/produtos` | ADMIN |
| GET | `/api/produtos` | Usuario logado |
| GET | `/api/produtos/:id` | Usuario logado |
| PUT | `/api/produtos/:id` | ADMIN |
| DELETE | `/api/produtos/:id` | ADMIN |
| POST | `/api/movimentacoes` | ADMIN |
| GET | `/api/relatorios/saldo` | Usuario logado |
| GET | `/api/relatorios/historico` | Usuario logado |

Nas rotas privadas, envie o token no cabecalho:

```http
Authorization: Bearer SEU_TOKEN
```

## Exemplos de JSON

Cadastro de usuario:

```json
{
  "name": "Administrador",
  "email": "admin@email.com",
  "password": "123456",
  "role": "ADMIN"
}
```

Cadastro de produto:

```json
{
  "name": "Papel A4",
  "code": "PAP-A4",
  "description": "Resma com 500 folhas",
  "price": 32.9,
  "category": "Papelaria"
}
```

Registro de movimentacao:

```json
{
  "productId": "ID_DO_PRODUTO",
  "type": "ENTRADA",
  "quantity": 10,
  "reason": "Compra mensal"
}
```

## Deploy

O deploy foi configurado no Render usando o arquivo `render.yaml`. Para publicar,
e preciso informar a variavel `MONGODB_URI`; a variavel `JWT_SECRET` pode ser
gerada automaticamente pelo proprio Render.
